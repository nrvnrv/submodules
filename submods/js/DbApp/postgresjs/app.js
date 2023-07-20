import DbApp from './src/Dbapp.js';
import {loadEnv} from '../../confload/src/confload.mjs';


async function main() {
    console.log("i");
    let dbApp = new DbApp(loadEnv('./conf/.env'));
    console.log("i2");
    for(let i = 0; i <= 50; i++) {
        if((i % 10) == 0) {
            let result = await dbApp.executeQuery("select count(*) from mpe_logs");
            console.log(result);
        }
        else console.log(i);
        await new Promise(r => setTimeout(r, 2000));
    }
}

main();