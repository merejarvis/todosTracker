const db = require('../models/index')  

db.user.bulkCreate([
    {
        email: 'abc@123.com',
        password: 'abc123'
    },
    {
        email: 'def@456.com',
        password: 'def456'
    }
]).then(function(data) {
    console.log(data.dataValues);
});

