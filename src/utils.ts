import queryString from 'query-string';
import route from 'path-match';

//regex
export const paramRegex = /\/(:([^/?]*)\??)/g;

//utils
export const mapObject = <T, V>(
  object: Record<string, T>,
  fn: (value: T, key: string) => { key: string; value: V }
): Record<string, V> => {
  return Object.keys(object).reduce((accum, objKey) => {
    const val = object[objKey];
    const { key, value } = fn(val, objKey);
    accum[key] = value;
    return accum;
  }, {});
};

export const getRegexMatches = (string, regexExpression, callback) => {
  let match;
  while ((match = regexExpression.exec(string)) !== null) {
    callback(match);
  }
};

export const replaceUrlParams = (path, params, queryParams = {}) => {
  const queryParamsString = queryString.stringify(queryParams).toString();
  const hasQueryParams = queryParamsString !== '';
  let newPath = path;

  getRegexMatches(path, paramRegex, ([_, paramKey, paramKeyWithoutColon]) => {
    const value = params[paramKeyWithoutColon];
    newPath = value
      ? newPath.replace(paramKey, value)
      : newPath.replace(`/${paramKey}`, '');
  });

  return `${newPath}${hasQueryParams ? `?${queryParamsString}` : ''}`;
};

/**
 * Parse the query params into an object.
 *
 * @param searchString The search string. For example, `foo=bar&bar=foo`.
 */
export function getQueryParams(searchString: string) {
  const params = new URLSearchParams(searchString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  });
  return result;
}

export type RouterHandler = (path: string, queryString: string) => boolean;

export type GoToHandler = (
  params: Record<string, string>,
  queryParams: Record<string, string>
) => void;

export type Matcher = (path: string) => Record<string, string> | false;

export const createRouter = (routes: {
  [path: string]: GoToHandler;
}): RouterHandler => {
  const matchers = Object.keys(routes).map((path): [Matcher, GoToHandler] => [
    route()(path),
    routes[path],
  ]);

  return (path: string, queryString: string) => {
    return matchers.some(([matcher, fn]) => {
      const params = matcher(path);
      if (params === false) return false;
      const queryParams = getQueryParams(queryString);
      fn(params, queryParams);
      return true;
    });
  };
};
