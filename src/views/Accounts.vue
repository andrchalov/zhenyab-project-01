<template lang="html">
  <div>
    <b-card>
      <b-btn v-b-modal.add_account variant="primary" class="mb-3">
        <i class="fa fa-plus fa-lg mr-1"></i>
        Add account
      </b-btn>
      <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
        <template slot="isEnabled" slot-scope="data">
          {{data ? 'yes': 'no'}}
        </template>
      </b-table>
      <nav>
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
      </nav>
    </b-card>
    <add-account id="add_account"></add-account>
  </div>
</template>

<script>
  import AddAccount from './accounts/AddAccount'
  import Vue from 'vue'

  export default {
    name: 'Accounts',
    components: {
      AddAccount
    },
    data() {
      return {
        fields: [
          {key: 'id', label: 'ID', sortable: true},
          {key: 'name', label: 'Name', sortable: true},
          {key: 'amount', label: 'Amount', sortable: true},
          {key: 'expiredAt', label: 'Expired at', sortable: true},
          {key: 'isEnabled', label: 'Enabled', sortable: true}
        ],
        perPage: 50,
        currentPage: 1
      }
    },
    created() {
      this.$store.dispatch('init')
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
        this.$store.dispatch('account/fetch')
          .catch(
            error => {
              this.$notify(error.response.data.message, 'error')
            }
          )
      },
      getRowCount() {
        return this.items.length
      }
    }
  }
</script>

<style lang="css">
</style>
