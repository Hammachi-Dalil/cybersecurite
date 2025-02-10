<template>
    <div class="quiz-container">
      <button class="back-button" @click="goBack">⬅ Retour à la sélection</button>
      <h2>📧 Détection des Emails Frauduleux</h2>
  
      <div v-if="!quizCompleted">
        <div v-if="currentQuestion < emails.length" class="email-box">
          <h3>Analysez cet email :</h3>
          <div class="email-content" v-html="emails[currentQuestion].content"></div>
          
          <div class="button-group">
            <button @click="checkAnswer(true)">✅ Véritable email</button>
            <button @click="checkAnswer(false)">❌ Email frauduleux</button>
          </div>
        </div>
      </div>
  
      <div v-else class="result-box">
        <h3>🎉 Quiz terminé !</h3>
        <p>Votre score : <strong>{{ score }} / {{ emails.length }}</strong></p>
        <button @click="restartQuiz">Recommencer</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentQuestion: 0,
        score: 0,
        quizCompleted: false,
        emails: [
          {
            content: `<b>Expéditeur :</b> service-client@paypal-support.com <br>
                      <b>Objet :</b> Problème avec votre compte ! <br><br>
                      Bonjour, <br>
                      Nous avons détecté une activité suspecte sur votre compte PayPal. 
                      Veuillez vérifier votre identité en cliquant sur ce lien : <br> 
                      <a href="http://paypal-verification.com">Vérifier mon compte</a> <br><br>
                      Merci, <br> L'équipe PayPal`,
            correct: false
          },
          {
            content: `<b>Expéditeur :</b> noreply@amazon.fr <br>
                      <b>Objet :</b> Confirmation de commande <br><br>
                      Bonjour, <br>
                      Votre commande #123456 a bien été enregistrée. Vous pouvez consulter votre historique de commandes sur votre compte Amazon. <br><br>
                      Cordialement, <br> L'équipe Amazon`,
            correct: true
          },
          {
            content: `<b>Expéditeur :</b> admin@apple-security.com <br>
                      <b>Objet :</b> Votre compte Apple est suspendu ! <br><br>
                      Bonjour, <br>
                      Pour des raisons de sécurité, votre compte Apple a été temporairement suspendu. 
                      Cliquez ici pour le réactiver : <br>
                      <a href="http://apple-secure-login.com">Réactiver mon compte</a> <br><br>
                      Merci, <br> Support Apple`,
            correct: false
          }
        ]
      };
    },
    methods: {
      checkAnswer(userChoice) {
        if (userChoice === this.emails[this.currentQuestion].correct) {
          this.score++;
        }
  
        this.currentQuestion++;
  
        if (this.currentQuestion >= this.emails.length) {
          this.quizCompleted = true;
        }
      },
      restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.quizCompleted = false;
      },
      goBack() {
        this.$router.push("/activite");
      }
    }
  };
  </script>
  
  <style scoped>
  .quiz-container {
    max-width: 600px;
    margin: 2vh auto;
    text-align: center;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .email-box {
    margin: 20px 0;
    padding: 15px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .email-content {
    text-align: left;
    padding: 10px;
    border-left: 4px solid #007bff;
  }
  
  .button-group {
    margin-top: 10px;
  }
  
  button {
    padding: 10px;
    margin: 5px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  .back-button {
    background: #ff5722;
    color: white;
    margin: 2vh;
  }
  
  button:nth-child(1) {
    background: #28a745;
    color: white;
  }
  
  button:nth-child(2) {
    background: #dc3545;
    color: white;
  }
  </style>
  