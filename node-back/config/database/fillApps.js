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

let code = 1, apps = [];

getDomainByName = (name, callback) => {
    let query = 'SELECT * FROM `domains` WHERE `label` = ?'
    db.query(query, [name], callback)
}

insertApplication = (rowInfo, end) => {
    let appName = rowInfo[2].trim();
    if (end && (!appName || [...apps, 'NA', '-'].indexOf(appName) != -1)) {
        db.query('', ()=>endCnx())
    }
    if (!appName || [...apps, 'NA', '-'].indexOf(appName) != -1) {
        return null
    }
    let domain = rowInfo[1];
    code++;
    apps.push(appName);
    getDomainByName(domain, (err, res) => {
        if (err) throw err;
        
        console.log(res);
        console.log(domain);
        db.query('INSERT INTO `applications` SET ?', [{ code: code, label: appName, domainId: res[0]._id }], (err) => {
            if (err) console.log(`WARNING: failed entry: ${appName}`)
            else console.log(`SUCCESS: new entry (APPS): ${appName}`);
            if (end) endCnx();
        })
    })
}


for (let rowNumber = 2; rowNumber <= nbRow; rowNumber++) {
    // Get the current row
    rowInfo = cols.map(col => (worksheet[col + rowNumber]) ? worksheet[col + rowNumber].v : 'NA')
    insertApplication(rowInfo, rowNumber == nbRow)
}

endCnx = () => {
    db.end((err) => {
        if (err) throw err;
        console.log('Ending connexion !')
    });
}