export interface Params {
  [key: string | number]: string | number | null | number[] | string[]
}

export interface Body {
  [key: string | number]: string | number | null | number[] | string[] | boolean
}

export interface Headers {
  [key: string | number]: string | number | null
}
