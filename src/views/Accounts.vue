<template lang="html">
  <div class="accounts">
    <b-card>
      <div>
        <b-btn @click="addAccount" variant="primary" class="mb-3">
          <i class="fa fa-plus fa-lg mr-1"></i>
          {{$t("add_account")}}
        </b-btn>
        <b-btn class="pull-right" size="sm" @click="fetch">
          <i class="fa fa-refresh fa-lg" :class="{'rotate': busy}"></i>
        </b-btn>
      </div>

      <b-form inline class="mb-4">
        <div class="mr-2">{{$t('filter')}}:</div>
        <b-form-input type="text" v-model="filter.name" :placeholder="$t('name')"></b-form-input>
      </b-form>

      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :striped="true"
        :filter="filterHandler"
        @row-clicked="rowClicked"
        hover
      >
        <template slot="enabled" slot-scope="data">
          {{data.value ? $t('yes'): $t('no')}}
        </template>
        <template slot="actions" slot-scope="data">
          <b-btn @click.stop="editAccount(data.item)" size="sm" variant="primary">
            <i class="fa fa-pencil fa-lg"></i>
          </b-btn>
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
    <edit-account :account="editAccountData"></edit-account>
  </div>
</template>

<script>
  import EditAccount from './accounts/EditAccount'

  export default {
    name: 'Accounts',
    components: {
      EditAccount
    },
    data() {
      return {
        fields: [
          {key: 'id', label: 'ID', sortable: true},
          {key: 'name', label: this.$t('name'), sortable: true},
          {key: 'amount', label: this.$t('devices_amount'), sortable: true},
          {key: 'expiredAt', label: this.$t('expired_at'), sortable: true},
          {key: 'enabled', label: this.$t('enabled'), sortable: true},
          {key: 'actions', label: this.$t('actions')}
        ],
        perPage: 50,
        currentPage: 1,
        sortBy: 'id',
        editAccountData: null,
        busy: false,
        filter: {
          name: null
        }
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      items() {
        return this.$store.getters['account/list']
      },
      totalRows() {
        return this.getRowCount()
      }
    },
    methods: {
      fetch() {
        this.busy = true
        this.$store.dispatch('account/fetch')
          .then(
            () => {
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
      addAccount() {
        this.editAccountData = null
        this.$root.$emit('bv::show::modal','editAccount')
      },
      editAccount(account) {
        this.editAccountData = account
        this.$root.$emit('bv::show::modal','editAccount')
      },
      filterHandler(item) {
        if (this.filter.name) {
          return item
            ? item.name.substr(0, this.filter.name.length).toLowerCase() == this.filter.name.toLowerCase()
            : null;
        } else {
          return item
        }
      },
      rowClicked(account) {
        this.$router.push({
          name: 'Users',
          params: {
            account_id: account.id
          }
        })
      }
    }
  }
</script>

<style>
  .accounts table tr {
    cursor: pointer;
  }
</style>
