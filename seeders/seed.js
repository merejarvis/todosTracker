const db = require('../models/index')   

db.todo.bulkCreate([
    {
        string: 'meet zorg at kopitiam woodlands on 13 April at 9am',
        activity: 'meet zorg',
        location: 'kopitiam woodlands',
        date: '2018-04-13',
        time: '09:00'
    },
    {
        string: 'fishing at pasir ris park on 14 April at 8pm',
        activity: 'fishing',
        location: 'pasir ris park',
        date: '2018-04-14',
        time: '20:00'
    },
    {
        string: 'study chap 3, 4, 5 at home on 15 April at 7am',
        activity: 'study chap 3, 4, 5',
        location: 'home',
        date: '2018-04-15',
        time: '07:00'
    },
    {
        string: 'meeting comrades at cafe on 16 April at 2pm',
        activity: 'meeting comrades',
        location: 'cafe',
        date: '2018-04-16',
        time: '14:00'
    },
    {
        string: 'lib date at nlb on 16 April at 10am',
        activity: 'lib date',
        location: 'nlb',
        date: '2018-04-16',
        time: '10:00'
    }
]).then(function(data) {
    console.log(data.dataValues);
});