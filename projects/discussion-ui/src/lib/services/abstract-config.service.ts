import { IdiscussionConfig } from '../models/discussion-config.model';

export abstract class AbstractConfigService {

    abstract getConfig(key): any

  }