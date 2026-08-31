import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AnchorTagConverterDirective } from './anchor-tag-converter.directive';

@Component({
  template: `
    <div appAnchorTagConverter>
      <span data-test="value">{{ value }}</span>
      <a data-test="angularLink" [href]="href">{{ label }}</a>
    </div>
  `
})
class TestHostComponent {
  value = 'see <a href="https://example.org/docs">the docs</a> for more';
  href = '/items/some-uuid';
  label = 'An entity';
}

describe('AnchorTagConverterDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AnchorTagConverterDirective, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should turn an anchor stored as plain text into a real link', () => {
    const converted = fixture.debugElement.query(By.css('[data-test="value"] a'));

    expect(converted).toBeTruthy();
    expect(converted.nativeElement.getAttribute('href')).toEqual('https://example.org/docs');
    expect(converted.nativeElement.getAttribute('rel')).toEqual('noopener noreferrer');
    expect(converted.nativeElement.textContent).toEqual('the docs');
  });

  it('should keep the surrounding text', () => {
    const value = fixture.debugElement.query(By.css('[data-test="value"]'));

    expect(value.nativeElement.textContent).toEqual('see the docs for more');
  });

  it('should leave the elements Angular renders bound to their view', () => {
    // Rewriting the whole subtree through innerHTML replaces this anchor with an inert copy, so
    // every later update of the bindings below the directive stops reaching the document. Asserting
    // on the document itself is what makes that visible: fixture.debugElement walks Angular's own
    // view tree, which keeps pointing at the original nodes even once they are detached.
    fixture.componentInstance.label = 'Another entity';
    fixture.componentInstance.href = '/items/another-uuid';
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('[data-test="angularLink"]');

    expect(link).toBeTruthy();
    expect(link.textContent).toEqual('Another entity');
    expect(link.getAttribute('href')).toEqual('/items/another-uuid');
  });

  it('should not link an unsafe url', () => {
    const unsafe = TestBed.createComponent(TestHostComponent);
    // eslint-disable-next-line no-script-url
    unsafe.componentInstance.value = 'click <a href="javascript:alert(1)">here</a>';
    unsafe.detectChanges();

    const value = unsafe.debugElement.query(By.css('[data-test="value"]'));

    expect(value.query(By.css('a'))).toBeNull();
    expect(value.nativeElement.textContent).toEqual('click here');
  });
});
