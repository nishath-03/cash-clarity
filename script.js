document.getElementById("financeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get user input values
    const salary = document.getElementById("salary").value;
    const fixedExpenses = document.getElementById("fixedExpenses").value;
    const variableExpenses = document.getElementById("variableExpenses").value;
    const savingsGoal = document.getElementById("savingsGoal").value;
    const debt = document.getElementById("debt").value;

    // Show loading text
    document.getElementById("responseSection").classList.remove("hidden");
    document.getElementById("result").innerText = "⏳ Generating financial advice...";

    // Send request to backend API
    fetch("http://localhost:5000/get-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            salary: salary,
            fixedExpenses: fixedExpenses,
            variableExpenses: variableExpenses,
            savingsGoal: savingsGoal,
            debt: debt
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = data.suggestion;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "❌ AI service is unavailable.";
    });
});
