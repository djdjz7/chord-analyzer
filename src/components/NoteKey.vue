<script setup lang="ts">
import { keyStates, symbols, type KeyState } from '@/data'
import { computed } from 'vue'

defineProps<{
  line: boolean
  short: boolean
  symbol: string
}>()
const model = defineModel<{
  state: KeyState
}>({
  default: () => ({
    state: 'up',
  }),
})
const cycleIndex = computed({
  get() {
    return keyStates.findIndex((state) => state === model.value.state)
  },
  set(value) {
    model.value.state = keyStates[value]
  },
})
const displaySymbol = computed(() => {
  return symbols[cycleIndex.value]
})

const next = () => {
  cycleIndex.value = (cycleIndex.value + 1) % keyStates.length
  model.value.state = keyStates[cycleIndex.value]
}

const prev = () => {
  cycleIndex.value =
    (cycleIndex.value - 1 + keyStates.length) % keyStates.length
  model.value.state = keyStates[cycleIndex.value]
}
</script>

<template>
  <div flex="~ items-center gap-2">
    <span style="font-size: 10px">{{ symbol }}</span>
    <div
      relative
      h-3
      flex="~ col items-center justify-center"
      w-36
      bg-transparent
      @click.prevent="next"
      @click.right.prevent="prev">
      <div
        v-if="line"
        absolute
        h-2px
        class="top-[calc(50%_-_1px)] bg-[var(--foreground)]"
        :class="[short ? 'w-33%' : 'w-full']"></div>
      <span absolute select-none text-lg>{{ displaySymbol }}</span>
    </div>
  </div>
</template>
