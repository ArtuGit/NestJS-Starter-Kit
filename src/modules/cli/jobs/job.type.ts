export type Job = {
  run: (...args: any[]) => Promise<void>
}
