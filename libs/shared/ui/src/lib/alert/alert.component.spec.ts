import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';

import { AlertComponent } from './alert.component';
import { AlertType } from './aletr-type';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { createTestComponent } from "../../../../../../src/app/shared/testing/utils.test";

describe('AlertComponent test suite', () => {

  let comp: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        AlertComponent,
      ],
      declarations: [
        TestComponent
      ],
      providers: [
        ChangeDetectorRef,
        AlertComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then();
  }));

  describe('', () => {
    let testFixture: ComponentFixture<TestComponent>;

    // synchronous beforeEach
    beforeEach(() => {
      const html = `
        <ds-alert [content]="content" [dismissible]="dismissible" [type]="type"></ds-alert>`;

      testFixture = createTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;
    });

    afterEach(() => {
      testFixture.destroy();
    });

    it('should create AlertComponent', inject([AlertComponent], (app: AlertComponent) => {

      expect(app).toBeDefined();
    }));
  });

  describe('', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AlertComponent);
      comp = fixture.componentInstance;
      comp.content = 'test alert';
      comp.dismissible = true;
      comp.type = AlertType.Info;
      fixture.detectChanges();
    });

    it('should display close icon when dismissible is true', () => {

      const btn = fixture.debugElement.query(By.css('.close'));
      expect(btn).toBeDefined();
    });

    it('should not display close icon when dismissible is false', () => {
      comp.dismissible = false;
      fixture.detectChanges();

      const btn = fixture.debugElement.query(By.css('.close'));
      expect(btn).toBeDefined();
    });

    it('should dismiss alert when click on close icon', () => {
      spyOn(comp, 'dismiss');
      const btn = fixture.debugElement.query(By.css('.close'));

      btn.nativeElement.click();

      expect(comp.dismiss).toHaveBeenCalled();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});

// declare a test component
@Component({
  selector: 'ds-test-cmp',
  template: ``
})
class TestComponent {

  content = 'test alert';
  dismissible = true;
  type = AlertType.Info;
}
