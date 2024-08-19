document.addEventListener('DOMContentLoaded', () => {
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpenseEl = document.getElementById('total-expense');
    const remainingBalanceEl = document.getElementById('remaining-balance');

    const transactionForm = document.getElementById('transaction-form');
    const transactionTableBody = document.querySelector('#transaction-table tbody');
    const spendingChartEl = document.getElementById('spending-chart');

    // Load transactions from local storage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Function to update the remaining balance
    function updateRemainingBalance() {
        const totalIncome = parseFloat(totalIncomeEl.value) || 0;
        const totalExpense = parseFloat(totalExpenseEl.value) || 0;
        const remainingBalance = totalIncome - totalExpense;

        remainingBalanceEl.value = remainingBalance.toFixed(2);
    }

    // Add event listeners for manual input changes to update remaining balance
    totalIncomeEl.addEventListener('input', updateRemainingBalance);
    totalExpenseEl.addEventListener('input', updateRemainingBalance);

    function updateTransactionTable() {
        transactionTableBody.innerHTML = '';
        transactions.forEach(t => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${t.type}</td>
                <td>$${t.amount.toFixed(2)}</td>
                <td>${t.date}</td>
                <td>${t.description}</td>
            `;
            transactionTableBody.appendChild(row);
        });
    }

    function updateChart() {
        const ctx = spendingChartEl.getContext('2d');
        const labels = transactions.map(t => t.description || t.date);
        const data = transactions.map(t => t.amount);

        if (window.spendingChart) {
            window.spendingChart.destroy();
        }

        window.spendingChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Spending Overview',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        const newTransaction = { type, amount, date, description };
        transactions.push(newTransaction);

        // Save transactions to local storage
        localStorage.setItem('transactions', JSON.stringify(transactions));

        transactionForm.reset();
        updateTransactionTable();
        updateChart();
    });

    // Initialize the dashboard
    updateTransactionTable();
    updateChart();
    updateRemainingBalance(); // Initial balance calculation
});
