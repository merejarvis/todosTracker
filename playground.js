const {extractTime, verifyDate, dateFormat, dateDiff, extractDate} = require('./helper')

let stringBreak = (input) => {
    let obj = {}
    obj.string = input
    let arr = input.split(' ')
    let activity = ''
    let location = '' 
    let date = ''
    
    if (!arr.includes('at')) {
        return obj
    }

    // info extraction order: activity, time, date, location
    // 1. activity 
    let result = input.split(' at ')
    activity = result.shift()
    obj.activity = activity

    // 2. time 
    result = result.join(' ').trim().split(' ')
    obj.time = extractTime(result)

    // 3. date 
    date = extractDate(result)
    // use moment to check if date is valid and in correct format for db
    if(!verifyDate(date)){
        date = 'invalid date'
    }
    obj.date = date

    // 4. location
    result = result.filter((elem) => {
        return !['in', 'on', 'at', ''].includes(elem.toLowerCase())
    })
    
    obj.location = result.join(' ')
    console.log(obj);
    return obj
}


stringBreak('join wedding party at Raffles in 7 apr at 1pm')
stringBreak('go swimming at Community Centre 9am tomorrow')
stringBreak('dinner at zoo tomorrow 8pm ')




