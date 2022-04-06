async function loginFormHandler(event) {
  event.preventDefault();

  const login = document.querySelector("#floatingInput").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();
  if (login && password) {
    // const response = await fetch("/dashboard", {

    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        username: login,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log(response.statusText);
    }
  }
}

document.querySelector("#login").addEventListener("click", loginFormHandler);