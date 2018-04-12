const {extractTime, verifyDate, dateFormat, dateDiff, extractDate} = require('./helper')

let stringBreak = (input) => {
    let obj = {}
    obj.userId = 1
    obj.input = input
    let arr = input.split(' ')
    let activity
    let location 
    let date
    
    if (!arr.includes('at')) {
        return obj
    }

    // info extraction order: activity, time, date, location
    // 1. activity 
    let result = input.split('at ')
    activity = result.shift().trim()
    if (activity === '') {
        activity = null
    }
    obj.activity = activity

    // 2. time 
    result = result.join(' ').trim().split(' ')
    obj.time = extractTime(result)

    // 3. date 
    date = extractDate(result)
    // use moment to check if date is valid and in correct format for db
    if(!verifyDate(date)){
        date = null
    }
    obj.date = date

    // 4. location
    result = result.filter((elem) => {
        return !['in', 'on', 'at', ''].includes(elem.toLowerCase())
    })
    
    if(result.length) {
        obj.location = result.join(' ')
    }
   
    console.log(obj);
    return obj
}

module.exports = {stringBreak}


