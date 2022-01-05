<template>
  <div>
    <p class="has-text-weight-bold is-size-5 mb-5">Transfers</p>
    <b-table
      :columns="columns"
      :data="etransfer.transactions"
      :paginated="true"
      :pagination-simple="false"
      :pagination-rounded="false"
      paginationPosition="bottom"
      per-page="4"
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
export default class Transactions extends Vue {
  private columns = [
    {
      field: "id",
      label: "ID",
      width: "40",
      numeric: true,
    },
    {
      field: "name",
      label: "Contact Name",
    },
    {
      field: "email",
      label: "Contact Email",
    },
    {
      field: "action",
      label: "Action",
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

  get etransfer() {
    return this.$store.getters.etransfer;
  }
}
</script>

<style scoped></style>
