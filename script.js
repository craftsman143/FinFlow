// ===============================
// FINFLOW CASH FLOW FUNCTIONALITY
// ===============================

// Load saved data
let transactions = JSON.parse(localStorage.getItem("finflowData")) || [];

// DOM Elements
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const listEl = document.getElementById("transactionList");
const forecastEl = document.getElementById("forecast");

// Add transaction
function addTransaction(type) {
    const amount = Number(document.getElementById("amount").value);
    const desc = document.getElementById("description").value;

    if (amount <= 0 || desc === "") {
        alert("Please enter valid data");
        return;
    }

    const transaction = {
        id: Date.now(),
        type,
        amount,
        desc
    };

    transactions.push(transaction);
    saveData();
    updateUI();
    clearInputs();
}

// Save to localStorage
function saveData() {
    localStorage.setItem("finflowData", JSON.stringify(transactions));
}

// Update UI
function updateUI() {
    listEl.innerHTML = "";
    let income = 0;
    let expense = 0;

    transactions.forEach(tx => {
        const li = document.createElement("li");
        li.textContent = `${tx.desc} - ₹${tx.amount}`;
        li.className = tx.type;
        listEl.appendChild(li);

        tx.type === "income" ? income += tx.amount : expense += tx.amount;
    });

    const balance = income - expense;
    balanceEl.textContent = `₹${balance}`;
    incomeEl.textContent = `₹${income}`;
    expenseEl.textContent = `₹${expense}`;

    calculateForecast(income, expense);
}

// Simple 30-day forecast
function calculateForecast(income, expense) {
    const netMonthly = income - expense;
    const forecast = netMonthly * 1; // 30 days
    forecastEl.textContent = `₹${forecast}`;
}

// Clear form
function clearInputs() {
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
}

// Initial load
updateUI();
