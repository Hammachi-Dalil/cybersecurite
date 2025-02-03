<script setup lang="ts">
</script>

<template>
    <h1>Thematique</h1>
    <div class="thematique-chap1"> 
        <h2 class="thematique-chap1__titre">La Cybersécurité : Une Nécessité pour Tous</h2>
            <p>
                Dans un monde où le numérique est omniprésent, la cybersécurité est devenue un enjeu majeur. 
                Mais qu’est-ce que cela signifie concrètement ? 
                La cybersécurité, c’est l’ensemble des bonnes pratiques et des outils qui permettent de protéger nos données personnelles, 
                notre vie privée, et nos interactions en ligne contre des menaces telles que le phishing, 
                les mots de passe insuffisamment sécurisés, ou encore les cyberattaques.
            </p>
    </div>

    <div class="thematique-chap2">
        <h2 class="thematique-chap2__titre">Pourquoi est-ce important ?</h2>
            <p>
                Chaque jour, nous partageons des informations sensibles sur Internet sans y prêter attention. 
                Pourtant, ces informations peuvent être utilisées à des fins malveillantes si elles tombent entre de mauvaises mains. 
                Il est donc essentiel de comprendre comment nous protéger efficacement tout en continuant à tirer parti des avantages du numérique.
            </p>
    </div>

    <div class="thematique-chap3">
        <h2 class="thematique-chap3__titre">Nos Thématiques Clés</h2>
            <p class="thematique-chap3__paragraphe">
                Pour vous accompagner dans cette démarche, notre site met en lumière les thématiques essentielles de la cybersécurité :
            </p>

            <ul>
                <li class="thematique-chap3__liste"><p class="thematique-chap3__gras">Phishing :</p> Comment repérer et éviter les tentatives d'arnaque par e-mail ou messages ?</li>
                <li class="thematique-chap3__liste"><p class="thematique-chap3__gras">Mots de Passe Sécurisés :</p> Découvrez comment créer des mots de passe forts et faciles à retenir.</li>
                <li class="thematique-chap3__liste"><p class="thematique-chap3__gras">Protection de la Vie Privée :</p> Apprenez à protéger vos données personnelles en ligne.</li>
                <li class="thematique-chap3__liste"><p class="thematique-chap3__gras">Reconnaître les Fraudes :</p> Reconnaître les Fraudes : Développez vos réflexes face aux sites ou messages suspects.</li>
            </ul>
    </div>

    <div class="thematique-chap4">
        <h2 class="thematique-chap4__titre">Un Objectif : Une Sensibilisation Durable</h2>
            <p>
                Notre ambition est de rendre la cybersécurité accessible à tous, étudiants comme professionnels. 
                Grâce à des outils éducatifs et des contenus adaptables, 
                ce projet vise à créer une communauté mieux informée et plus sécurisée en ligne.
            </p>
    </div>
                   
</template>

<style scoped lang="scss">
.thematique-chap1, .thematique-chap2, .thematique-chap3 {
    color: $TextColor;
    padding: 1vh;
    margin: 2vh;
    border-radius: 5px;
}

.thematique-chap3 {
    &__liste {
        display: inline;
    }

    &__gras {
        font-weight: bold;
    }

    &__paragraphe {
        margin: 1vh;
    }
}
</style>