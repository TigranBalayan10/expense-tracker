let tagId;
async function tagUserData () {
    const response = await fetch('/api/users/loggedin', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });
    const userData = await response.json()
    console.log(await userData)
    const userId = await userData.id;
    id = await userId;
};
tagUserData();

// Edit expenses
async function editProduct(event) {
  event.preventDefault();
  const product_name = document.querySelector("#edit-product").value.trim();
  const price = document.querySelector("#edit-price").value.trim();
  const tag_color = document.querySelector("#edit-tag_color").value;

  let tagId = document.getElementById("tag").value;

  await fetch(`/api/products/1`, {
    method: "PUT",
    body: JSON.stringify({
      product_name,
      price,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const response = await fetch(`/api/tags/${tagId}`, {
    method: "PUT",
    body: JSON.stringify({
      tagId,
      tag_color,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.reload();
  }
}

function editClick (event){
  // Get the data from the list item
  const btn = event.target;
  const productPrice = btn.previousElementSibling.childNodes[1].innerHTML;
  const tagName = btn.previousElementSibling.previousElementSibling.innerHTML;
  const date =
    btn.previousElementSibling.previousElementSibling.previousElementSibling
      .innerHTML;
}

// Add click event listeners to all buttons
const buttons = document.getElementsByClassName("product-edit-btn");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", editClick);
}

// Delete product
async function deleteProduct(event) {
  // Get the prodcut ID
  const productId = document.getElementById('edit-product').value;
  console.log(productId);
  const response = await fetch(`/api/products/${productId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const deletedData = await response.json();
  console.log(deletedData)
  if(response.ok){
    updateExpenses();
    window.location.replace('/');
  }
}

async function updateExpenseDelete () {
  // Get user Id
  const response = await fetch(`/api/users/${id}`, {
    method: 'GET', 
    headers: { 'Content-Type': 'application/json'}
  });
  const userData = response.json();
  const currentIncome = userData.monthly_income;
  console.log(currentIncome)

}


// Add click event to edit and delete button
document
  .querySelector("#delete-product")
  .addEventListener("click", deleteProduct);
document.querySelector("#edit-expense").addEventListener("click", editProduct);

document.querySelector("#edit-expense").addEventListener("click", editProduct);
