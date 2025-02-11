<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { useRoute, useRouter } from 'vue-router';

// Supabase et routeur
const { $supabase } = useNuxtApp();
const route = useRoute();
const router = useRouter();

// Variables réactives
const currentQuestion = ref(0);
const selectedAnswer = ref<number | null>(null);
const score = ref(0);
const quizCompleted = ref(false);
const selectedQuiz = ref<{ title: string; questions: any[] } | null>(null);
const currentUser = ref<{ id: string; email: string } | null>(null);

// Liste des quiz
const quizzes = ref([
  {
    title: "Quiz sur le Phishing",
    questions: [
      {
        question: "Que signifie le terme 'phishing' en cybersécurité ?",
        answers: [
          { text: "Une technique de piratage basée sur des faux emails", correct: true },
          { text: "Un virus informatique", correct: false },
          { text: "Un pare-feu avancé", correct: false },
          { text: "Un système de cryptographie", correct: false }
        ]
      },
      {
        question: "Quel est l'un des signes d'un email de phishing ?",
        answers: [
          { text: "Une adresse email suspecte", correct: true },
          { text: "Un logo officiel de l'entreprise", correct: false },
          { text: "Une absence de fautes d'orthographe", correct: false },
          { text: "Un email reçu d'un ami", correct: false }
        ]
      },
      {
        question: "Quel est le but principal du phishing ?",
        answers: [
          { text: "Voler des informations personnelles", correct: true },
          { text: "Installer des mises à jour logicielles", correct: false },
          { text: "Bloquer un site internet", correct: false },
          { text: "Envoyer des spams", correct: false }
        ]
      },
      {
        question: "Quel comportement adopter face à un email suspect ?",
        answers: [
          { text: "Ne pas cliquer sur les liens et le signaler", correct: true },
          { text: "Répondre pour demander plus d’informations", correct: false },
          { text: "Ouvrir la pièce jointe pour vérifier", correct: false },
          { text: "Transférer l'email à tous ses contacts", correct: false }
        ]
      },
      {
        question: "Quel est un moyen efficace de se protéger du phishing ?",
        answers: [
          { text: "Utiliser une authentification à deux facteurs", correct: true },
          { text: "Accepter toutes les demandes d'accès", correct: false },
          { text: "Utiliser un mot de passe simple", correct: false },
          { text: "Partager ses informations de connexion", correct: false }
        ]
      }
    ]
  },

  {
          title: "Quiz sur les Mots de Passe",
          questions: [
            {
              question: "Quel est le mot de passe le plus sécurisé ?",
              answers: [
                { text: "123456", correct: false },
                { text: "P@ssw0rd", correct: false },
                { text: "K#2d!x8L#pG", correct: true },
                { text: "azerty", correct: false }
              ]
            },
            {
              question: "Quelle est une bonne pratique pour gérer ses mots de passe ?",
              answers: [
                { text: "Utiliser un gestionnaire de mots de passe", correct: true },
                { text: "Utiliser le même mot de passe partout", correct: false },
                { text: "Le noter sur un papier", correct: false },
                { text: "Le partager avec ses amis", correct: false }
              ]
            },
            {
              question: "Pourquoi faut-il éviter d’utiliser des mots de passe courants ?",
              answers: [
                { text: "Ils sont faciles à deviner par les pirates", correct: true },
                { text: "Ils sont compliqués à retenir", correct: false },
                { text: "Ils ralentissent l’ordinateur", correct: false },
                { text: "Ils sont interdits par la loi", correct: false }
              ]
            },
            {
              question: "À quelle fréquence faut-il changer son mot de passe ?",
              answers: [
                { text: "Tous les 3 à 6 mois", correct: true },
                { text: "Jamais", correct: false },
                { text: "Uniquement si on oublie son mot de passe", correct: false },
                { text: "Chaque jour", correct: false }
              ]
            },
            {
              question: "Que signifie un mot de passe 'fort' ?",
              answers: [
                { text: "Il contient des lettres, des chiffres et des caractères spéciaux", correct: true },
                { text: "Il est court et facile à retenir", correct: false },
                { text: "Il ne contient que des chiffres", correct: false },
                { text: "Il est basé sur une date de naissance", correct: false }
              ]
            }
          ]
        },
        {
          title: "Quiz sur les Ransomwares",
          questions: [
            {
              question: "Quel est le principal objectif d’un ransomware ?",
              answers: [
                { text: "Voler les emails des utilisateurs", correct: false },
                { text: "Bloquer l'accès aux fichiers et demander une rançon", correct: true },
                { text: "Accélérer l'ordinateur", correct: false },
                { text: "Installer des mises à jour", correct: false }
              ]
            },
            {
              question: "Comment les ransomwares infectent-ils les ordinateurs ?",
              answers: [
                { text: "Via des pièces jointes malveillantes", correct: true },
                { text: "En regardant une vidéo YouTube", correct: false },
                { text: "En ouvrant un fichier texte", correct: false },
                { text: "En jouant à des jeux vidéo", correct: false }
              ]
            },
            {
              question: "Que faire en cas d'infection par un ransomware ?",
              answers: [
                { text: "Ne pas payer la rançon et contacter les autorités", correct: true },
                { text: "Payer la rançon immédiatement", correct: false },
                { text: "Ignorer le problème", correct: false },
                { text: "Supprimer les fichiers infectés", correct: false }
              ]
            },
            {
              question: "Quel est le meilleur moyen de se protéger contre les ransomwares ?",
              answers: [
                { text: "Faire des sauvegardes régulières", correct: true },
                { text: "Désactiver son antivirus", correct: false },
                { text: "Ouvrir tous les emails reçus", correct: false },
                { text: "Installer n'importe quel programme", correct: false }
              ]
            },
            {
              question: "Pourquoi ne faut-il pas payer la rançon demandée par un ransomware ?",
              answers: [
                { text: "Car cela encourage les cybercriminels", correct: true },
                { text: "Car l'ordinateur devient plus rapide", correct: false },
                { text: "Car cela supprime automatiquement l’infection", correct: false },
                { text: "Car cela garantit la restitution des fichiers", correct: false }
              ]
            }
          ]
        }
]);

// Récupérer l'utilisateur connecté
const fetchCurrentUser = async () => {
  const { data: user, error } = await $supabase.auth.getUser();
  if (user?.user) {
    const { data, error: userError } = await $supabase
      .from('users')
      .select('id, email')
      .eq('id', user.user.id)
      .single();

    if (!userError) {
      currentUser.value = data;
    }
  }
};

// Sauvegarde du score dans Supabase
const saveScore = async () => {
  if (currentUser.value) {
    const { error } = await $supabase
      .from('users')
      .update({ last_score: score.value })
      .eq('id', currentUser.value.id);

    if (error) {
      console.error("Erreur lors de l'enregistrement du score :", error.message);
    } else {
      console.log("Score enregistré avec succès");
    }
  }
};

// Sélection du quiz
onMounted(() => {
  fetchCurrentUser();
  const quizIndex = Number(route.query.quizIndex);
  selectedQuiz.value = quizzes.value[quizIndex];
});

// Sélection d'une réponse
const selectAnswer = (index: number) => {
  selectedAnswer.value = index;
};

// Passer à la question suivante
const nextQuestion = () => {
  if (selectedAnswer.value !== null && selectedQuiz.value) {
    if (selectedQuiz.value.questions[currentQuestion.value].answers[selectedAnswer.value].correct) {
      score.value++;
    }
    currentQuestion.value++;
    selectedAnswer.value = null;

    if (currentQuestion.value >= selectedQuiz.value.questions.length) {
      quizCompleted.value = true;
      saveScore(); // Enregistrement du score une fois le quiz terminé
    }
  }
};

// Redémarrer le quiz
const restartQuiz = () => {
  currentQuestion.value = 0;
  score.value = 0;
  selectedAnswer.value = null;
  quizCompleted.value = false;
};

// Retour au menu
const goBack = () => {
  router.push("/activite");
};
</script>

<template>
  <div class="quiz-container">
    <button class="back-button" @click="goBack">⬅ Retour à la sélection</button>
    <h2 v-if="selectedQuiz">{{ selectedQuiz.title }}</h2>

    <div v-if="!quizCompleted">
      <div v-if="selectedQuiz && currentQuestion < selectedQuiz.questions.length" class="question-box">
        <h3>{{ selectedQuiz.questions[currentQuestion].question }}</h3>
        <ul>
          <li
            v-for="(answer, index) in selectedQuiz.questions[currentQuestion].answers"
            :key="index"
            :class="{ selected: selectedAnswer === index }"
            @click="selectAnswer(index)"
          >
            {{ answer.text }}
          </li>
        </ul>
        <button @click="nextQuestion" :disabled="selectedAnswer === null">Suivant</button>
      </div>
    </div>

    <div v-else class="result-box">
      <h3>🎉 Quiz terminé !</h3>
      <p>Votre score : <strong>{{ score }} / {{ selectedQuiz.questions.length }}</strong></p>

      <h3>📌 Résumé des questions et des bonnes réponses :</h3>
      <ul class="summary-list">
        <li v-for="(question, index) in selectedQuiz.questions" :key="index">
          <p><strong>Question : </strong> {{ question.question }}</p>
          <p><strong>Bonne réponse : </strong>
            <span class="correct-answer">
              {{ question.answers.find(answer => answer.correct)?.text }}
            </span>
          </p>
        </li>
      </ul>

      <button @click="restartQuiz">Recommencer</button>
    </div>
  </div>
</template>


  
  <style lang="scss" scoped>
  .quiz-selection-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .quiz-container {
    max-width: 600px;
    margin: 2vh auto;
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

  li.selected {
    background: #2ac400;
  }

  button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &.next-button {
    background: #007bff;
    color: white;

    &:hover {
      background: #0056b3;
      transform: scale(1.05);
    }
  }

  &.back-button {
    background: #ff5722;
    color: white;
    margin: 2vh;


    &:hover {
      background: #e64a19;
      transform: scale(1.05);
    }
  }
}

  </style>
  
  