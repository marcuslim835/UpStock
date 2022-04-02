<template>
  <Header content="Edit Settings"/>
  <NavigationBar/>
  <Settings_NavBar/>
  <Details_Edit/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import Settings_NavBar from "@/components/Settings_NavBar.vue"
import Details_Edit from "@/components/Details_Edit.vue"


export default {
  name: 'EditDetails',
  components:{
    Header,
    NavigationBar,
    Settings_NavBar,
    Details_Edit
  }
}
</script>

<style scoped>

</style>
