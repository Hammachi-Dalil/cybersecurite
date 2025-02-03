<template>
    <div class="grid-container">
      <!-- Colonne 1 -->
      <div class="grid-item">
        <img src="/assets/media/laptop.jpg" alt="Zéro-Déchet" class="grid-item__image" />
        <h3 class="grid-item__title">Zéro-Déchet</h3>
        <p class="grid-item__text">
          Notre association sensibilise aux impacts écologiques et sanitaires des déchets (en particulier les 
          <strong>déchets plastiques</strong>). Nous accompagnons 
          <strong>professionnels et citoyens</strong> vers une réduction et une meilleure gestion des déchets.
        </p>
      </div>
  
      <!-- Colonne 2 -->
      <div class="grid-item">
        <img src="/assets/media/secu2.jpg" alt="Zéro-Mégot" class="grid-item__image" />
        <h3 class="grid-item__title">Zéro-Mégot</h3>
        <p class="grid-item__text">
          Nous sensibilisons à l'<strong>impact environnemental des mégots de cigarettes</strong> et proposons des solutions matérielles sur notre boutique en ligne. 
          Nous guidons <strong>professionnels et citoyens</strong> vers une gestion plus écoresponsable des mégots.
        </p>
      </div>
  
      <!-- Colonne 3 -->
      <div class="grid-item">
        <img src="/assets/media/secu1.jpg" alt="Biodiversité" class="grid-item__image" />
        <h3 class="grid-item__title">Biodiversité</h3>
        <p class="grid-item__text">
          GreenMinded sensibilise à la <strong>restauration</strong> et à la <strong>protection de la biodiversité</strong>. Nous proposons des 
          <strong>solutions</strong> pour mieux la comprendre et la soutenir, et créons des <strong>refuges de biodiversité</strong> ouverts au public.
        </p>
      </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
  /* Conteneur global */
  .grid-container {
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
  
  /* Colonne individuelle */
  .grid-item {
    text-align: center;
    flex: 1;
  
    &__image {
      width: 150px;
      height: 150px;
      border-radius: 20px; /* Bords arrondis */
      object-fit: cover;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin: 0 auto 20px auto; /* Centré avec un espace en bas */
    }
  
    &__title {
      font-size: 1.25rem;
      font-weight: bold;
      color: $PrimaryColor; /* Couleur personnalisée */
      margin-bottom: 10px;
    }
  
    &__text {
      font-size: 1rem;
      line-height: 1.6;
      color: #444;
      strong {
        color: #333; /* Mettez en valeur les mots importants */
      }
      text-align: justify;
    }
  }
  </style>
  