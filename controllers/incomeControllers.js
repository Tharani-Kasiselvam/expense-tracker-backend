const IncomeSchema = require('../models/IncomeModel')

exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const income = IncomeSchema({
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

        await income.save()
        console.log(income)
        return res.status(200).json({message:"Income updated successfully", income})
    }catch(error){
        res.status(500).json({message:"Unable to update Income data"})
    }
    
}
 
exports.getIncomes = async (req,res) => {
        try {
            const incomes = await IncomeSchema.find().sort({createdAt : -1})
            console.log(incomes)
            res.status(200).json(incomes)
        } catch (error) {
              res.status(500).json({message:"Unable to get income date",error})          
        }
}

exports.deleteIncome = async(req,res) => {
            const {id} = req.params
            // console.log(req.params)
            await IncomeSchema.findByIdAndDelete(id)
            .then(income => {
                res.status(200).json({message:"Income Deleted successfully",income})
            })
            .catch(error => {
                res.status(500).json({message:"Unable to delete the income"})
            })
}
