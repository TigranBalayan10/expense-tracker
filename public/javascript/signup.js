async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#floatingInput").value.trim();
    const monthly_income = document.querySelector("#floatingIncome").value.trim();
    const password = document.querySelector("#floatingPassword").value.trim();
    console.log(username, monthly_income, password);
    if (username && monthly_income && password) {
        const response = await fetch("api/users/signup", {
            method: "post",
            body: JSON.stringify({
                username,
                password,
                monthly_income,
            }),
            headers: { "Content-Type": "application/json" },
        });
        console.log(response);
        if (response.ok) {
            document.location.replace("/dashboard/");
            alert("Signup successful");
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector("#signup-form").addEventListener("click", signupFormHandler);