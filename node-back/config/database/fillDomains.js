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

let domainsMap = {};

getDomsMap = (rowInfo, domainsMap) => {
    /* update the map of domains and their respective subdomains */
    let domainField = rowInfo[0], subdomainField = rowInfo[1];
    // the domains in the file were labeled such as: someNumber.domainName
    let domain = (domainField != 'NA') ? domainField.split('.')[1].trim() : 'NA'
    let subdomain = subdomainField.trim()
    // if either one of the values is null, skip the rest of the code
    if ([domain, subdomain].indexOf('NA') != -1) return domainsMap;

    // if the entry is new, create a new empty list for that domain
    if (!domainsMap[domain]) {
        domainsMap[domain] = []
    }
    // if the subdomain was already indexed, skip the push
    (domainsMap[domain].indexOf(subdomain) == -1) ? domainsMap[domain].push(subdomain) : null
    return domainsMap
}

for (let rowNumber = 2; rowNumber < 1 + nbRow; rowNumber++) {
    // Get the current row's info
    rowInfo = cols.map(col => (worksheet[col + rowNumber]) ? worksheet[col + rowNumber].v : 'NA')
    // update the domains map
    domainsMap = getDomsMap(rowInfo, domainsMap)
}

const db = require('../../db handeling/start_cnx'); // connect to the sql db

// Create the logs in the database
let doms = Object.keys(domainsMap)
let syntaxe = "INSERT INTO `domains` (`_id`, `label`, `parentId`) VALUES " //('1', 'a', '1')
for (let _id = 1; _id <= doms.length; _id++) {
    // Add the parent domain
    let query = syntaxe + `('${_id}', '${doms[_id - 1]}', '${_id}')`;
    db.query(query, (err) => {
        if (err) {
            console.log(`WARNING: could not proceed with query: ${query}\n`);
        } else console.log(`SUCCESS: New entry (Domain): ${doms[_id-1]}\n`);
    })
}

for (let _id = 1; _id <= doms.length; _id++) {
    let subdoms = domainsMap[doms[_id - 1]]
    for (let i = 0; i < subdoms.length; i++) {
        let query = syntaxe.replace('`_id`, ', '') + `('${subdoms[i]}', '${_id}')`
        db.query(query, (err)=>{
            if (err) {
                console.log(`WARNING: could not proceed with query: ${query}\n`);
            } else console.log(`SUCCESS: New entry (Subdomain): ${subdoms[i]}\n`);
        })
    }
}

db.end((err)=>{
    if (err) throw err;
    console.log('Ending connexion !')
});