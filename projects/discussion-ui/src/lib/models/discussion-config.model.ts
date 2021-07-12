export interface IdiscussionConfig {
    menuOptions?: Array<IMenuOptions>
    userName?: string;
    context?: Object;
    categories: Icategory;
    path?: string;
    routerSlug?: string;
    userId: number;
  }
  
  export interface Icontext {
   id: number
  }
  
  export interface IMenuOptions {
    route: string
    enable: boolean
  }

  export interface Icategory {
    result : Array<string>
  }
  