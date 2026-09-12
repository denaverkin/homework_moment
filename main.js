const express = require('express');
const moment = require('moment');

const app = express();
const PORT = 3000;

function getCurrentDay() {
    return moment().format('dddd');
}

function getCurrentMonth() {
    return moment().format('MMMM');
}

function getCurrentYear() {
    return moment().format('YYYY');
}

function getCurrentDate() {
    return moment().format('dddd, MMMM D, YYYY');
}

function isWeekend() {
    if (moment().day() === 0 || moment().day() === 6) {
        return 'Today is a weekend';
    } else {
        return 'Today is a weekday';
    }
}

function getDaysUntilNewYear() {
    return `${moment([moment().year() + 1, 0]).diff(moment(), 'days')} days until New Year`;
}

function getAge(birthDate) {
    return `You are ${moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years')} years old`;
}

function getDaysUntilBirthday(birthDate) {
    let bdate = moment(birthDate);
    let nextBday = moment([moment().year(), bdate.month(), bdate.date()]);
    
    if (nextBday.isBefore(moment(), 'day')) {
        nextBday.add(1, 'year');
    }

    return `${nextBday.diff(moment().startOf('day'), 'days')} days until your birthday`;
}

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/stats', (req, res) => {
    const testBirthDate = "2005-12-20"; 

    res.status(200).json({
        uptime: Math.floor(process.uptime()),
        nodeVersion: process.version,
        timestamp: new Date().toISOString(),
        
        currentDay: getCurrentDay(),
        currentMonth: getCurrentMonth(),
        currentYear: getCurrentYear(),
        fullDate: getCurrentDate(),
        weekPeriod: isWeekend(),
        countdownNewYear: getDaysUntilNewYear(),
        ageDetails: getAge("2005-04-15"),
        countdownBirthday: getDaysUntilBirthday(testBirthDate)
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});
