<script setup lang="ts">
defineProps<{
  title: string;
  image: string;
}>();
</script>

<template>
    <!-- Colonne 1 : Protection des données -->
    <div class="grid-item">
      <img :src="image" alt="Protection des données" class="grid-item__image" />
      <h3 class="grid-item__title">{{ title }}</h3>
      <p class="grid-item__text">
        <slot></slot>
      </p>
    </div>
</template>

  
<style lang="scss" scoped>
/* Conteneur global */


/* Colonne individuelle */
.grid-item {
  text-align: center;
  flex: 1;

  &__image {
    width: 150px;
    height: 150px;
    border-radius: 20px;
    object-fit: cover;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 0 auto 20px auto; /* Centré avec un espace en bas */
  }

  &__title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #007bff; /* Bleu cybersécurité */
    margin-bottom: 10px;
  }

  &__text {
    font-size: 1rem;
    line-height: 1.6;
    color: #444;
    strong {
      color: #333; /* Met en valeur les mots importants */
    }
    text-align: justify;
  }
}
</style>

  