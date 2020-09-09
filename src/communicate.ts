import Utils from './utils';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface ICommunicate {
  session: AxiosInstance;
}

export interface IUserConfig extends AxiosRequestConfig {
  devUrl?: string;
  prodUrl?: string;
  baseUrlDevPostfix ?: string;
  baseUrlProdPostfix ?: string;
}

export default class Communicate implements ICommunicate {
  private defaultHeaders = {
    'Content-Type': 'application/json',
  };

  private defaultConfig = {
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    timeout: 100000,
    withCredentials: true,
  };

  private utils = new Utils();
  session: AxiosInstance;

  constructor(userConfig?: IUserConfig) {
    const { devUrl, prodUrl, headers, baseUrlDevPostfix, baseUrlProdPostfix } = { ...userConfig };
    let baseURL = this.definitionBaseUrl(devUrl, prodUrl);
    baseURL = this.setPathPrefix(baseURL, baseUrlDevPostfix, baseUrlProdPostfix);
    // preparation headers to argument of function
    const resultHeaders = { ...this.defaultHeaders, ...headers };
    // It's important to save spread order. First the default settings are unpacked and then customs.
    // This is done for a higher priority of custom settings. header arg must be last, bcs userConfig
    // may contain header arg too and userConfig args can rewrite default headers
    this.session = axios.create({
      baseURL,
      ...this.defaultConfig,
      ...userConfig,
      headers: resultHeaders,
    });
  }

  /**
   * Method for determining the base url for develop and prod machine.
   * @param dev - url for develop passed like custom config
   * @param prod - url for production passed like custom config
   */
  private definitionBaseUrl(dev?: string, prod?: string): string {
    let baseUrl;
    if (process.env.NODE_ENV === 'production') {
      baseUrl = prod || this.utils.productionUrl;
    } else {
      baseUrl = dev || this.utils.developerUrl;
    }
    return baseUrl;
  }

  /**
   * Method set base url, if it is passed
   * @param url - base url
   * @param prefixDev - base url prefix in developer mode
   * @param prefixProd - base url prefix in production mode
   */
  private setPathPrefix(url: string, prefixDev?: string, prefixProd?: string): string {
    let baseUrl: string = url;
    if (process.env.NODE_ENV === 'production' && prefixProd) {
      baseUrl = this.utils.joinPath(url, prefixProd);
    } else {
      if (prefixDev) {
        baseUrl = this.utils.joinPath(url, prefixDev);
      }
    }
    return baseUrl;
  }
}
