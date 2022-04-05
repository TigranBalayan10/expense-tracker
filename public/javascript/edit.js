// let tagId;
// async function tagUserData () {
//     const response = await fetch('/api/users/loggedin', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json'}
//     });
//     const userData = await response.json()
//     console.log(await userData)
//     const userId = await userData.id;
//     id = await userId;
// };

// tagUserData();


// Edit expenses
async function editProduct(event) {
  event.preventDefault();
  const product_name = document.querySelector("#edit-product").value.trim();
  const price = document.querySelector("#edit-price").value.trim();
  const tag_color = document.querySelector("#edit-tag_color").value;

  
  let tagId = document.getElementById("tag").value;
  console.log(tagId);


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

document.querySelector("#edit-expense").addEventListener("click", editProduct);
