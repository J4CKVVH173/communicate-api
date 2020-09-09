/**
 * Class with helpful methods to configure the session.
 */
export default class Utils {
  /**
   * Default baseURL for request on dev machine.
   */
  developerUrl = 'http://127.0.0.1:8000/';

  /**
   * Getter for default baseURL on production machine.
   */
  get productionUrl(): string {
    return window.location.protocol + '//' + window.location.host;
  }

  /**
   * Method join array of string arguments to string url path.
   * @param rest - array of string that will be join to string
   */
  joinPath(...rest: string[]): string {
    if (rest.length === 1) return rest[0];
    if (rest.length === 0) throw Error("Method joinPath does not accept an empty array");
    console.log(rest);
    if (rest[0].substr(rest.length - 1) === '/') return this.joinPath(rest[0] + rest[1], ...rest.splice(2));
    else return this.joinPath(rest[0] + '/' + rest[1], ...rest.slice(2));
  }
}
