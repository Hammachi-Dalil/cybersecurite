<script setup lang="ts">
import { ref } from 'vue';

const menuOuvert = ref(false);

const toggleMenu = () => {
  menuOuvert.value = !menuOuvert.value;
};

const fermerMenu = () => {
  menuOuvert.value = false;
};
</script>

<template>
    <main class="header">
      <div class="header__container">
        <!-- Bouton Hamburger avec animation -->
        <button
          class="header__hamburger"
          @click="toggleMenu"
          :class="{ 'hamburger--ouvert': menuOuvert }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
  
        <!-- Menu principal -->
        <div class="header__menu" :class="{ 'menu--ouvert': menuOuvert }">
          <NuxtLink class="linkLogo" to="/" @click="fermerMenu">Cyberase</NuxtLink>
          <NuxtLink class="link" to="/activite" @click="fermerMenu">Activité</NuxtLink>
          <NuxtLink class="link mobile-only" to="/Connexion" @click="fermerMenu">Connexion</NuxtLink>
          <NuxtLink class="link mobile-only" to="/MonProfil" @click="fermerMenu">Mon Profil</NuxtLink>
        </div>
  
        <!-- Liens à droite (version PC uniquement) -->
        <div class="header__menuDroite">
          <NuxtLink class="link" to="/Connexion">Connexion</NuxtLink>
          <NuxtLink class="link" to="/MonProfil">Mon Profil</NuxtLink>
        </div>
      </div>
    </main>
  </template>
  

<style lang="scss">
.header {
  background-color: $PrimaryColor;
  color: $SecondaryColor;
  padding: 20px;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__menu {
    display: flex;
    flex-direction: row;
    align-items: center;

    a {
      color: $TextColor;
      text-decoration: none;
      margin: 0 15px;
    }

    &.menu--ouvert {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $PrimaryColor;
      z-index: 1000;
      overflow: hidden;

      a {
        margin: 15px 0;
        font-size: 20px;
      }
    }
  }

  &__menuDroite {
    display: flex;
    align-items: center;

    a {
      color: $TextColor;
      margin-left: 15px;
      text-decoration: none;
    }
  }

  &__hamburger {
    display: none;
    position: relative;
    width: 30px;
    height: 24px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1100;

    span {
      display: block;
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: white; /* Couleur des barres */
      border-radius: 3px;
      transition: all 0.3s ease; /* Animation douce */
    }

    /* Position des trois barres */
    span:nth-child(1) {
      top: 0;
    }
    span:nth-child(2) {
      top: 10px;
    }
    span:nth-child(3) {
      top: 20px;
    }

    &.hamburger--ouvert {
      span:nth-child(1) {
        transform: rotate(45deg);
        top: 10px;
      }
      span:nth-child(2) {
        opacity: 0; /* Barre du milieu disparaît */
      }
      span:nth-child(3) {
        transform: rotate(-45deg);
        top: 10px;
      }
    }
  }

//     &.hamburger--ouvert {
//       position: fixed; /* Fixe le bouton pour qu'il reste visible */
//       top: 20px;
//       left: 20px;
//     }
//   }

  .mobile-only {
    display: none;
  }

  @include large-down {
    &__menu {
      display: none;
    }

    &__menuDroite {
      display: none;
    }

    &__hamburger {
      display: block;
    }

    .mobile-only {
      display: block;
    }
  }
}

.linkLogo {
  font-family: "Comfortaa", serif;
  font-weight: bolder;
  font-size: larger;
}
</style>
