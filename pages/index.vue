<template>
  <div>
    <h1>main</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  computed: {
    ...mapGetters ({ isLogin: 'user/isLogin', user: 'user/user' })
  },
  mounted() {
    if (!this.isLogin) {
      this.$router.push('/login')
    }
  }
}
</script>
