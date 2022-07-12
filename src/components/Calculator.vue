<script setup lang="ts">
  import { ref } from 'vue'
  import { Operation } from '@/util/Operation'
  import { LogItem } from '@/util/LogItem'
  import Button from '@/components/Button.vue'
  import Log from '@/components/Log.vue'
  import Science from '@/components/Science.vue'

  // TODO: Prosent
  // TODO: Make all operation work

  const display = ref<string>('0')
  const prevCalc = ref<string>('')
  const operationSymbol = ref<string>('')
  const displaysResult = ref(false)
  const log = ref<LogItem[]>([])

  const handleClick = (n: number | string) => {
    if (n === '.') {
      if (display.value === '0') {
        return
      }
      if (display.value.includes('.')) {
        return
      }
    }
    if (display.value === '0' || displaysResult.value || n === Math.PI || n === Math.E) {
      display.value = '' + n
      displaysResult.value = false
    } else {
      display.value = display.value + n
    }
  }

  const reset = () => {
    if (display.value !== '0') {
      display.value = '0'
    } else {
      display.value = '0'
      prevCalc.value = ''
      operationSymbol.value = ''
    }
  }

  const toggle = () => {
    display.value = (-parseFloat(display.value)).toString()
  }

  const changeOperation = (e: Operation) => {
    if (display.value !== '0') {
      prevCalc.value = display.value
      display.value = '0'

      if (e === Operation.DIVID) {
        operationSymbol.value = '/'
      } else if (e === Operation.MINUS) {
        operationSymbol.value = '-'
      } else if (e === Operation.MULT) {
        operationSymbol.value = '*'
      } else if (e === Operation.PLUSS) {
        operationSymbol.value = '+'
      } else if (e === Operation.POWER) {
        operationSymbol.value = '^'
      }
    }
  }

  const calculate = () => {
    let evalOperation = operationSymbol.value
    if (operationSymbol.value === '^') {
      evalOperation = '**'
    }
    // Calcuate
    const expression = prevCalc.value + evalOperation + display.value
    const result = Math.round(eval(expression) * 10000) / 10000

    // Add to log
    addToLog({
      first: prevCalc.value, 
      last: display.value, 
      operation: operationSymbol.value,
      result: result.toString()
    })

    // Display/reset displays
    resetDisplay(result.toString())
  }

  const clearLog = () => {
    log.value = []
  }

  const calculateDirect = (e: Operation) => {
    if (e === Operation.ROOT) {
      const result = Math.sqrt(parseFloat(display.value))

      addToLog({
        first: '',
        last: display.value,
        operation: '√',
        result: result.toString()
      })

      resetDisplay(result.toString())
    }
  }

  const addToLog = (item: LogItem) => {
    log.value = [
      item,
      ...log.value 
    ]
  }

  const resetDisplay = (reset: string) => {
    display.value = reset
    prevCalc.value = ''
    operationSymbol.value = ''
    displaysResult.value = true
  }

</script>

<template>
  <div class="calc">
    <Science @changeOperation="changeOperation" @display="handleClick" @calcualteDirect="calculateDirect" />
    <div class="calc__main">
      <div class="calc__main__display border-radius">
        <p class="calc__main__display__prev">{{prevCalc + ' ' + operationSymbol}}</p>
        <h2 class="calc__main__display__result">{{display}}</h2>
      </div>
      <Button @click="handleClick" :value="0" :display="'0'" :gridArea="'zero'" />
      <Button @click="handleClick" :value="1" :display="'1'" :gridArea="'one'" />
      <Button @click="handleClick" :value="2" :display="'2'" :gridArea="'two'" />
      <Button @click="handleClick" :value="3" :display="'3'" :gridArea="'three'" />
      <Button @click="handleClick" :value="4" :display="'4'" :gridArea="'four'" />
      <Button @click="handleClick" :value="5" :display="'5'" :gridArea="'five'" />
      <Button @click="handleClick" :value="6" :display="'6'" :gridArea="'six'" />
      <Button @click="handleClick" :value="7" :display="'7'" :gridArea="'seven'" />
      <Button @click="handleClick" :value="8" :display="'8'" :gridArea="'eight'" />
      <Button @click="handleClick" :value="9" :display="'9'" :gridArea="'nine'" />
      <Button @click="handleClick" :value="'.'" :display="'.'" :gridArea="'period'" />
      <Button @reset="reset" :value="Operation.CLEAR" :display="'AC'" :gridArea="'clear'" :accent="true" />
      <Button @toggle="toggle" :value="Operation.TOGGLE" :display="'+/-'" :gridArea="'toggle'" :accent="true" />
      <Button :value="Operation.PROSENT" :display="'%'" :gridArea="'prosent'" :accent="true" />
      <Button @change-operation="changeOperation" :value="Operation.DIVID" :display="'/'" :gridArea="'divid'" :accent="true" />
      <Button @change-operation="changeOperation" :value="Operation.MULT" :display="'*'" :gridArea="'mult'" :accent="true" />
      <Button @change-operation="changeOperation" :value="Operation.MINUS" :display="'-'" :gridArea="'minus'" :accent="true" />
      <Button @change-operation="changeOperation" :value="Operation.PLUSS" :display="'+'" :gridArea="'pluss'" :accent="true" />
      <Button @calc="calculate" :value="Operation.EQUALS" :display="'='" :gridArea="'equals'" :accent="true" />
    </div>
    <Log @clear="clearLog" :items="log" />
  </div>
</template>

<style lang="scss">
  .calc {
    display:flex;
    gap: 0.5rem;

    &__main {
      display:grid;
      grid-template-areas: 
        "result result result result"
        "clear toggle prosent divid"
        "seven eight nine mult"
        "four five six minus"
        "one two three pluss"
        "zero zero period equals";
      gap: 0.5rem;

      &__display {
        display: flex;
        flex-direction: column;
        grid-area: result;
        background-color: #1a1a1a;
        padding: 1rem;
        text-align: right;
        width: 20rem;
        overflow: auto;

        &::-webkit-scrollbar {
        height:5px;
        }

        &::-webkit-scrollbar-thumb {
          background: #00ffcc;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #33ffd6;
        }

        &__prev {
          font-size: .75rem;
          min-height: 1rem;
        }
      }
    }
  }
</style>