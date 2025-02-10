<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const quizzes = [
  {
    title: "Quiz sur le Phishing",
    description: "Testez vos connaissances sur les attaques par hameçonnage.",
  },
  {
    title: "Quiz sur les mots de passe",
    description: "Apprenez à sécuriser vos mots de passe efficacement.",
  },
  {
    title: "Quiz sur les Ransomwares",
    description: "Découvrez comment éviter les rançongiciels et protéger vos fichiers.",
  },
  {
    title: "Quiz sur la Détection des Emails Frauduleux",
    description: "Analysez des emails et apprenez à distinguer les vrais des faux.",
  }
];

const selectQuiz = (index: number) => {
  if (index === 3) {
    router.push('/emailQuiz'); // Redirige vers la nouvelle page
  } else {
    router.push({ path: '/quiz', query: { quizIndex: index } });
  }
};
</script>

<template>
  <div class="quiz-selection-container">
    <h2>📌 Sélectionnez un quiz sur la cybersécurité</h2>
    <ul>
      <li v-for="(quiz, index) in quizzes" :key="index" @click="selectQuiz(index)">
        <h3>{{ quiz.title }}</h3>
        <p>{{ quiz.description }}</p>
      </li>
    </ul>
  </div>
</template>

  
  <style lang="scss" scoped>
  .quiz-selection-container {
    max-width: 600px;
    margin: 4vh auto;
    text-align: center;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    background: #007bff;
    color: white;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  li:hover {
    background: #0056b3;
  }
  </style>
  