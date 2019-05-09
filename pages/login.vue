<template>
  <div>
    <Login></Login>
    {{loading}}
  </div>
</template>

<script>
import Login from '@/components/user/Login'
export default {
  name: 'login',
  components: {
    Login
  },
  computed: {
    loading() {
      return this.$store.state.loading.loading
    }
  }
}
</script>
