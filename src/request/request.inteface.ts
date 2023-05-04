type BaseType = {
  [x: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | string[]
    | number[]
    | never[]
}

export type RequestBodyType = BaseType
export type RequestHeaderType = BaseType
export type RequestParamType = BaseType

export interface IResponse {
  retcode: number
  message: string
  data: unknown
}
