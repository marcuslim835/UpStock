<template>
  <NavigationBar/>
  <Settings_NavBar/>
  <Settings_AccountOverview/>
  <Settings_Edit/>
  <Settings_Privacy/>
  <!--- Toggle visibility of the elements for the different subpages --->
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import Settings_NavBar from "@/components/Settings_NavBar.vue"
import Settings_AccountOverview from "@/components/Settings_AccountOverview.vue"
import Settings_Edit from "@/components/Settings_Edit.vue"
import Settings_Privacy from "@/components/Settings_Privacy.vue"

export default {
  name: 'Home',
  components:{
    NavigationBar,
    Settings_NavBar,
    Settings_AccountOverview,
    Settings_Edit,
    Settings_Privacy
  }
}
</script>

<style scoped>

</style>
