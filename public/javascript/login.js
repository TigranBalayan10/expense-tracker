async function loginFormHandler(event) {
  event.preventDefault();

  const login = document.querySelector("#floatingInput").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();
  console.log(login, password);
  if (login && password) {
    const response = await fetch("/login", {
      method: "post",
      body: JSON.stringify({
        login,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#floatingInput").value.trim();
  const income = document.querySelector("#floatiingIncome").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();
  console.log(username, income, password);
  if (username && income && password) {
    const response = await fetch("/signup", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        income,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      // document.location.replace("/dashboard/");
      alert("Signup successful");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#login").addEventListener("click", loginFormHandler);

document
  .querySelector("#signup-form")
  .addEventListener("click", signupFormHandler);
