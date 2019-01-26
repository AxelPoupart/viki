
const db = require('../../db handeling/start_cnx');

let query = "INSERT INTO `privileges` (`_id`, `label`, `description`) VALUES ('1', 'sysadmin', ''), ('2', 'ingesys', ''), ('3', 'visiteur', '')"

db.query(query, () => db.end())