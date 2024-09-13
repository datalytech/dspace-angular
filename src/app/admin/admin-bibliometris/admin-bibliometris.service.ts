import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, interval, Observable, switchMap, takeWhile, tap } from "rxjs";
import { environment } from "src/environments/environment";

export interface QueryParam {
  key: string;
  value: string;
}
export interface ImportInfo {
  total: number;
  importInProgress: boolean;
  status: 'completed' | 'failed' | null;
}

export interface ProgressInfo {
  counterOk: number;
  counterNotOk: number;
  total: number;
  progressPercentage: number;
  importInProgress: boolean;
  logs: any;
  status: 'completed' | 'failed' | null;
}

@Injectable({
  providedIn: "root",
})
export class AdminBibliometrisServive {
  private readonly pollingInterval = 1000;
  private http = inject(HttpClient);
  private _importProgressInfo$: BehaviorSubject<undefined | ProgressInfo> = new BehaviorSubject(undefined);

  //mock
  mockCounter = 0;
  totalMock = 5;
  logMock = [];
  //

  get importProgressInfo$(): Observable<undefined | ProgressInfo> {
    return this._importProgressInfo$.asObservable();
  }

  batchImport(queryParams: QueryParam[]) {
    this._importProgressInfo$.next(undefined);


    // mock 
    this.mockCounter = 0;
    this.totalMock = 5;
    this.logMock = [];
    //

    
    const queryString = queryParams.map(queryParam => `${queryParam.key}=${encodeURIComponent(queryParam.value)}`).join("&");
    const url = `${environment.bibliometrisImportUrl}?${queryString}`;
    this.initImport(url);
    this.pollingForProgress();
  }

  private initImport(url: string) {
    this.http.get<any>(url)
      .subscribe({
        next: (res) => {
          // notification
          console.log('Import: ' + JSON.stringify(res));
          console.log('Import finished with total count: ' + res.total);
        },
        error: (err) => {
          // notification
          console.log('Import failed', err);
        }
      });
  }

  private pollingForProgress() {
    interval(1000)
      .pipe(
        switchMap(() => this.http.get<ProgressInfo>(environment.pollingProgressUrl)),
        tap(res => {
          try {
            const progressInfo: ProgressInfo = this.calculateProgress(res);
            this._importProgressInfo$.next(progressInfo);
          } catch(err) {
            console.error('Something went wrong ', err);
          }
        }),
        switchMap(() => this._importProgressInfo$),
        takeWhile(importProgressInfo => importProgressInfo.importInProgress, true)
      )
      .subscribe();
  }

  private calculateProgress(res: ProgressInfo): ProgressInfo {
    
    // mpock starts
    this.mockCounter++;
    const percentage = Number(((this.mockCounter / this.totalMock) * 100).toFixed(2));
    let log = '';
    if (this.mockCounter === 1) {
      log = "1::ok:: :: Successfully retrieved data from Bibliometris";
    } else if (this.mockCounter === 2) {
      log = "2::ok:: :: Successfully got data from Bibliometris. Ready to import 2 items";
    } else if (this.mockCounter === this.totalMock) {
      log = `5::ok:: :: Successful Import - Completed`;
    } else {
      log = `${this.mockCounter}::ok::${'7647' + this.mockCounter}:: Successfully added item`;
    }

    this.logMock.push(log);

    res = {
      counterOk: this.mockCounter,
      total: this.totalMock,
      counterNotOk: 0,
      progressPercentage: percentage,
      importInProgress: percentage < 100,
      logs: this.logMock,
      status: "completed"
      }
      // mock ends



    let counterNotOk = res.counterNotOk;
    let counterOk = res.counterOk;
    let total = res.total;

    counterNotOk = isNaN(Number(counterNotOk)) ? 0 : Number(counterNotOk);
    counterOk = isNaN(Number(counterOk)) ? 0 : Number(counterOk);
    total = isNaN(Number(total)) ? 0 : Number(total);

    const progressPercentage = !total ? 0 : Number(((((counterNotOk + counterOk) / total) * 100)).toFixed(2));

    return {
      counterOk: res.counterOk,
      counterNotOk: res.counterNotOk,
      importInProgress: res.importInProgress,
      logs: res.logs,
      progressPercentage: progressPercentage,
      status: res.status,
      total: res.total
    };
  }
}
