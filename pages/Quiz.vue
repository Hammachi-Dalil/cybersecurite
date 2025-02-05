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
            }
          ]
        },
        {
          title: "Quiz sur la Détection des Emails Frauduleux",
          questions: [
            {
              email: `
                <b>Expéditeur :</b> service-client@amazon-support.com <br>
                <b>Objet :</b> Votre compte a été suspendu ! <br><br>
                Bonjour, <br>
                Nous avons détecté une activité inhabituelle sur votre compte Amazon. 
                Veuillez vérifier votre identité en cliquant sur le lien suivant : <br> 
                <a href="http://amazon-secure-login.com">Vérifier mon compte</a> <br><br>
                Cordialement, <br>
                L'équipe Amazon
              `,
              correct: false,
              explanation: "Cet email est frauduleux ! L'adresse email semble légitime, mais le lien redirige vers un faux site (amazon-secure-login.com)."
            },
            {
              email: `
                <b>Expéditeur :</b> noreply@paypal.com <br>
                <b>Objet :</b> Confirmation de votre transaction <br><br>
                Bonjour, <br>
                Votre paiement de 49,99€ à Netflix a bien été effectué. <br>
                Vous pouvez consulter votre historique des transactions en vous connectant à votre compte. <br><br>
                Merci d'utiliser PayPal. <br>
                <b>Note :</b> Ne répondez pas à cet email, il est généré automatiquement.
              `,
              correct: true,
              explanation: "Cet email est légitime ! Il ne contient aucun lien suspect et informe simplement d'une transaction."
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
    selectAnswer(isLegit) {
      this.selectedAnswer = isLegit;
    },
    nextQuestion() {
      if (this.selectedAnswer !== null) {
        if (this.selectedQuiz.questions[this.currentQuestion].correct === this.selectedAnswer) {
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
  
  