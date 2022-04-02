//////////////////////BAR GRAPH///////////////////////////////
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

// datasets: [{
//     data: [65, 59, 80, 81, 156, 55, 40, 93, 91],
//     backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//         'rgba(255, 205, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(201, 203, 207, 0.2)'

//     ],
//     borderColor: [
//         'rgb(255, 99, 132)',
//         'rgb(255, 159, 64)',
//         'rgb(255, 205, 86)',
//         'rgb(75, 192, 192)',
//         'rgb(54, 162, 235)',
//         'rgb(54, 162, 235)',
//         'rgb(54, 162, 235)',
//         'rgb(153, 102, 255)',
//         'rgb(201, 203, 207)'
//     ],
//     borderWidth: 1
// }]
// };

const labels = ['Groceries', 'Mortgage', 'Dinining', 'Drinks', 'Clothes']

let myChart2 = document.getElementById('myBarChart').getContext('2d');
let chart2 = new Chart(myChart2, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Category Breakdown'
            }
        ]
    }
});