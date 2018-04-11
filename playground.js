const {day, month} = require('./keywords')
const moment = require('moment')

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
    var result = input.split(' at ')
    activity = result.shift()
    obj.activity = activity

    // 2. time 
    result = result.join(' ').trim().split(' ')
    obj.time = extractTime(result)

    // 3. date 
    for (let i = 0; i<result.length; i++) {
        result[i] = result[i].toLowerCase()
        // logic for dd-mm-yyyy
        if (result[i].match(/[0-9]?\d-[0-9]?\d-\d\d\d\d/)){
            date = dateFormat(result[i])
            result.splice(i, 1)
            break
        }
        // logic for dd-mm-yy
        if (result[i].match(/[0-9]?\d-[0-9]?\d-\d\d/)){
            date = result[i].split('-')
            date[2] = '20' + date[2]
            date = date.join('-')
            date = dateFormat(date)
            result.splice(i, 1)
            break
        }
        // logic for dd/mm/yyyy
        if (result[i].match(/[0-9]?d\/[0-9]?\d\/\d\d\d\d/)) {
            date = result[i].replace(/\//g, '-')
            date = dateFormat(date)
            result.splice(i, 1)
            break 
        }
        // logic for dd/mm/yy
        if (result[i].match(/[0-9]?\d\/[0-9]?\d\/\d\d/)) {
            date = result[i].split('/')
            date[2] = '20' + date[2]
            date = date.join('-')
            date = dateFormat(date)
            result.splice(i, 1)
            break
        }
        // logic for DD MONTH YYYY && DD MONTH format
        if (month[result[i]]) {
            if (parseInt(result[i-1]) <= 31 && parseInt(result[i+1]) >= 2018){
                date = `${result[i+1]}-${month[result[i]]}-${result[i-1]}`
                result.splice(i-1, 3)
                break
            } else if (parseInt(result[i-1]) <= 31) {
                // year unspecified, check if date has passed for current year
                let currentDate = new Date().getDate()
                let currentMonth = new Date().getMonth() + 1
                let currentYear = new Date().getFullYear()

                if (currentMonth > parseInt(month[result[i]]) || (currentMonth === parseInt(month[result[i]]) && currentDate > parseInt(result[i-1])) ) {
                    if (parseInt(result[i-1]) < 10){
                        date = `${currentYear + 1}-${month[result[i]]}-0${result[i-1]}`
                    } else {
                        date = `${currentYear + 1}-${month[result[i]]}-${result[i-1]}`
                    }
                    result.splice(i-1, 2)
                    break
                } else {
                    if (parseInt(result[i-1]) < 10){
                        date = `${currentYear}-${month[result[i]]}-0${result[i-1]}`
                    } else {
                        date = `${currentYear}-${month[result[i]]}-${result[i-1]}`
                    }
                    result.splice(i-1, 2)
                    console.log('dato', date);
                    break
                }
            }
        }
        //logic to handle words such as Sunday, tomorrow
        if(day[result[i]]) {

        }
    }
    result = result.join(' ').trim().split(' ')
    console.log(result);

    if(!verifyDate(date)){
        date = 'invalid date'
    }
    obj.date = date

    // 4. location
  
    
    console.log(obj);
    return obj
}

function extractTime (result) {
    let time = ''

    for (let i = 0; i < result.length; i++) {
        if (result[i].match(/\d+a?p?m/i)) {
            time = result.splice(i, 1)[0]
        }
    }

    if (time === '12am') {
        time = '00:00'
    } else if (time === '12pm') {
        time = '12:00'
    } else if (time.includes('am')){
        time = time.replace(/a?p?m/i, '')
    } else if (time.includes('pm')){
        time = (parseInt(time.replace(/a?p?m/i, '')) + 12).toString()
    }
    
    if (time.length === 1) {
        time = `0${time}:00`
    } else if (time.length === 2){
        time = `${time}:00`
    }

    return time
}

function verifyDate (date) {
    return moment(date, "YYYY-MM-DD", true).isValid()
}

function dateFormat (date) {
    date = date.split('-').reverse()
    let arr = []
    for (let elem of date) {
        if (elem.length === 1) {
            elem = '0' + elem.toString()
        }
        arr.push(elem)
    }
    return arr.join('-')
}


stringBreak('join wedding party at Raffles in 2/3/18 at 1pm')
stringBreak('go swimming at Community Centre 9am tomorrow')