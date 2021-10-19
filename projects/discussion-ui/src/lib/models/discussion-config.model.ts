export interface IdiscussionConfig {
    menuOptions?: Array<IMenuOptions>
    userName?: string;
    context?: Object;
    categories: Icategory;
    path?: string;
    routerSlug?: string;
    userId: number;
    headerOptions?: boolean
    bannerOption?: boolean
    defaultLandingPage?: string
  }
  
  export interface Icontext {
   id: number
  }
  
  export interface IMenuOptions {
    route: string
    enable: boolean
  }

export interface IDiscussionAllContext {
  contextIdArr: Array<number>
  contextType: string
  categoryObj: ICategoryObj
}

export interface ICategoryObj{
    name: string,
    pid: string,
    description: string,
    context: Array<ICourseContext>
}

export interface ICourseContext{
  type: string
  identifier: string
}

export interface IMenuOptions {
  route: string
  enable: boolean
}

export interface Icategory {
  result: Array<string>
}