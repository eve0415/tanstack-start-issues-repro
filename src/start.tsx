import { createMiddleware, createStart } from '@tanstack/react-start';

export const requestMiddleware = createMiddleware().server(({ next, context }) => {
  // type context: {fromFetch: boolean;}
  // actual: {fromFetch: true}
  // expect: {fromFetch: true}
  console.log('[requestMiddleware] context', context);

  return next({ context: { fromRequestMiddleware: true } });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [requestMiddleware],
}));

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: {
        fromFetch: boolean;
      };
    };
  }
}
