// Edit expenses
async function editProduct(event) {
  event.preventDefault();
  const product_name = document.querySelector("#edit-product").value.trim();
  const price = document.querySelector("#edit-price").value.trim();
  const tag_name = document.querySelector("#edit-tag").value.trim();
  const tag_color = document.querySelector("#edit-tag_color").value;
  //   const id = window.location.toString().split("/")[
  //     window.location.toString().split("/").length - 1
  //   ];

  await fetch(`/api/products/1`, {
    method: "PUT",
    body: JSON.stringify({
      product_name,
      price,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const response = await fetch(`/api/tags/1`, {
    method: "PUT",
    body: JSON.stringify({
      tag_name,
      tag_color,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.reload();
  }
}


document.querySelector("#edit-expense").addEventListener("click", editProduct);
