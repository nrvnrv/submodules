export default class DbAppBaseCheck {
  constructor(dbObject, numOfRuns = 50, timeToSleep = 0) {
    this.dbObject = dbObject;
    this.numOfRuns = numOfRuns;
    this.timeToSleep = timeToSleep;
  }

  run(functionName, functionArgs, numOfRuns = NaN, timeToSleep = NaN) {
    // numToSend раз в timeToSleep секунд отправляет асинхронный запрос
    // задержка нужна чтобы можно было отключить и включить бд - смоделировать разрыв соединения
    if (numOfRuns === NaN) numOfRuns = this.numOfRuns; // сколько раз отправлять
    if (timeToSleep === NaN) timeToSleep = this.numOfRuns; // задержка между посылками в секундах
    let whenStarted = Date.now();
    let execCounter = 0;
    // цикл отправки sql запросов
    let dbObjMethodsList = Object.getOwnPropertyNames(this.dbObject.__proto__);
    if (dbObjMethodsList.includes(functionName)) {
      // eval(dbObject.`${functionName}`);
      dbObject[functionName](functionArgs)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
    }
  }

  async runAsync() {}
}

new DbAppBaseCheck();
