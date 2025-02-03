<script setup lang="ts">
import { ref, computed } from 'vue';

const password = ref(''); // Stocke le mot de passe entré
const reasons = ref<string[]>([]); // Stocke les raisons de la faiblesse

// Fonction pour évaluer la robustesse du mot de passe
const evaluatePassword = (value: string) => {
  reasons.value = [];
  let score = 0;

  // Critères d'évaluation
  if (value.length >= 8) score++; // Longueur minimale
  else reasons.value.push('Le mot de passe doit contenir au moins 8 caractères.');

  if (/[A-Z]/.test(value)) score++; // Contient une majuscule
  else reasons.value.push('Le mot de passe doit contenir au moins une majuscule.');

  if (/[a-z]/.test(value)) score++; // Contient une minuscule
  else reasons.value.push('Le mot de passe doit contenir au moins une minuscule.');

  if (/\d/.test(value)) score++; // Contient un chiffre
  else reasons.value.push('Le mot de passe doit contenir au moins un chiffre.');

  if (/[@$!%*?&#)(/"'|'")]/.test(value)) score++; // Contient un caractère spécial
  else reasons.value.push('Le mot de passe doit contenir au moins un caractère spécial.');

  return score;
};

// Calcul de la robustesse du mot de passe
const passwordStrength = computed(() => {
  const score = evaluatePassword(password.value);

  if (score <= 2) return { label: 'Mot de passe faible', color: 'red' };
  if (score === 3 || score === 4) return { label: 'Mot de passe moyen', color: 'orange' };
  if (score === 5) return { label: 'Mot de passe sécurisé', color: 'green' };
  return { label: '', color: 'black' };
});
</script>

<template>
  <div class="password-strength">
    <div class="password-strength__input-container">
        <label for="password" class="password-strength__label">Entrez un mot de passe :</label>
        <input id="password" type="password" v-model="password" class="password-strength__input"/>
    </div>
    <p
      class="password-strength__message"
      :style="{ color: passwordStrength.color }"
    >
      {{ passwordStrength.label }}
    </p>
    <ul v-if="reasons.length > 0" class="password-strength__reasons">
      <li v-for="reason in reasons" :key="reason">{{ reason }}</li>
    </ul>
  </div>
</template>

<style lang="scss">
.password-strength {
  padding: 8vh 2vh;
  font-family: Arial, sans-serif;
  background-color: $greyPassword;

  &__input-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-self: center;
  }

    &__label {
        font-weight: bold;
        font-size: 4vh;
        font-family: 'ubuntu', sans-serif;
    }

  &__input {

    padding: 10px;
    font-size: 16px;
    margin-top: 10px;
    border: 1px solid $SecondaryColor;
    border-radius: 5px;
  }
  :focus {
    outline: none;
    border-color: $PrimaryColor;
    box-shadow: 0 0 20px 0 $SecondaryColor;
    transform: box-shadow ;
    transition: all 0.5s ease-in-out;
  }

  &__message {
    margin-top: 10px;
    font-weight: bold;
    font-family: 'ubuntu', 'sans-serif';
  }

  &__reasons {
    margin-top: 10px;
    list-style-type: disc;
    margin-left: 20px;
    color: #666;
    font-size: 14px;
    font-family: 'ubuntu', 'sans-serif';
  }
}
</style>
