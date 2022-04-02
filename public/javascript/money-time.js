function daysTilFirst () {
    //Get data from current date 
    const newDate = new Date();
    const currentYear = newDate.getFullYear();
    const currentMonth = newDate.getMonth() + 1;
    const currentDay = newDate.getDate();
    // Get current day
    console.log(currentYear, currentMonth, currentDay);    
    // Determine amount of days in the month
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    console.log(daysInMonth)
    // Subtract total days in month by current day
    const countdownToFirst = daysInMonth - currentDay; 
    // document.querySelector('#countdown').innerHTML = countdownToFirst;
    const percentCountdown = (currentDay / daysInMonth) * 100;
    document.querySelector('#countdown-progress').value = percentCountdown;
    if (countdownToFirst == 1) {
        document.querySelector('#countdown').innerHTML = countdownToFirst + ' day';
    } else if(countdownToFirst == 0) {
        document.querySelector('#countdown').innerHTML = countdownToFirst + ' day';
        payDayCountdown();
    } else {
        document.querySelector('#countdown').innerHTML = countdownToFirst + ' days';

    }
}

daysTilFirst();
// Run every five miniutes
// setInterval(daysTilFirst, (1000));

// Reset money on the first
async function payDayCountdown () {
    // Next midnight
    let nextMidnight = new Date();
    nextMidnight.setHours(24,0,0,0);
    // Calculate time remaining
    let now = new Date();
    let remainingTimeInSeconds = (nextMidnight.getTime() - now.getTime())/1000;
    if (remainingTimeInSeconds < (1000*60*2)) {
        const response = await fetch('/api/users/1', {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json'}
        })
        const data = await response.json()
        console.log('midnight!');
    }
}


// Deduct monthly costs
function payBills () {

}