const db = require('./start_cnx');
const sql_mw = require('./sql_handelers');

// Select all applications
exports.get_all_applis = (callback) => {
    let query = 'SELECT * FROM `applications`';
    console.log(query);
    return db.query(query, callback)
}

// Post a new appli
exports.post_new_appli = (appli, callback) => {
    let query = "INSERT INTO `applications` SET ?"
    sql_mw.get_domain_by_label(appli.appSubDomain, (err, res) => {
        if (err) throw err;
        let addApp = {
            code: appli.appCode,
            label: appli.appLabel,
            comment: appli.appComment,
            domainId: res[0]._id
        };
        db.query(query, [addApp], (err, res) => {
            if (err) throw err;
            if (appli.pairedMachines) {
                let appId = res.insertId
                let addPairs = {}
                for (let pair of appli.pairedMachines) {
                    sql_mw.get_machine_by_label(pair.machine, (err, res) => {
                        if (err) throw err;
                        addPairs = {
                            applicationId: appId,
                            machineId: res[0]._id,
                            runningService: pair.service
                        }
                        db.query("INSERT INTO `applicationsVm` SET ?", [addPairs], (err)=>{
                            if (err) throw err;
                        })
                    })
                }
            }

        })
    })
}

// Delete a appli
exports.delete_appli = (Id, callback) => {
    let set = { _id: Id }
    let query = "DELETE FROM `applications` WHERE `_id` = ?";
    console.log(query);
    return db.query(query, Id, callback)
}

// Search a appli by term (Label or Comment)
exports.get_applis_search = (term, callback) => {
    const new_term = "%" + term + "%";
    let query = 'SELECT * FROM `applications` WHERE `label` LIKE ? OR `comment` LIKE ?';
    console.log(query);
    return db.query(query, [new_term, new_term], callback)
}