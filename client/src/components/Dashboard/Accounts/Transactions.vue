<template>
  <div>
    <p class="has-text-weight-bold is-size-5 mb-5">Transactions</p>
    <b-table
      :columns="columns"
      :data="account.transactions"
      :paginated="true"
      :pagination-simple="false"
      :pagination-rounded="false"
      paginationPosition="bottom"
      per-page="5"
      current-page.sync="1"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    ></b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AccountSummary extends Vue {
  private columns = [
    {
      field: "id",
      label: "ID",
      width: "40",
      numeric: true,
    },
    {
      field: "payee",
      label: "Payee/Contact",
    },
    {
      field: "type",
      label: "Type",
    },
    {
      field: "amount",
      label: "Amount",
    },
    {
      field: "date",
      label: "Date",
    },
  ];

  get account() {
    return this.$store.getters.account;
  }
}
</script>

<style scoped></style>
