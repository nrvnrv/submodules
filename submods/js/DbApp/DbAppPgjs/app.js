import DbAppPgjs from "./src/DbAppPgjs.js";
import { loadEnv } from "../../confload/src/confload.mjs";

let dotEnvPath = "./conf/.env"; // файл конфигураций в котором должны быть параметры подкл-я к бд

// нужен dotenv и табличка mpe_logs
async function main() {
  // раз в timeToSleep секунд отправляет асинхронный запрос numToSend раз
  // задержка нужна чтобы можно было отключить и включить бд - смоделировать разрыв соединения
  let numToSend = 1000; // сколько раз отправлять
  // let timeToSleep = 0; // задержка между посылками в секундах
  // класс подключения к бд
  let dbApp = new DbAppPgjs(loadEnv(dotEnvPath));

  let now1 = Date.now();
  let freqToOut = numToSend / 10;
  // цикл отправки sql запросов
  for (let i = 0; i <= numToSend; i++) {
    if (i % freqToOut == 0) console.log(`${i} - sended`);
    dbApp.executeQueryTag`select count(*), ${i} from mpe_logs`.then(
      (result) => {
        if (i % freqToOut == 0) console.log(result);
        if (numToSend - i === 0) {
          let estimated = Date.now() - now1;
          console.log("Заняло времени (мс): " + estimated);
        }
      },
    );
    // await new Promise(r => setTimeout(r, timeToSleep * 1000));
  }
  console.log("--- END ---");
}

main();
// async function main2() {
//     let dbApp = new DbAppPgjs(loadEnv(dotEnvPath));
//     dbApp.executeQuery(`select count(*), ${111} from mpe_logs`)
//         .then(res => {
//             console.log("res");
//             console.log(res);
//         })
//         .catch(err => {
//             console.log("err");
//             console.log(err);
//         });
// }
// main2();
