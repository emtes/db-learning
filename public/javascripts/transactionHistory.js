// give token to route that will return all transactions
window.addEventListener('load', async (e) => {
	const transactionsInit = {
		method: 'POST',
		headers: {
			token: localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
	}
	const req = await fetch('/transactions', transactionsInit)
	const transactions = await req.json()
	const cleanTransactions = transactions.map(transaction => {
		return {
			ticker: transaction.ticker,
			quantity: transaction.quantity,
			cost: transaction.cost.toFixed(2),
			date: transaction.date
		}
	})
	populateTable(cleanTransactions)
});

function populateTable(transactionsArr) {
	const tbody = document.getElementById('historyTableBody')
	for (let i = 0; i < transactionsArr.length; i++) {
		const row = document.createElement('tr')
		for (const prop in transactionsArr[i]) {
			const td = document.createElement('td')
			td.innerText = transactionsArr[i][prop]
			row.appendChild(td)
		}
		tbody.appendChild(row)
	}
}