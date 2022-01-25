<template>
  <div v-if="isShowComment">
    <div ref="comment" ></div>
  </div>
</template>
<script>
export default {
  computed: {
    isShowComment() {
      if (this.$page.path === '/') {
        return false
      }
      return true
    }
  },
  mounted() {
    // script tag 생성
    const utterances = document.createElement('script');
    utterances.type = 'text/javascript';
    utterances.async = true;
    utterances.crossorigin = 'anonymous';
    utterances.src = 'https://utteranc.es/client.js';
    
    utterances.setAttribute('issue-term', 'pathname'); // pathname|url|title|og:title 중 택 1
    utterances.setAttribute('theme','github-light'); // theme 설정
    utterances.setAttribute('repo',`jeonghun-project/blog-comment`); // 사용할 repository

    // script tag 삽입
    this.$refs.comment.appendChild(utterances);
  }
}
</script>