
export default class DbAppBaseClass {
    
    constructor(envConf, envDbFields) {

        this.ENV_CONF = envConf; // параметры окружения, массив для подкл-я к бд 
        this.envDbFields = envDbFields; // какие поля смотреть в envConf

        // структура подкл-я к бд, форм-ся с помощью ENV_CONF и envDbFields
        this.dbConnectionStructure = this.formDbConnectionStructure();
        this.connection = this.connect(); // переменая подключения к бд
        
    }


    // формирует структуру подключения к бд
    formDbConnectionStructure() {
        let dbConnectionStructure = {};
        for(let key of Object.keys(this.envDbFields))
            dbConnectionStructure[key] = this.ENV_CONF[[this.envDbFields[key]]];
        return dbConnectionStructure;
    }

    connect() {}

    executeQuery() {}

}

