const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://myprojectname-mongo:27017/myprojectname', {
  useMongoClient: true
})
mongoose.connection.on('error', (err) => {
  console.error(err)
})
process.on('SIGINT', () => { // Close DB when node exit
  mongoose.connection.close(() => { process.exit(0) })
})

// Create database schemas
const AccountsSchema = new mongoose.Schema({
  userID: mongoose.Schema.Types.ObjectId,
  name: String
})
mongoose.model('Accounts', AccountsSchema)
