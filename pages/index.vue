<template>
  <div class="h-screen">
    <div :class="[indicator === 'Focus' ? 'bg-red-100': 'bg-green-100' ,'h-full flex flex-col justify-center items-center']">
      <div :class="[indicator === 'Focus' ? 'text-red-900 border-red-900': 'text-green-900 border-green-900','font-bold text-lg border-2 px-2 rounded-full']">{{ indicator }}</div>
      <div :class="[indicator === 'Focus' ? 'text-red-900 font-bold': 'text-green-900' ,'countdown font-mono text-[150px]']">
        <span :style="{'--value': minutes}"></span>
      </div>
      <div :class="[indicator === 'Focus' ? 'text-red-900 font-bold': 'text-green-900' ,'countdown font-mono text-[150px]']">
        <span :style="{'--value': seconds}"></span>
      </div>
      <div class="flex justify-center items-center space-x-2">
        <div v-if="!started" @click="start" class="btn btn-gray-300">Start</div>
        <div v-else @click="paused = !paused" class="btn btn-gray-300">{{ paused ? 'Continue' : 'Pause' }}</div>
        <div @click="reset" class="btn btn-gray-300">Reset</div>
        <div class="btn btn-gray-300">Count</div>
      </div>

      <span class="text-gray-900 text-2xl mt-10">Number of completed Pomodoros : {{ sessions }}</span>
    </div>
  </div>  
</template>
  
<script setup>
const indicator = ref('Focus')
const started = ref(false)
const paused = ref(false)

const sessions = ref(0)
const seconds = ref(0)
const minutes = ref(25)

const workTime = ref(25)
const breakTime = ref(5)

const timer = ref(null)

const start = () => {
  indicator.value = 'Focus'
  started.value = true
  paused.value = false
  seconds.value = 0

  indicator.value === 'Focus' ? minutes.value = workTime.value : minutes.value = breakTime.value

  timer.value = setInterval(() => {
    if (!paused.value) {

      seconds.value--;
      if (seconds.value === -1) {
        seconds.value = 59
        minutes.value--

        if (minutes.value === -1) {
          if (indicator.value === 'Focus') {
            indicator.value = 'Short Break'
            minutes.value = breakTime.value -1
          } else {
            indicator.value = 'Focus'
            minutes.value = workTime.value -1
            sessions.value++
            // clearInterval(timer.value)
          }
        }
      }
    }
  }, 1000)
}

const reset = () => {
  clearInterval(timer.value)
  paused.value = true
  started.value = false
  seconds.value = 0
  minutes.value = workTime.value
  indicator.value = 'Focus'
  sessions.value = 0
}
</script>