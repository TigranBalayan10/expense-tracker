Chart.defaults.font.size =18;
// This data comes from the database. 
let labels1 = [];
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
        console.log('sent to database')
    }
}
document.querySelector('#add-tag').addEventListener('submit', updateLabel);

// Add an expense to a pre-existing tag and reload the page to show changes. 
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
            // This will be dynamic with the handlebars. 
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
        console.log(data)
        data1.length = 0;
        labels1.length = 0;
        colors1.length = 0;
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
            data1.push( await totalExpense['products.total_price'])
            labels1.push( await tagName);
            colors1.push( await tagColor);
            console.log(totalExpense)
        }
    })
    .then(data => {
        chart1.update();
    })
}

document.querySelector('#add-expense').addEventListener('submit', addExpense);
reloadPage();