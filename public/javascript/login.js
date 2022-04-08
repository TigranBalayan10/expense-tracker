async function loginFormHandler(event) {
  event.preventDefault();

  const login = document.querySelector("#floatingInput").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();
  const userEl = document.querySelector("#user-el");
  const loginEl = document.querySelector("#floatingInput")
  if (login && password) {


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
      loginEl.setAttribute("class", "form-control is-invalid");
      loginEl.setAttribute("aria-describedby", "validationServer04Feedback");
      loginEl.setAttribute("required", "true");
      const invalidUserPass = document.createElement('div');
      invalidUserPass.setAttribute("id", "validationServer04Feedback");
      invalidUserPass.setAttribute("class", "invalid-feedback");
      invalidUserPass.innerHTML = "Invalid Username or Password!";
      userEl.appendChild(invalidUserPass);
    }
  }
}

document.querySelector("#login").addEventListener("click", loginFormHandler);