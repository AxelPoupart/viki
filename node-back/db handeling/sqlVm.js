const db = require('./start_cnx');


// Select all virtual machines
exports.get_all_vms = (callback) => {
    let query = 'SELECT * FROM `virtualMachines`';
    return db.query(query, callback)
}

// Post a new VM
exports.post_new_vm = (vm, callback) => {
    let set = vm
    let query = "INSERT INTO `virtualMachines` SET ?";
    return db.query(query, [set], callback)
}


// Delete a VM
exports.delete_vm = (Id, callback) => {
    let set = {_id : Id}
    let query = "DELETE FROM `virtualMachines` WHERE `_id` = ?";
    return db.query(query, Id, callback)
}

exports.getPairedApps = (machineId, callback) => {
    return db.query(`SELECT * FROM \`applicationsVm\` WHERE \`machineId\` = ${machineId} `, callback)
} 