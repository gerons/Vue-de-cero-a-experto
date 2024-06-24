<template>
    <div>
        <section v-if="isLoading || randomPokemon.id === null" class="flex flex-col justify-center items-center w-screen h-screen">
            <h1 class="text-3xl">Espere por favor...</h1>
            <h3 class="animate-pulse">Cargando Pokémon</h3>
        </section>

        <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
            <h1 class="m-5">¿Quién es este Pokémon?</h1>

            <div class="h-20">
                <button @click="getNextRound(4)" v-if="gameStatus !== GameStatus.Playing">Siguiente ronda</button>
            </div>

            <!-- Pokemon picture -->
            <PokemonPicture
                :pokemon-id="randomPokemon.id"
                :show-pokemon="gameStatus !== GameStatus.Playing"
            />

            <!-- Pokemon options -->
            <PokemonOptions
                :options="options"
                :block-selection="gameStatus !== GameStatus.Playing"
                :correct-answer="randomPokemon.id"
                @selected-option="checkAnswer"
            />
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { GameStatus } from "../interfaces"
import { usePokemonGame } from '../composables/usePokemonGame';

const { getNextRound, randomPokemon, gameStatus, isLoading, pokemonOptions:options, checkAnswer } = usePokemonGame()

</script>

<style scoped>
button {
    @apply bg-blue-500 text-white rounded-md p-2 hover:bg-blue-800 transition-all;
}
</style>
