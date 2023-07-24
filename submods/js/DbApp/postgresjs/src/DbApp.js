import postgres from 'postgres'

// строка которая содержится в тексте ошибки библиотеки
//  при разрыве соединения
const PGJSMSG_CONNECTION_ERROR = "ECONNREFUSED";
// при неправильном синтаксисе запроса
const PGJSMSG_SYNTAX_ERROR = "PostgresError: syntax error";
// при старте бд
const PGJSMSG_STARTINGUP_ERROR = "PostgresError: the database system is starting up";

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

        // this.remainingRecconectionsQuantity = 500;
        // this.MAX_LOCAL_RECONNECTION_NUMBER = 1500;
        // this.localReconnectionCounter = 0;
        this.TIME_BETWEEN_RECONNECT = 0.5;
    }


    formDbConnectionStructure() {
        // формирует структуру подключения к бд
        let dbConnectionStructure = {};
        for(let key of Object.keys(this.envDbFields))
            dbConnectionStructure[key] = this.ENV_CONF[[this.envDbFields[key]]];
        return dbConnectionStructure;
    }


    connect() {
        // объект подключения к бд
        let connect = postgres(this.dbConnectionStructure);
        console.log("connect")
        return connect;
    }


    async checkConnection() {
        try{ await this.connection`SELECT 1`; return true; }
        catch(err) { return false;}
    }


    async reconnect() {
        while(true) {
            console.log("recconect: "); 
            this.connection = this.connect();
            if(this.checkConnection()) return 1;
            await new Promise(r => setTimeout(r, this.TIME_BETWEEN_RECONNECT * 1000));
        }
    }


    async executeQueryTag(strings, ...args) {
        let sqlResult;
        try {
            sqlResult = await this.connection(strings = strings , args = args); // выполнение запроса // select count(*), ${query} from mpe_logs
        } catch(err) {
            if(this.ProcError(err)) sqlResult = this.executeQueryTag(strings, ...args); // ~10k calls
        }
        return sqlResult;
    }

    async ProcDbStartingError(err) {
        while(true) {
            await new Promise(r => setTimeout(r, 7000));
            if(this.checkConnection()) return 1;
        }
    }

    async ProcError(err) {
        // обработка ошибки, связанной с разрывом соединения
        if (err.message.includes(PGJSMSG_CONNECTION_ERROR))
            return await this.ProcErrorConnection(err);

        else if (err.message.includes(PGJSMSG_STARTINGUP_ERROR)) 
            return await ProcDbStartingError(err);

        else if (err.message.includes(PGJSMSG_SYNTAX_ERROR)) 
            return await this.ProcSyntaxError(err);
        else 
            throw err;
    }


    async ProcErrorConnection(err) {
        // if(this.remainingRecconectionsQuantity > 0) {
        //     this.remainingRecconectionsQuantity++;
            return await this.reconnect();
        // }
    }


    async ProcSyntaxError(err) {
        throw err;
    }

}


export default DbApp