export interface IdiscussionConfig {
  menuOptions?: Array<IMenuOptions>
  userName: string
  context?: Object
  categories: Icategory
  path?: string
  routerSlug?: string
  headerOptions?: boolean
  bannerOption?: boolean
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