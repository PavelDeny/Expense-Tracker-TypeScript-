// app.ts — основной файл логики приложения Expense Tracker
// Здесь будет реализована вся бизнес-логика: добавление, удаление, отображение расходов
// Этот файл компилируется в app.js, который подключается в index.html

// Пример: выводим приветствие в консоль, чтобы убедиться, что скрипт работает
console.log('Expense Tracker App запущен!');

type Category = "food" | "transport" | "entertainment" | "other";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: Category;
}

let expenses: Expense[] = [];

const form = document.querySelector("#expense-form") as HTMLFormElement;
const descriptionInput = document.querySelector("#description") as HTMLInputElement;
const amountInput = document.querySelector("#amount") as HTMLInputElement;
const categorySelect = document.querySelector("#category") as HTMLSelectElement;
const list = document.querySelector("#expense-list") as HTMLUListElement;
const totalDisplay = document.querySelector("#total") as HTMLDivElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expense: Expense = {
    id: Date.now(),
    description: descriptionInput.value,
    amount: parseFloat(amountInput.value),
    category: categorySelect.value as Category,
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
