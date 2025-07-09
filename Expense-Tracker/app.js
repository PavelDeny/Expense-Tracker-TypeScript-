"use strict";
// app.ts — основной файл логики приложения Expense Tracker
// Здесь будет реализована вся бизнес-логика: добавление, удаление, отображение расходов
// Этот файл компилируется в app.js, который подключается в index.html
// Пример: выводим приветствие в консоль, чтобы убедиться, что скрипт работает
console.log('Expense Tracker App запущен!');
var expenses = [];
var form = document.querySelector("#expense-form");
var descriptionInput = document.querySelector("#description");
var amountInput = document.querySelector("#amount");
var categorySelect = document.querySelector("#category");
var list = document.querySelector("#expense-list");
var totalDisplay = document.querySelector("#total");
var filterSelect = document.querySelector("#filter");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var expense = {
        id: Date.now(),
        description: descriptionInput.value,
        amount: parseFloat(amountInput.value),
        category: categorySelect.value,
    };
    expenses.push(expense);
    renderExpenses();
    form.reset();
});
filterSelect.addEventListener("change", function () {
    renderExpenses();
});
function renderExpenses() {
    list.innerHTML = "";
    var total = 0;
    var filter = filterSelect.value;
    var filteredExpenses = filter === "all"
        ? expenses
        : expenses.filter(function (e) { return e.category === filter; });
    filteredExpenses.forEach(function (expense) {
        var li = document.createElement("li");
        li.innerText = "".concat(expense.description, " - $").concat(expense.amount, " [").concat(expense.category, "]");
        var deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.style.marginLeft = "1rem";
        deleteBtn.onclick = function () {
            expenses = expenses.filter(function (e) { return e.id !== expense.id; });
            renderExpenses();
        };
        li.appendChild(deleteBtn);
        list.appendChild(li);
        total += expense.amount;
    });
    totalDisplay.innerText = "Total: $".concat(total);
}
