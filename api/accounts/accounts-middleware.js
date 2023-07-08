const db = require('./accounts-model')
const Account = require('./accounts-model') 

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  
  const error = { status: 400 }
  const name = req.body.name
  const budget = req.body.budget
  
  if(name === undefined || budget === undefined) {
    error.message = "name and budget are required" 
    next(error)
  }
  if(typeof name !== 'string') {
    error.message = "name of account must be a string"
    next(error)
  }
  if(name.trim().length < 3 || name.trim().length > 100) {
    error.message = "name of account must be between 3 and 100"
    next(error)
  }
  if(typeof budget !== 'number' || isNaN(budget)) {
    error.message = "budget of account must be a number"
    next(error)
  }
  if(budget < 0 || budget > 1000000) {
    error.message = "budget of account is too large or too small"
    next(error)
  }
  if(error.message) {
    next(error)
  }
  else{
    req.body.name = name.trim()
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
 
    const exists = await db('accounts').where('name', req.body.name.trim()).first()
  
    if(exists) {
      next(res.status(400).json({ message: "that name is taken" }))
    } else {
      next()
    }
  }
  catch (err) {
    next(err)
  }
}


exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({
        status: 404,
         message: "account not found", })
    } else {
      req.account = account
      next()
    }
  }
    catch(err) {
      next(err)
    }
}
