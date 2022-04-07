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
let deleteProductId;
function editClick (event){
  // Get the data from the list item
  const btn = event.target;
  const productPrice = btn.previousElementSibling.childNodes[1].innerHTML;
  const productName = btn.previousElementSibling.previousElementSibling.children[0].innerHTML;
  const date = btn.previousElementSibling.previousElementSibling.previousElementSibling
      .innerHTML;

  const product = btn.previousElementSibling.previousElementSibling.previousElementSibling
  const productId = product.getAttribute("data-set-product-id");
  // set delete productID
  deleteProductId = productId;
  // Insert these values into the edit table
  console.log("product price " + productPrice);
  console.log("product name " + productName);
  console.log("date " + date);
  console.log("product ID " + productId)

  document.querySelector("#edit-product").value = productName;
  document.querySelector("#edit-price").value = productPrice;
}

// Add click event listeners to all buttons
const buttons = document.getElementsByClassName("product-edit-btn");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", editClick);
}

// Delete product
async function deleteProduct(event) {
  // Get the prodcut ID
  const product = document.getElementById('edit-product');
  const productId = product.getAttribute('data-set-product-id');
  console.log(productId);
  const response = await fetch(`/api/products/${deleteProductId}`, {
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

// Add click event to edit and delete button
document
  .querySelector("#delete-product")
  .addEventListener("click", deleteProduct);


document.querySelector("#edit-expense").addEventListener("click", editProduct);
