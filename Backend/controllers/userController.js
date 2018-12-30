var User = require('../models/users');

User.sync({force: true}).then(() => {
    // Table created
    return User.create({
      userName :'admin101',
      password : 'admin101',
      userGroupId : '1'
    });
  });

  User.findAll().then(user => {
    console.log(user)
  });