<script setup lang="ts">
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
    { threshold: 0.4 } // La section est considérée visible lorsqu'au moins 10% de son contenu est visible
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
          Bienvenue sur <span class="Home__title">Cyberase</span>
        </h1>
        <p class="Home__subtitle">Pour effacer vos mauvaises habitudes en ligne</p>
      </div>
    </div>

    <!-- Introduction -->
    <div class="Introduction">
      <h1 class="Introduction__title">La cybersécurité, qu'est-ce que c'est ?</h1>
        <div class="Introduction__container">
          <p class="Introduction__paragraph">
            À l’ère du numérique, où nos vies personnelles et professionnelles sont stockées en ligne, 
            elle est devenue indispensable pour garantir la confidentialité, 
            l’intégrité et la disponibilité des informations. Les cybermenaces sont variées : 
            phishing, malwares, rançongiciels, attaques DDoS, espionnage industriel, ou encore piratage des objets connectés. 
            Ces menaces peuvent entraîner le vol de données personnelles, des pertes financières, 
            la paralysie d’entreprises, voire des atteintes aux infrastructures critiques comme les hôpitaux et les services publics. 
            Se protéger passe par des gestes simples mais essentiels : utiliser des mots de passe complexes et uniques, 
            activer l’authentification à deux facteurs, mettre à jour régulièrement ses logiciels, éviter les Wi-Fi publics non sécurisés, 
            sauvegarder ses données, et surtout se méfier des e-mails et liens suspects. 
            Les entreprises doivent aller plus loin en formant leurs employés, 
            en chiffrant les données sensibles et en mettant en place des plans de réponse aux cyberattaques. 
            Face à ces enjeux, les États renforcent les régulations comme le RGPD en Europe et investissent dans des agences spécialisées comme l’ANSSI en France. 
            Cependant, la cybersécurité ne repose pas uniquement sur les gouvernements ou les entreprises : 
            chacun a un rôle à jouer pour assurer un environnement numérique plus sûr. À l’avenir, 
            avec la montée en puissance de l’intelligence artificielle, de l’IoT et des données massives, 
            les défis seront encore plus importants, 
            et il est primordial d’adopter dès maintenant une culture de la cybersécurité pour protéger notre vie numérique. 
            notre vie privée.
          </p>

          <img src="/assets/media/laptop.jpg" alt="Image de la cybersécurite" class="Introduction__image"/>
        </div>
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


    <!-- section des 3 colonnes -->
    <div class="Colonne-container">
      <Colonne title="Protection des Données" image="/_nuxt/assets/media/secu1.jpg"> 
          Vos <strong>données personnelles</strong> sont précieuses. Nous vous apprenons à les protéger en 
          adoptant les bonnes pratiques : <strong>gestion des permissions</strong>, chiffrement, et 
          paramétrage de vos comptes pour éviter toute fuite d’informations. 
        </Colonne>
        <Colonne title="Mot de passe robuste" image="/_nuxt/assets/media/secu2.jpg"> 
          Un bon mot de passe est la première ligne de défense contre les attaques ! 
          Découvrez <strong>comment créer des mots de passe robustes</strong>, l’importance de 
          l’authentification à deux facteurs (2FA) et comment gérer efficacement vos 
          identifiants sans compromettre votre sécurité. 
        </Colonne>
        <Colonne title="Vigilences au arnaques" image="/_nuxt/assets/media/laptop.jpg"> 
          Internet regorge de <strong>pièges</strong> : hameçonnage (phishing), escroqueries en ligne, 
          logiciels malveillants… Apprenez à repérer les signaux d’alerte, à vérifier 
          l’authenticité des sites web et à protéger vos informations face aux menaces numériques. 
        </Colonne>
    </div>

    <!-- section de l'image -->
    <div class="Affiche">
     <img src="/_nuxt/assets/media/bandeau_hack.jpg" alt="Affiche de la cybersecurite" class="Affiche__img">
     <h1 class="Affiche__title">Venez tester vos connaissances avec le CyberQuizz! </h1>
     <a href="/activite" class="Affiche__link">voir le quizz</a>
    </div>

    <!-- section des articles -->
    <ArticlesList />

    <!-- section de la phrise -->
     <Phrise />

     
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
    color: $TextColor;
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
    font-family: "Comfortaa", cursive;
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
  padding: 8vh 2vh;
  background-color: $BackgroundColor;
  color: $TextColor;

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10vh;
  }

  &__image {
  width: calc(1000px / 4); /* Réduit l'image à 1/4 de sa taille originale */
  max-width: 250px; /* Empêche l'agrandissement excessif */
  height: auto; /* Garde les proportions */
  border-radius: 20px;
  box-shadow: 0 4px 8px $ShadowColor;
  object-fit: contain; /* Assure que l’image s’affiche entièrement sans distorsion */
  height: 250px;
  max-height: 250px;
  align-self: center;
}


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

    .Introduction{
      &__image{
        display: none;
      }
    }
  }
}

// la vallée des Statistiques
.Statistiques {
  display: flex;
  flex-wrap: wrap; /* Permet aux éléments de revenir à la ligne */
  justify-content: space-around; /* Garde l'espacement entre les éléments */
  padding: 8vh 2vh;
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

// la rivière du Test du mot de passe
.PasswordTest {
  padding: auto 2vh;
  padding-bottom: 8vh;
}

// le détroit des 3 Colonnes
.Colonne-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10vh;
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
  margin-bottom: 4vh;

  /* Responsive pour les petits écrans */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
}

  // Image de cybersécurité
  .Affiche {
  position: relative; /* Permet au lien d'être positionné par rapport à cet élément */
  text-align: center; /* Centre l'image si nécessaire */
  

  &__title {
    position: absolute;
    top: 15%; /* Centre verticalement */
    left: 50%; /* Centre horizontalement */
    transform: translate(-50%, -50%); /* Ajuste parfaitement le centrage */
    color: $white;
    font-size: 8vh;
    font-weight: bold;
    font-family: "Comfortaa", cursive;
    width: 100%;
    z-index: 2; /* Assure que le texte est au-dessus de l'image */
  }

  &__img {
    width: 100%;
    height: 80vh;
    object-fit: cover;
    filter: grayscale(70%);
  }

  /* Superposition du filtre noir */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Opacité de 50% */
    z-index: 1; /* Assure que le filtre est au-dessus de l'image */
  }

  &__link {
    position: absolute;
    top: 50%; /* Centre verticalement */
    left: 50%; /* Centre horizontalement */
    transform: translate(-50%, -50%); /* Ajuste parfaitement le centrage */
    background-color: rgba(0, 0, 0, 1); /* Fond semi-transparent pour la lisibilité */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    transition: background 0.3s, transform 0.3s;
    z-index: 3; /* Assure que le lien est au-dessus de la superposition */
  }

  &__link:hover {
    background-color: rgba(255, 255, 255, 0.9);
    color: black;
    transform: translate(-50%, -50%) scale(1.1);
  }

  @include large-down {
    &__img {
      height: auto;
    }
  }
}

</style>
