import Utils from './utils';
import axios from 'axios';


class Communication {

  defaultHeaders = {
    'Content-Type': 'application/json'
  }

  defaultConfig = {
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    timeout: 100000,
  }

  utils = new Utils();

  /**
   * Конструктор производит создание настроек для axios и создания сессии
   * @param [userConfig] {SessionConfig} - объект с параметрами конфига которые переопределяют дефолтные конфиги или
   * добаляет новые.
   */
  constructor(userConfig) {
    const { devUrl, prodUrl, headers } = { ...userConfig};
    const baseURL = this.definitionBaseUrl(devUrl, prodUrl);
    // добавляем в аргумент функции заголовки
    const resultHeaders = { ...this.defaultHeaders, ...headers};
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
   * @param dev {String|undefined} - урл для девелопа который передан как конфиг от разработчика
   * @param prod {String|undefined} - урл продакшена который передан как конфиг от разрабочтика
   * @return {String} - урл на который будет производиться AJAX запрос
   */
  definitionBaseUrl (dev, prod) {
    let baseUrl;
    if (process.env.NODE_ENV === 'production') {
      baseUrl = prod || this.utils.productionUrl;
    } else {
      baseUrl = dev || this.utils.developerUrl;
    }
    return baseUrl;
  }

}

export default Communication;
