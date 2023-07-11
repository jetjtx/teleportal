<script setup>
import { ref, onActivated, onDeactivated, onMounted, onUpdated, reactive } from 'vue';
// import Ch from './child.vue'
// https://learnvue.co/tutorials/vue-lifecycle-hooks-guide
// To use on Child component template ref="d",
// so that you can then access any expose methods and variables
// using d.value.anyMethods() and etc
// const d = ref(null);

// beforeCreate -> use setup()
// created -> use setup()

// onBeforeMount – called before mounting begins
//

const totalJobCount = ref(0)

function loadJobListing () {
  let body = new FormData()
  var gs = document.cookie.match(RegExp('(^| )stoken=([^;]+)'))?.pop() || ''
  body.append("session", gs)
  fetch('https://b.checkin.sg/api/tj', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: body,
  })
  .then(r => {
    if (r.status === 200) {
      return r.text()
  } else {
    // router.push({name: 'signin'})
  }
  })
  .then(r => {
    totalJobCount.value = r;
  })
}

// onMounted – called when component is mounted
onMounted(() => {
  loadJobListing();
  document.title = "Dashboard"
  console.log("Dashboard Mounted")
})

// onBeforeUpdate – called when reactive data changes and before re-render
//

// onUpdated – called after re-render
onUpdated(() => {
  console.log("Updated")
})

// onBeforeUnmount
//

// onUnmounted
//

// onActivated – called when a kept-alive component is activated
onActivated(() => {
  console.log("Dashboard activated")
})

// onDeactivated – called when a kept-alive component is deactivated
onDeactivated(() => {
  console.log("Dashboard Deactivated")
})

// onErrorCaptured – called when an error is captured from a child component
//
</script>

<template>
  <div class="px-5 bg-neutral-700 w-full">
    <div>
      <div class="flex items-center gap-5 min-h-[52px]">
        <h1 class="text-md">Dashboard</h1>
        <!-- <button @click="getAlert()" class="text-xs px-3 min-h-[2.25rem] bg-gray-800 hover:bg-blue-600 rounded border border-gray-800" v-permission="['admin']">Visible if admin</button> -->
      </div>

      <div class="my-4 grid justify-items-start items-start gap-3">
        <div class="bg-gray-800 px-4 py-3 rounded-lg w-full">
          <p class="text-xl">Statistic</p>
          <a class="text-[#a3be8c] text-sm" href="https://vuejs.org/" target="_blank">Powered by Vue 3</a>
        </div>

        <div class="text-center px-4 py-3 rounded-lg bg-blue-600">
          <p class="text-sm">Total Jobs</p> <p class="text-3xl font-semibold">{{ totalJobCount }}</p>
        </div>

        <!-- <input v-autofocus type="text" class="bg-gray-800 px-3 min-h-[42px] rounded border-2 border-gray-800 outline-none" placeholder="Enter a value"> -->
      </div>
    </div>
    <!-- <Ch ref="d" /> -->
  </div>  
</template>

<style>
</style>