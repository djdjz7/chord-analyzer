<script lang="ts" setup>
import { computed, ref, useTemplateRef, watchEffect } from 'vue'
import { renderAbc } from 'abcjs'
import KeyBoard from './components/KeyBoard.vue'
import {
  keySignatures,
  type KeySignature,
  accidentalsMap,
  keyMap,
  type PressedKeyState,
  baseSemitoneMap,
  deltaSemitoneMap,
  toneMap,
  type Tone,
  romanNumeralsUpper,
  romanNumeralsLower,
} from './data'
const keyboardStatus = ref<{ [x: string]: PressedKeyState }>({})
const renderElement = useTemplateRef('render')
const renderMergedElement = useTemplateRef('render-merged')
const keySignature = ref<KeySignature>('C')

const mergeNotes = (
  ks: KeySignature,
  notes: { [x: string]: PressedKeyState },
) => {
  const ksDef = keySignatures[ks]
  const mergedNotes = Object.entries(notes).map(([key, state]) => {
    const keySym = key[0]
    if (keySym in ksDef && state === 'down') {
      return [key, ksDef[keySym as keyof typeof ksDef]]
    }
    return [key, state]
  })
  return Object.fromEntries(mergedNotes) as { [x: string]: PressedKeyState }
}

const mergedNotes = computed(() =>
  mergeNotes(keySignature.value, keyboardStatus.value),
)

const getChordType3 = (dSemi: [number, number]) => {
  const [delta1, delta2] = dSemi
  if (delta1 === 3) {
    if (delta2 === 3) return 'diminished'
    else if (delta2 === 4) return 'minor'
    else return undefined
  } else if (delta1 === 4) {
    if (delta2 === 3) return 'major'
    else if (delta2 === 4) return 'augmented'
    else return undefined
  } else {
    return undefined
  }
}

const getSeventhType = (dSemi: number) => {
  switch (dSemi) {
    case 11:
      return 'major'
    case 10:
      return 'minor'
    case 9:
      return 'diminished'
  }
  return undefined
}

const getChordType7 = (
  chord3: Exclude<ReturnType<typeof getChordType3>, undefined>,
  seventh: Exclude<ReturnType<typeof getSeventhType>, undefined>,
) => {
  switch (chord3) {
    case 'diminished':
      switch (seventh) {
        case 'diminished':
          return '减减七和弦（减七和弦）'
        case 'minor':
          return '减小七和弦（半减七和弦）'
      }
      return undefined
    case 'minor':
      switch (seventh) {
        case 'major':
          return '小大七和弦'
        case 'minor':
          return '小小七和弦（小七和弦）'
      }
      return undefined
    case 'major':
      switch (seventh) {
        case 'major':
          return '大大七和弦（大七和弦）'
        case 'minor':
          return '大小七和弦（属七和弦）'
      }
      return undefined
    case 'augmented':
      switch (seventh) {
        case 'major':
          return '增大七和弦'
      }
      return undefined
  }
}

const chordName = computed(() => {
  const activeNotes = Object.entries(mergedNotes.value).map(
    ([key, accidental]) => {
      const keySym = key[0] as Tone
      const keySymIndex = toneMap[keySym]
      const keyGrad = Number(key[1])
      const keyIdent = keySymIndex + keyGrad * 7
      return [
        keyIdent,
        baseSemitoneMap[keySym as keyof typeof baseSemitoneMap] +
          keyGrad * 12 +
          deltaSemitoneMap[accidental],
      ]
    },
  )
  if (activeNotes.length !== 3 && activeNotes.length !== 4) {
    return ['无效', '请重试']
  }
  let inversion = ''
  let type = ''
  let numeralsList = undefined
  let marker = ''
  activeNotes.sort((a, b) => a[0] - b[0])
  if (activeNotes.length === 3) {
    if (
      activeNotes[1][0] - activeNotes[0][0] === 2 &&
      activeNotes[2][0] - activeNotes[1][0] === 2
    ) {
      inversion = '原位'
    } else if (
      activeNotes[1][0] - activeNotes[0][0] === 2 &&
      activeNotes[2][0] - activeNotes[1][0] === 3
    ) {
      inversion = '第一转位'
      activeNotes[2][0] -= 7
      activeNotes[2][1] -= 12
      activeNotes.sort((a, b) => a[0] - b[0])
    } else if (
      activeNotes[1][0] - activeNotes[0][0] === 3 &&
      activeNotes[2][0] - activeNotes[1][0] === 2
    ) {
      inversion = '第二转位'
      activeNotes[0][0] += 7
      activeNotes[0][1] += 12
      activeNotes.sort((a, b) => a[0] - b[0])
    } else {
      return ['无效', '请重试']
    }
    const d1 = activeNotes[1][1] - activeNotes[0][1]
    const d2 = activeNotes[2][1] - activeNotes[1][1]
    const triadType = getChordType3([d1, d2])
    switch (triadType) {
      case 'diminished':
        type = '减三和弦'
        marker = 'o'
        break
      case 'minor':
        type = '小三和弦'
        break
      case 'major':
        type = '大三和弦'
        break
      case 'augmented':
        type = '增三和弦'
        marker = '+'
        break
      default:
        return ['无效', '请重试']
    }
    if (d1 === 3) numeralsList = romanNumeralsLower
    else if (d1 === 4) numeralsList = romanNumeralsUpper
  } else {
    const [i1, i2, i3, i4] = activeNotes.map((note) => note[0])
    if (i2 - i1 === 2 && i3 - i2 === 2 && i4 - i3 === 2) {
      inversion = '原位'
    } else if (i2 - i1 === 2 && i3 - i2 === 2 && i4 - i3 === 1) {
      inversion = '第一转位'
      activeNotes[3][0] -= 7
      activeNotes[3][1] -= 12
      activeNotes.sort((a, b) => a[0] - b[0])
    } else if (i2 - i1 === 2 && i3 - i2 === 1 && i4 - i3 === 2) {
      inversion = '第二转位'
      activeNotes[2][0] -= 7
      activeNotes[2][1] -= 12
      activeNotes[3][0] -= 7
      activeNotes[3][1] -= 12
      activeNotes.sort((a, b) => a[0] - b[0])
    } else if (i2 - i1 === 1 && i3 - i2 === 2 && i4 - i3 === 2) {
      inversion = '第三转位'
      activeNotes[0][0] += 7
      activeNotes[0][1] += 12
      activeNotes.sort((a, b) => a[0] - b[0])
    } else {
      return ['无效', '请重试']
    }
    const d1 = activeNotes[1][1] - activeNotes[0][1]
    const d2 = activeNotes[2][1] - activeNotes[1][1]
    const d3 = activeNotes[3][1] - activeNotes[0][1]
    const triadType = getChordType3([d1, d2])
    if (!triadType) {
      return ['无效', '请重试']
    }
    if (triadType === 'diminished') {
      marker = 'o'
    } else if (triadType === 'augmented') {
      marker = '+'
    }
    const seventhType = getSeventhType(d3)
    if (!seventhType) {
      return ['无效', '请重试']
    }
    const chordType = getChordType7(triadType, seventhType)
    if (chordType === undefined) {
      return ['无效', '请重试']
    }
    type = chordType
    if (d1 === 3) numeralsList = romanNumeralsLower
    else if (d1 === 4) numeralsList = romanNumeralsUpper
  }
  const root = activeNotes[0][0] % 7
  const ksRoot = toneMap[keySignature.value[0] as keyof typeof toneMap]
  const rootDelta = root - ksRoot + 1
  return [
    `<span>${numeralsList![rootDelta - 1]}</span><sup>${marker}</sup>`,
    [type, inversion, rootDelta].join(' '),
  ]
})

watchEffect(() => {
  if (!renderElement.value) return
  const notationInner = Object.entries(keyboardStatus.value)
    .map(
      ([key, accidental]) =>
        `${accidentalsMap[accidental]}${keyMap[key as keyof typeof keyMap]}`,
    )
    .join(' ')
  const notation = `K:${keySignature.value}\nL:1/4\n|[${notationInner}]|`
  renderAbc(renderElement.value, notation, {
    staffwidth: 500,
  })
})

watchEffect(() => {
  if (!renderMergedElement.value) return
  const notationInner = Object.entries(mergedNotes.value)
    .map(
      ([key, accidental]) =>
        `${accidentalsMap[accidental]}${keyMap[key as keyof typeof keyMap]}`,
    )
    .join(' ')
  const notation = `K:${keySignature.value}\nL:1/4\n|[${notationInner}]|`
  renderAbc(renderMergedElement.value, notation, {
    staffwidth: 300,
  })
})
</script>

<template>
  <div
    min-w-screen
    min-h-screen
    p-12
    box-border
    flex="~ col items-center gap-12">
    <div text-center>
      <div class="text-4xl" v-html="chordName[0]"></div>
      <div class="text-gray" h-1em>{{ chordName[1] }}</div>
    </div>

    <div flex="~ items-center gap-12">
      <KeyBoard v-model="keyboardStatus" class="m-t-4" />
      <div flex="~ col items-center justify-center">
        <select v-model="keySignature">
          <option
            v-for="key in Object.keys(keySignatures)"
            :key="key"
            :value="key">
            {{ key }}
          </option>
        </select>
        <table>
          <tbody>
            <tr>
              <td>Raw Input</td>
              <td><span ref="render"></span></td>
            </tr>
            <tr>
              <td>Merged Input</td>
              <td><span ref="render-merged"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
