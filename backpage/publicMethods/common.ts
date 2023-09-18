export const awaitWraper = async <T>(promise: Promise<T>) => {
  return promise.then((res) => [null, res] as const).catch((err) => [err as { code: number; message: string }, null] as const)
}
