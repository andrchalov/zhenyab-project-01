<template lang="html">
  <div class="users">
    <b-card>
      <template slot="header">
        <i class="cui-user"></i>Account #{{ account_id }} Users
      </template>

      <b-btn @click="addUser" variant="primary" class="mb-3">
        <i class="fa fa-plus fa-lg mr-1"></i>
        Add user
      </b-btn>

      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        hover
      >

      </b-table>
    </b-card>
    <div v-if="account_id">
      <edit-user :user="editUserData" :account-id="account_id"></edit-user>
    </div>
  </div>
</template>

<script>
  import EditUser from './users/EditUser'

  export default {
    name: 'Account',
    components: {
      EditUser
    },
    data() {
      return {
        account_id: null,
        fields: [
          {key: 'id', label: 'ID', sortable: true},
          {key: 'username', label: 'Username', sortable: true},
          {key: 'name', label: 'Name', sortable: true},
          {key: 'language', label: 'Language', sortable: true},
          {key: 'isEnabled', label: 'Enabled', sortable: true},
          {key: 'role', label: 'Role'},
          {key: 'createdAt', label: 'Created'},
          {key: 'updatedAt', label: 'Updated'},
          {key: 'loggedAt', label: 'Logged'}
        ],
        items: [],
        perPage: 50,
        currentPage: 1,
        sortBy: 'id',
        editUserData: null,
        busy: false
      }
    },
    created() {
      this.account_id = this.$route.params.account_id
      this.fetch()
    },
    computed: {
      totalRows() {
        return this.getRowCount()
      }
    },
    methods: {
      fetch() {
        this.busy = true
        this.$store.dispatch('user/fetch', {account_id: this.account_id})
          .then(
            items => {
              this.items = items
            },
            error => {
              this.$notify(error.response.data.message, 'error')
              this.busy = false
            }
          )
      },
      addUser() {
        this.editUserData = null
        this.$root.$emit('bv::show::modal','editUser')
      }
    }
  }
</script>

<style lang="css">
</style>
