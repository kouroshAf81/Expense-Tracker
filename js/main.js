let transactionType = document.querySelector('.transaction-type')
let transactionTypeChoice = transactionType.querySelectorAll('p')
let chooseTransactionType = document.querySelector('.transaction-number span')
let addBtn = document.querySelector('.transaction button')
let transactionCategory = document.querySelector('.transaction-category')
let budget = document.querySelector('.budget p')

// Add transaction 

const addTransaction = () => {
    let titleValue = document.querySelector('.transaction-title input').value
    let numberValue = parseInt(document.querySelector('.transaction-number input').value)
    let container = document.querySelector('.income-expense')
    let addIncome = container.querySelector('.income')
    let addExpense = container.querySelector('.expense')
    if (!Number(numberValue))
        return alert('Enter a Number')

    let item = document.createElement('div')

    let title = document.createElement('p')
    title.innerText = titleValue

    let number = document.createElement('p')
    number.classList.add('outcome-number')

    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    number.innerText = `${numberValue}$`
    number.insertBefore(deleteBtn, number.firstChild)

    item.appendChild(title)
    item.appendChild(number)

    switch (chooseTransactionType.innerText) {
        case 'income':
            item.classList.add('income-item')
            addIncome.insertBefore(item,addIncome.firstChild)
            break
        case 'expense':
            let categoryOption = document.querySelector('select')
            if (categoryOption.value) {
                let span = document.createElement('span')
                span.classList.add('category')
                span.innerText = categoryOption.value
                item.appendChild(span)
            }
            item.classList.add('expense-item')
            addExpense.insertBefore(item,addExpense.firstChild)
            break
        default:
            return
    }

    // execute when the transaction deleted
    deleteItem()
    // update budget
    showBudget()
}

addBtn.addEventListener('click', addTransaction)



// delete transaction 

const deleteItem = () => {
    let getDeleteBtn = document.querySelectorAll('.outcome-number button')
    getDeleteBtn.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentElement.parentElement.remove()
            // update budget
            showBudget()
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

// show budget when user add or delete transaction

const showBudget = () => {
    let incomeArray = []
    let expenseArray = []
    let incomes
    let expenses
    if (document.querySelectorAll('.income .outcome-number')) {
        incomes = document.querySelectorAll('.income .outcome-number')
        incomes.forEach((item, index) => {
            incomeArray.push(parseInt(incomes[index].innerText.split('$')[0]))
        })
    }

    if (document.querySelectorAll('.expense .outcome-number')) {
        expenses = document.querySelectorAll('.expense .outcome-number')
        expenses.forEach((item, index) => {
            expenseArray.push(parseInt(expenses[index].innerText.split('$')[0]))
        })
    }
    let sum = incomeArray.reduce((total, current) => {
        return total + current
    }, 0)
    let sub = expenseArray.reduce((total, current) => {
        return total - current
    }, 0)
    budget.innerText = `your Budget: ${sum + sub}$`
}





