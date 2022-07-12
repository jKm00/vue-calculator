<script setup lang="ts">
  import { ref } from 'vue';
  import { Operation } from '@/util/Operation';
  import Button from '@/components/Button.vue';

  interface ScienceEmits {
    (e: 'changeOperation', value: Operation | string ): void
    (e: 'display', value: number | string ): void
    (e: 'calcualteDirect', value: Operation | string): void
  }

  const emit = defineEmits<ScienceEmits>()

  const display = ref(false)

  const handleClick = (e: number | string) => {
    emit('display', e)
  }

  const changeOperation = (e: Operation | string) => {
    emit('changeOperation', e)
  }

  const calculateDirect = (e: Operation | string) => {
    emit('calcualteDirect', e)
  }
</script>

<template>
  <div class="science border-radius">
    <div class="science__nav">
      <button @click="display = !display" class="border-radius"><span :class="{active: display}" class="icon">⇦</span></button>
    </div>
    <div v-if="display" class="science__body">
      <Button @click="handleClick" :value="Math.PI" :display="'π'" :gridArea="'pi'" />
      <Button @click="handleClick" :value="Math.E" :display="'e'" :gridArea="'e'" />
      <Button @changeOperation="changeOperation" :value="Operation.POWER" :display="'x^y'" :gridArea="'power'" />
      <Button @changeOperation="calculateDirect" :value="Operation.ROOT" :display="'√'" :gridArea="'root'" />
    </div>
  </div>
</template>

<style lang="scss">
  .science {
    display:flex;
    background-color: #1a1a1a;
    padding:0.5rem;
    gap:0.5rem;

    &__nav {

      & .icon {
        display: block;
      }
    }

    &__body {
      display: grid;
      grid-template-areas: 
        "pi"
        "e"
        "power"
        "root";
      align-content: start;
      gap: 0.5rem;

      & Button {
        --hue: 0;
        --saturation: 0%;
        --lightness: 20%;
      }
    }
  }

  .active {
    transform: rotate(180deg);
  }
</style>