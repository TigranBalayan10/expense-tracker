
Chart.defaults.font.size =24;
let labels1 = [
    'Fitness',
    'Groceries',
    'Mortgage/Rent',
    'Electricity',
    'Recreation',
    'clothing',
    'dining out',
    'drinks'
];
// This data needs to come from the database. 
let data1 = [30, 800, 2500, 115, 205, 200, 225, 305];
let colors1 = ['red', 'blue', 'orange', 'green', 'yellow', 'purple', 'brown', 'pink'];
let myChart1 = document.getElementById('myPieChart').getContext('2d');
let chart1 = new Chart(myChart1, {
    type: 'pie',
    data: {
        labels: labels1,
        datasets: [{
            data: data1,
            backgroundColor: colors1
        }]
    },
});

// Update values of labels
function updateLabel (event) {
    event.preventDefault();
    const newNum = document.querySelector('#expense').value.trim();
    data1[3] = newNum;
    chart1.update();
}
document.querySelector('#expense-change').addEventListener('submit', updateLabel);

// Add label with value
function addLabel (event) {
    event.preventDefault();
    const label = document.querySelector('#label').value.trim();
    const amount = document.querySelector('#amount').value.trim();
    const color = document.querySelector('#favcolor').value.trim();
    // labels1.push(label);
    // data1.push(amount);
    // colors1.push(color)
    // chart1.update();

    // send this new expsen to server/db
    fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label, amount, color })
    })
    .then(res => res.json())
    .then(data => {
        // data is an object, that includes all of the new state for chart
        Chart.update();
    })
    .catch(err => console.log(err));

}
document.querySelector('#add-label').addEventListener('submit', addLabel);

// //////////////////////BAR GRAPH///////////////////////////////
let labels2 = [
    'Fitness',
    'Groceries',
    'Mortgage/Rent',
    'Electricity',
    'Recreation',
    'clothing',
    'dining out',
    'drinks',
    'entertainment'
];
const data = {
labels: labels2,
datasets: [{
data: [65, 59, 80, 81, 156, 55, 40, 93, 91],
backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'

],
borderColor: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(54, 162, 235)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
],
borderWidth: 1
}]
};

let myChart2 = document.getElementById('myBarChart').getContext('2d');
let chart2 = new Chart(myChart2, {
    type: 'bar',
    data: data,
    options: {
    scales: {
        y: {
            beginAtZero: true
        }
    }
},
});