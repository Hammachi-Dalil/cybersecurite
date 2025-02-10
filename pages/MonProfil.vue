<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { useRouter } from 'vue-router';
import type { User } from '~/types/supabase';

const { $supabase } = useNuxtApp();
const currentUser = ref<User | null>(null);
const userForm = ref({
  first_name: '',
  last_name: ''
});

const router = useRouter();

// Récupérer les informations de l'utilisateur connecté
onMounted(async () => {
  try {
    // Récupérer l'utilisateur actuel via Supabase
    const { data: userData, error } = await $supabase.auth.getUser();

    if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error.message);
      return;
    }

    if (userData) {
      // Récupérer les informations de l'utilisateur depuis la table "users"
      const { data, error: userError } = await $supabase
        .from('users')
        .select('*')
        .eq('id', userData.user.id)
        .single();

      if (userError) {
        console.error('Erreur lors de la récupération des données utilisateur:', userError.message);
        return;
      }

      // Mettre à jour l'état avec les données de l'utilisateur
      currentUser.value = data;
      userForm.value.first_name = data.first_name;
      userForm.value.last_name = data.last_name;
    }
  } catch (err) {
    console.error('Erreur inattendue lors de la récupération de l\'utilisateur:', err);
  }
});

// Mise à jour du profil utilisateur
const updateProfile = async () => {
  if (!currentUser.value) return;

  try {
    const { first_name, last_name } = userForm.value;

    // Mise à jour dans la table "users"
    const { error } = await $supabase
      .from('users')
      .update({ first_name, last_name })
      .eq('id', currentUser.value.id);

    if (error) {
      console.error('Erreur lors de la mise à jour des informations utilisateur:', error.message);
      return;
    }

    console.log('Profil mis à jour avec succès.');

    // Optionnel : rediriger l'utilisateur après la mise à jour
    router.push('/monprofil'); // Cela permet de recharger la page avec les informations mises à jour
  } catch (err) {
    console.error('Erreur inattendue lors de la mise à jour du profil:', err);
  }
};
</script>

<template>
  <div class="profile">
    <h1 class="profile__title">Mon Profil</h1>

    <!-- Formulaire de mise à jour -->
    <form @submit.prevent="updateProfile" class="profile__form">
      <div class="profile__form-group">
        <label for="first_name" class="profile__label">Prénom:</label>
        <input type="text" v-model="userForm.first_name" class="profile__input" required />
      </div>

      <div class="profile__form-group">
        <label for="last_name" class="profile__label">Nom:</label>
        <input type="text" v-model="userForm.last_name" class="profile__input" required />
      </div>

      <button type="submit" class="profile__button">Mettre à jour</button>
    </form>

    <!-- Affichage des informations utilisateur -->
    <div v-if="currentUser" class="profile__info">
      <h3 class="profile__info-title">Informations actuelles :</h3>
      <p class="profile__info-item">Prénom: <span>{{ currentUser.first_name }}</span></p>
      <p class="profile__info-item">Nom: <span>{{ currentUser.last_name }}</span></p>
      <p class="profile__info-item">Email: <span>{{ currentUser.email }}</span></p>
      <img v-if="currentUser && currentUser.avatar_url" :src="currentUser.avatar_url" alt="Avatar" class="profile__avatar" />
    </div>
  </div>
</template>

<style scoped lang="scss">

// Style BEM pour la page Mon Profil
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: $BackgroundColor;
  font-family: $fontTextFamily;
  color: $TextColor;
  padding: 20px;

  &__avatar{
    max-width: 20vh;
    height: auto;
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
    color: $TextColor;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__form {
    background: $white;
    box-shadow: 0 4px 8px $ShadowColor;
    border-radius: 10px;
    padding: 2rem;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-sizing: border-box;
  }

  &__form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__label {
    font-size: 1rem;
    font-weight: 600;
    color: $TextColorBlack;
  }

  &__input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid $gray100;
    border-radius: 5px;
    background-color: $white100;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;

    &:focus {
      border-color: $PrimaryColor;
      outline: none;
      box-shadow: 0 0 5px rgba($PrimaryColor, 0.5);
    }
  }

  &__button {
    background-color: $PrimaryColor;
    color: $white;
    border: none;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s ease-in-out;
    align-self: center;

    &:hover {
      background-color: darken($PrimaryColor, 10%);
    }
  }

  // Section d'affichage des informations utilisateur
  &__info {
    margin-top: 2rem;
    background: $PrimaryColor;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba($ShadowColor, 0.5);
    width: 100%;
    max-width: 500px;
    text-align: center;

    &-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: $TextColor;
    }

    &-item {
      font-size: 1rem;
      font-weight: 500;
      color: $TextColor;
      margin-bottom: 10px;

      span {
        font-weight: bold;
        color: $TextColor;
      }
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .profile {
    padding: 10px;

    &__form {
      padding: 1.5rem;
      max-width: 350px;
      margin: 10px auto;
    }

    &__info {
      padding: 1rem;
      max-width: 350px;
    }
  }
}
</style>



