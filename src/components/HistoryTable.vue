<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $t("Sum") }}</th>
        <th>{{ $t("Date") }}</th>
        <th>{{ $t("Category") }}</th>
        <th>{{ $t("Type") }}</th>
        <th>{{ $t("Open") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td>{{ (idx + 1) + passedItems }}</td>
        <td>{{ record.amount | currencyFilter }}</td>
        <td>{{ record.date | dateFilter("datetime") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge table-type" :class="record.typeClass">
            {{ $t(record.typeText) }}
          </span>
        </td>
        <td>
          <button
            v-tooltip="'Show_details'"
            class="btn-small btn open-btn"
            @click="$router.push(`/detail/${record.id}`)"
          >
            <p class="open-btn-text">{{ $t("Open") }}</p>
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
    passedItems: {
      required: true,
      type: Number,
    }
  },
};
</script>