import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { NEVER, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { MetadataLinkViewComponent } from './metadata-link-view.component';
import { ItemDataService } from '../../core/data/item-data.service';
import { Item } from '../../core/shared/item.model';
import { createFailedRemoteDataObject$, createSuccessfulRemoteDataObject$ } from '../remote-data.utils';
import { MetadataValue } from '../../core/shared/metadata.models';
import { EntityIconDirective } from '../entity-icon/entity-icon.directive';
import { VarDirective } from '../utils/var.directive';
import SpyObj = jasmine.SpyObj;

describe('MetadataLinkViewComponent', () => {
  let component: MetadataLinkViewComponent;
  let fixture: ComponentFixture<MetadataLinkViewComponent>;
  let itemService: SpyObj<ItemDataService>;
  const validAuthority = uuidv4();

  const testPerson = Object.assign(new Item(), {
    id: '1',
    bundles: of({}),
    metadata: {
      'dspace.entity.type': [
        Object.assign(new MetadataValue(), {
          value: 'Person'
        })
      ],
      'person.orgunit.id': [
        Object.assign(new MetadataValue(), {
          value: 'OrgUnit',
          authority: '2'
        })
      ],
      'person.identifier.orcid': [
        Object.assign(new MetadataValue(), {
          language: 'en_US',
          value: '0000-0001-8918-3592'
        })
      ],
      'dspace.orcid.authenticated': [
        Object.assign(new MetadataValue(), {
          language: null,
          value: 'authenticated'
        })
      ]
    },
    entityType: 'Person'
  });

  const testOrgunit = Object.assign(new Item(), {
    id: '2',
    bundles: of({}),
    metadata: {
      'dspace.entity.type': [
        Object.assign(new MetadataValue(), {
          value: 'OrgUnit'
        })
      ],
      'orgunit.person.id': [
        Object.assign(new MetadataValue(), {
          value: 'Person',
          authority: '1'
        })
      ],
    },
    entityType: 'OrgUnit'
  });

  const testMetadataValueWithoutAuthority = Object.assign(new MetadataValue(), {
    authority: null,
    confidence: -1,
    language: null,
    place: 0,
    uuid: '56e99d82-2cae-4cce-8d12-39899dea7c72',
    value: 'Università degli Studi di Milano Bicocca',
  });

  const testMetadataValueWithAuthority = Object.assign(new MetadataValue(), {
    authority: validAuthority,
    confidence: 600,
    language: null,
    place: 0,
    uuid: '56e99d82-2cae-4cce-8d12-39899dea7c72',
    value: 'Università degli Studi di Milano Bicocca',
  });

  itemService = jasmine.createSpyObj('ItemDataService', {
    findById: jasmine.createSpy('findById')
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbTooltipModule,
        RouterTestingModule
      ],
      declarations: [MetadataLinkViewComponent, EntityIconDirective, VarDirective],
      providers: [
        { provide: ItemDataService, useValue: itemService },
      ]
    })
      .compileComponents();
  }));

  describe('Check metadata without authority', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MetadataLinkViewComponent);
      itemService.findById.and.returnValue(createSuccessfulRemoteDataObject$(testOrgunit));
      component = fixture.componentInstance;
      component.item = testPerson;
      component.metadata = testMetadataValueWithoutAuthority;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render the span element', () => {
      const text = fixture.debugElement.query(By.css('[data-test="textWithoutIcon"]'));
      const link = fixture.debugElement.query(By.css('[data-test="linkToAuthority"]'));

      expect(text).toBeTruthy();
      expect(link).toBeNull();
    });

  });

  describe('Check metadata with authority', () => {
    describe('when item is found with orcid', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataLinkViewComponent);
        itemService.findById.and.returnValue(createSuccessfulRemoteDataObject$(testPerson));
        component = fixture.componentInstance;
        component.item = testPerson;
        component.metadata = testMetadataValueWithAuthority;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should render the link element', () => {
        const link = fixture.debugElement.query(By.css('[data-test="linkToAuthority"]'));

        expect(link).toBeTruthy();
      });

      it('should render the orcid icon', () => {
        const icon = fixture.debugElement.query(By.css('[data-test="orcidIcon"]'));

        expect(icon).toBeTruthy();
      });
    });

    describe('when item is found without orcid', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataLinkViewComponent);
        itemService.findById.and.returnValue(createSuccessfulRemoteDataObject$(testOrgunit));
        component = fixture.componentInstance;
        component.item = testPerson;
        component.metadata = testMetadataValueWithAuthority;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should render the link element', () => {
        const link = fixture.debugElement.query(By.css('[data-test="linkToAuthority"]'));

        expect(link).toBeTruthy();
      });

      it('should not render the orcid icon', () => {
        const icon = fixture.debugElement.query(By.css('[data-test="orcidIcon"]'));

        expect(icon).toBeFalsy();
      });
    });

    describe('when item is not found', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataLinkViewComponent);
        itemService.findById.and.returnValue(createFailedRemoteDataObject$());
        component = fixture.componentInstance;
        component.item = testPerson;
        component.metadata = testMetadataValueWithAuthority;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should render the span element', () => {
        const text = fixture.debugElement.query(By.css('[data-test="textWithIcon"]'));
        const link = fixture.debugElement.query(By.css('[data-test="linkToAuthority"]'));

        expect(text).toBeTruthy();
        expect(link).toBeNull();
      });
    });

    describe('when the referenced entity cannot be resolved from the cache', () => {
      // The cached lookup can stay pending forever when the NgRx cache was rehydrated from the SSR
      // transfer state in an unusable state. The component has to recover on its own instead of
      // leaving the field empty until the user navigates away and back.

      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataLinkViewComponent);
        itemService.findById.calls.reset();
        component = fixture.componentInstance;
        component.item = testPerson;
        component.metadata = testMetadataValueWithAuthority;
      });

      it('should render the value and its link straight away, without an icon', fakeAsync(() => {
        itemService.findById.and.returnValues(NEVER, createSuccessfulRemoteDataObject$(testOrgunit));
        fixture.detectChanges();

        const link = fixture.debugElement.query(By.css('[data-test="linkToAuthority"]'));
        expect(link).toBeTruthy();
        expect(link.nativeElement.textContent.trim()).toEqual(testMetadataValueWithAuthority.value);
        expect(link.query(By.css('i'))).toBeNull();

        tick(MetadataLinkViewComponent.CACHED_LOOKUP_TIMEOUT);
      }));

      it('should retry with the cache bypassed and render the icon', fakeAsync(() => {
        itemService.findById.and.returnValues(NEVER, createSuccessfulRemoteDataObject$(testOrgunit));
        fixture.detectChanges();

        tick(MetadataLinkViewComponent.CACHED_LOOKUP_TIMEOUT);
        fixture.detectChanges();

        expect(itemService.findById.calls.count()).toEqual(2);
        expect(itemService.findById.calls.argsFor(1)[1]).toBeFalse();
        expect(fixture.debugElement.query(By.css('[data-test="linkToAuthority"] i'))).toBeTruthy();
      }));

      it('should keep the value and its link when the retry does not resolve either', fakeAsync(() => {
        itemService.findById.and.returnValues(NEVER, NEVER);
        fixture.detectChanges();

        tick(MetadataLinkViewComponent.CACHED_LOOKUP_TIMEOUT + MetadataLinkViewComponent.UNCACHED_LOOKUP_TIMEOUT);
        fixture.detectChanges();

        const link = fixture.debugElement.query(By.css('[data-test="linkToAuthority"]'));
        expect(link).toBeTruthy();
        expect(link.nativeElement.textContent.trim()).toEqual(testMetadataValueWithAuthority.value);
        expect(link.query(By.css('i'))).toBeNull();
      }));
    });
  });

});
