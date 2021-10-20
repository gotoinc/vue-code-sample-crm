<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ "Sum" | localizeFilter }}</th>
        <th>{{ "Date" | localizeFilter }}</th>
        <th>{{ "Category" | localizeFilter }}</th>
        <th>{{ "Type" | localizeFilter }}</th>
        <th>{{ "Open" | localizeFilter }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currencyFilter }}</td>
        <td>{{ record.date | dateFilter("datetime") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge table-type" :class="record.typeClass">
            {{ record.typeText | localizeFilter }}
          </span>
        </td>
        <td>
          <button
            v-tooltip="'Show_details'"
            class="btn-small btn open-btn"
            @click="$router.push(`/detail/${record.id}`)"
          > <p class="open-btn-text">Open</p> 
            <i class="material-icons">chevron_right</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTableVue",

  props: {
    records: {
      required: true,
      type: Array,
    },
  },
};
</script>