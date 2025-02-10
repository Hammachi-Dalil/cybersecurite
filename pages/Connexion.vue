<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp, useRouter } from '#app';
import type { User } from '~/types/supabase';

// Définition des formulaires
const signUpForm = ref({
  email: '',
  prenom: '',
  last_name: '', // Champ pour le nom de famille
  password: ''
});


const signInForm = ref({
  email: '',
  password: ''
});

// Définition de la liste des utilisateurs
const users = ref<User[]>([]);
const currentUser = ref<User | null>(null); // Utilisateur actuellement connecté

const { $supabase } = useNuxtApp();
const router = useRouter();

// Inscription d'un utilisateur
const selectedFile = ref<File | null>(null); // Contient le fichier sélectionné

// Gestion du fichier sélectionné
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]; // Stocke le fichier dans `selectedFile`
  }
};

// Inscription avec image
const signUp = async () => {
  const { email, prenom, last_name, password } = signUpForm.value;

  try {
    console.log('Données envoyées pour l\'inscription:', { email, password });

    // Étape 1 : Inscription dans auth.users
    const { data, error } = await $supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: prenom,
          last_name: last_name
        }
      }
    });

    if (error) {
      console.error('Erreur auth.signUp:', error.message);
      return;
    }

    if (!data?.user?.id) {
      console.error('Erreur : ID utilisateur manquant après auth.signUp');
      return;
    }

    // Étape 2 : Upload de l'image si un fichier a été sélectionné
    let avatar_url = '';
    if (selectedFile.value) {
      const filePath = `avatars/${data.user.id}/${selectedFile.value.name}`;
      const { data: uploadData, error: uploadError } = await $supabase.storage
        .from('user-profile-images') // Bucket créé dans Supabase
        .upload(filePath, selectedFile.value);

      if (uploadError) {
        console.error('Erreur lors de l\'upload de l\'image:', uploadError.message);
      } else {
        avatar_url = `${$supabase.storage
          .from('user-profile-images')
          .getPublicUrl(filePath).data.publicUrl}`;
      }
    }

    // Étape 3 : Insertion dans la table users avec l'URL de l'image
    const { error: insertError } = await $supabase
      .from('users')
      .insert([{ id: data.user.id, email, first_name: prenom, last_name: last_name, avatar_url: avatar_url }]);

    if (insertError) {
      console.error('Erreur lors de l\'insertion dans users:', insertError.message);
    } else {
      console.log('Utilisateur inscrit avec succès.');
    }
  } catch (err) {
    console.error('Erreur inattendue lors de l\'inscription:', err);
  }
};


// Connexion d'un utilisateur
const signIn = async () => {
  const { email, password } = signInForm.value;

  try {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Erreur lors de la connexion:', error.message);
      return;
    }

    console.log('Connexion réussie:', data);

    // Redirection vers la page MonProfil après la connexion réussie
    router.push('/monprofil');

    // Récupération des informations supplémentaires de la table users
    const { data: userData, error: userError } = await $supabase
      .from('users')
      .select('*')
      .eq('id', data.user?.id)
      .single();

    if (userError) {
      console.error('Erreur lors de la récupération des informations utilisateur:', userError.message);
      return;
    }

    currentUser.value = userData;
    console.log('Utilisateur connecté:', currentUser.value);
  } catch (err) {
    console.error('Erreur inattendue lors de la connexion:', err);
  }
};

// Récupérer les utilisateurs après la connexion
onMounted(async () => {
  const { data, error } = await $supabase
    .from<'users', User>('users')
    .select('id, email, first_name, last_name, avatar_url');

  if (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
  } else {
    users.value = data || [];
  }
});
</script>

<template>
  <div class="auth">
    <!-- Formulaire d'inscription -->
    <h1 class="auth__title">Inscription</h1>
    <form @submit.prevent="signUp" class="auth__form">
      <div class="auth__form-group">
        <label for="email" class="auth__label">Email:</label>
        <input type="email" v-model="signUpForm.email" class="auth__input" required />
      </div>
      <div class="auth__form-group">
        <label for="prenom" class="auth__label">Prénom:</label>
        <input type="text" v-model="signUpForm.prenom" class="auth__input" required />
      </div>
      <div class="auth__form-group">
        <label for="last_name" class="auth__label">Nom:</label>
        <input type="text" v-model="signUpForm.last_name" class="auth__input" required />
      </div>
      <div class="auth__form-group">
        <label for="password" class="auth__label">Mot de passe:</label>
        <input type="password" v-model="signUpForm.password" class="auth__input" required />
      </div>
      <div class="auth__form-group">
        <label for="avatar" class="auth__label">Image de profil:</label>
        <input type="file" @change="handleFileChange" class="auth__input" />
      </div>
      <button type="submit" class="auth__button">S'inscrire</button>
    </form>


    <!-- Formulaire de connexion -->
    <h1 class="auth__title">Connexion</h1>
    <form @submit.prevent="signIn" class="auth__form">
      <div class="auth__form-group">
        <label for="email" class="auth__label">Email: </label>
        <input type="email" v-model="signInForm.email" class="auth__input" required />
      </div>
      <div class="auth__form-group">
        <label for="password" class="auth__label">Mot de passe: </label>
        <input type="password" v-model="signInForm.password" class="auth__input" required />
      </div>
      <button type="submit" class="auth__button">Se connecter</button>
    </form>

    <!-- Liste des utilisateurs -->
    <div class="auth__users">
      <h2 class="auth__users-title">Liste des utilisateurs</h2>
      <ul class="auth__users-list">
        <li v-for="user in users" :key="user.id" class="auth__user-item">
          {{ user.email }}, {{ user.first_name }}, {{ user.last_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Styles généraux BEM
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $BackgroundColor;
  font-family: $fontTextFamily;
  color: $TextColor;
  padding: 20px;

  &__title {
    font-size: 2rem;
    font-weight: bold;
    color: $TextColor;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__form {
    background: $white;
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

  // Liste des utilisateurs
  &__users {
    margin-top: 2rem;
    width: 100%;
    max-width: 600px;
  }

  &__users-title {
    font-size: 1.5rem;
    color: $TextColor;
    margin-bottom: 1rem;
    text-align: center;
  }

  &__users-list {
    list-style: none;
    padding: 0;
  }

  &__user-item {
    background: $white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
    font-weight: 500;
    color: $TextColorBlack;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .auth {
    padding: 10px;

    &__form {
      padding: 1.5rem;
      max-width: 350px;
      margin: 10px auto;
    }
  }
}
</style>
