/**
 * Class with helpful methods to configure the session.
 */
export default class Utils {

    /**
     * Default baseURL for request on dev machine.
     */
    developerUrl = 'http://localhost:8000';

    /**
     * Getter for default baseURL on production machine.
     */
    get productionUrl(): string {
        return window.location.protocol + '//' + window.location.host;
    }
}