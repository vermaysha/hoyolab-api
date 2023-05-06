/**
 * Represents the base type that can be used for properties in a request body,
 * request header, or request parameter.
 */
export type BaseType = {
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

/**
 * Represents the type that can be used for the body of a request.
 */
export type RequestBodyType = BaseType

/**
 * Represents the type that can be used for the headers of a request.
 */
export type RequestHeaderType = BaseType

/**
 * Represents the type that can be used for the parameters of a request.
 */
export type RequestParamType = BaseType

/**
 * Represents the interface for a response from the server.
 */
export interface IResponse {
  /**
   * The status code of the response.
   */
  retcode: number

  /**
   * A message associated with the response.
   */
  message: string

  /**
   * The data returned by the server.
   */
  data: unknown
}
