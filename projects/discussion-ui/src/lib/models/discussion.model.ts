export interface IdiscussionConfig {
    menuOptions?: Array<IMenuOptions>
    userName: string
    context: Object
    categories: any
}

export interface Icontext {
   id: number
}

export interface IMenuOptions {
    route: string
    enable: boolean
}