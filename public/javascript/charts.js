

Chart.defaults.font.size =18;
let labels1 = [];
// This data needs to come from the database. 
let data1 = [];
let colors1 = [];
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
        alert('sent to database')
    }

}
document.querySelector('#add-tag').addEventListener('submit', updateLabel);

// Add label with value
function addExpense (event) {
    event.preventDefault();
    const tag_id = document.querySelector('#tag').value;
    const product_name = document.querySelector('#item').value.trim();
    const price = document.querySelector('#price').value.trim();

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
            // we'll get this from the sessions
            user_id: 1
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        reloadPage();
        // I need array of all Tags, total_amount, colors
        // Chart.update();
    })
    .catch(err => console.log(err));
}
function reloadPage () {
    fetch('/api/users/2', {
        method: 'GET'
    })
    .then(tagInfo => tagInfo.json())
    .then(async data => {
        console.log(data)
        data1.length = 0;
        labels1.length = 0;
        colors1.length = 0;
        let allProducts= data.products
        for(let i = 0; i < allProducts.length; i++) {
            let tagId = allProducts[i].tag.id;
            let tagColor = allProducts[i].tag.tag_color;
            let tagName = allProducts[i].tag.tag_name;
            // push all labels into labels array
            const totalCall = await fetch(`/api/products/total/${tagId}`, {
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' }
            })
            const totalExpense = await totalCall.json();
            data1.push( await totalExpense[0].total_price)
            labels1.push( await tagName);
            colors1.push( await tagColor);
        }
    })
    .then(data => {
        chart1.update();
    })
}
reloadPage();


document.querySelector('#add-expense').addEventListener('submit', addExpense);

// //////////////////////BAR GRAPH///////////////////////////////
// let labels2 = [
//     'Fitness',
//     'Groceries',
//     'Mortgage/Rent',
//     'Electricity',
//     'Recreation',
//     'clothing',
//     'dining out',
//     'drinks',
//     'entertainment'
// ];
// const data = {
// labels: labels2,
// datasets: [{
// data: [65, 59, 80, 81, 156, 55, 40, 93, 91],
// backgroundColor: [
//     'rgba(255, 99, 132, 0.2)',
//     'rgba(255, 159, 64, 0.2)',
//     'rgba(255, 205, 86, 0.2)',
//     'rgba(75, 192, 192, 0.2)',
//     'rgba(54, 162, 235, 0.2)',
//     'rgba(153, 102, 255, 0.2)',
//     'rgba(153, 102, 255, 0.2)',
//     'rgba(153, 102, 255, 0.2)',
//     'rgba(201, 203, 207, 0.2)'

// ],
// borderColor: [
//     'rgb(255, 99, 132)',
//     'rgb(255, 159, 64)',
//     'rgb(255, 205, 86)',
//     'rgb(75, 192, 192)',
//     'rgb(54, 162, 235)',
//     'rgb(54, 162, 235)',
//     'rgb(54, 162, 235)',
//     'rgb(153, 102, 255)',
//     'rgb(201, 203, 207)'
// ],
// borderWidth: 1
// }]
// };

// let myChart2 = document.getElementById('myBarChart').getContext('2d');
// let chart2 = new Chart(myChart2, {
//     type: 'bar',
//     data: data,
//     options: {
//     scales: {
//         y: {
//             beginAtZero: true
//         }
//     }
// },
// });