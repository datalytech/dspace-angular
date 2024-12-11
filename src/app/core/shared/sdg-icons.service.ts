import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SdgIconsService {
  private _sdgIcons$ = new BehaviorSubject([]);

  get sdgIcons$(): Observable<string[]> {
    return this._sdgIcons$.asObservable();
  }

  setSdgIcons(icons: string[]) {
    this._sdgIcons$.next(icons);
  }
}
