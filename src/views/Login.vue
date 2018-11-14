<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="submit">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="form.username" type="text" class="form-control" placeholder="Username" autocomplete="username email"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="form.password" type="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="4">
                      <b-button type="submit" variant="primary" class="px-4" :disabled="$v.form.$invalid">Login</b-button>
                    </b-col>
                    <b-col cols="8">
                      <span class="text-danger" v-if="error">{{error}}</span>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import { validationMixin } from "vuelidate"
  import { required, minLength } from "vuelidate/lib/validators"

  export default {
    name: 'Login',
    data() {
      return {
        form: {},
        error: null
      }
    },
    validations: {
      form: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },
    mixins: [
      validationMixin
    ],
    computed: {
      accessToken() {
        return this.$store.getters['accessToken']
      }
    },
    methods: {
      tryToEnter() {
        this.$router.push({path: '/accounts'})
      },
      submit() {
        this.error = null

        this.$store.dispatch('auth/login', this.form)
          .then(
            response => {
              this.tryToEnter()
            },
            error => {
              this.error = error.message
            }
          )
      }
    }
  }
</script>
