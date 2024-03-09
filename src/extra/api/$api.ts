import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1l17dp7 } from './todos';
import type { Methods as Methods_1614r9x } from './todos/_id@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/todos';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    todos: {
      _id: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1614r9x['delete']['resBody']>(prefix, prefix1, DELETE, option).json(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1614r9x['delete']['resBody']>(prefix, prefix1, DELETE, option).json().then(r => r.body),
          patch: (option: { body: Methods_1614r9x['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1614r9x['patch']['resBody']>(prefix, prefix1, PATCH, option).json(),
          $patch: (option: { body: Methods_1614r9x['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1614r9x['patch']['resBody']>(prefix, prefix1, PATCH, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_1l17dp7['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_1l17dp7['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { query?: Methods_1l17dp7['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_1l17dp7['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1l17dp7['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1l17dp7['post']['resBody']>(prefix, PATH0, POST, option).json(),
      $post: (option: { body: Methods_1l17dp7['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1l17dp7['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1l17dp7['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
