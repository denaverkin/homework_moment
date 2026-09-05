const moment = require('moment');
function getCurrentDay() {
    console.log(moment().format('dddd'))
}

function getCurrentMonth() {
    console.log(moment().format('MMMM'))
}

function getCurrentYear() {
    console.log(moment().format('YYYY'))
}

function getCurrentDate() {
    console.log(moment().format('dddd, MMMM D, YYYY'))
}

function isWeekend() {
    if (moment().day() === 0 || moment().day() === 6) {
        console.log('Today is a weekend')
    }
    else {
        console.log('Today is a weekday')
    }
}

function getDaysUntilNewYear() {
    console.log(String(moment([moment().year() + 1, 0]).diff(moment(), 'days')), 'days until New Year');
}

function getAge(birthDate) {
    console.log('You are',String(moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years')), 'years old')  

}

function getDaysUntilBirthday(birthDate) {
    let bdate = moment(birthDate);
    let nextBday = moment([moment().year(), bdate.month(), bdate.date()]);

    
    console.log(String(nextBday.diff(moment().startOf('day'), 'days')), 'days until your birthday');
}

getDaysUntilBirthday("2005-12-20")
getAge("2005-04-15")
getDaysUntilNewYear()
isWeekend()
getCurrentDate()
getCurrentYear()
getCurrentMonth()
getCurrentDay()