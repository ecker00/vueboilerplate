const mongoose = require('mongoose')
const Joi = require('joi')

module.exports = function (API) {
  API.newAccount = function (res, input) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).max(30).required().label('Account name')
    })
    const validation = Joi.validate(input, schema)
    if (validation.error) return API.done(res, validation, {code: 422})

    const Accounts = mongoose.model('Accounts')
    return Accounts.create({
      userID: mongoose.Types.ObjectId('111111111111111111111111'),
      name: input.name
    }).then(() => {
      return API.done(res, { success: true })
    })
  }

  API.getAccounts = function (res, input) {
    const Accounts = mongoose.model('Accounts')
    return Accounts.find({
      userID: mongoose.Types.ObjectId('111111111111111111111111')
    })
      .then(result => {
        return API.done(res, result)
      })
      .catch(result => {
        return API.done(res, result, {code: 501})
      })
  }
  API.getAccount = function (res, input) {
    return API._validAccount(res, input)
      .then(() => {
        const Accounts = mongoose.model('Accounts')
        return Accounts.findOne({
          userID: mongoose.Types.ObjectId('111111111111111111111111'),
          _id: mongoose.Types.ObjectId(input.accountID)
        })
          .then(result => {
            return API.done(res, result)
          })
          .catch(result => {
            return API.done(res, result, {code: 404})
          })
      })
  }

  API._validAccount = function (res, input) {
    let accounts = API.getAccounts()
    return accounts.then((accounts) => {
      let accountIDs = accounts.map(acc => JSON.stringify(acc._id).slice(1, -1))
      const schema = Joi.object().keys({
        accountID: Joi.string().valid(accountIDs).required().label('Account')
      })
      const validation = Joi.validate({accountID: input.accountID}, schema)
      if (validation.error) {
        API.done(res, validation, {code: 422})
        return new Promise(() => {})
      }
    })
  }
}
