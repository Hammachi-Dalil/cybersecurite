<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';

const { $supabase } = useNuxtApp();
const router = useRouter();
const articles = ref<{ id: string; title: string; intro: string; image_url: string; extrait: string }[]>([]);

// Récupérer les articles depuis Supabase
const fetchArticles = async () => {
  const { data, error } = await $supabase
    .from('articles')
    .select('id, title, intro, image_url, extrait')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des articles:', error.message);
  } else {
    articles.value = data || [];
  }
};

// Charger les articles au montage du composant
onMounted(fetchArticles);

// Redirection vers la page de l'article complet
const goToArticle = (id: string) => {
  router.push(`/article/${id}`);
};
</script>

<template>
  <div class="articles-container">
    <h2 class="articles-title">Nos Articles sur la Cybersécurité</h2>
    <div class="articles-grid">
      <div 
        v-for="article in articles" 
        :key="article.id" 
        class="article-card"
        :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${article.image_url})` }"
        @click="goToArticle(article.id)"
      >
        <div class="article-content">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-intro">{{ article.extrait }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.articles-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8vh 20px;
  text-align: center;
}

.articles-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: $TextColor;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.article-card {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  overflow: hidden;
  color: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  .article-content {
    padding: 10px;
    border-radius: 0 0 10px 10px;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: background 0.3s;
  }

  .article-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 4vh 2vh;
  }

  .article-intro {
    font-size: 1rem;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover .article-content {
    background: rgba(0, 0, 0, 0.8);
  }

  &:hover .article-intro {
    opacity: 1;
  }
}
</style>