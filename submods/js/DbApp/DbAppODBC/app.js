import DbAppODBC from './src/DbAppODBC.js';
import {loadEnv} from '../../confload/src/confload.mjs';

// нужен dotenv 
let dotEnvPath = './conf/.env'; // файл конфигураций в котором должны быть параметры подкл-я к бд

async function createDbApp() {
    let dbApp = await DbAppODBC.create(
        loadEnv(dotEnvPath), 
        {
            dsn: 'SYBASE_DSN_DOCKER',
            uid: 'SYBASE_USERNAME',
            pwd: 'SYBASE_PASSWORD'
        }
    );
    return dbApp;
}

async function createDbAppPromise() {
    let dbApp = DbAppODBC.createPromise(
        loadEnv(dotEnvPath), 
        {
            dsn: 'SYBASE_DSN_DOCKER',
            uid: 'SYBASE_USERNAME',
            pwd: 'SYBASE_PASSWORD'
        }
    );
    return dbApp;
}

async function main() {
    // раз в timeToSleep секунд отправляет асинхронный запрос numToSend раз
    // задержка нужна чтобы можно было отключить и включить бд - смоделировать разрыв соединения
    let numToSend = 60; // сколько раз отправлять
    // let timeToSleep = 0; // задержка между посылками в секундах
    // класс подключения к бд
    // let dbApp = await createDbApp();
    let now1 = Date.now();
    let freqToOut = numToSend / 10;
    // цикл отправки sql запросов
    for(let i = 0; i <= numToSend; i++) {
        let dbApp = await createDbApp();
        if((i % freqToOut) == 0) console.log(`${i} - sended`);
        dbApp.executeQueryTag`select count(*), ${i} from diagnose`.then(result => { 
            if((i % freqToOut) == 0) console.log(result);
            if((numToSend - i) === 0) {
                let estimated = Date.now() - now1;
                console.log("Заняло времени (мс): " + estimated);
            }
        });
    //     // await new Promise(r => setTimeout(r, timeToSleep * 1000));
    }
    console.log("--- END ---");
}

async function main2() {
    // раз в timeToSleep секунд отправляет асинхронный запрос numToSend раз
    // задержка нужна чтобы можно было отключить и включить бд - смоделировать разрыв соединения
    let numToSend = 60; // сколько раз отправлять
    // let timeToSleep = 0; // задержка между посылками в секундах
    // класс подключения к бд
    // let dbApp = await createDbApp();
    let now1 = Date.now();
    let freqToOut = numToSend / 10;
    // цикл отправки sql запросов
    for(let i = 0; i <= numToSend; i++) {
        let dbApp = await createDbApp();
        if((i % freqToOut) == 0) console.log(`${i} - sended`);
        dbApp.executeQuery(`select count(*), ${i} from diagnose`).then(result => { 
            if((i % freqToOut) == 0) console.log(result);
            if((numToSend - i) === 0) {
                let estimated = Date.now() - now1;
                console.log("Заняло времени (мс): " + estimated);
            }
        });
    //     // await new Promise(r => setTimeout(r, timeToSleep * 1000));
    }
    console.log("--- END ---");
}


async function main2_1() {
    let dbApp = await createDbApp();
    dbApp.executeQuery(`SELECT TOP(2) * FROM EXPERTS2`)
    .then(result => { console.log(result); })
    .catch(result => { console.log(result); })
    ;
}


// async function main3_1() {
//     createDbApp()
//         .then(dbApp => {
//             let resPromise = dbApp.executeQueryPromise(`SELECT TOP(2) * FROM EXPERTS2`);
//             resPromise.then(res => console.log(res.slice(0,res['count'])));
//             resPromise.catch(err => console.log(err));
//         })
//         .catch(err => {
//             console.log('err');
//             console.log(err);
//         });
// }


// async function main3() {
//     createDbAppPromise()
//         .then(dbApp => {
//             let resPromise = dbApp.executeQueryPromise(`select count(*), ${11} from diagnose`);
//             resPromise.then(res => console.log(res));
//             resPromise.catch(res => console.log(res));
//         })
//         .catch(err => {
//             console.log('err');
//             console.log(err);
//         });
// }

main2_1();