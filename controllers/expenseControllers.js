const ExpenseSchema = require('../models/expenseModel')

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        //validations
        if(!title || !amount || !category || !description || !date)
            return res.status(400).json({message:'All the fields required data'})

        if(amount <= 0 || isNaN(amount))
            return res.status(400).json({message:'Enter only positive numbers'})

        await expense.save()
        console.log(expense)
        return res.status(200).json({message:"Expense updated successfully", expense})
    }catch(error){
        res.status(500).json({message:"Unable to update Expense data"})
    }
    
}
 
exports.getExpenses = async (req,res) => {
        try {
            const expenses = await ExpenseSchema.find().sort({createdAt : -1})
            console.log(expenses)
            res.status(200).json(expenses)
        } catch (error) {
              res.status(500).json({message:"Unable to get Expense date",error})          
        }
}

exports.deleteExpense = async(req,res) => {
            const {id} = req.params
            // console.log(req.params)
            await ExpenseSchema.findByIdAndDelete(id)
            .then(expense => {
                res.status(200).json({message:"Expense Deleted successfully",expense})
            })
            .catch(error => {
                res.status(500).json({message:"Unable to delete the Expense"})
            })
}
