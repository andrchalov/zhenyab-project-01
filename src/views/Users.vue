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

      <b-btn class="pull-right" size="sm" @click="fetch">
        <i class="fa fa-refresh fa-lg" :class="{'rotate': busy}"></i>
      </b-btn>

      <b-form inline class="mb-4">
        <div class="mr-2">Filter:</div>
        <b-form-input type="text" v-model="filter.username" placeholder="Username" class="mr-2"></b-form-input>
        <b-form-input type="text" v-model="filter.name" placeholder="Name" class="mr-2"></b-form-input>
        <b-form-input type="text" v-model="filter.language" placeholder="Language" class="mr-2"></b-form-input>
        <b-form-input type="text" v-model="filter.created" placeholder="Created" class="mr-2"></b-form-input>
        <b-btn @click="filter = {}">reset</b-btn>
      </b-form>

      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :striped="true"
        :filter="filterHandler"
        hover
      >
        <template slot="enabled" slot-scope="data">
          {{data.value ? 'yes': 'no'}}
        </template>
        <template slot="actions" slot-scope="data">
          <div style="white-space: nowrap">
            <b-btn @click.stop="editUser(data.item)" variant="primary" size="sm">Edit</b-btn>
            <b-btn @click.stop="removeUser(data.item)" variant="danger" size="sm" class="ml-2">Delete</b-btn>
          </div>
        </template>
      </b-table>

      <nav>
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
      </nav>
    </b-card>
    <div v-if="account_id">
      <edit-user :user="editUserData" :account-id="account_id" @closed="fetch"></edit-user>
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
          {key: 'role', label: 'Role', sortable: true},
          {key: 'createdAt', label: 'Created', sortable: true},
          {key: 'updatedAt', label: 'Updated', sortable: true},
          {key: 'loggedAt', label: 'Logged', sortable: true},
          {key: 'actions', label: 'Actions'}
        ],
        items: [],
        perPage: 50,
        currentPage: 1,
        sortBy: 'id',
        editUserData: null,
        busy: false,
        filter: {
          name: null
        }
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
              this.busy = false
            },
            error => {
              this.$notify(error.response.data.message, 'error')
              this.busy = false
            }
          )
      },
      getRowCount() {
        return this.items.length
      },
      addUser() {
        this.editUserData = null
        this.$root.$emit('bv::show::modal','editUser')
      },
      editUser(user) {
        this.editUserData = user
        this.$root.$emit('bv::show::modal','editUser')
      },
      removeUser(user) {
        if (confirm('Do you really want to remove user "'+user.username+'"?')) {
          this.$store.dispatch('user/remove', {id: user.id})
            .then(
              () => this.fetch()
            )
        }
      },
      filterHandler(item) {
        let matched = true

        if (this.filter.username && item.username.substr(0, this.filter.username.length).toLowerCase() != this.filter.username.toLowerCase())
          return null

        if (this.filter.name && item.name.substr(0, this.filter.name.length).toLowerCase() != this.filter.name.toLowerCase())
          return null

        if (this.filter.language && item.language.substr(0, this.filter.language.length).toLowerCase() != this.filter.language.toLowerCase())
          return null

        if (this.filter.created && item.createdAt.substr(0, this.filter.created.length).toLowerCase() != this.filter.created.toLowerCase())
          return null


        return item
      }
    }
  }
</script>

<style lang="css">
</style>
