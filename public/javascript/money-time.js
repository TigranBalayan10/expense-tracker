let user_id;

async function grabUserData () {
    const response = await fetch('/api/users/loggedin', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });
    const userData = await response.json()
    const userId = await userData.id;
    user_id = userId;
};
grabUserData();

function daysTilFirst () {
    //Get data from current date 
    const newDate = new Date();
    const currentYear = newDate.getFullYear();
    const currentMonth = newDate.getMonth() + 1;
    // Get current day   
    const currentDay = newDate.getDate();
    // Determine amount of days in the month
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
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
// Run every second
setInterval(daysTilFirst, (1000));

// Reset money on the first
async function payDayCountdown () {
    // count for monthly bills
    let monthlyBills = 0;
    // Next midnight
    let nextMidnight = new Date();
    let now = new Date();
    nextMidnight.setHours(24,0,0,0);
    // Calculate time remaining
    let remainingTimeInSeconds = (nextMidnight.getTime() - now.getTime())/1000;
    // if it's within 3 seconds of midnight, run this: 
    if (remainingTimeInSeconds < 3) {
        let userData = await fetch(`/api/users/${user_id}`, {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json'}
        })
        userData = await userData.json();
        // Get monthly income
        const monthlyIncome = await userData.monthly_income;
        // Get all monthly bills
        let productsArray = await userData.products
        for(let i = 0; i < productsArray.length; i++) {
            if (productsArray[i].monthly_bill) {
                priceParsed = parseInt(productsArray[i].price)
                monthlyBills += await priceParsed;
            }
        }
        // These are the two numbers posted in the header. 
        totalExpenses = monthlyBills;
        remainingMoney = monthlyIncome - monthlyBills;
        let userUpdate = await fetch(`/api/users/${user_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                monthly_income: remainingMoney
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (userUpdate.ok) {
            userUpdate = await userUpdate.json(); 
        }
        // make a function that gets the remaining amount of money before reset, saves it, and line-graphs it. 
    }
}

// Set date 
function currentDate () {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const year = now.getFullYear();

    const todayDate = `${month}/${date}/${year}`;
    document.querySelector('#todays-date').innerHTML = `Today's Date: ${todayDate}`;
}
currentDate();