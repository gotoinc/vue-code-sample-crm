<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $t("views.sum") }}</th>
        <th>{{ $t("views.date") }}</th>
        <th>{{ $t("views.category") }}</th>
        <th>{{ $t("views.type") }}</th>
        <th>{{ $t("views.open") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td>{{ idx + 1 + passedItems }}</td>
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
            v-tooltip="'views.show_details'"
            class="btn-small btn btn-open"
            @click="$router.push(`/detail/${record.id}`)"
          >
            <p class="btn-open-text">{{ $t("views.open") }}</p>
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
    },
  },
};
</script>