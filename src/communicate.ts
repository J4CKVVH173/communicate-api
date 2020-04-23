import Utils from "./utils";
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

interface ICommunicate {
    session: AxiosInstance,
}

export interface IUserConfig extends AxiosRequestConfig{
    devUrl?: string,
    prodUrl?: string
}


export default class Communicate implements ICommunicate {
    private defaultHeaders = {
        'Content-Type': 'application/json'
    }

    private defaultConfig = {
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        timeout: 100000,
    }

    private utils = new Utils();
    session: AxiosInstance;

    constructor(userConfig?: IUserConfig) {
        const {devUrl, prodUrl, headers} = {...userConfig};
        const baseURL = this.definitionBaseUrl(devUrl, prodUrl);
        // добавляем в аргумент функции заголовки
        const resultHeaders = {...this.defaultHeaders, ...headers};
        // При передаче конфига в axios.create важно соблюдать порядок распаковки. Сперва распаковывается дефолтный конфиг
        // и уже на него накладывается новый
        this.session = axios.create({
            baseURL,
            ...this.defaultConfig, ...userConfig,
            headers: resultHeaders,
        });
    }

    /**
     * Метод для определения урла, на который будут производиться запросы.
     * @param dev - урл для девелопа который передан как конфиг от разработчика
     * @param prod - урл продакшена который передан как конфиг от разрабочтика
     */
    private definitionBaseUrl(dev?: string, prod?: string) {
        let baseUrl;
        if (process.env.NODE_ENV === 'production') {
            baseUrl = prod || this.utils.productionUrl;
        } else {
            baseUrl = dev || this.utils.developerUrl;
        }
        return baseUrl;
    }
}
