const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeControllers')
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expenseControllers')

const router = require('express').Router()

// router.get('/',(req,res)=>{
//     res.send('Welcome')
// })

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expenses', addExpense)
    .get('/get-expense', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router
