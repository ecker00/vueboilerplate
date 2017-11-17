<template lang="pug">
#app
  navbar
  section.section
    component(:is="currentView")
</template>

<script>
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import Accounts from './components/Accounts'
const NotFound = { template: '<p>Page not found</p>' }

const routes = {
  '#accounts': Accounts, // First key will be the default page
  '#loading': Loading
}

export default {
  name: 'app',
  components: {
    Navbar, Accounts
  },
  data () {
    let hash = window.location.hash || Object.keys(routes)[0]
    hash = hash.split('&')[0].split('=')[0]
    return {
      currentView: routes[hash] || NotFound
    }
  },
  mounted () {
    window.addEventListener('popstate', (event) => {
      let hash = window.location.hash || Object.keys(routes)[0]
      hash = hash.split('&')[0].split('=')[0]
      this.currentView = routes['#loading']
      setTimeout(() => { // Force module reload
        this.currentView = routes[hash] || NotFound
      }, 0)
    })
  }
}
</script>

<style lang="scss">
$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";
@import "~bulma/sass/utilities/initial-variables";
@import "StyleApp";
@import "~bulma/bulma";
</style>
