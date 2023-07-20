import postgres from 'postgres'

// строка которая содержится в тексте ошибки библиотеки при разрыве соединения
const CONNECTION_ERROR_POSTGRESJS_MESSAGE = "ECONNREFUSED";


class DbApp {
    constructor(
        envConf, 
        envDbFields = {
            host: 'POSTGRESQL_HOST',
            port: 'POSTGRESQL_PORT',
            database: 'POSTGRESQL_DATABASE',
            username: 'POSTGRESQL_USERNAME',
            password: 'POSTGRESQL_PASSWORD',
    }) {
        this.ENV_CONF = envConf;
        this.envDbFields = envDbFields;

        this.dbConnectionStructure = this.formDbConnectionStructure();
        this.connection = this.connect();

        this.remainingRecconectionsQuantity = 100;
        this.MAX_LOCAL_RECONNECTION_NUMBER = 5
        this.localReconnectionCounter = 0;
        this.TIME_BETWEEN_RECONNECT = 0.5;
    }
    

    formDbConnectionStructure() {
        let dbConnectionStructure = {};
        for(let key of Object.keys(this.envDbFields)) { //.forEach(function(key){
            dbConnectionStructure[key] = this.ENV_CONF[[this.envDbFields[key]]];
        }
        return dbConnectionStructure;
    }


    connect() {
        let connect = postgres(this.dbConnectionStructure);
        console.log("connect")
        return connect;
    }

    async checkConnection() {
        try{ await this.connection`SELECT 1`; return true; }
        catch(err) { return false;}
    }

    async reconnect() {
        console.log("recconect: " + this.localReconnectionCounter); 
        this.connection = this.connect();
        if(this.checkConnection()) {
            this.localReconnectionCounter = 0;
        }
        else {
            if(this.localReconnectionCounter < this.MAX_LOCAL_RECONNECTION_NUMBER) {
                this.localReconnectionCounter++;
                await new Promise(r => setTimeout(r, this.TIME_BETWEEN_RECONNECT * 1000));
                await this.reconnect();
            }
    }
    }


    async executeQuery(query) {
        try {
            return await this.connection`select count(*) from mpe_logs`; // выполнение запроса
        } catch(err) {
            this.ProcError(err);
        }
    }

    async ProcError(err) {
        // обработка ошибки, связанной с разрывом соединения
        if (err.message.includes(CONNECTION_ERROR_POSTGRESJS_MESSAGE)) await this.ProcErrorConnection();
        else throw err;
    }

    async ProcErrorConnection() {
        if(this.remainingRecconectionsQuantity > 0) {
            this.remainingRecconectionsQuantity++;
            await this.reconnect();
        }
    }
}


export default DbApp