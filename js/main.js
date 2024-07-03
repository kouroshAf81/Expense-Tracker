const transactionType = document.querySelector('.transaction-type')
const transactionTypeChoice = transactionType.querySelectorAll('p')
const chooseTransactionType = document.querySelector('.transaction-number span')
const addBtn = document.querySelector('.transaction button')
const transactionCategory = document.querySelector('.transaction-category')
const budget = document.querySelector('.budget p')
const container = document.querySelector('.income-expense')

// Create a formatter to convert numbers to USD currency format
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// Load previous transactions from localStorage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('data')) {
        loadFromLocalStorage();
    }
    deleteItem()
    updateBudget();
});

// Add transaction 
const addTransaction = () => {
    const titleValue = document.querySelector('.transaction-title input').value
    const numberValue = document.querySelector('.transaction-number input').value

    const targetContainer = chooseTransactionType.innerText === 'income' ?
        container.querySelector('.income') :
        container.querySelector('.expense');

    if (!Number(numberValue)) return alert('Enter a Number')

    createTransaction(titleValue, numberValue, targetContainer)

    // Executed when the transaction is deleted
    deleteItem()
    // Update budget
    updateBudget()
    saveToLocalStorage()
}

addBtn.addEventListener('click', addTransaction)

// Create new transaction elements
const createTransaction = (titleValue, numberValue, targetContainer) => {
    const item = document.createElement('div')
    const title = document.createElement('p')
    title.innerText = titleValue

    const number = document.createElement('p')
    number.classList.add('outcome-number')

    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    number.innerText = `${USDollar.format(numberValue)}`
    number.insertBefore(deleteBtn, number.firstChild)
    item.appendChild(title)
    item.appendChild(number)

    // Determine the type of transaction 
    switch (chooseTransactionType.innerText) {
        case 'income':
            item.classList.add('income-item')
            targetContainer.insertBefore(item, targetContainer.firstChild)
            break
        case 'expense':
            const categoryOption = document.querySelector('select')
            if (categoryOption.value) {
                const span = document.createElement('span')
                span.classList.add('category')
                span.innerText = categoryOption.value
                item.appendChild(span)
            }
            item.classList.add('expense-item')
            targetContainer.insertBefore(item, targetContainer.firstChild)
            break
        default:
            return
    }
}

// Delete transaction 

const deleteItem = () => {
    const getDeleteBtn = document.querySelectorAll('.outcome-number button')
    getDeleteBtn.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentElement.parentElement.remove()
            // Update budget
            updateBudget()
            saveToLocalStorage()
        })
    })
}

// executed when user selects the expense option

chooseTransactionType.addEventListener('click', () => {
    transactionType.classList.add('active')
})
transactionTypeChoice.forEach(choice => {
    choice.addEventListener('click', () => {
        chooseTransactionType.innerText = choice.innerText
        chooseTransactionType.innerText == 'expense' ? transactionCategory.style.display = 'flex' : transactionCategory.style.display = 'none'


        transactionType.classList.remove('active')
    })
})

// Update budget when user add or delete transactions
const updateBudget = () => {
    const income = document.querySelectorAll('.income .outcome-number') || false
    const expense = document.querySelectorAll('.expense .outcome-number') || false
    const incomeArray = []
    const expenseArray = []

    // Calculate total budget by summing income and subtracting expenses
    if (income) {
        income.forEach((item) => {
            incomeArray.push(parseFloat(item.innerText.replace(/[^0-9.-]+/g, "")))
        })
    }
    if (expense) {
        expense.forEach((item) => {
            expenseArray.push(parseFloat(item.innerText.replace(/[^0-9.-]+/g, "")))
        })
    }
    const sum = incomeArray.reduce((total, current) => {
        return total + current
    }, 0)
    const sub = expenseArray.reduce((total, current) => {
        return total - current
    }, 0)
    container.querySelector('.budget').innerText = `Your Budget: ${USDollar.format(sum + sub)}`

    saveToLocalStorage()

    document.querySelector('.transaction-number input').value = ''
}

// save in localStorage
const saveToLocalStorage = () => {
    localStorage.setItem('data', container.innerHTML)
}
const loadFromLocalStorage = () => {
    container.innerHTML = localStorage.getItem('data')
}