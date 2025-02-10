<template>
    <div v-if="showBanner" class="banniere">
      <p>Nous utilisons des cookies pour améliorer votre expérience.</p>
      <button @click="acceptCookies" class="button">OK</button>
    </div>
  
    <div v-if="showMessage" class="message">
      🚨 Vous avez accepté de me livrer <strong>toutes</strong> les données de votre ordinateur ! 😈  
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const showBanner = ref(true);
  const showMessage = ref(false);
  
  const acceptCookies = () => {
    showBanner.value = false;
    showMessage.value = true;
  
    // Cache le message après 3 secondes
    setTimeout(() => {
      showMessage.value = false;
    }, 3000);
  };
  </script>
  

  <style lang="scss">
    .fixed {
        position: fixed;
    }   

    .message {
      background-color: #f44336;
      color: white;
      text-align: center;
      padding: 10px;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .banniere {
      background-color: #f2f2f2;
      padding: 10px;
      text-align: center;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
    </style>

  

  