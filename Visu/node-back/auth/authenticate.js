const users = require("./users.json");

module.exports = authenticate;

async function authenticate(req, res, next) {
     username, password =req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
