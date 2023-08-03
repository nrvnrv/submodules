import odbc from 'odbc';
import DbAppBaseClass from "../../DbAppBaseClass/src/DbAppBaseClass.mjs";


export default class DbAppODBC extends DbAppBaseClass {

    constructor(envConf, envDbFields) {
        super(envConf, envDbFields);
        this.dbConnectionString = `
            DSN=${envConf[envDbFields['dsn']]};
            uid=${envConf[envDbFields['uid']]};
            pwd=${envConf[envDbFields['pwd']]};
            Charset=utf-8;
        `;
    }

    static async create(
        envConf, 
        envDbFields = {
            dsn: 'SYBASE_DSN_DOCKER',
            uid: 'SYBASE_USERNAME',
            pwd: 'SYBASE_PASSWORD'
        }
    ) {
        let dbObj = new DbAppODBC(envConf, envDbFields);
        dbObj.connection = await dbObj.connect(); // переменая подключения к бд
        return dbObj;
    }

    async connect() {
        let connection = await odbc.connect(this.dbConnectionString);
        // console.log(connection);
        return connection;
    }

    async checkConnection() {
        try{ 
            await this.connection.query(`SELECT 1`); return true; 
        }
        catch(err) { return false;}
    }


    // аккуратно тк sybase имеет ограничение на кол-во запросов
    async executeQueryTag(strings, ...args) {
        // подготовленные операторы:
        var commonString = strings.reduce((accumulator, currentValue) => accumulator + " ? " + currentValue);
        let sqlResult = await this.connection.query(commonString, args); // выполнение запроса 
        return sqlResult;
    }

    async executeQuery(sqlString) {
        let sqlResult = await this.connection.query(sqlString); // выполнение запроса 
        return sqlResult;
    }


    /*
    static async createPromise(
        envConf, 
        envDbFields = {
            dsn: 'SYBASE_DSN_DOCKER',
            uid: 'SYBASE_USERNAME',
            pwd: 'SYBASE_PASSWORD'
        }
    ) {
        let dbObj = new DbAppODBC(envConf, envDbFields);
        dbObj.connection = dbObj.connectPromise(); // переменая подключения к бд
        return dbObj;
    }
    
    async connectPromise() {
        let connectionPromise = odbc.connect(this.dbConnectionString);
        connectionPromise.then(conn => {
            this.connection = conn;
            this.connected = true;
        });
        connectionPromise.catch(err => {throw(err)});
        console.log("connectionPromise " + connectionPromise);
        return connectionPromise;
    }

    async executeQueryPromise(sqlString) {
        let sqlResultPromise = this.connection.query(sqlString); // выполнение запроса 
        return sqlResultPromise;
    }
    */

}
