import { QualityAssuranceSourceEffects } from './qa/source/quality-assurance-source.effects';
import { QualityAssuranceTopicsEffects } from './qa/topics/quality-assurance-topics.effects';
import {SuggestionTargetsEffects} from './reciter-suggestions/suggestion-targets/suggestion-targets.effects';

export const suggestionNotificationsEffects = [
  QualityAssuranceTopicsEffects,
  QualityAssuranceSourceEffects,
  SuggestionTargetsEffects
];