<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit="submit">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="username" type="text" class="form-control" placeholder="Username" autocomplete="username email"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="password" type="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="4">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
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
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        error: null
      }
    },
    created() {
      this.tryToEnter()
    },
    computed: {
      accessToken() {
        return this.$store.getters['accessToken']
      }
    },
    methods: {
      tryToEnter() {
        this.$router.push({name: 'Accounts'})
      },
      submit() {
        this.error = null

        const data = {
          username: this.username,
          password: this.password
        }

        this.$store.dispatch('login', data)
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
