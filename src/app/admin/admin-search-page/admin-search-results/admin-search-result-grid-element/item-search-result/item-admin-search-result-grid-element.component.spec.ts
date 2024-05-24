import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../../core/auth/auth.service';
import { AccessStatusDataService } from '../../../../../core/data/access-status-data.service';
import { BitstreamDataService } from '../../../../../core/data/bitstream-data.service';
import { AuthorizationDataService } from '../../../../../core/data/feature-authorization/authorization-data.service';
import { RemoteData } from '../../../../../core/data/remote-data';
import { Bitstream } from '../../../../../core/shared/bitstream.model';
import { FileService } from '../../../../../core/shared/file.service';
import { Item } from '../../../../../core/shared/item.model';
import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { mockTruncatableService } from '../../../../../shared/mocks/mock-trucatable.service';
import { getMockThemeService } from '../../../../../shared/mocks/theme-service.mock';
import { CollectionElementLinkType } from '../../../../../shared/object-collection/collection-element-link.type';
import { AccessStatusObject } from '../../../../../shared/object-collection/shared/badges/access-status-badge/access-status.model';
import { ItemSearchResult } from '../../../../../shared/object-collection/shared/item-search-result.model';
import { ListableObjectDirective } from '../../../../../shared/object-collection/shared/listable-object/listable-object.directive';
import {
  createNoContentRemoteDataObject$,
  createSuccessfulRemoteDataObject$,
} from '../../../../../shared/remote-data.utils';
import { AuthServiceStub } from '../../../../../shared/testing/auth-service.stub';
import { AuthorizationDataServiceStub } from '../../../../../shared/testing/authorization-service.stub';
import { FileServiceStub } from '../../../../../shared/testing/file-service.stub';
import { ThemeService } from '../../../../../shared/theme-support/theme.service';
import { ThumbnailService } from '../../../../../shared/thumbnail/thumbnail.service';
import { TruncatableService } from '../../../../../shared/truncatable/truncatable.service';
import { ItemAdminSearchResultGridElementComponent } from './item-admin-search-result-grid-element.component';

describe('ItemAdminSearchResultGridElementComponent', () => {
  let component: ItemAdminSearchResultGridElementComponent;
  let fixture: ComponentFixture<ItemAdminSearchResultGridElementComponent>;
  let id;
  let searchResult;

  const mockBitstreamDataService = {
    getThumbnailFor(item: Item): Observable<RemoteData<Bitstream>> {
      return createSuccessfulRemoteDataObject$(new Bitstream());
    },
  };

  const mockAccessStatusDataService = {
    findAccessStatusFor(item: Item): Observable<RemoteData<AccessStatusObject>> {
      return createSuccessfulRemoteDataObject$(new AccessStatusObject());
    },
  };

  const mockThemeService = getMockThemeService();
  const mockThumbnailService = jasmine.createSpyObj('ThumbnailService', {
    'getConfig': jasmine.createSpy('getConfig'),
  });

  function init() {
    id = '780b2588-bda5-4112-a1cd-0b15000a5339';
    searchResult = new ItemSearchResult();
    searchResult.indexableObject = Object.assign(new Item(), {
      thumbnail: createNoContentRemoteDataObject$(),
    });
    searchResult.indexableObject.uuid = id;
  }

  beforeEach(waitForAsync(() => {
    init();
    TestBed.configureTestingModule(
      {
        declarations: [ItemAdminSearchResultGridElementComponent, ListableObjectDirective],
        imports: [
          CommonModule,
          BrowserModule,
          NoopAnimationsModule,
          TranslateModule.forRoot(),
          RouterTestingModule.withRoutes([]),
        ],
        providers: [
          { provide: TruncatableService, useValue: mockTruncatableService },
          { provide: BitstreamDataService, useValue: mockBitstreamDataService },
          { provide: ThemeService, useValue: mockThemeService },
          { provide: AccessStatusDataService, useValue: mockAccessStatusDataService },
          { provide: AuthService, useClass: AuthServiceStub },
          { provide: FileService, useClass: FileServiceStub },
          { provide: AuthorizationDataService, useClass: AuthorizationDataServiceStub },
          { provide: ThumbnailService, useValue: mockThumbnailService },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAdminSearchResultGridElementComponent);
    component = fixture.componentInstance;
    component.object = searchResult;
    component.linkTypes = CollectionElementLinkType;
    component.index = 0;
    component.viewModes = ViewMode;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
