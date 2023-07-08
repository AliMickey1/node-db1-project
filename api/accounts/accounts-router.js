const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await Account.getById(req.params.id)
    res.json(account)

  // try { 
  // const accounts = await Account.getById(req.params.id)
  //     res.json(accounts)
  // }
  // catch(err) {
  //   next(err)
  // }
    
})

router.post('/', 
md.checkAccountPayload, md.checkAccountNameUnique,
  async (req, res, next) => {
  // DO YOUR MAGIC
   try {
    const newAccount = await Account.create({
      name: req.body.name.trim(),
      budget: req.body.budget,
    })
    res.status(201).json(newAccount)
    } catch (err) {
      next(err)
    }
})



router.put('/:id', md.checkAccountPayload, async (req, res, next) => {
  try {
    const existing = await Account.getById(req.params.id)
    if(!existing) {
      res.status(404).json({ message: 'id does not exist' })
    }
    const updated = await Account.updateById(req.params.id, req.body)

    res.json(updated)
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC

  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }


    // const { id } = req.params

    //   Account.deleteById(id)
    //   .then(delAccount => {
    //     res.status(200).json(delAccount)
    //   })
    //   .catch(err)
        // err => {
        
        // res.status(400).json({ message: err.message })
      // })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
