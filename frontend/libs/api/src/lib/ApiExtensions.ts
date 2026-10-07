/** Provider extensions handle their own assets; official auth/billing stay independent. */
export type ApiExtension = (request: { url: URL; method: string; body?: unknown }, original: () => Promise<any>) => Promise<any>;
let extension: ApiExtension | undefined;
export const registerApiExtension = (handler: ApiExtension) => { extension = handler; };
export const withApiExtension = (request: Parameters<ApiExtension>[0], original: () => Promise<any>) =>
  extension ? extension(request, original) : original();
