export type RouteType = {
  id: String;
  path: String;
  extra?: Object;
};

export interface RoutesType {
  [propertyName: string]: RouteType;
}

export type RouterStateType = {
  routeId: String;
  path: String;
  params: Object;
  queryParams: Object;
  extra?: Object
  options?: Object
}

export type RouterContextType = RouterStateType & {
  goTo: (route: RouteType, params?: Object, queryParams?: Object) => void;
  isRoute: (route: RouteType) => boolean;
  currentUrl: string;
};
