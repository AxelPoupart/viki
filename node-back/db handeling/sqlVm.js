const db = require('./start_cnx');


// Select all virtual machines
exports.get_all_vms = (callback) => {
    let query = 'SELECT * FROM `virtualMachines`';
    console.log(query);
    return db.query(query, callback)
}

// Post a new VM
exports.post_new_vm = (vm, callback) => {
    let set = vm
    let query = "INSERT INTO `virtualMachines` SET ?";
    console.log(query);
    return db.query(query, [set], callback)
}


// Delete a VM
exports.delete_vm = (Id, callback) => {
    let set = {_id : Id}
    let query = "DELETE FROM `virtualMachines` WHERE `_id` = ?";
    console.log(query);
    return db.query(query, Id, callback)
}

// Search a Vm by term (Label or Comment)
exports.get_vms_search = (term, callback) => {
    const new_term = "%" + term + "%";
    let query = 'SELECT * FROM `virtualMachines` WHERE `label` LIKE ? OR `comment` LIKE ?';
    console.log(query);
    return db.query(query, [new_term, new_term], callback)
}