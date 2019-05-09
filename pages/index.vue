<template>
  <div>
    <h1>Ласкаво просимо</h1>
    {{loading}}
  </div>
</template>

<script>
export default {
  name: 'index',
  computed: {
    loading() {
      return this.$store.state.loading.loading
    }
  }
}
</script>
