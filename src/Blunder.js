exports.error = function (that, result = {}) {
  // Stop loading
  if (that.hasOwnProperty('isLoading')) {
    if (typeof that.isLoading === 'boolean') {
      that.isLoading = false
    }
    if (typeof that.isLoading === 'number') {
      that.isLoading -= 1
    }
  }
  // Clear previous errors
  if (that.hasOwnProperty('errors')) {
    that.errors = {}
  } else if (that.hasOwnProperty('error')) {
    that.error = false
  }
  // Set new errors
  let showError = function (key, message) {
    if (that.hasOwnProperty('errors')) {
      that.errors[key] = message
    } else if (that.hasOwnProperty('error')) {
      if (that.error === false) {
        that.error = message
      }
    }
  }
  // Parse errors
  let response = result.response || {}
  let err = (response.data) ? response.data.error : false
  if (err && err.isJoi) {
    err.details.forEach(error => {
      if (that.hasOwnProperty('form') && that.form.hasOwnProperty(error.context.key)) {
        showError(error.context.key, error.message)
      } else {
        showError('generic', error.message)
      }
    })
    return (err.details[0].message, result)
  } else {
    if (response.status === 404) {
      showError('generic', err || 'Not found')
    } else if (response.status === 500) {
      showError('generic', err || 'Unknown API error')
      return ('Blunder 500 happend, here is result:', result)
    } else if (response.status === 501) {
      showError('generic', err || 'Unknown database error')
      return ('Blunder 501 happend, here is result:', result)
    } else if (response.status === 504) {
      showError('generic', err || 'The API crashed')
      return ('Blunder 504 happend, here is result:', result)
    } else {
      showError('generic', err || "Can't connect to the API server.")
      return ('Blunder XXX happend, here is result:', result)
    }
  }
}
