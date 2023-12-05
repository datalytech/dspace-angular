import {ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LDN_SERVICE} from '../ldn-services-model/ldn-service.resource-type';
import {ActivatedRoute, Router} from '@angular/router';
import {LdnServicesService} from '../ldn-services-data/ldn-services-data.service';
import {notifyPatterns} from '../ldn-services-patterns/ldn-service-coar-patterns';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsService} from '../../../shared/notifications/notifications.service';
import {TranslateService} from '@ngx-translate/core';
import {LdnService} from '../ldn-services-model/ldn-services.model';
import {RemoteData} from 'src/app/core/data/remote-data';
import {Operation} from 'fast-json-patch';
import {getFirstCompletedRemoteData} from '../../../core/shared/operators';
import {LdnItemfiltersService} from '../ldn-services-data/ldn-itemfilters-data.service';
import {Itemfilter} from '../ldn-services-model/ldn-service-itemfilters';
import {PaginatedList} from '../../../core/data/paginated-list.model';
import {Observable} from 'rxjs';
import {PaginationService} from '../../../core/pagination/pagination.service';
import {FindListOptions} from '../../../core/data/find-list-options.model';
import {PaginationComponentOptions} from '../../../shared/pagination/pagination-component-options.model';
import {NotifyServicePattern} from '../ldn-services-model/ldn-service-patterns.model';


/**
 * Component for editing LDN service through a form that allows to edit the properties of the selected service
 */
@Component({
  selector: 'ds-ldn-service-form-edit',
  templateUrl: './ldn-service-form-edit.component.html',
  styleUrls: ['./ldn-service-form-edit.component.scss'],
  animations: [
    trigger('toggleAnimation', [
      state('true', style({})),
      state('false', style({})),
      transition('true <=> false', animate('300ms ease-in')),
    ]),
  ],
})
export class LdnServiceFormEditComponent implements OnInit {
  formModel: FormGroup;
  @ViewChild('confirmModal', {static: true}) confirmModal: TemplateRef<any>;
  @ViewChild('resetFormModal', {static: true}) resetFormModal: TemplateRef<any>;

  public inboundPatterns: string[] = notifyPatterns;
  public outboundPatterns: string[] = notifyPatterns;
  itemfiltersRD$: Observable<RemoteData<PaginatedList<Itemfilter>>>;
  config: FindListOptions = Object.assign(new FindListOptions(), {
    elementsPerPage: 20
  });
  pageConfig: PaginationComponentOptions = Object.assign(new PaginationComponentOptions(), {
    id: 'po',
    pageSize: 20
  });
  @Input() public name: string;
  @Input() public description: string;
  @Input() public url: string;
  @Input() public ldnUrl: string;
  @Input() public score: number;
  @Input() public inboundPattern: string;
  @Input() public outboundPattern: string;
  @Input() public constraint: string;
  @Input() public automatic: boolean;
  @Input() public headerKey: string;
  markedForDeletionInboundPattern: number[] = [];
  markedForDeletionOutboundPattern: number[] = [];
  selectedOutboundPatterns: string[];
  selectedInboundItemfilters: string[];
  selectedOutboundItemfilters: string[];
  selectedInboundPatterns: string[];
  protected serviceId: string;
  private deletedInboundPatterns: number[] = [];
  private deletedOutboundPatterns: number[] = [];
  private modalRef: any;
  private service: LdnService;
  private selectPatternDefaultLabeli18Key = 'ldn-service.form.label.placeholder.default-select';

  constructor(
    protected ldnServicesService: LdnServicesService,
    private ldnItemfiltersService: LdnItemfiltersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    protected modalService: NgbModal,
    private notificationService: NotificationsService,
    private translateService: TranslateService,
    protected paginationService: PaginationService
  ) {

    this.formModel = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      ldnUrl: ['', Validators.required],
      score: ['', [Validators.required, Validators.pattern('^0*(\.[0-9]+)?$|^1(\.0+)?$')]], inboundPattern: [''],
      outboundPattern: [''],
      constraintPattern: [''],
      enabled: [''],
      notifyServiceInboundPatterns: this.formBuilder.array([this.createInboundPatternFormGroup()]),
      notifyServiceOutboundPatterns: this.formBuilder.array([this.createOutboundPatternFormGroup()]),
      type: LDN_SERVICE.value,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.serviceId = params.serviceId;
      if (this.serviceId) {
        this.fetchServiceData(this.serviceId);
      }
    });
    this.setItemfilters();
  }

  /**
   * Sets item filters using LDN item filters service
   */
  setItemfilters() {
    this.itemfiltersRD$ = this.ldnItemfiltersService.findAll().pipe(
      getFirstCompletedRemoteData());
  }

  /**
   * Fetches LDN service data by ID and updates the form
   * @param serviceId - The ID of the LDN service
   */
  fetchServiceData(serviceId: string): void {
    this.ldnServicesService.findById(serviceId).pipe(
      getFirstCompletedRemoteData()
    ).subscribe(
      (data: RemoteData<LdnService>) => {
        if (data.hasSucceeded) {
          this.service = data.payload;

          this.formModel.patchValue({
            id: this.service.id,
            name: this.service.name,
            description: this.service.description,
            url: this.service.url,
            score: this.service.score, ldnUrl: this.service.ldnUrl,
            type: this.service.type,
            enabled: this.service.enabled
          });
          this.filterPatternObjectsAndPickLabel('notifyServiceInboundPatterns', false);
          this.filterPatternObjectsAndPickLabel('notifyServiceOutboundPatterns', true);
        }
      },
    );
  }

  /**
   * Filters pattern objects, initializes form groups, assigns labels, and adds them to the specified form array so the correct string is shown in the dropdown..
   * @param formArrayName - The name of the form array to be populated
   * @param isOutbound - A boolean indicating whether the patterns are outbound (true) or inbound (false)
   */
  filterPatternObjectsAndPickLabel(formArrayName: string, isOutbound: boolean) {
    const PatternsArray = this.formModel.get(formArrayName) as FormArray;
    PatternsArray.clear();
    let servicesToUse;
    if (isOutbound) {
      servicesToUse = this.service.notifyServiceOutboundPatterns;
    } else {
      servicesToUse = this.service.notifyServiceInboundPatterns;
    }

    servicesToUse.forEach((patternObj: NotifyServicePattern) => {
      let patternFormGroup;
      if (isOutbound) {
        patternFormGroup = this.initializeOutboundPatternFormGroup();
      } else {
        patternFormGroup = this.initializeInboundPatternFormGroup();
      }
      const newPatternObjWithLabel = Object.assign(new NotifyServicePattern(), {
        ...patternObj,
        patternLabel: this.translateService.instant('ldn-service.form.pattern.' + patternObj?.pattern + '.label')
      });
      patternFormGroup.patchValue(newPatternObjWithLabel);

      PatternsArray.push(patternFormGroup);
      this.cdRef.detectChanges();
    });


  }

  /**
   * Generates an array of patch operations based on form changes
   * @returns Array of patch operations
   */
  generatePatchOperations(): any[] {
    const patchOperations: any[] = [];

    this.createReplaceOperation(patchOperations, 'name', '/name');
    this.createReplaceOperation(patchOperations, 'description', '/description');
    this.createReplaceOperation(patchOperations, 'ldnUrl', '/ldnurl');
    this.createReplaceOperation(patchOperations, 'url', '/url');
    this.createReplaceOperation(patchOperations, 'score', '/score');

    this.handlePatterns(patchOperations, 'notifyServiceInboundPatterns');
    this.handlePatterns(patchOperations, 'notifyServiceOutboundPatterns');


    this.deletedInboundPatterns.forEach(index => {
      const removeOperation: Operation = {
        op: 'remove',
        path: `notifyServiceInboundPatterns[${index}]`
      };
      patchOperations.push(removeOperation);
    });

    this.deletedOutboundPatterns.forEach(index => {
      const removeOperation: Operation = {
        op: 'remove',
        path: `notifyServiceOutboundPatterns[${index}]`
      };
      patchOperations.push(removeOperation);
    });

    return patchOperations;
  }

  /**
   * Submits the form by opening the confirmation modal
   */
  onSubmit() {
    this.openConfirmModal(this.confirmModal);
  }

  /**
   * Adds a new inbound pattern form group to the array of inbound patterns in the form
   */
  addInboundPattern() {
    const notifyServiceInboundPatternsArray = this.formModel.get('notifyServiceInboundPatterns') as FormArray;
    notifyServiceInboundPatternsArray.push(this.createInboundPatternFormGroup());
  }

  /**
   * Adds a new outbound pattern form group to the array of outbound patterns in the form
   */
  addOutboundPattern() {
    const notifyServiceOutboundPatternsArray = this.formModel.get('notifyServiceOutboundPatterns') as FormArray;
    notifyServiceOutboundPatternsArray.push(this.createOutboundPatternFormGroup());
  }

  /**
   * Selects an outbound pattern by updating its values based on the provided pattern value and index
   * @param patternValue - The selected pattern value
   * @param index - The index of the outbound pattern in the array
   */
  selectOutboundPattern(patternValue: string, index: number): void {
    const patternArray = (this.formModel.get('notifyServiceOutboundPatterns') as FormArray);
    patternArray.controls[index].patchValue({pattern: patternValue});
    patternArray.controls[index].patchValue({patternLabel: this.translateService.instant('ldn-service.form.pattern.' + patternValue + '.label')});

  }

  /**
   * Selects an outbound item filter by updating its value based on the provided filter value and index
   * @param filterValue - The selected filter value
   * @param index - The index of the inbound pattern in the array
   */
  selectOutboundItemFilter(filterValue: string, index: number) {
    const filterArray = (this.formModel.get('notifyServiceOutboundPatterns') as FormArray);
    filterArray.controls[index].patchValue({constraint: filterValue});
  }

  /**
   * Selects an inbound pattern by updating its values based on the provided pattern value and index
   * @param patternValue - The selected pattern value
   * @param index - The index of the inbound pattern in the array
   */
  selectInboundPattern(patternValue: string, index: number): void {
    const patternArray = (this.formModel.get('notifyServiceInboundPatterns') as FormArray);
    patternArray.controls[index].patchValue({pattern: patternValue});
    patternArray.controls[index].patchValue({patternLabel: this.translateService.instant('ldn-service.form.pattern.' + patternValue + '.label')});
  }

  /**
   * Selects an inbound item filter by updating its value based on the provided filter value and index
   * @param filterValue - The selected filter value
   * @param index - The index of the inbound pattern in the array
   */
  selectInboundItemFilter(filterValue: string, index: number): void {
    const filterArray = (this.formModel.get('notifyServiceInboundPatterns') as FormArray);
    filterArray.controls[index].patchValue({constraint: filterValue});
  }

  /**
   * Toggles the automatic property of an inbound pattern at the specified index
   * @param i - The index of the inbound pattern in the array
   */
  toggleAutomatic(i: number) {
    const automaticControl = this.formModel.get(`notifyServiceInboundPatterns.${i}.automatic`);
    if (automaticControl) {
      automaticControl.markAsTouched();
      automaticControl.setValue(!automaticControl.value);
    }
  }

  /**
   * Toggles the enabled status of the LDN service by sending a patch request
   */
  toggleEnabled() {
    const newStatus = !this.formModel.get('enabled').value;

    const patchOperation: Operation = {
      op: 'replace',
      path: '/enabled',
      value: newStatus,
    };

    this.ldnServicesService.patch(this.service, [patchOperation]).pipe(
      getFirstCompletedRemoteData()
    ).subscribe(
      () => {

        this.formModel.get('enabled').setValue(newStatus);
        this.cdRef.detectChanges();
      }
    );
  }

  /**
   * Closes the modal
   */
  closeModal() {
    this.modalRef.close();
    this.cdRef.detectChanges();
  }

  /**
   * Opens a confirmation modal with the specified content
   * @param content - The content to be displayed in the modal
   */
  openConfirmModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  /**
   * Opens a reset form modal with the specified content
   * @param content - The content to be displayed in the modal
   */
  openResetFormModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  /**
   * Patches the LDN service by retrieving and sending patch operations geenrated in generatePatchOperations()
   */
  patchService() {
    this.deleteMarkedInboundPatterns();
    this.deleteMarkedOutboundPatterns();

    const patchOperations = this.generatePatchOperations();
    this.formModel.markAllAsTouched();

    // If the form is invalid, close the modal and return
    if (this.formModel.invalid) {
      this.closeModal();
      return;
    }

    const notifyServiceOutboundPatterns = this.formModel.get('notifyServiceOutboundPatterns') as FormArray;
    const notifyServiceInboundPatterns = this.formModel.get('notifyServiceInboundPatterns') as FormArray;
    // If no inbound or outbound patterns are specified, close the modal and return
    // noify the user that no patterns are specified
    if (
      (notifyServiceOutboundPatterns.length === 0 && !notifyServiceOutboundPatterns[0]?.value) ||
      (notifyServiceInboundPatterns.length === 0 && !notifyServiceInboundPatterns[0]?.value)) {
      this.notificationService.warning(this.translateService.get('ldn-service-notification.created.warning.title'));
      this.closeModal();
      return;
    }

    this.ldnServicesService.patch(this.service, patchOperations).pipe(
      getFirstCompletedRemoteData()
    ).subscribe(
      (rd: RemoteData<LdnService>) => {
        if (rd.hasSucceeded) {
          this.closeModal();
          this.sendBack();
          this.notificationService.success(this.translateService.get('admin.registries.services-formats.modify.success.head'),
            this.translateService.get('admin.registries.services-formats.modify.success.content'));
        } else {
          this.notificationService.error(this.translateService.get('admin.registries.services-formats.modify.failure.head'),
            this.translateService.get('admin.registries.services-formats.modify.failure.content'));
          this.closeModal();
        }
      });
  }

  /**
   * Resets the form and navigates back to the LDN services page
   */
  resetFormAndLeave() {
    this.sendBack();
    this.closeModal();
  }

  /**
   * Marks the specified inbound pattern for deletion
   * @param index - The index of the inbound pattern in the array
   */
  markForInboundPatternDeletion(index: number) {
    if (!this.markedForDeletionInboundPattern.includes(index)) {
      this.markedForDeletionInboundPattern.push(index);
    }
  }

  /**
   * Unmarks the specified inbound pattern for deletion
   * @param index - The index of the inbound pattern in the array
   */
  unmarkForInboundPatternDeletion(index: number) {
    const i = this.markedForDeletionInboundPattern.indexOf(index);
    if (i !== -1) {
      this.markedForDeletionInboundPattern.splice(i, 1);
    }
  }

  /**
   * Marks the specified outbound pattern for deletion
   * @param index - The index of the outbound pattern in the array
   */
  markForOutboundPatternDeletion(index: number) {
    if (!this.markedForDeletionOutboundPattern.includes(index)) {
      this.markedForDeletionOutboundPattern.push(index);
    }
  }

  /**
   * Unmarks the specified outbound pattern for deletion
   * @param index - The index of the outbound pattern in the array
   */
  unmarkForOutboundPatternDeletion(index: number) {
    const i = this.markedForDeletionOutboundPattern.indexOf(index);
    if (i !== -1) {
      this.markedForDeletionOutboundPattern.splice(i, 1);
    }
  }

  /**
   * Deletes marked inbound patterns from the form model
   */
  deleteMarkedInboundPatterns() {
    this.markedForDeletionInboundPattern.sort((a, b) => b - a);
    const patternsArray = this.formModel.get('notifyServiceInboundPatterns') as FormArray;

    for (const index of this.markedForDeletionInboundPattern) {
      if (index >= 0 && index < patternsArray.length) {
        const patternGroup = patternsArray.at(index) as FormGroup;
        const patternValue = patternGroup.value;
        if (patternValue.isNew) {
          patternsArray.removeAt(index);
        } else {
          this.deletedInboundPatterns.push(index);
        }
      }
    }

    this.markedForDeletionInboundPattern = [];
  }

  /**
   * Deletes marked outbound patterns from the form model
   */
  deleteMarkedOutboundPatterns() {
    this.markedForDeletionOutboundPattern.sort((a, b) => b - a);
    const patternsArray = this.formModel.get('notifyServiceOutboundPatterns') as FormArray;

    for (const index of this.markedForDeletionOutboundPattern) {
      if (index >= 0 && index < patternsArray.length) {
        const patternGroup = patternsArray.at(index) as FormGroup;
        const patternValue = patternGroup.value;
        if (patternValue.isNew) {
          patternsArray.removeAt(index);
        } else {

          this.deletedOutboundPatterns.push(index);
        }
      }
    }

    this.markedForDeletionOutboundPattern = [];
  }

  /**
   * Creates a replace operation and adds it to the patch operations if the form control is dirty
   * @param patchOperations - The array to store patch operations
   * @param formControlName - The name of the form control
   * @param path - The JSON Patch path for the operation
   */
  private createReplaceOperation(patchOperations: any[], formControlName: string, path: string): void {
    if (this.formModel.get(formControlName).dirty) {
      patchOperations.push({
        op: 'replace',
        path,
        value: this.formModel.get(formControlName).value.toString(),
      });
    }
  }

  /**
   * Handles patterns in the form array, checking if an add or replace operations is required
   * @param patchOperations - The array to store patch operations
   * @param formArrayName - The name of the form array
   */
  private handlePatterns(patchOperations: any[], formArrayName: string): void {
    const patternsArray = this.formModel.get(formArrayName) as FormArray;

    for (let i = 0; i < patternsArray.length; i++) {
      const patternGroup = patternsArray.at(i) as FormGroup;

      const patternValue = patternGroup.value;
      if (patternGroup.touched && patternGroup.valid) {
        delete patternValue?.patternLabel;
        if (patternValue.isNew) {
          delete patternValue.isNew;
          const addOperation = {
            op: 'add',
            path: `${formArrayName}/-`,
            value: patternValue,
          };
          patchOperations.push(addOperation);
        } else {
          const replaceOperation = {
            op: 'replace',
            path: `${formArrayName}[${i}]`,
            value: patternValue,
          };
          patchOperations.push(replaceOperation);
        }
      }
    }
  }

  /**
   * Navigates back to the LDN services page
   */
  private sendBack() {
    this.router.navigateByUrl('admin/ldn/services');
  }

  /**
   * Creates a form group for outbound patterns
   * @returns The form group for outbound patterns
   */
  private createOutboundPatternFormGroup(): FormGroup {
    return this.formBuilder.group({
      pattern: '',
      patternLabel: this.translateService.instant(this.selectPatternDefaultLabeli18Key),
      constraint: '',
      isNew: true,
    });
  }

  /**
   * Creates a form group for inbound patterns
   * @returns The form group for inbound patterns
   */
  private createInboundPatternFormGroup(): FormGroup {
    return this.formBuilder.group({
      pattern: '',
      patternLabel: this.translateService.instant(this.selectPatternDefaultLabeli18Key),
      constraint: '',
      automatic: false,
      isNew: true
    });
  }

  /**
   * Initializes an existing form group for outbound patterns
   * @returns The initialized form group for outbound patterns
   */
  private initializeOutboundPatternFormGroup(): FormGroup {
    return this.formBuilder.group({
      pattern: '',
      patternLabel: '',
      constraint: '',
    });
  }

  /**
   * Initializes an existing form group for inbound patterns
   * @returns The initialized form group for inbound patterns
   */
  private initializeInboundPatternFormGroup(): FormGroup {
    return this.formBuilder.group({
      pattern: '',
      patternLabel: '',
      constraint: '',
      automatic: '',
    });
  }
}