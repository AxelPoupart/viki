// import working libs
const XLSX = require('xlsx');

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

let campuses = [];

updateCampus = (rowInfo, campuses) => {
    (campuses.indexOf(rowInfo[5]) == -1) ? campuses.push(rowInfo[5]) : null;
    return campuses
}

for (let rowNumber = 2; rowNumber <= nbRow; rowNumber++) {
    // Get the current row
    rowInfo = cols.map(col => (worksheet[col+rowNumber]) ? worksheet[col+rowNumber].v : 'NA')
    campuses = updateCampus(rowInfo, campuses);
}

const db = require('../../db handeling/start_cnx');

let syntaxe = "INSERT INTO `campuses` (`campusName`) VALUES"
for (let campus of campuses) {
    let query = syntaxe+`("${campus}")`
    db.query(query, (err, res)=>{
        if (err) {
            console.log(`WARNING: entry failed: ${campus}`);
        } else console.log(`SUCCESS: new entry (Campus): ${campus}`);
    })
}

db.end((err)=>{
    if (err) throw err;
    console.log('Ending connexion !')
});