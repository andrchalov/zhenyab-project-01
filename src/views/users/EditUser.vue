<template lang="html">
  <b-modal
    ref="modal"
    id="editUser"
    :title="title"
    :ok-title="$t('save')"
    :cancel-title="$t('cancel')"
    @shown="shown"
    @ok="ok"
    @hidden="hidden"
  >
    <b-form @submit="submit" @reset="reset">
      <b-form-group :label="$t('username')+':'">
        <b-form-input type="text" v-model="form.username" :state="errors && !errors['username']"></b-form-input>
        <b-form-invalid-feedback v-if="errors">
          {{errors['username']}}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('password')+':'">
        <b-form-input type="password" v-model="form.password" :state="errors && !errors['password']"></b-form-input>
        <b-form-invalid-feedback v-if="errors">
          {{errors['password']}}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('name')+':'">
        <b-form-input type="text" v-model="form.name" :state="errors && !errors['name']"></b-form-input>
        <b-form-invalid-feedback v-if="errors">
          {{errors['name']}}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('locale')+':'">
        <b-form-select :plain="true" size="lg" v-model="form.locale" :options="localeOptions" class="mb-3"  :state="errors && !errors['locale']"/>
        <b-form-invalid-feedback v-if="errors">
          {{errors['locale']}}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('enabled')+':'">
        <b-form-checkbox
           v-model="form.enabled"
           value="true"
           unchecked-value="false">
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label="$t('role')+':'">
        <b-form-select :plain="true" size="lg" v-model="form.role" :options="roleOptions" class="mb-3" />
      </b-form-group>

      <span class="text-danger" v-if="message">
        {{message}}
      </span>

      <span class="text-danger" v-if="errors">
        <li v-for="error in errors">
          {{error}}
        </li>
      </span>
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
          username: null,
          password: null,
          name: null,
          locale: 2,
          enabled: true,
          role: 'ROLE_USER',
          accountId: null
        },
        message: null,
        errors: null,
        localeOptions: [
          { value: 1, text: 'Русский' },
          { value: 2, text: 'English (Great Britain)' }
        ],
        roleOptions: [
          { value: 'ROLE_SUPER', text: 'SUPER' },
          { value: 'ROLE_ADMIN', text: 'ADMIN' },
          { value: 'ROLE_USER', text: 'USER' }
        ]
      }
    },
    computed: {
      title() {
        return this.user ? this.$t('edit_user') : this.$t('add_user')
      }
    },
    methods: {
      shown() {
        if (this.user) {
          Object.assign(this.form, this.user)
        }
        this.form.accountId = this.accountId
      },
      ok(evt) {
        evt.preventDefault()
        this.submit()
      },
      hidden() {
        this.reset()
        this.$emit('closed')
      },
      submit() {
        this.errors = null

        this
          .sendForm()
          .then(
            () => {
              this.$refs.modal.hide()
            },
            (error) => {
              this.errors = null

              if (error.response.data.errors) {
                this.errors = {}
                error.response.data.errors.forEach((error) => {
                  this.errors[Object.keys(error)[0]] = Object.values(error)[0]
                })
              }

              this.message = error.response.data.message
            }
          )
      },
      sendForm() {
        if (this.user) {
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
