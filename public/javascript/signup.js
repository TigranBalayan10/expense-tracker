async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#floatingInput").value.trim();
    const monthly_income = document.querySelector("#floatingIncome").value.trim();
    const password = document.querySelector("#floatingPassword").value.trim();
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
        if (response.ok) {
            document.location.replace("/dashboard/");
        } else {
            console.log(response.statusText);
        }
    }
}

document.querySelector("#signup-form").addEventListener("click", signupFormHandler);