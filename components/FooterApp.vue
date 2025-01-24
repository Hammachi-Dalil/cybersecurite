<script lang="ts">
</script>

<template>
    <div class="footer-app">
        <NuxtLink class="link" to="/">Accueil</NuxtLink>
    </div>
</template>

<style setup lang="scss">
.footer-app {
    background-color: $PrimaryColor;
    color: $SecondaryColor;
    padding: 20px;
    text-align: center;

    a {
        color: $BackgroundColor;
    }
}
</style>