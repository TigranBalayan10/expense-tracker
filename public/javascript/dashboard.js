async function addExpense(event) {
  event.preventDefault();

  const product = document.querySelector("#product-input").value.trim();
  const price = document.querySelector("#price-input").value.trim();
  const index = document.querySelector(".form-select").selectedIndex;
  const tag = document.querySelector(".form-select").options[index].text;
  
  console.log(product, price, tag);
  if (product && price && tag) {
    const response = await fetch("/dashboard", {
      method: "post",
      body: JSON.stringify({
        product,
        price,
        tag,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(response);
    } else {
      alert(response.statusText);
    }
  }
}

async function addTag(event) {
  event.preventDefault();

  const tag = document.querySelector("#add-tag").value.trim();
  console.log(tag);
  if (tag) {
    const response = await fetch("/dashboard", {
      method: "post",
      body: JSON.stringify({
        tag,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(response);
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#add-expense").addEventListener("click", addExpense);
document.querySelector("#add-tag-btn").addEventListener("click", addTag);
