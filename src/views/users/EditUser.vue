<template lang="html">
  <b-modal ref="modal" id="editUser" :title="title" @shown="shown" @ok="ok" @hidden="hidden">
    <b-form @submit="submit" @reset="reset">
      <b-form-group label="Username:">
        <b-form-input type="text" v-model="form.username"></b-form-input>
      </b-form-group>
      <b-form-group label="Password:">
        <b-form-input type="password" v-model="form.password"></b-form-input>
      </b-form-group>
      <b-form-group label="Name:">
        <b-form-input type="text" v-model="form.name"></b-form-input>
      </b-form-group>
      <b-form-group label="Locale:">
        <b-form-select v-model="form.locale" :options="localeOptions" class="mb-3" />
      </b-form-group>

      <b-form-group label="Expired at:">
        <datepicker v-model="expiredAtDate" format="yyyy-MM-dd" style="width: 200px;"></datepicker>
      </b-form-group>
      <b-form-group label="Devices amount:">
        <b-form-input type="number" v-model="form.amount" style="width: 200px"></b-form-input>
      </b-form-group>
      <b-form-group label="Blocked:">
        <b-form-checkbox
           v-model="form.isEnabled"
           value="false"
           unchecked-value="true">
        </b-form-checkbox>
      </b-form-group>
      <span class="text-danger" v-if="error">{{error}}</span>
    </b-form>
  </b-modal>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'

  export default {
    props: {
      accountId: {
        type: String,
        required: true
      },
      user: {
        type: Object,
        default: null
      }
    },
    components: {
      Datepicker
    },
    data() {
      return {
        form: {
          name: null,
          expiredAt: null,
          amount: 0,
          isEnabled: true
        },
        expiredAtDate: null,
        error: null,
        localeOptions: [
          { value: 'en', text: 'English' },
          { value: 'ru', text: 'Russian' }
        ]
      }
    },
    computed: {
      title() {
        return this.user ? 'Edit user' : 'Add user'
      }
    },
    created() {

    },
    methods: {
      shown() {
        if (this.account) {
          Object.assign(this.form, this.account)
          this.expiredAtDate = this.account.expiredAt
        }
      },
      ok(evt) {
        evt.preventDefault()
        this.submit()
      },
      hidden() {
        this.reset()
      },
      submit() {
        this.error = null
        this.form.expiredAt = Vue.moment(this.expiredAtDate).format('YYYY-MM-DD')

        this
          .sendForm()
          .then(
            () => {
              this.$store.dispatch('user/fetch')
              this.$refs.modal.hide()
            },
            (error) => this.error = error.response.data.message
          )
      },
      sendForm() {
        if (this.account) {
          return this.$store.dispatch('user/edit', this.form)
        } else {
          return this.$store.dispatch('user/add', this.form)
        }
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      }
    }
  }
</script>

<style lang="css">
</style>
