<template>
  <Header content="Account Overview"/>
  <NavigationBar/>
  <Settings_NavBar/>
  <Settings_AccountOverview/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import Settings_NavBar from "@/components/Settings_NavBar.vue"
import Settings_AccountOverview from "@/components/Settings_AccountOverview.vue"


export default {
  name: 'AccountOverview',
  components:{
    Header,
    NavigationBar,
    Settings_NavBar,
    Settings_AccountOverview
  }
}
</script>

<style scoped>

</style>
