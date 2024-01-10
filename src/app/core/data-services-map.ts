import { AUTHORIZATION } from './shared/authorization.resource-type';
import { BROWSE_DEFINITION } from './shared/browse-definition.resource-type';
import {
  BULK_ACCESS_CONDITION_OPTIONS,
  SUBMISSION_ACCESSES_TYPE,
  SUBMISSION_FORMS_TYPE,
  SUBMISSION_UPLOADS_TYPE
} from './config/models/config-type';
import { METADATA_SCHEMA } from './metadata/metadata-schema.resource-type';
import { BITSTREAM } from './shared/bitstream.resource-type';
import { USAGE_REPORT } from './statistics/models/usage-report.resource-type';
import { COLLECTION } from './shared/collection.resource-type';
import { CLAIMED_TASK } from './tasks/models/claimed-task-object.resource-type';
import {
  VOCABULARY,
  VOCABULARY_ENTRY,
  VOCABULARY_ENTRY_DETAIL
} from './submission/vocabularies/models/vocabularies.resource-type';
import { ITEM_TYPE } from './shared/item-relationships/item-type.resource-type';
import { LICENSE } from './shared/license.resource-type';
import { COMMUNITY } from './shared/community.resource-type';
import { BUNDLE } from './shared/bundle.resource-type';
import { CONFIG_PROPERTY } from './shared/config-property.resource-type';
import { POOL_TASK } from './tasks/models/pool-task-object.resource-type';
import { SUPERVISION_ORDER } from './supervision-order/models/supervision-order.resource-type';
import { WorkspaceItem } from './submission/models/workspaceitem.model';
import { WorkflowItem } from './submission/models/workflowitem.model';
import { SUBMISSION_CC_LICENSE_URL } from './submission/models/submission-cc-licence-link.resource-type';
import { SUBMISSION_CC_LICENSE } from './submission/models/submission-cc-licence.resource-type';
import { RESOURCE_POLICY } from './resource-policy/models/resource-policy.resource-type';
import { RESEARCHER_PROFILE } from './profile/model/researcher-profile.resource-type';
import { ORCID_QUEUE } from './orcid/model/orcid-queue.resource-type';
import { ORCID_HISTORY } from './orcid/model/orcid-history.resource-type';
import { FEEDBACK } from './feedback/models/feedback.resource-type';
import { GROUP } from './eperson/models/group.resource-type';
import { EPERSON } from './eperson/models/eperson.resource-type';
import { WORKFLOW_ACTION } from './tasks/models/workflow-action-object.resource-type';
import { VERSION_HISTORY } from './shared/version-history.resource-type';
import { SITE } from './shared/site.resource-type';
import { ROOT } from './data/root.resource-type';
import { RELATIONSHIP_TYPE } from './shared/item-relationships/relationship-type.resource-type';
import { RELATIONSHIP } from './shared/item-relationships/relationship.resource-type';
import { METADATA_FIELD } from './metadata/metadata-field.resource-type';
import { ITEM } from './shared/item.resource-type';
import { VERSION } from './shared/version.resource-type';
import { FEATURE } from './shared/feature.resource-type';
import { DSPACE_OBJECT } from './shared/dspace-object.resource-type';
import { BITSTREAM_FORMAT } from './shared/bitstream-format.resource-type';
import { Type } from '@angular/core';
import { HALDataService } from './data/base/hal-data-service.interface';
import { SYSTEMWIDEALERT } from '../system-wide-alert/system-wide-alert.resource-type';
import {
  ACCESS_STATUS
} from '../shared/object-collection/shared/badges/access-status-badge/access-status.resource-type';
import { SUBSCRIPTION } from '../shared/subscriptions/models/subscription.resource-type';
import { SCRIPT } from '../process-page/scripts/script.resource-type';
import { PROCESS } from '../process-page/processes/process.resource-type';
import { IDENTIFIERS } from '../shared/object-list/identifier-data/identifier-data.resource-type';

export const LAZY_DATA_SERVICES: {[key: string]: () => Promise<Type<HALDataService<any>>>} = {
  [AUTHORIZATION.value]: () => import('./data/feature-authorization/authorization-data.service').then(m => m.AuthorizationDataService),
  [BROWSE_DEFINITION.value]: () => import('./browse/browse-definition-data.service').then(m => m.BrowseDefinitionDataService),
  [BULK_ACCESS_CONDITION_OPTIONS.value]: () => import('./config/bulk-access-config-data.service').then(m => m.BulkAccessConfigDataService),
  [METADATA_SCHEMA.value]: () => import('./data/metadata-schema-data.service').then(m => m.MetadataSchemaDataService),
  [SUBMISSION_UPLOADS_TYPE.value]: () => import('./config/submission-uploads-config-data.service').then(m => m.SubmissionUploadsConfigDataService),
  [BITSTREAM.value]: () => import('./data/bitstream-data.service').then(m => m.BitstreamDataService),
  [SUBMISSION_ACCESSES_TYPE.value]: () => import('./config/submission-accesses-config-data.service').then(m => m.SubmissionAccessesConfigDataService),
  [SYSTEMWIDEALERT.value]: () => import('./data/system-wide-alert-data.service').then(m => m.SystemWideAlertDataService),
  [USAGE_REPORT.value]: () => import('./statistics/usage-report-data.service').then(m => m.UsageReportDataService),
  [ACCESS_STATUS.value]: () => import('./data/access-status-data.service').then(m => m.AccessStatusDataService),
  [COLLECTION.value]: () => import('./data/collection-data.service').then(m => m.CollectionDataService),
  [CLAIMED_TASK.value]: () => import('./tasks/claimed-task-data.service').then(m => m.ClaimedTaskDataService),
  [VOCABULARY_ENTRY.value]: () => import('./data/href-only-data.service').then(m => m.HrefOnlyDataService),
  [ITEM_TYPE.value]: () => import('./data/href-only-data.service').then(m => m.HrefOnlyDataService),
  [LICENSE.value]: () => import('./data/href-only-data.service').then(m => m.HrefOnlyDataService),
  [SUBSCRIPTION.value]: () => import('../shared/subscriptions/subscriptions-data.service').then(m => m.SubscriptionsDataService),
  [COMMUNITY.value]: () => import('./data/community-data.service').then(m => m.CommunityDataService),
  [VOCABULARY.value]: () => import('./submission/vocabularies/vocabulary.data.service').then(m => m.VocabularyDataService),
  [BUNDLE.value]: () => import('./data/bundle-data.service').then(m => m.BundleDataService),
  [CONFIG_PROPERTY.value]: () => import('./data/configuration-data.service').then(m => m.ConfigurationDataService),
  [POOL_TASK.value]: () => import('./tasks/pool-task-data.service').then(m => m.PoolTaskDataService),
  [CLAIMED_TASK.value]: () => import('./tasks/claimed-task-data.service').then(m => m.ClaimedTaskDataService),
  [SUPERVISION_ORDER.value]: () => import('./supervision-order/supervision-order-data.service').then(m => m.SupervisionOrderDataService),
  [WorkspaceItem.type.value]: () => import('./submission/workspaceitem-data.service').then(m => m.WorkspaceitemDataService),
  [WorkflowItem.type.value]: () => import('./submission/workflowitem-data.service').then(m => m.WorkflowItemDataService),
  [VOCABULARY.value]: () => import('./submission/vocabularies/vocabulary.data.service').then(m => m.VocabularyDataService),
  [VOCABULARY_ENTRY_DETAIL.value]: () => import('./submission/vocabularies/vocabulary-entry-details.data.service').then(m => m.VocabularyEntryDetailsDataService),
  [SUBMISSION_CC_LICENSE_URL.value]: () => import('./submission/submission-cc-license-url-data.service').then(m => m.SubmissionCcLicenseUrlDataService),
  [SUBMISSION_CC_LICENSE.value]: () => import('./submission/submission-cc-license-data.service').then(m => m.SubmissionCcLicenseDataService),
  [USAGE_REPORT.value]: () => import('./statistics/usage-report-data.service').then(m => m.UsageReportDataService),
  [RESOURCE_POLICY.value]: () => import('./resource-policy/resource-policy-data.service').then(m => m.ResourcePolicyDataService),
  [RESEARCHER_PROFILE.value]: () => import('./profile/researcher-profile-data.service').then(m => m.ResearcherProfileDataService),
  [ORCID_QUEUE.value]: () => import('./orcid/orcid-queue-data.service').then(m => m.OrcidQueueDataService),
  [ORCID_HISTORY.value]: () => import('./orcid/orcid-history-data.service').then(m => m.OrcidHistoryDataService),
  [FEEDBACK.value]: () => import('./feedback/feedback-data.service').then(m => m.FeedbackDataService),
  [GROUP.value]: () => import('./eperson/group-data.service').then(m => m.GroupDataService),
  [EPERSON.value]: () => import('./eperson/eperson-data.service').then(m => m.EPersonDataService),
  [WORKFLOW_ACTION.value]: () => import('./data/workflow-action-data.service').then(m => m.WorkflowActionDataService),
  [VERSION_HISTORY.value]: () => import('./data/version-history-data.service').then(m => m.VersionHistoryDataService),
  [SITE.value]: () => import('./data/site-data.service').then(m => m.SiteDataService),
  [ROOT.value]: () => import('./data/root-data.service').then(m => m.RootDataService),
  [RELATIONSHIP_TYPE.value]: () => import('./data/relationship-type-data.service').then(m => m.RelationshipTypeDataService),
  [RELATIONSHIP.value]: () => import('./data/relationship-data.service').then(m => m.RelationshipDataService),
  [SCRIPT.value]: () => import('./data/processes/script-data.service').then(m => m.ScriptDataService),
  [PROCESS.value]: () => import('./data/processes/process-data.service').then(m => m.ProcessDataService),
  [METADATA_FIELD.value]: () => import('./data/metadata-field-data.service').then(m => m.MetadataFieldDataService),
  [ITEM.value]: () => import('./data/item-data.service').then(m => m.ItemDataService),
  [VERSION.value]: () => import('./data/version-data.service').then(m => m.VersionDataService),
  [IDENTIFIERS.value]: () => import('./data/identifier-data.service').then(m => m.IdentifierDataService),
  [FEATURE.value]: () => import('./data/feature-authorization/authorization-data.service').then(m => m.AuthorizationDataService),
  [DSPACE_OBJECT.value]: () => import('./data/dspace-object-data.service').then(m => m.DSpaceObjectDataService),
  [BITSTREAM_FORMAT.value]: () => import('./data/bitstream-format-data.service').then(m => m.BitstreamFormatDataService),
  [SUBMISSION_FORMS_TYPE.value]: () => import('./config/submission-forms-config-data.service').then(m => m.SubmissionFormsConfigDataService),
};

