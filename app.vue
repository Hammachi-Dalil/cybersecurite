<template>
  <div>
      <HeaderApp />
      <NuxtPage />
      <FooterApp />
      <div class="cookies">
        <CookiesConsent />
      </div>
  </div>
</template>

<style lang="scss">
  .cookies {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

</style>
