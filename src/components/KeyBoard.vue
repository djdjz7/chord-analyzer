<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import NoteKey from './NoteKey.vue'
import type { KeyState, PressedKeyState } from '@/data'

const keys = [
  { val: 'C2', line: true, short: true },
  { val: 'D2', line: false, short: true },
  { val: 'E2', line: true, short: true },
  { val: 'F2', line: false, short: false },
  { val: 'G2', line: true, short: false },
  { val: 'A2', line: false, short: false },
  { val: 'B2', line: true, short: false },
  { val: 'C3', line: false, short: false },
  { val: 'D3', line: true, short: false },
  { val: 'E3', line: false, short: false },
  { val: 'F3', line: true, short: false },
  { val: 'G3', line: false, short: false },
  { val: 'A3', line: true, short: false },
  { val: 'B3', line: false, short: true },
  { val: 'C4', line: true, short: true },
  { val: 'D4', line: false, short: false },
  { val: 'E4', line: true, short: false },
  { val: 'F4', line: false, short: false },
  { val: 'G4', line: true, short: false },
  { val: 'A4', line: false, short: false },
  { val: 'B4', line: true, short: false },
  { val: 'C5', line: false, short: false },
  { val: 'D5', line: true, short: false },
  { val: 'E5', line: false, short: false },
  { val: 'F5', line: true, short: false },
  { val: 'G5', line: false, short: false },
  { val: 'A5', line: true, short: true },
  { val: 'B5', line: false, short: true },
  { val: 'C6', line: true, short: true },
].reverse()

const statusFactory = () => {
  return {
    C2: { state: 'up' },
    D2: { state: 'up' },
    E2: { state: 'up' },
    F2: { state: 'up' },
    G2: { state: 'up' },
    A2: { state: 'up' },
    B2: { state: 'up' },
    C3: { state: 'up' },
    D3: { state: 'up' },
    E3: { state: 'up' },
    F3: { state: 'up' },
    G3: { state: 'up' },
    A3: { state: 'up' },
    B3: { state: 'up' },
    C4: { state: 'up' },
    D4: { state: 'up' },
    E4: { state: 'up' },
    F4: { state: 'up' },
    G4: { state: 'up' },
    A4: { state: 'up' },
    B4: { state: 'up' },
    C5: { state: 'up' },
    D5: { state: 'up' },
    E5: { state: 'up' },
    F5: { state: 'up' },
    G5: { state: 'up' },
    A5: { state: 'up' },
    B5: { state: 'up' },
    C6: { state: 'up' },
  } as { [key: string]: { state: KeyState } }
}
const fullStatus = ref(statusFactory())
const model = defineModel<{ [x: string]: PressedKeyState }>()

watchEffect(() => {
  model.value = Object.fromEntries(
    keys
      .filter((key) => {
        return fullStatus.value[key.val].state !== 'up'
      })
      .map((key) => {
        return [key.val, fullStatus.value[key.val].state as PressedKeyState]
      }),
  )
})
</script>

<template>
  <div flex="~ col items-center">
    <NoteKey
      v-for="key in keys"
      :key="key.val"
      :line="key.line"
      :short="key.short"
      :symbol="key.val"
      v-model="fullStatus[key.val as keyof typeof fullStatus]" />
  </div>
</template>
