const db = require('./start_cnx');
const sql_mw = require('./sql_handelers');

// Select all applications
exports.get_all_applis = (callback) => {
    let query = 'SELECT * FROM `applications`';
    return db.query(query, callback)
}

exports.getApplicationById = (_id, callback) => {
    let query = 'SELECT * FROM `applications` WHERE `_id` = ?';
    db.query(query, [_id], callback);
}

exports.deleteCoupledVms = (appId, callback) => {
    db.query(`DELETE FROM \`applicationsVm\` WHERE \`applicationId\` =  ${appId} `, callback)
}

// Create a new application
exports.post_new_appli = (appli, callback) => {
    let query = "INSERT INTO `applications` SET ?"
    
    sql_mw.get_domain_by_label(appli.appSubDomain, (err, res) => {
        if (err) throw err;
        let addApp = {
            code: appli.code,
            label: appli.label,
            comment: appli.comment,
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
            callback();
        })
    })
}

// Delete an application
exports.delete_appli = (appId, callback) => {
    return db.query(`DELETE FROM \`applications\` WHERE \`_id\` = ${appId} `, callback)
}

exports.getPairedMachines = (appId, callback) => {
    return db.query(`SELECT * FROM \`applicationsVm\` WHERE \`applicationId\` = ${appId} `, callback)
}

exports.updateApplication = (update, callback) => {
    let appId = update._id;
    let set = {
        code: update.code,
        label: update.label,
        comment: update.comment,
        domainId: update.domainId
    };
    let query = `UPDATE \`applications\` SET ? WHERE \`applications\`.\`_id\` = ${appId}`
    db.query(query, [set], callback);
}

exports.updatePairs = (appUpdate, callback) => {
    let query1 = `DELETE FROM \`applicationsVm\` WHERE \`applicationId\` = ${appUpdate._id}`;
    let updatedList = appUpdate.pairedMachines;
    db.query(query1, (err) => {
        if (err) throw err;
        let query = "INSERT INTO `applicationsVm` (`applicationId`, `machineId`, `runningService`) VALUES "
        for (let pair of updatedList) {
            sql_mw.get_machine_by_label(pair.machine, (err, machine)=> {
                if (err) throw err;
                let q = query + `('${appUpdate._id}', ${machine[0]._id}, '${pair.service}')`;
                db.query(q, (err)=>{
                    if (err) throw err
                })
            })
            
        }
        callback();
    })
}