var UserGroup = require('../models/userGroups');

UserGroup.sync({force: true}).then(() => {
    // Table created
    return UserGroup.create({
      groupName :'stylist',
    });
  });

  UserGroup.findAll().then(userGroups => {
    console.log(userGroups)
  });