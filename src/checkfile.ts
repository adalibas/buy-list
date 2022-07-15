import {accessSync, constants, } from 'fs';
import {execSync} from 'child_process';

export function checkCreateDatabase() {
    try { 
        accessSync("./buy-list.db", constants.F_OK,)
    }
    catch(e){
        execSync("sqlite3 ./buy-list.db < create")
    }
}