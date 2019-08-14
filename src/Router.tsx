import React, { useEffect, useState, useRef } from 'react';
import { replaceUrlParams, createRouter } from './utils';
import { mapObject } from './utils';
import { RouterContext } from './router-context';
import { RouterStateType, RouteType, RoutesType } from './types';

export const Router: React.FC<{ routes: RoutesType }> = ({
  children,
  routes,
}) => {
  const [state, setState] = useState<RouterStateType>({
    routeId: '',
    path: '/',
    params: {},
    queryParams: {},
    extra: {},
    options: {},
  });

  const router = useRef<any>(null);

  const currentUrl: string = replaceUrlParams(
    state.path,
    state.params,
    state.queryParams
  );

  useEffect(() => {
    //create a router from the routes object
    router.current = createRouter(
      mapObject(routes, route => {
        return {
          key: route.path,
          value: params => {
            goTo(route, params);
          },
        };
      })
    );

    //initial location
    router.current(window.location.pathname);

    //on change route
    window.onpopstate = ev => {
      if (ev.type === 'popstate') {
        router.current(window.location.pathname);
      }
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname !== currentUrl) {
      window.history.pushState(null, null, currentUrl);
    }
  }, [currentUrl]);

  const goTo = (
    route: RouteType,
    params = {},
    queryParams = {},
    extra = {}
  ) => {
    const { id, path, extra: routeExtra } = route;
    setState({
      ...state,
      routeId: id,
      path,
      params,
      queryParams,
      extra: { ...routeExtra, ...extra },
    });
  };

  const isRoute = route => route.id === state.routeId;

  return (
    <RouterContext.Provider
      value={{
        ...state,
        currentUrl,
        goTo,
        isRoute,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};
