<script>
  export default {
  data() {
    return {
      currentQuestion: 0,
      selectedAnswer: null,
      score: 0,
      quizCompleted: false,
      quizzes: [
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
              question: "Quel est le but du phishing ?",
              answers: [
                { text: "Récupérer des informations personnelles", correct: true },
                { text: "Vendre des logiciels de sécurité", correct: false },
                { text: "Accélérer la connexion Internet", correct: false },
                { text: "Supprimer les virus", correct: false }
              ]
            },
            {
              question: "Quel indice peut révéler un email de phishing ?",
              answers: [
                { text: "Une adresse email suspecte", correct: true },
                { text: "Une promotion légitime d'une entreprise", correct: false },
                { text: "Un logo bien placé", correct: false },
                { text: "Un email de votre banque", correct: false }
              ]
            },
            {
              question: "Quelle action est recommandée face à un email suspect ?",
              answers: [
                { text: "Ne pas cliquer sur les liens", correct: true },
                { text: "Ouvrir la pièce jointe immédiatement", correct: false },
                { text: "Partager l'email à tous ses contacts", correct: false },
                { text: "Se désabonner", correct: false }
              ]
            },
            {
              question: "Les fraudeurs utilisent souvent le phishing pour...",
              answers: [
                { text: "Voler des informations bancaires", correct: true },
                { text: "Faire des blagues", correct: false },
                { text: "Vendre des logiciels antivirus", correct: false },
                { text: "Promouvoir un site web", correct: false }
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
              question: "Que doit contenir un bon mot de passe ?",
              answers: [
                { text: "Majuscules, chiffres, symboles", correct: true },
                { text: "Seulement des lettres", correct: false },
                { text: "Uniquement des chiffres", correct: false },
                { text: "Votre nom et prénom", correct: false }
              ]
            },
            {
              question: "Pourquoi faut-il éviter d'utiliser un mot de passe unique ?",
              answers: [
                { text: "Pour éviter qu'un hacker accède à plusieurs comptes", correct: true },
                { text: "Parce que c'est difficile à retenir", correct: false },
                { text: "Car il faut un mot de passe court", correct: false },
                { text: "Pour être original", correct: false }
              ]
            },
            {
              question: "Un bon gestionnaire de mot de passe permet...",
              answers: [
                { text: "De stocker et générer des mots de passe complexes", correct: true },
                { text: "D'envoyer des mots de passe par SMS", correct: false },
                { text: "D'éviter tout piratage", correct: false },
                { text: "D'écrire les mots de passe sur papier", correct: false }
              ]
            },
            {
              question: "Que faire si un service a été piraté ?",
              answers: [
                { text: "Changer immédiatement son mot de passe", correct: true },
                { text: "Ignorer la menace", correct: false },
                { text: "Utiliser le même mot de passe", correct: false },
                { text: "Envoyer son mot de passe au support", correct: false }
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
                { text: "Bloquer l'accès aux fichiers et demander une rançon", correct: true },
                { text: "Voler les emails des utilisateurs", correct: false },
                { text: "Accélérer l'ordinateur", correct: false },
                { text: "Installer des mises à jour", correct: false }
              ]
            },
            {
              question: "Quel est le meilleur moyen d'éviter un ransomware ?",
              answers: [
                { text: "Faire des sauvegardes régulières", correct: true },
                { text: "Ouvrir tous les emails reçus", correct: false },
                { text: "Désactiver son antivirus", correct: false },
                { text: "Ne pas mettre à jour son PC", correct: false }
              ]
            },
            {
              question: "Comment un ransomware se propage-t-il ?",
              answers: [
                { text: "Par des pièces jointes piégées", correct: true },
                { text: "En regardant des vidéos YouTube", correct: false },
                { text: "En visitant un site gouvernemental", correct: false },
                { text: "En jouant à des jeux vidéo", correct: false }
              ]
            },
            {
              question: "Que faire si votre ordinateur est infecté par un ransomware ?",
              answers: [
                { text: "Ne pas payer la rançon et restaurer une sauvegarde", correct: true },
                { text: "Payer la rançon immédiatement", correct: false },
                { text: "Ignorer l’alerte", correct: false },
                { text: "Partager la rançon avec des amis", correct: false }
              ]
            },
            {
              question: "Quel comportement réduit le risque de ransomware ?",
              answers: [
                { text: "Éviter de télécharger des logiciels piratés", correct: true },
                { text: "Cliquer sur tous les liens", correct: false },
                { text: "Ignorer les mises à jour", correct: false },
                { text: "Partager ses fichiers avec tout le monde", correct: false }
              ]
            }
          ]
        }
      ],
      selectedQuiz: {}
    };
  },
    created() {
      const quizIndex = this.$route.query.quizIndex;
      this.selectedQuiz = this.quizzes[quizIndex];
    },
    methods: {
      selectAnswer(index) {
        this.selectedAnswer = index;
      },
      nextQuestion() {
        if (this.selectedAnswer !== null) {
          if (this.selectedQuiz.questions[this.currentQuestion].answers[this.selectedAnswer].correct) {
            this.score++;
          }
          this.currentQuestion++;
          this.selectedAnswer = null;
  
          if (this.currentQuestion >= this.selectedQuiz.questions.length) {
            this.quizCompleted = true;
          }
        }
      },
      restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.quizCompleted = false;
      },
      goBack() {
        this.$router.push("/activite");
      }
    }
  };
  </script>

<template>
  <div class="quiz-container">
    <button class="back-button" @click="goBack">⬅ Retour à la sélection</button>
    <h2>{{ selectedQuiz.title }}</h2>

    <div v-if="!quizCompleted">
      <div v-if="currentQuestion < selectedQuiz.questions.length" class="question-box">
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
              {{ question.answers.find(answer => answer.correct).text }}
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
  
  