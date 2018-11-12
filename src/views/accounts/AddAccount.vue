<template lang="html">
  <b-modal :id="id" ref="modal" title="Add account" @ok="ok" @hidden="hidden">
    <b-form @submit="submit" @reset="reset">
      <b-form-group label="Name:">
        <b-form-input type="text" v-model="form.username"></b-form-input>
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
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Datepicker
  },
  data() {
    return {
      form: {
        username: null,
        expiredAt: null,
        amount: 0,
        isEnabled: true
      },
      expiredAtDate: '2018-01-01',
      error: null
    }
  },
  created() {

  },
  methods: {
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
      this.$store.dispatch('account/add', this.form)
        .then(
          () => this.$refs.modal.hide(),
          (error) => this.error = error.response.data.message
        )
    },
    reset() {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style lang="css">
</style>
