<script setup lang="ts">
  import { Operation } from '@/util/Operation';

  interface ButtonProps {
    value: number | Operation | string
    display: string
    gridArea: string
    accent?: boolean
  }

  interface ButtonEmits {
    (e: 'click', value: number | string): void
    (e: 'reset', value: string): void
    (e: 'toggle', value: string): void
    (e: 'changeOperation', value: Operation): void
    (e: 'calc', value: string): void
  }


  const props = defineProps<ButtonProps>()
  const emit = defineEmits<ButtonEmits>()

  const isEqual = props.value === Operation.EQUALS

  const handleClick = () => {
    if (typeof(props.value) === 'number' || props.value === '.') {
      emit('click', props.value)
    } else {
      if (props.value === Operation.CLEAR) {
        emit('reset', '')
      } else if (props.value === Operation.TOGGLE) {
        emit('toggle', '')
      } else if (props.value === Operation.EQUALS) {
        emit('calc', '')
      } else {
        emit('changeOperation', props.value)
      }
    }
  }
</script>

<template>
  <button @click="handleClick" class="border-radius" :class="{accent: accent, equal: isEqual}" v-bind:style="{ gridArea: props.gridArea }">{{props.display}}</button>
</template>

<style lang="scss">
  button {
    --hue:0;
    --saturation:0%;
    --lightness:10%;
    background-color: hsl(var(--hue), var(--saturation), var(--lightness));
    color:#fff;
    padding:1rem;
  }

  button:hover {
    --lightness: 13%;
  }

  button:active {
    --lightness: 20%;
    box-shadow: inset 5px 5px 5px rgba(0,0,0,0.3)
  }

  .accent {
    --hue: 0;
    --saturation: 0%;
    --lightness: 20%;
  }

  .equal {
    --hue: 168;
    --saturation: 100%;
    --lightness: 50%;
    color:#1d1d1d;
  }

  .equal:hover {
    --lightness: 45%;
  }

  .equal:active {
    --lightness: 35%;
  }
</style>