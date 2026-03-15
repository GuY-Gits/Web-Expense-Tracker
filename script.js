const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-items');
const totalAmountDisplay = document.getElementById('total-amount');

//Loads existing data from Local Storage (or start an empty array if none exists)
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

//Function to calculate and display the total amount
function updateTotal() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }
    totalAmountDisplay.innerText = total.toFixed(2);
}


function renderExpenses() {
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span><strong>${expense.name}</strong> (${expense.category})</span>
            <span>
                ₹${expense.amount.toFixed(2)}
                <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
            </span>
        `;
        // Add the new item to the actual webpage
        expenseList.appendChild(li);
    });
}

//Function triggered when the form is submitted
function addExpense(event) {
    event.preventDefault(); //Stops the page from refreshing


    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;

    const newExpense = { name, amount, category };

    // Push it into the array
    expenses.push(newExpense);

    // Save the updated array to the browser's permanent memory
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Update the screen
    renderExpenses();
    updateTotal();

    // Clear the typing boxes for the next entry
    expenseForm.reset();
}

//Function to delete an item
window.deleteExpense = function(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    updateTotal();
}


expenseForm.addEventListener('submit', addExpense);

//Run these functions immediately when the page first loads
renderExpenses();
updateTotal();