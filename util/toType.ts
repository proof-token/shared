function toType<T> (arg: any): T {
  return arg as unknown as T
}

export default toType
