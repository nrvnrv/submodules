
export default class DbAppBaseClass {
    
    constructor(envConf, envDbFields) {

        this.ENV_CONF = envConf; // параметры окружения, массив для подкл-я к бд 
        this.envDbFields = envDbFields; // какие поля смотреть в envConf

        // this.connection = this.connect(); // переменая подключения к бд

    }

    // connect() {}

    // executeQuery() {}

}

