<script setup lang="ts">
defineProps<{ 
    stat: string;
    logo: string;
}>();

</script>

<template>
    <div class="statistique">
        <div class="statistique__head">
        <img :src="logo" alt="logo statistique" />
        <p class="statistique__stat">{{ stat }}</p>
        </div>
        <div class="statistique__body">
        <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
.statistique {
    background-color: $white; 
    box-shadow: 0 0 5px 0 $ShadowColor;
    color: $TextColorBlack;
    border-radius: 20px;
    max-width: 40vh;
    padding: 4vh;

    &__stat {
        font-size: 4vh;
        font-weight: bold;
        word-wrap: break-word; /* Permet de couper les mots longs pour qu'ils tiennent dans le conteneur */
        word-break: break-word; /* Coupe les mots pour éviter qu'ils dépassent */
        overflow-wrap: break-word; /* Assure la compatibilité pour couper les mots */
        }

    &__head {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    &__body {
        padding: 5px 20px;
        padding-bottom: 20px;
    }

    img {
        width: 10vh;
        height: 10vh;
    }
    
}

.statistique:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }
</style>