import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'
import { reactive } from 'vue';
import '@quasar/extras/material-icons/material-icons.css'

const userDictMaster = {"projects": {}, "clients": {}, "colours": {'colourWhite':{'name': 'Clear', 'colour': '#ffffff'}}, "users": {}, "records": {"accounts": [],"payee": [], "categories": {}, 'savedTransactions': {}}, "saveVersion": 20, "showGST": true, "version": '0.5.0', "timeLogged": {"01/01/1970": {'hours': 0, 'pay': 0}}, 'archive': {'projects': {}}}

export const userDict = reactive({...userDictMaster})

export function saveChecker(saveFile){
    if(saveFile['saveVersion'] == 4){
        saveFile['records']['accounts'] = [];
        saveFile['records']['categories'] = ['Contract Work'];
        saveFile['saveVersion'] = 5;
    }
    if(saveFile['saveVersion'] == 5){
        saveFile['records']['homeExpenses'] = {};
        saveFile['saveVersion'] = 6;
    }
    if(saveFile['saveVersion'] == 6){
        saveFile['colours']['colourWhite']['name'] = 'Clear';
        for(const[projectID, projectDict] of Object.entries(saveFile['projects'])){
            for(const[weekID, weekDict] of Object.entries(projectDict['weeks'])){
                saveFile['projects'][projectID]['weeks'][weekID]['invoiced'] = false;
                weekDict['invoiced'] = false;
            }
        }
        saveFile['saveVersion'] = 7;
    }
    if(saveFile['saveVersion'] == 7){
        for(const[projectID, projectDict] of Object.entries(saveFile['projects'])){
            projectDict['targetHours'] = 0;
        }
        saveFile['saveVersion'] = 8;
    }
    if(saveFile['saveVersion'] == 8){
        for(const[yearID, recordsDict] of Object.entries(saveFile['records'])){
            if(yearID != 'accounts' && yearID != 'categories' && yearID != 'homeExpenses'){
                if(recordsDict['transactions'] != undefined){
                    for(const[transID, transDict] of Object.entries(recordsDict['transactions'])){
                        transDict['receiptID'] = '';
                    }
                }
                
            }
        }
        saveFile['saveVersion'] = 9;
    }
    if(saveFile['saveVersion'] == 9){
        delete saveFile['records']['homeExpenses']
        saveFile['records']['savedTransactions'] = {}
        saveFile['saveVersion'] = 10;
    }
    if(saveFile['saveVersion'] == 10){
        let categoryCopy = [... saveFile['records']['categories']];
        saveFile['records']['categories'] = {};
        categoryCopy.forEach(item => {
            saveFile['records']['categories'][item] = true;
        });
        saveFile['saveVersion'] = 11;
    }
    if(saveFile['saveVersion'] == 11){
        saveFile['records']['payee'] = [];
        saveFile['saveVersion'] = 12;
    }
    if(saveFile['saveVersion'] == 12){
        for(const[yearID, recordsDict] of Object.entries(saveFile['records'])){
            if(yearID != 'accounts' && yearID != 'categories' && yearID != 'homeExpenses'){
                if(recordsDict['transactions'] != undefined){
                    for(const[transID, transDict] of Object.entries(recordsDict['transactions'])){
                        transDict['payee'] = '';
                        transID;
                    }
                }
            }
        }
        saveFile['saveVersion'] = 13;
    }
    if(saveFile['saveVersion'] == 13){
        saveFile['showGST'] = true;
        saveFile['saveVersion'] = 14;
    }
    if(saveFile['saveVersion'] == 14){
        saveFile['version'] = pjson.version;
        saveFile['saveVersion'] = 15;
    }
    if(saveFile['saveVersion'] == 15){
        for(const[projectID, projectDict] of Object.entries(saveFile['projects'])){
            for(const[weekID, weekDict] of Object.entries(projectDict['weeks'])){
                for(const[colourID, cellsArr] of Object.entries(weekDict['colouredCells'])){
                    cellsArr.forEach((cellID, i) => {
                        let cellInt = parseInt(cellID.substring(1)) - 1;
                        let cellCol = cellID.charAt(0);
                        cellsArr[i] = `${cellCol}${cellInt}`
                    })
                }
            }
        }
        saveFile['saveVersion'] = 16;
    }
    if(saveFile['saveVersion'] == 16){
        saveFile['timeLogged'] = {"01/01/1970": 0}
        saveFile['saveVersion'] = 17
    }
    if(saveFile['saveVersion'] == 17){
        for(const[objKey, objDict] of Object.entries(saveFile['timeLogged'])){
            saveFile['timeLogged'][objKey] = {'hours': objDict, 'pay': 0}
        }
        saveFile['saveVersion'] = 18
    }
    if(saveFile['saveVersion'] == 18){
        for(const[projectID, projectDict] of Object.entries(saveFile['projects'])){
            for(const[weekID, weekDict] of Object.entries(projectDict['weeks'])){
                let weekTotal = 0
                for(const [colourID, cellList] of Object.entries(weekDict['colouredCells'])){
                    if(cellList.length != 0){
                        let qty = (Math.round((1/(60/projectDict['timeInterval'])) * 1000) / 1000) * cellList.length;
                        let total = qty * parseFloat(saveFile['colours'][colourID]['rate']);
                        weekTotal += total
                    }
                } 
                weekDict['total'] = weekTotal.toFixed(2)
            }
        }
        saveFile['saveVersion'] = 19
    }
    if(saveFile['saveVersion'] == 19){
        saveFile['archive'] = {}
        saveFile['archive']['projects'] = {}
        saveFile['saveVersion'] = 20
    }
    if(saveFile['saveVersion'] == 20){
        for(const[projectID, projectDict] of Object.entries(saveFile['projects'])){
            delete projectDict['colours'];
            projectDict['colour'] = ["#014a88", '#35a2ff']
        }
        saveFile['saveVersion'] = 21
    }
    return saveFile
}





const app = createApp(App)

app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})

app.use(router)

app.mount('#app')

