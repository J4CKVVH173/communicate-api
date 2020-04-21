/**
 * Класс со вспомогательными утилитами для настройки сессии.
 */
class Utils {

  /**
   * Дефолтный урл для запросов на машине разработчика.
   * @type {string}
   */
  developerUrl = 'http://localhost:8000';

  /**
   * Геттер для получения урла без пути, по которому нужно делать запрос на продакшене.
   * @return {string}
   */
  get productionUrl () {
    return window.location.protocol + '//' + window.location.host;
  }

}

export default Utils;
