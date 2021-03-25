import { IdiscussionConfig } from '../models/discussion-config.model';

export abstract class AbstractConfigService {

    abstract config: IdiscussionConfig

    abstract getConfig(key): any
  
  }