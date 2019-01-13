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

let servers = {};

getServersInfo = (rowInfo, servers) => {
    /* update the servers list */
    let serverName = rowInfo[4], backupPolicy = rowInfo[6], location = rowInfo[5]
    if (serverName) {
        servers[serverName] = {
            'backupPolicy': backupPolicy,
            'location': location
        }
    }
    else {
        log(rowInfo);
    }
    return servers
}

for (let rowNumber = 2; rowNumber <= nbRow; rowNumber++) {
    // Get the current row
    rowInfo = cols.map(col => (worksheet[col+rowNumber]) ? worksheet[col+rowNumber].v : 'NA')
    servers = getServersInfo(rowInfo, servers)
}

const db = require('../../db handeling/start_cnx');

let vmLabels = Object.keys(servers)
let syntaxe = "INSERT INTO `virtualMachines` (`_id`, `label`, `filePath`, `campus`, `backupPolicy`) VALUES" // ('1', 'vm', NULL, 'loc', NULL)
for (let _id = 1; _id <= vmLabels.length; _id++) {
    let vmName = vmLabels[_id-1];
    let query = syntaxe+`("${_id}", "${vmName}", NULL, "${servers[vmName].location}", "${servers[vmName].backupPolicy}");\n`;
    db.query(query, (err, res) => {
        if (err) {
            console.log(`WARNING: Could not proceed with query: ${query}`);
        } else console.log(`SUCCESS: New entry (VM): ${vmName}`);
        
    });
}

db.end((err)=>{
    if (err) throw err;
    console.log('Ending connexion !')
});