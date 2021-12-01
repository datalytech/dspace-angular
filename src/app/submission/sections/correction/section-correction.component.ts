import { Component, Inject } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';

import { renderSectionFor } from '../sections-decorator';
import { SectionsType } from '../sections-type';
import { SectionModelComponent } from '../models/section.model';
import { SectionDataObject } from '../models/section-data.model';
import { SectionsService } from '../sections.service';
import { RoleType } from '../../../core/roles/role-types';
import {
  OperationType,
  WorkspaceitemSectionCorrectionBitstreamObject,
  WorkspaceitemSectionCorrectionMetadataObject,
  WorkspaceitemSectionCorrectionObject
} from '../../../core/submission/models/workspaceitem-section-correction.model';

@Component({
  selector: 'ds-submission-correction',
  templateUrl: './section-correction.component.html'
})
@renderSectionFor(SectionsType.Correction)
export class SubmissionSectionCorrectionComponent extends SectionModelComponent {

  public roleTypeEnum = RoleType;
  public operationType = OperationType;

  constructor(protected sectionService: SectionsService,
              @Inject('collectionIdProvider') public injectedCollectionId: string,
              @Inject('sectionDataProvider') public injectedSectionData: SectionDataObject,
              @Inject('submissionIdProvider') public injectedSubmissionId: string) {
    super(injectedCollectionId, injectedSectionData, injectedSubmissionId);
  }

  protected getSectionStatus(): Observable<boolean> {
    return observableOf(true);
  }

  getItemData(): WorkspaceitemSectionCorrectionMetadataObject[] {
    const correctionObject: WorkspaceitemSectionCorrectionObject =  this.sectionData.data as WorkspaceitemSectionCorrectionObject;
    return correctionObject.metadata;
  }

  getFileData(): WorkspaceitemSectionCorrectionBitstreamObject[] {
    const correctionObject: WorkspaceitemSectionCorrectionObject =  this.sectionData.data as WorkspaceitemSectionCorrectionObject;
    return correctionObject.bitstream
      .sort((obj1: WorkspaceitemSectionCorrectionBitstreamObject, obj2: WorkspaceitemSectionCorrectionBitstreamObject) => {
        return obj1.filename > obj2.filename ? 1 : -1;
      }
    );
  }

  getFileOperationLabel(operation: OperationType): string {
    let label = '';
    switch (operation) {
      case OperationType.ADD:
        label = 'submission.sections.correction.bitstream.operation.add';
        break;
      case OperationType.REMOVE:
        label = 'submission.sections.correction.bitstream.operation.remove';
        break;
      case OperationType.MODIFY:
        label = 'submission.sections.correction.bitstream.operation.modify';
        break;
    }

    return label;
  }

  sortMetadataByLabel(metadata: WorkspaceitemSectionCorrectionMetadataObject[]): WorkspaceitemSectionCorrectionMetadataObject[] {
    return metadata.sort((obj1: WorkspaceitemSectionCorrectionMetadataObject, obj2: WorkspaceitemSectionCorrectionMetadataObject) => {
      return obj1.label > obj2.label ? 1 : -1;
    });
  }

  showTable(): boolean {
    return Object.values(this.sectionData.data).length > 0;
  }

  /* tslint:disable:no-empty */
  protected onSectionDestroy() {
  }

  /* tslint:disable:no-empty */
  protected onSectionInit(): void {
  }

}
