export interface IdiscussionConfig {
    menuOptions?: Array<IMenuOptions>
    userName: string
    context: Object
    categories: Array<string>
    path: string
    routerSlug: string
  }
  
  export interface Icontext {
   id: number
  }
  
  export interface IMenuOptions {
    route: string
    enable: boolean
  }
  