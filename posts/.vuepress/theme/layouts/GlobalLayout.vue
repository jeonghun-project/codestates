



<template>
  <div id="GlobalLayout">
    <component :is="layout" />
    <header class="siteHeader"><img src="main poto.jpeg" /></header>
    <footer class="siteFooter">
      &copy; Devlog from jeong
    </footer>
  </div>
</template>


<template>
  <div id="global-layout">
    <header><h1>Header</h1></header>
    <component :is="layout"/>
    <footer><h1>Footer</h1></footer>
  </div>
</template>

<script>
export default {
  computed: {
    layout () {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // You can also check whether layout exists first as the default global layout does.
          return this.$frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>