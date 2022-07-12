<script setup lang="ts">
  import { LogItem } from '@/util/LogItem'

  interface LogProps {
    items: LogItem[]
  }

  interface LogEmits {
    (e: 'clear', value: string): void
  }

  const props = defineProps<LogProps>()
  const emit = defineEmits<LogEmits>()

  const handleClick = () => {
    emit('clear', '')
  }

</script>

<template>
  <div class="log">
    <div class="log__body border-radius">
      <div class="log__body__item" v-for="item in props.items">
        <p class="log__body__item__expression">{{item.first}} {{item.operation}} {{item.last}}</p>
        <p class="log__body__item__result">{{item.result}}</p>
      </div>
    </div>
    <div class="log__footer">
      <button @click="handleClick" class="log__btn border-radius">Clear</button>
    </div>
  </div>
</template>

<style lang="scss">
  .log {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    gap: 0.5rem;
    min-width: 20rem;

    &__body {
      display:flex;
      flex-direction: column;
      gap:0.5rem;
      overflow: auto;
      padding: 1rem;
      background-color: #1a1a1a;
      height: 100%;
      max-height: 19.75rem;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background: #00ffcc;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #33ffd6;
      }

      &__item {
        text-align: right;
  
        &__expression {
          opacity: .8;
          font-size: .75rem;
        }
      }
    }


    &__btn {
      width: 100%;
      padding:0.5rem;
      --hue: 0;
      --saturation: 0%;
      --lightness: 20%;
    }
  }
</style>