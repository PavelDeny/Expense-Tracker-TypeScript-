"use strict";
let expenses = [];
const form = document.querySelector("#expense-form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");
const list = document.querySelector("#expense-list");
const totalDisplay = document.querySelector("#total");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const expense = {
        id: Date.now(),
        description: descriptionInput.value,
        amount: parseFloat(amountInput.value),
        category: categorySelect.value,
    };
    expenses.push(expense);
    renderExpenses();
    form.reset();
});
function renderExpenses() {
    list.innerHTML = "";
    let total = 0;
    expenses.forEach((expense) => {
        const li = document.createElement("li");
        li.innerText = `${expense.description} - $${expense.amount} [${expense.category}]`;
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.style.marginLeft = "1rem";
        deleteBtn.onclick = () => {
            expenses = expenses.filter((e) => e.id !== expense.id);
            renderExpenses();
        };
        li.appendChild(deleteBtn);
        list.appendChild(li);
        total += expense.amount;
    });
    totalDisplay.innerText = `Total: $${total}`;
}
