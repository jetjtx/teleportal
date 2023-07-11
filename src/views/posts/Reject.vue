<script setup>
import HotCards from '../../components/HotCards.vue';
import { ref, onMounted } from 'vue'

const listing = ref([])
const totalHotCards = ref(0)

async function loadJobListing () {
  let body = new FormData()
  var gs = document.cookie.match(RegExp('(^| )stoken=([^;]+)'))?.pop() || ''
  body.append("session", gs)
  const s = await fetch('https://b.checkin.sg/api/jlreject', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: body,
  })
  if (s.status === 200) {
    const t = await s.json();
    listing.value = []
    listing.value = t
    totalHotCards.value = t.length
  } else {
    alert("Error. Cannot retrieve.")
  }
}

async function updateCount() {
  totalHotCards.value--;
}

onMounted(() => {
  document.title = "Approve"
  loadJobListing();
})

</script>

<template>
  <div class="flex w-full">
      <div class="px-5 bg-[#5e81ac] w-full pb-40">
        <div class="flex items-center gap-3 min-h-[52px]">
            <h1 class="text-md">Reject</h1>
            <div v-show="totalHotCards != null" class="grid items-center rounded-xl px-3 bg-gray-700 min-h-[28px]">
              <p class="text-xs">{{ totalHotCards }}</p>
            </div>
            <template v-if="totalHotCards != null">
              <button @click="loadJobListing()" class="text-[14px] min-h-[28px] rounded-xl px-3 bg-gray-700">Reload</button>
            </template>
          </div>

          <div class="flex flex-wrap gap-3 text-xs w-full">
            <template v-for="lx in listing">
              <HotCards v-on:countHotCard="updateCount" showBtn="a" :listing="lx" />
            </template>
        </div>
      </div>
  </div>
  
</template>
  
<style>
* {
  scrollbar-width: thin;
  scrollbar-color: #555 transparent;
}
</style>
  
