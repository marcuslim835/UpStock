<template>
  <Header content="Privacy Settings"/>
  <NavigationBar/>
  <Settings_NavBar/>
  <Settings_Privacy/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import Settings_NavBar from "@/components/Settings_NavBar.vue"
import Settings_Privacy from "@/components/Settings_Privacy.vue"


export default {
  name: 'PrivacySettings',
  components:{
    Header,
    NavigationBar,
    Settings_NavBar,
    Settings_Privacy
  }
}
</script>

<style scoped>

</style>
