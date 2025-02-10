<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';

const { $supabase } = useNuxtApp();
const route = useRoute();
const article = ref<{
  title: string;
  intro: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  paragraph4?: string;
  paragraph5?: string;
  image_url?: string;
} | null>(null);

// Récupérer l'article depuis Supabase
const fetchArticle = async () => {
  const { data, error } = await $supabase
    .from('articles')
    .select('title, intro, paragraph1, paragraph2, paragraph3, paragraph4, paragraph5, image_url')
    .eq('id', route.params.id)
    .single();

  if (error) {
    console.error('Erreur lors de la récupération de l’article:', error.message);
  } else {
    article.value = data;
  }
};

// Charger l'article au montage du composant
onMounted(fetchArticle);
</script>

<template>
  <div v-if="article" class="article-detail">
    <h1 class="article-title">{{ article.title }}</h1>

    <div v-if="article.image_url" class="article-image">
      <img :src="article.image_url" :alt="article.title" />
    </div>

    <div class="article-content">
      <p class="article-intro">{{ article.intro }}</p>
      <p v-if="article.paragraph1">{{ article.paragraph1 }}</p>
      <p v-if="article.paragraph2">{{ article.paragraph2 }}</p>
      <p v-if="article.paragraph3">{{ article.paragraph3 }}</p>
      <p v-if="article.paragraph4">{{ article.paragraph4 }}</p>
      <p v-if="article.paragraph5">{{ article.paragraph5 }}</p>
    </div>
  </div>
  <div v-else class="loading">Chargement...</div>
</template>

<style scoped lang="scss">
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: justify;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

.article-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: $TextColor;
}

.article-image {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
}

.article-content {
  p {
    font-size: 1rem;
    margin-bottom: 15px;
    color: $TextColor;
  }

  .article-intro {
    font-weight: bold;
    font-size: 1.1rem;
    color: $TextColor;
  }
}

.loading {
  text-align: center;
  font-size: 1.5rem;
}
</style>
