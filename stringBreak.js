const {extractTime, verifyDate, dateFormat, dateDiff, extractDate} = require('./helper')

let stringBreak = (input) => {
    let obj = {}
    obj.userId = 1
    obj.input = input
    let activity
    let location 
    let date
    
    // info extraction order: time, date, activity, location
    // 1. time
    let result = input.split(' ')
    obj.time = extractTime(result)

    // 2. date
    date = extractDate(result)
    if(!verifyDate(date)){
        date = null
    }
    obj.date = date

    // 3. activity 
    if (result.includes('at')) {
        result = result.join(' ').split(' at ')
    } else if(result.includes('on')) {
        result = result.join(' ').split(' on ')
    } else {
        result = [result.join(' ')]
    }
   
    activity = result.shift().trim()
    activity = activity.split(' ').filter((elem) => {
        return !['in', 'on', 'at', ''].includes(elem.toLowerCase())
    }).join(' ')
    obj.activity = (activity === '')? null: activity

    // 4. location
    result = result[0].split(' ').filter((elem) => {
        return !['in', 'on', 'at', 'this', ''].includes(elem.toLowerCase())
    })

    if(result.length) {
        obj.location = result.join(' ').toLowerCase()
    }

    return obj
}

module.exports = {stringBreak}


