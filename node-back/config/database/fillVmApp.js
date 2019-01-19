// import working libs
const XLSX = require('xlsx');
const db = require('../../db handeling/start_cnx');

// Change the file name if needed (supported extension => .xlsx)
let fileName = './Listes-VMs.xlsx';
let file = XLSX.readFile(fileName);
// if the file contains more than one sheet, one can iterate on the number of sheets
let sheetName = file.SheetNames[0];
let worksheet = file.Sheets[sheetName];

// Careful with the number of rows / names of columns
/* The working order in this script is
    A: domaine
    B: sous-domaine
    C: Application
    D: Detail (service / sous application)
    E: nom du serveur
    F: localisation
    G: strategie de sauvegarde
*/
cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
nbRow = 368;

getMachineByName = (name, callback) => {
    let query = 'SELECT * FROM `virtualMachines` WHERE `label` = ?'
    db.query(query, [name], callback)
}

getApplicationByName = (name, callback) => {
    let query = 'SELECT * FROM `applications` WHERE `label` = ?'
    db.query(query, [name], callback)
}

addPair = (rowInfo, end) => {
    let app = rowInfo[2], runningService = rowInfo[3], vm = rowInfo[4];
    if (end && !(['NA', '-'].indexOf(app) == -1 && runningService && vm)) {
        db.query('', ()=>endCnx())
    }
    if (['NA', '-'].indexOf(app) == -1 && runningService && vm) {
        getMachineByName(vm, (err, machineRes)=>{
            if (err) console.log(`WARNING: failed entry: ${runningService}`);
            else {
                getApplicationByName(app, (err, appRes)=>{
                    if (err) console.log(`WARNING: failed entry: ${runningService}`);
                    else {                        
                        let query = 'INSERT INTO `applicationsVm` SET ?'
                        let set = {
                            applicationId: appRes[0]._id,
                            machineId: machineRes[0]._id,
                            runningService: runningService
                        }
                        db.query(query, [set], (err)=>{
                            if (err) console.log(`WARNING: failed entry: ${runningService}`);
                            else console.log(`SUCCESS: new entry (VM/APPS): ${runningService}`);
                            if (end) endCnx();
                        })
                    }
                })
            };                        
        })
    }
}

for (let rowNumber = 2; rowNumber <= nbRow; rowNumber++) {
    // Get the current row
    rowInfo = cols.map(col => (worksheet[col+rowNumber]) ? worksheet[col+rowNumber].v : 'NA')
    addPair(rowInfo, rowNumber==nbRow);
}

endCnx = () => {
    db.end((err) => {
        if (err) throw err;
        console.log('Ending connexion !')
    });
}