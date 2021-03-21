<template>
  <div id="GlobalLayout">
    <component :is="$page.path ? 'Layout' : 'NotFound'" />
    <footer class="siteFooter">
      &copy; Devlog from jeong
    </footer>
  </div>
</template>