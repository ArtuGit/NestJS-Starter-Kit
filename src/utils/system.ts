export const createTimeoutTask = (cb: () => any, delay: number) => {
  const id = setTimeout(cb, delay) as any
  return id[Symbol.toPrimitive]() as number
}
