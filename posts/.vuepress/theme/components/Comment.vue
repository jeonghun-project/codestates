<template>
    <div ref="comment" ></div>
</template>
<script>
export default {
  watch: {
    '$route.path': function () {
      this.$refs.comment.innerHTML = '<div ref="comment"></div>';
      this.init();
    }
  },
  methods: {
    // script tag 생성
    init() {
      const utterances = document.createElement('script');
      utterances.type = 'text/javascript';
      utterances.async = true;
      utterances.crossorigin = 'anonymous';
      utterances.src = 'https://utteranc.es/client.js';
      
      utterances.setAttribute('issue-term', 'pathname'); // pathname|url|title|og:title 중 택 1
      utterances.setAttribute('theme','github-light'); // theme 설정
      utterances.setAttribute('repo',`jeonghun-project/blog-comment`); // 사용할 repository
  
      this.$refs.comment.appendChild(utterances);
    }
  },
  mounted() {
    this.init()
  }
}
</script>