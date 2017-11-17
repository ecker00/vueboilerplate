<template lang="pug">
.outerWrap(:class="{ 'is-creating': isCreating }")
  transition(name="slide-horizontal")
    a.button.is-success(v-if="!isCreating" key="edit" @click="isCreating = true")
        i.fa.fa-plus(aria-hidden="true")
        | &ensp;New account
    div.is-flex.fieldWrap(v-if="isCreating" key="creat")
      .control.has-icons-left
        input.input.is-success(:class="{ 'is-danger': errors.name }" type="text" v-model="form.name" placeholder="Account name")
        span.icon.is-small.is-left
          i.fa.fa-user
        .help.is-danger(v-if="errors.generic") {{ errors.generic }}
        .help.is-danger(v-if="errors.name") {{ errors.name }}
      a.button.is-success(:class="{ 'is-loading': isLoading }" @click="create()")
          i.fa.fa-check(aria-hidden="true")
          | &ensp;Create account
      a.button(@click="reset()")
        i.fa.fa-times(aria-hidden="true")
        | &ensp;Cancel
</template>

<script>
import Blunder from '../Blunder'
import axios from 'axios'

function getInitialData () {
  return {
    isCreating: false,
    isLoading: 0,
    errors: {},
    form: {
      name: ''
    }
  }
}

export default {
  name: 'Uploader',
  data () {
    return getInitialData()
  },
  methods: {
    reset () {
      Object.assign(this.$data, getInitialData())
    },
    create () {
      this.isLoading += 1
      axios.post('/api', {
        newAccount: {
          name: this.form.name
        }
      })
        .then(result => {
          this.reset()
          this.$emit('created')
        })
        .catch(result => {
          Blunder.error(this, result)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.outerWrap {
  position: relative;
  > * {
    position: absolute;
  }
}
.fieldWrap {
  //flex-wrap: wrap;
  > * {
    &:first-child { margin-left: 0; }
    &:last-child { margin-right: 0; }
    margin: 0 0.5em;
    max-width: 250px;
  }
}

// Slide animations
.slide-horizontal-enter-active, .slide-horizontal-leave-active {
  transition: all .25s ease;
}
.slide-horizontal-enter {
  transform: translateX(300px);
  opacity: 0;
}
.slide-horizontal-leave-to {
  transform: translateX(-300px);
  opacity: 0;
}
.is-creating {
  .slide-horizontal-enter {
    transform: translateX(-300px);
    opacity: 0;
  }
  .slide-horizontal-leave-to {
    transform: translateX(300px);
    opacity: 0;
  }
}
</style>
