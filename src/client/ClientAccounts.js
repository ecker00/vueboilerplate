import Blunder from '../Blunder'
import axios from 'axios'

export default {
  getAccounts () {
    this.isLoading += 1
    axios.post('/api', {
      getAccounts: {}
    })
      .then(result => {
        this.accounts = result.data
        this.isLoading -= 1
        this.errors = {}
      })
      .catch(result => {
        throw Blunder.error(this, result)
      })
  }
}
