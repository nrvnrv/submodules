import DbApp from './src/DbApp.js';
import {loadEnv} from '../../confload/src/confload.mjs';


// нужен dotenv и табличка mpe_logs 
async function main() {
    // раз в timeToSleep секунд отправляет асинхронный запрос numToSend раз
    // задержка - чтобы можно было отключить и включить бд - смоделировать разрыв соединения
    let numToSend = 60;
    let timeToSleep = 5;
    let dotEnvPath = './conf/.env';
    // класс подключения к бд
    let dbApp = new DbApp(loadEnv(dotEnvPath));
    // цикл отправки sql запросов
    for(let i = 0; i <= numToSend; i++) {
        console.log(`${i} - sended`);
        dbApp.executeQueryTag`select count(*), ${i} from mpe_logs`.then(result => {
            console.log(result);
        });
        await new Promise(r => setTimeout(r, timeToSleep));
    }
    console.log("--- END ---");
}

main();