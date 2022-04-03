Chart.defaults.font.size =15;
Chart.defaults.color = '#000'
Chart.defaults.scale.ticks.beginAtZero = true
// This data comes from the database. 
let labels = [];
let chartData = [];
let colors = [];
let myChart1 = document.getElementById('myPieChart').getContext('2d');
// Pie Chart Configs
let chart1 = new Chart(myChart1, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            data: chartData,
            backgroundColor: colors,
            borderWidth: 1,
            hoverBorderWidth: 2,
            hoverBorderColor: '#000',
            borderColor: '#3d3d3d'
        }]
    },
    options: {
        animation: {
            animateScale: true
        },
        title: {
            display: true,

        }
    }
});

// Bar-chart Config
let myChart2 = document.getElementById('myBarChart').getContext('2d');
let chart2 = new Chart(myChart2, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
                label: 'My Expenses',
                data: chartData,
                backgroundColor: colors,
                borderColor: "#3d3d3d",
                borderWidth: 1
            }]
    },
    options: {
        indexAxis: 'y'
    }
});

// Update values of labels
async function updateLabel (event) {
    event.preventDefault();
    const tag_name = document.querySelector('#new_tag').value.trim();
    const tag_color = document.querySelector('#tag_color').value;

    const response = await fetch('/api/tags', {
        method: 'POST', 
        body: JSON.stringify({
            tag_name,
            tag_color
        }),
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok) {
        alert('Tag has been added')
    }
}
document.querySelector('#add-tag').addEventListener('submit', updateLabel);

// Add an expense to a pre-existing tag and reload the page to show changes. 
function addExpense (event) {
    event.preventDefault();
    const tag_id = document.querySelector('#tag').value;
    const product_name = document.querySelector('#item').value.trim();
    const price = document.querySelector('#price').value.trim();
    const monthly_bill = document.querySelector('#monthly_bill').checked;
    console.log('monthly ' + monthly_bill)

    // send this new expense to server/db
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            product_name,
            // This will be dynamic with the handlebars. 
            tag_id,
            price,
            // we'll get this from the sessions
            user_id: 1,
            monthly_bill: monthly_bill
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        updateIncome(data);
        reloadPage(); 
    })
    .catch(err => console.log(err));
}

// Reloads page with current data from the Database.
function reloadPage () {
    // User needs to be dynamic
    fetch('/api/users/1', {
        method: 'GET'
    })
    .then(tagInfo => tagInfo.json())
    .then(async data => {
        chartData.length = 0;
        labels.length = 0;
        colors.length = 0;
        let userId = data.id;
        let allTags= data.tags
        for(let i = 0; i < allTags.length; i++) {
            let tagId = await allTags[i].id;
            let tagColor = await allTags[i].tag_color;
            let tagName = await allTags[i].tag_name;
            const totalCall = await fetch(`/api/tags/total/${tagId}/${userId}`, {
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' }
            });
            const totalExpense = await totalCall.json();
            chartData.push( await totalExpense['products.total_price'])
            labels.push( await tagName);
            colors.push( await tagColor);
        }
    })
    .then(data => {
        chart1.update();
        chart2.update();
    })
}

async function updateIncome(data) {
    const response = await fetch('/api/users/1', {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    })
    const userData = await response.json();
    console.log( await userData);
    console.log( await data)
    console.log( await userData.monthly_income)
    // get price from expense
    const price = data.price;
    const currentIncome = userData.monthly_income
    const remainingMoney = currentIncome - price;
    let userUpdate = await fetch('/api/users/1', {
        method: 'PUT',
        body: JSON.stringify({
            monthly_income: remainingMoney
        }),
        headers: { 'Content-Type': 'application/json'}
    });
    userUpdate = await userUpdate.json();
    console.log( await userUpdate)
    // Attach the  Current Income here. 
    document.querySelector('#remaining_income').innerHTML = currentIncome;
    updateExpenses();
}


// How do I update total expenses? 
async function updateExpenses () {
    // empty array for all the products in same month
    let monthlyProducts = [];
    // empty number where prices will be added to
    let monthlyTotal = 0;
    // get all expenses prices of the current month. 
    const response = await fetch('/api/products/monthly/1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });
    const allProducts = await response.json();
    allProducts.forEach( product => {
        const date = new Date(product.createdAt);
        const createdMonth = date.getMonth() + 1;
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        console.log(createdMonth, currentMonth)
        if (createdMonth === currentMonth) {
            monthlyProducts.push(product);
        }
    });
    monthlyProducts.forEach(product => {
        const price = parseInt(product.price)
        monthlyTotal += price;
    });
    document.querySelector('#total_expenses').innerHTML = monthlyTotal;
    console.log(monthlyProducts)
    console.log( await allProducts);
    reloadPage();
}

document.querySelector('#add-expense').addEventListener('submit', addExpense);
reloadPage();