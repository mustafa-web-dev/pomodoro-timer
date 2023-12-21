<template>
  <div class="h-screen">
    <div
      :class="[indicator === 'Focus' ? 'bg-red-100' : 'bg-green-100', 'h-full flex flex-col justify-center items-center']">

      <!-- Indicator -->
      <div
        :class="[indicator === 'Focus' ? 'bg-red-200 text-red-900 border-red-900' : 'bg-green-200 text-green-900 border-green-900', 'flex items-center space-x-2 font-bold text-lg border-2 px-2 rounded-full mb-4']">
        <PhBrain v-if="indicator === 'Focus'" class="h-6 w-6" />
        <CgCoffee v-else class="h-6 w-6" />
        <span>{{ indicator }}</span>
      </div>

      <!-- Countdown -->
      <div
        :class="[indicator === 'Focus' ? 'text-red-900 font-bold' : 'text-green-900', 'countdown font-mono text-[150px]']">
        <span :style="{ '--value': minutes }"></span>
      </div>
      <div
        :class="[indicator === 'Focus' ? 'text-red-900 font-bold' : 'text-green-900', 'countdown font-mono text-[150px]']">
        <span :style="{ '--value': seconds }"></span>
      </div>

      <!-- Controls -->
      <div class="flex justify-center items-center space-x-2 mt-4">
        <button type="button" @click="reset"
          :class="[indicator === 'Focus' ? 'bg-red-200 hover:bg-red-300 text-red-800' : 'bg-green-200 hover:bg-green-300 text-green-800', 'btn border-none rounded-2xl']">
          <CaReset class="h-8 w-8" />
        </button>
        <button type="button" v-if="!started" @click="start"
          :class="[indicator === 'Focus' ? 'bg-red-300 hover:bg-red-400 text-red-900' : 'bg-green-300 hover:bg-green-400 text-green-900', 'btn btn-lg border-none rounded-3xl']">
          <BsPlayFill class="h-8 w-8" />

        </button>
        <button type="button" v-else @click="paused = !paused"
          :class="[indicator === 'Focus' ? 'bg-red-300 hover:bg-red-400 text-red-900' : 'bg-green-300 hover:bg-green-400 text-green-900', 'btn btn-lg border-none rounded-3xl']">
          <BsPauseFill v-if="!paused" class="h-8 w-8" />
          <BsPlayFill v-else class="h-8 w-8" />
        </button>
        <button type="button" @click="forward"
          :class="[indicator === 'Focus' ? 'bg-red-200 hover:bg-red-300 text-red-800' : 'bg-green-200 hover:bg-green-300 text-green-800', 'btn border-none rounded-2xl']">
          <HiSolidForward class="h-8 w-8" />
        </button>
      </div>

      <span class="text-gray-900 text-2xl mt-10">Completed Pomodoros : {{ sessions }}</span>
    </div>
  </div>
</template>
  
<script setup>
import { CgCoffee, BsPauseFill, BsPlayFill, PhBrain, CaReset, HiSolidForward } from "@kalimahapps/vue-icons";

const indicator = ref('Focus')
const started = ref(false)
const paused = ref(false)

const sessions = ref(0)
const seconds = ref(0)
const minutes = ref(25)

const workTime = ref(25)
const breakTime = ref(5)

const timer = ref(null)

// Start function
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
            minutes.value = breakTime.value - 1
          } else {
            indicator.value = 'Focus'
            minutes.value = workTime.value - 1
            sessions.value++
          }
        }
      }
    }
  }, 1000)
}

// Reset the counter
const reset = () => {
  clearInterval(timer.value)
  paused.value = true
  started.value = false
  seconds.value = 0
  minutes.value = workTime.value
  indicator.value = 'Focus'
  sessions.value = 0
}

const forward = () => {
  if (indicator.value === 'Focus') {
    indicator.value = 'Short Break'
    minutes.value = breakTime.value
  } else {
    indicator.value = 'Focus'
    minutes.value = workTime.value
   }
   seconds.value = 0
   paused.value = true
}

// Watcher for 'indicator' and 'sessions' changes
// watch([indicator, sessions], async () => {
//   try {
//     // Simulate syncing progress with the backend
//     const response = await syncProgressWithBackend();
//   } catch (error) {
//     console.error('Error syncing progress:', error);
//   }
// });

// Simulated backend sync function
// const syncProgressWithBackend = async () => {
//   const progressData = {
//     sessions: sessions.value,
//     indicator: indicator.value,
//   };

//   try {
//     // Simulated backend endpoint
//     const response = await fetch('/backend-endpoint', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(progressData),
//     });

//     if (response.ok) {
//       const responseData = await response.json();
//       console.log(responseData);
//     } else {
//       throw new Error('error');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// // Watchers for 'sessions' and 'indicator'
// watch(sessions, () => {
//   syncProgressWithBackend();
// });

// watch(indicator, () => {
//   syncProgressWithBackend();
// });
</script>