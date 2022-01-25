<template>
  <div>
    <ParentLayout>
      <Comment slot="page-bottom" v-if="isShowComment" />
    </ParentLayout>
    <footer  class="siteFooter">
      &copy; Devlog from jeong
    </footer>
  </div>
</template>

<script>
import Comment from '../components/Comment.vue'
import ParentLayout from '@parent-theme/layouts/Layout.vue'
export default {
  components: { Comment, ParentLayout },
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
    },
    isShowComment() {
      if (this.$page.path === '/') {
        return false
      }
      return true
    }
  }
}
</script>