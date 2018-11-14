<template lang="html">
  <div class="users">
    <b-card>
      <template slot="header">
        <i class="cui-user"></i>{{$t('account')}} #{{ account_id }} {{$t('users')}}
      </template>

      <b-btn @click="addUser" variant="primary" class="mb-3">
        <i class="fa fa-plus fa-lg mr-1"></i>
        {{$t('add_user')}}
      </b-btn>

      <b-btn class="pull-right" size="sm" @click="fetch">
        <i class="fa fa-refresh fa-lg" :class="{'rotate': busy}"></i>
      </b-btn>

      <b-form inline class="mb-4">
        <div class="mr-2 mb-2">{{$t('filter')}}:</div>
        <b-form-input type="text" v-model="filter.username" :placeholder="$t('username')" class="mr-2 mb-2"></b-form-input>
        <b-form-input type="text" v-model="filter.name" :placeholder="$t('name')" class="mr-2 mb-2"></b-form-input>
        <b-form-input type="text" v-model="filter.language" :placeholder="$t('language')" class="mr-2 mb-2"></b-form-input>
        <b-form-input type="text" v-model="filter.created" :placeholder="$t('created')" class="mr-2 mb-2"></b-form-input>
        <b-btn @click="filter = {}" class="mb-2">{{$t('reset')}}</b-btn>
      </b-form>

      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :striped="true"
        :filter="filterHandler"
        responsive
        fixed
        hover
      >
        <template slot="enabled" slot-scope="data">
          {{data.value ? $t('yes'): $t('no')}}
        </template>
        <template slot="actions" slot-scope="data">
          <div style="white-space: nowrap">
            <b-btn @click.stop="editUser(data.item)" variant="primary" size="sm">
              <i class="fa fa-pencil fa-lg"></i>
            </b-btn>
            <b-btn @click.stop="removeUser(data.item)" variant="danger" size="sm" class="ml-2">
              <i class="fa fa-remove fa-lg"></i>
            </b-btn>
          </div>
        </template>
        <template slot="role" slot-scope="data">
          {{$t(data.value)}}
        </template>
      </b-table>

      <nav>
        <b-pagination
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          :prev-text="$t('prev_short')"
          :next-text="$t('next_short')"
          hide-goto-end-buttons
        />
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
          {key: 'username', label: this.$t('username'), sortable: true},
          {key: 'name', label: this.$t('name'), sortable: true},
          {key: 'language', label: this.$t('language'), sortable: true},
          {key: 'enabled', label: this.$t('enabled'), sortable: true},
          {key: 'role', label: this.$t('role'), sortable: true},
          {key: 'createdAt', label: this.$t('created'), sortable: true},
          {key: 'updatedAt', label: this.$t('updated'), sortable: true},
          {key: 'loggedAt', label: this.$t('logged'), sortable: true},
          {key: 'actions', label: this.$t('actions'), thStyle: 'width: 100px;'}
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
        if (confirm(this.$t('confirms.remove_user', {username: user.username}))) {
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
