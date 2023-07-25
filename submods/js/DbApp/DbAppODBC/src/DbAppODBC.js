import odbc from 'odbc';
import DbAppBaseClass from "../../DbAppBaseClass/src/DbAppBaseClass.mjs";


export default class DbAppODBC extends DbAppBaseClass {

    constructor(envConf, envDbFields) {
        super(envConf, envDbFields);
        this.dbConnectionString = `DSN=${envConf[envDbFields['dsn']]};uid=${envConf[envDbFields['uid']]};pwd=${envConf[envDbFields['pwd']]}`;
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



    async executeQueryTag(strings, ...args) {
        let sqlResult;
        try {
            if (this.checkConnection()) {
                var commonString = strings.reduce((accumulator, currentValue) => accumulator + " ? " + currentValue);
                sqlResult = await this.connection.query(commonString, args); // выполнение запроса // select count(*), ${query} from mpe_logs
            }
            else {
                this.connection = await this.connect(); // переменая подключения к бд
                this.executeQueryTag(strings, args)
            }
    } catch(err) {
            throw err;
        }
        return sqlResult;
    }
    async executeQuery() {}
}
