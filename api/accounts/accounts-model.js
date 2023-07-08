const db = require('../../data/db-config')

const getAll = () => {
  // resolves to an array of accounts (or an empty array)
  return db('accounts');
}

async function getById (id) {
  // resolves to an account by the given id
  const find = await db('accounts').where('id', id).first();
  return find
}

async function create (account) {
  // resolves to the newly created account
  const [id] = await db('acounts').insert(account)
  return getById(id)
}

async function updateById (id, account){
  // resolves to the updated account
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = id => {
  // resolves to the deleted account
  // const deletedAccount = await getById(id)
  return db('accounts').where('id', id).delete();
  // return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
