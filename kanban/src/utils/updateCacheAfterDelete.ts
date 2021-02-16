import { ApolloCache, FetchResult } from "@apollo/client";

const updateCacheAfterDelete = (cache: ApolloCache<Record<string, any>>, results: FetchResult) => update(cache, results)

export default updateCacheAfterDelete

export function update<TData = Record<string, any>>(
  cache: ApolloCache<TData>,
  results: FetchResult<TData, Record<string, any>, Record<string, any>>
){
  const data: { [key: string]: any } = results?.data || {};
  for (const [,m] of Object.entries(data)) {
    for (const [,r] of Object.entries(m)) {
      if (Array.isArray(r)) {
        r.forEach((i) => {
          const id = cache.identify(i);
          cache.evict({ id });
        });
      }
    }
  }
  cache.gc();
}