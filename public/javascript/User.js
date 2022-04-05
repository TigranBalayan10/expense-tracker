// // const newUser = new User(grabUserData()) ??????
// class CurrentUser {
//     constructor(id) {
//         this.id = id
//     }
//     async addTag (event) {
//         event.preventDefault();
//         // is this valid? 
//         const tag_name = document.querySelector('#new_tag').value.trim();
//         const tag_color = document.querySelector('#tag_color').value;
//         const response = await fetch('/api/tags', {
//             method: 'POST', 
//             body: JSON.stringify({
//                 tag_name,
//                 tag_color,
//                 user_id: this.id
//             }),
//             headers: {'Content-Type': 'application/json'}
//         })
//         if(response.ok) {
//             tagAdded();
//         }
//     }
//     async addExpense (event) {
//         event.preventDefault();
//         const tag_id = document.querySelector('#tag').value;
//         const product_name = document.querySelector('#item').value.trim();
//         const price = document.querySelector('#price').value.trim();
//         const monthly_bill = document.querySelector('#monthly_bill').checked;
//         // send this new expense to server/db
//         fetch('/api/products', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ 
//                 product_name, 
//                 tag_id,
//                 price,
//                 user_id: id,
//                 monthly_bill: monthly_bill
//             })
//         })
//         .then(res => res.json())
//         .then(data => {
//             expenseMade();
//             updateIncome(data);
//         })
//         .catch(err => console.log(err));
//     };
// }
// // Does this work? what if I need a chain reaction?
// document.querySelector('#add-tag').addEventListener('submit');







