<script setup>
import { ref, onMounted } from 'vue';

const statistiquesRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.3 } // La section est considérée visible lorsqu'au moins 10% de son contenu est visible
  );

  if (statistiquesRef.value) {
    observer.observe(statistiquesRef.value);
  }
});
</script>

<template>
  <main class="main">

    <div class="Home">
      <!-- Vidéo en arrière-plan -->
      <video autoplay muted loop class="Home__background">
        <source src="/assets/media/background_vid.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>

      <!-- Contenu sur vidéo en arrière-plan -->
      <div class="Home__content">
        <h1 class="Home__sentence">
          Bienvenue sur <span class="Home__title">mon site Nuxt</span>
        </h1>
        <p class="Home__subtitle"> Parce que la sécurité c'est aussi sur le web</p>
      </div>
    </div>

    <!-- Introduction -->
    <div class="Introduction">
      <h1 class="Introduction__title">La cybersécurité, qu'est-ce que c'est ?</h1>
        <p class="Introduction__paragraph">
          La cybersécurité regroupe les pratiques et technologies visant à protéger les systèmes, 
          réseaux et données contre les cyberattaques et accès non autorisés. 
          Dans un monde où le numérique est omniprésent, elle est essentielle pour préserver nos informations personnelles, 
          financières et professionnelles. Les cybermenaces, comme le phishing ou les malwares, peuvent entraîner des pertes financières, 
          des vols de données ou une usurpation d'identité.

          Elle ne concerne pas uniquement les entreprises : 
          chacun peut être une cible. Adopter des gestes simples, comme créer des mots de passe solides ou se méfier des e-mails suspects, 
          permet de réduire les risques. La cybersécurité est donc indispensable pour naviguer en ligne en toute confiance et protéger 
          notre vie privée.
        </p>
    </div>

    <!-- Statistiques -->
    <div class="Statistiques" ref="statistiquesRef">
      <Statistique logo="/_nuxt/assets/media/clock.png" stat="11 secondes"> En 2024, une cyberattaque a lieu toutes les 11 secondes.</Statistique>
      <Statistique logo="/_nuxt/assets/media/email.png" stat="95%"> des failles de sécurité sont dues à des erreurs humaines.</Statistique>
      <Statistique logo="/_nuxt/assets/media/password.png" stat="80%"> des attaques initiales dans les entreprises sont du phishing</Statistique>
      <Statistique logo="/_nuxt/assets/media/people.png" stat="80%"> des mots de passe les plus utilisés sont vulnérables à une attaque en moins d'une seconde.</Statistique>
    </div>

    <!-- Test du mot de passe -->
    <div class="PasswordTest">
      <PassordTest />
    </div>
  </main>
</template>

<style lang="scss">
// Haut de la page avec vidéo en arrière-plan 
.Home {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: auto; /* Adapte la hauteur automatiquement */
  
  &__background {
    display: block; /* S'assure que la vidéo est un bloc */
    width: 100%; /* Conserve la largeur à 100% du conteneur */
    height: auto; /* Adapte automatiquement la hauteur à la proportion de la vidéo */
  }

  &__content {
    position: absolute; /* Superpose le contenu par-dessus la vidéo */
    z-index: 1;
    top: 30%;
    left: 5%;
    padding: 20px;
    color: $BackgroundColor;
  }

  &__sentence {
    display: inline;
    font-size: 8vh;
  }

  &__subtitle {
    font-size: 4vh;
  }

  &__title {
    color: $SecondaryColor;
    margin: 0;
    padding-left: 0.5vh;
    font-weight: bold;
  }

  @include large-down {
    &__sentence {
      font-size: 3vh;
    }

    &__subtitle {
      font-size: 2vh;
    }

    &__content {
      top: 25%;
    }
  }
}

// Contenu principal

// Introduction
.Introduction {
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 20px;
  background-color: $SecondaryColor;
  color: $TextColor;

  &__title {
    font-size: 4vh;
    margin-bottom: 20px;
  }

  &__paragraph {
    font-size: 2.5vh;
    margin-bottom: 20px;
    text-align: justify;  
  }

  @include large-down {
    &__title {
      font-size: 3vh;
    }

    &__paragraph {
      font-size: 2vh;
    }
  }
}

// Statistiques
.Statistiques {
  display: flex;
  flex-wrap: wrap; /* Permet aux éléments de revenir à la ligne */
  justify-content: space-around; /* Garde l'espacement entre les éléments */
  padding: 20px;
  gap: 20px;
  color: $TextColor;
  margin: 4vh 0;
  opacity: 0; /* Initialement invisible */
  transform: translateY(20px); /* Légèrement déplacé vers le bas */
  transition: opacity 1s, transform 1s; /* Animation de 1 seconde */

  &.is-visible {
    opacity: 1; /* Devient visible */
    transform: translateY(0); /* Position normale */
  }

  @include large-down {
    justify-content: center; /* Centre les éléments pour les petits écrans */
  }
}

// Test du mot de passe
</style>
