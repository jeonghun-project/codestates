<template>
  <div id="GlobalLayout">
    <component :is="layout" >
      
    </component>
    <Comment />
    <footer class="siteFooter">
      &copy; Devlog from jeong
    </footer>
  </div>
</template>

<script>
import Comment from '../components/Comment.vue'
export default {
  components: { Comment },
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