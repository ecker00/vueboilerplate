<template lang="pug">
div
  Loading(v-if="this.isLoading > 0")
  div(v-else)
    h1.title Accounts
    span This is the boilerplate demo page, create some accounts.
    | To delete the account use #[a(href="https://www.mongodb.com/download-center?filter=enterprise&utm_source=google&utm_campaign=EMEA_Norway_CorpEntOnly_Brand_Alpha_FM&utm_keyword=mongodb%20compass&utm_device=c&utm_network=g&utm_medium=cpc&utm_creative=205021200420&utm_matchtype=e&_bt=205021200420&_bk=mongodb%20compass&_bm=e&_bn=g&jmp=search&gclid=EAIaIQobChMI3d7w5cnG1wIVFIGyCh0F_gmBEAAYASAAEgJNSfD_BwE#compass") Compass]
    | (connect on port 27015).
    table.table.is-fullwidth.is-light.is-hoverable
      thead
        tr
          th Account
      tbody
        tr.clickable(v-for="account in accounts")
          td {{ account.name }}
        tr(v-if="!accounts.length")
          td.is-danger(colspan="2" v-if="errors.generic") {{ errors.generic }}
          td.is-light(colspan="2" v-else) No accounts
    AccountNew(@created="getAccounts")
</template>

<script>
import Loading from './Loading'
import AccountNew from './AccountNew'
import Accounts from '../client/ClientAccounts'

export default {
  name: 'Uploader',
  components: {
    Loading, AccountNew
  },
  data () {
    return {
      isLoading: 1, // Loading is a number, if case multiple promises must be resolved it will be 0 when all are completed.
      errors: {},
      accounts: []
    }
  },
  methods: {
    getAccounts: Accounts.getAccounts
  },
  mounted () {
    this.getAccounts()
    this.isLoading -= 1
  }
}
</script>

<style lang="scss" scoped>
.clickable {
  cursor: pointer;
  &:hover {
    td {
      text-decoration: underline;
    }
  }
}
</style>
