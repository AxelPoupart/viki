const db = require('./start_cnx');


// Select all virtual machines
exports.get_all_vms = (callback) => {
<<<<<<< HEAD
    let query = 'SELECT * FROM `virtual machines`';
=======
    let query = 'SELECT * FROM `Virtual Machines`';
>>>>>>> 26d11db5a0fac4895258f09f2360a16a8fbc8efb
    console.log(query);
    return db.query(query, callback)
}

// Post a new VM
exports.post_new_vm = (vm, callback) => {
    let set = vm
<<<<<<< HEAD
    let query = "INSERT INTO `virtual machines` SET ?";
=======
    let query = "INSERT INTO `Virtual Machines` SET ?";
>>>>>>> 26d11db5a0fac4895258f09f2360a16a8fbc8efb
    console.log(query);
    return db.query(query, [set], callback)
}


// Delete a VM
exports.delete_vm = (Id, callback) => {
    let set = {_id : Id}
<<<<<<< HEAD
    let query = "DELETE FROM `virtual machines` WHERE `_id` = ?";
=======
    let query = "DELETE FROM `Virtual Machines` WHERE `_id` = ?";
>>>>>>> 26d11db5a0fac4895258f09f2360a16a8fbc8efb
    console.log(query);
    return db.query(query, Id, callback)
}

// Search a Vm by term (Label or Comment)
exports.get_vms_search = (term, callback) => {
    const new_term = "%" + term + "%";
<<<<<<< HEAD
    let query = 'SELECT * FROM `virtual machines` WHERE `Label` LIKE ? OR `Comment` LIKE ?';
=======
    let query = 'SELECT * FROM `Virtual Machines` WHERE `Label` LIKE ? OR `Comment` LIKE ?';
>>>>>>> 26d11db5a0fac4895258f09f2360a16a8fbc8efb
    console.log(query);
    return db.query(query, [new_term, new_term], callback)
}