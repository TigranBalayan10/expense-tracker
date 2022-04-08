// // Grab the req.session.user_id
let id;
async function grabUserData () {
    const response = await fetch('/api/users/loggedin', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });
    const userData = await response.json();
    const userId = await userData.id;
    id = await userId;
    await updateExpenses();
};
grabUserData();

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
            tag_color,
            user_id: id
        }),
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok) {
        tagAdded();
        setTimeout(function(){location.replace('/')}, 500);
    }
}
document.querySelector('#add-tag').addEventListener('submit', updateLabel);

// Add an expense to a pre-existing tag and reload the page to show changes. 
function addExpense (event) {
    event.preventDefault();
    const tag_id = document.querySelector('#tag2').value;
    const product_name = document.querySelector('#item').value.trim();
    const price = document.querySelector('#price').value.trim();
    const monthly_bill = document.querySelector('#monthly_bill').checked;

    // send this new expense to server/db
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            product_name, 
            tag_id,
            price,
            user_id: id,
            monthly_bill: monthly_bill
        })
    })
    .then(res => res.json())
    .then(data => {
        setTimeout(function(){window.location.replace('/')}, 500)
        expenseMade();
        updateExpenses();
    })
    .catch(err => console.log(err));   
}

// Reloads page with current data from the Database.
function reloadPage () {
    // User needs to be dynamic
    fetch(`/api/users/${id}`, {
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

async function updateExpenses () {
    // Empty array for all the products in same month
    let monthlyProducts = [];
    // Empty number where prices will be added to
    let monthlyTotal = 0;
    // Get all expenses prices of the current month. 
    const response = await fetch(`/api/products/monthly/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });
    const allProducts = await response.json();
    allProducts.forEach( product => {
        const date = new Date(product.createdAt);
        const createdMonth = date.getMonth() + 1;
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        if (createdMonth === currentMonth) {
            monthlyProducts.push(product);
        }
    });
    monthlyProducts.forEach(product => {
        const price = parseInt(product.price)
        monthlyTotal += price;
    });
    // This is where we get the total Expenses
    document.querySelector('#total_expenses').innerHTML = monthlyTotal;
    const response2 = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });
    userData = await response2.json();
    const monthlyIncome = await userData.monthly_income - monthlyTotal;
    document.querySelector('#remaining_income').innerHTML = monthlyIncome
    reloadPage();
}

document.querySelector('#add-expense').addEventListener('submit', addExpense);

// Sounds
function O(i) {
return typeof i === "object" ? i : document.getElementById(i);
}
function expenseMade() {
    O("add-tag-sound").volume = 0.7;
    O("add-tag-sound").play();
}
function tagAdded() {
    O("add-expense-sound").volume = 0.7
    O("add-expense-sound").play();
}