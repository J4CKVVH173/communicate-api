/**
 * Класс со вспомогательными утилитами для настройки сессии.
 */
export default class Utils {

    /**
     * Дефолтный урл для запросов на машине разработчика.
     */
    developerUrl = 'http://localhost:8000';

    /**
     * Геттер для получения урла без пути, по которому нужно делать запрос на продакшене.
     */
    get productionUrl(): string {
        return window.location.protocol + '//' + window.location.host;
    }
}