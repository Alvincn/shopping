<template><TypeNav /></template>

<script>
export default {
  mounted() {
    console.log(this.$route.params.keyword);
    console.log(this.$route.query.k);
  },
};
</script>

<style></style>
