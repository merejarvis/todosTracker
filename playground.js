const {day, month} = require('./keywords')
const moment = require('moment')


let stringBreak = (input) => {
    let obj = {}
    obj.string = input
    let arr = input.split(' ')
    let activity = ''
    let location = '' 
    let date = ''
    let time = ''

    if (!arr.includes('at')) {
        return obj
    }
    // info extraction order: activity, time, date, location
    var result = input.split(' at ')
    activity = result.shift()
    obj.activity = activity

    result = result.join(' ').trim().split(' ')
    

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

    obj.time = time
    
    console.log(result);
    
    for (let i = 0; i<result.length; i++) {
        result[i] = result[i].toLowerCase()
        // logic for dd-mm-yyyy
        if (result[i].match(/\d\d-\d\d-\d\d\d\d/)){
            date = dateFormat(result[i])
            console.log('date', date);
            break
        }
        // logic for dd-mm-yy
        if (result[i].match(/\d\d-\d\d-\d\d/)){
            date = result[i].split('-')
            date[2] = '20' + date[2]
            date = date.join('-')
            date = dateFormat(date)
            console.log('date', date);
            break
        }
        // logic for dd/mm/yyyy
        if (result[i].match(/\d\d\/\d\d\/\d\d\d\d/)) {
            date = result[i].replace(/\//g, '-')
            date = dateFormat(date)
            console.log('date', date);
            break 
        }
        // logic for dd/mm/yy
        if (result[i].match(/\d\d\/\d\d\/\d\d/)) {
            date = result[i].split('/')
            date[2] = '20' + date[2]
            date = date.join('-')
            date = dateFormat(date)
            console.log('date', date);
            break
        }
        // logic for 12 march 2018 format
        if (month[result[i]]) {
            if (parseInt(result[i-1]) <= 31 && parseInt(result[i+1]) >= 2018){
                date = `${result[i+1]}-${result[i]}-${result[i-1]}`
                console.log('test', date);
                
            }
           
            
        }
        // logic for 12 march format

    }

    if(!verifyDate(date)){
        date = 'invalid date'
    }

    obj.date = date
    
    
    // logic for 12 march format
    // logic for tomm, this sunday, next sunday
    
    // console.log(obj);
    return obj
}

function verifyDate (date) {
    return moment(date, "YYYY-MM-DD", true).isValid()
}

function dateFormat (date) {
    return date.split('-').reverse().join('-')
}

stringBreak('join wedding party at Raffles in 12 March 2018 12/14/18 at 1pm')
stringBreak('go swimming at Community Centre 9am tomorrow')

// console.log(moment("2017-03-12", "YYYY-MM-DD", true).isValid());

