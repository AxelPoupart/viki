const XLSX = require('xlsx')
const fs = require('fs')

log = (msg) => console.log(msg);

getDomsMap = (rowInfo, domainsMap) => {
    // get a map of domains/subdomains
    let domain = (rowInfo[0] != 'NA') ? rowInfo[0].split('.')[1].trim() : 'NA'
    if (domain == 'NA') log(rowNumber)
    let subdomain = rowInfo[1].trim()
    if (!domainsMap[domain] && domain != 'NA') {
        domainsMap[domain] = []
    }
    (domainsMap[domain] && domainsMap[domain].indexOf(subdomain) == -1) ? domainsMap[domain].push(subdomain) : null
    return domainsMap
}

getServersInfo = (rowInfo, servers) => {
    let serverName = rowInfo[4], serverComment = rowInfo[3], location = rowInfo[5]
    if (serverComment == "NA" || serverComment == '-') serverComment = "";
    if (serverName) {
        servers[serverName] = {
            'comment': serverComment,
            'location': location
        }
    }
    else {
        log(rowInfo);
    }
    return servers
}

getApplications = (rowInfo, apps) => {
    if (rowInfo[2] == 'NA' || rowInfo[2] == '-' || apps.indexOf(rowInfo[2]) != -1) return apps
    apps.push(rowInfo[2])
    return apps
}

let file = XLSX.readFile('./Listes-VMs.xlsx')
let sheetName = file.SheetNames[0]
let worksheet = file.Sheets[sheetName]

cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
nbRow = 368

let domainsMap = {}, apps = [], servers = {};

for (let rowNumber = 2; rowNumber <= nbRow; rowNumber++) {
    // Get the current row
    rowInfo = cols.map(col => (worksheet[col+rowNumber]) ? worksheet[col+rowNumber].v : 'NA')
    // domainsMap = getDomsMap(rowInfo, domainsMap)
    // servers = getServersInfo(rowInfo, servers)
    apps = getApplications(rowInfo, apps)
}

/*
// Generate sql file to create the domains and subdoms
let doms = Object.keys(domainsMap)
let syntaxe = "INSERT INTO `Domains` (`_id`, `Label`, `ParentID`) VALUES " //('1', 'a', '1')
for (let _id = 1; _id <= doms.length; _id++) {
    // Add the parent domain
    fs.appendFile('createDomains.sql', syntaxe+`('${_id}', '${doms[_id-1]}', '${_id}');\n`, (err) => {
        if (err) throw err;
        log('Added new line')
    })
    let subdoms = domainsMap[doms[_id-1]]
    // Add its subdomains
    for (let i = 0; i<subdoms.length; i++) {
        fs.appendFile('createDomains.sql', syntaxe.replace('`_id`, ', '')+`('${subdoms[i]}', '${_id}');\n`, (err) => {
            if (err) throw err;
            log('Added new line')
        })
    }
}
*/

// Generate sql file to create VMs entries
/*
let vms = Object.keys(servers)
let syntaxe = "INSERT INTO `Virtual Machines` (`_id`, `Label`, `File`, `Campus`, `Comment`) VALUES" // ('1', 'vm', NULL, 'loc', NULL)
for (let _id = 1; _id <= vms.length; _id++) {
    // Add the parent domain
    let vmName = vms[_id-1];
    let sqlLine = "";
    if (!servers[vmName].comment) {
        sqlLine = syntaxe+`("${_id}", "${vmName}", NULL, "${servers[vmName].location}", NULL);\n`
    }
    else {
        sqlLine = syntaxe+`("${_id}", "${vmName}", NULL, "${servers[vmName].location}", "${servers[vmName].comment}");\n`;
    }
    fs.appendFile('createVms.sql', sqlLine, (err) => {
        if (err) throw err;
    })
}
*/