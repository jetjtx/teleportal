<script setup>
const emit = defineEmits(['countHotCard'])
defineProps ({
  listing: {type: Object, required: true},
  showBtn: {type: String, required: false},
})
</script>

<script>
export default {
  data() {
    return {
      btnColor: ''
    }
  },
  methods: {
    async approve (a = "") {
      let body = new FormData()
      body.append("session", document.cookie.split("=")[1])
      const s = await fetch('https://b.checkin.sg/api/ua/'+a, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        body: body,
      })
      if (s.status === 200) {
        this.$el.parentNode.removeChild(this.$el);
        this.$emit(`countHotCard`, 'r')
      } else {
        alert("Error Update.")
      }
    },
    async reject (a = "") {
      let body = new FormData()
      body.append("session", document.cookie.split("=")[1])
      const s = await fetch('https://b.checkin.sg/api/ur/'+a, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        body: body,
      })
      if (s.status === 200) {
        this.$el.parentNode.removeChild(this.$el);
        this.$emit(`countHotCard`, 'r')
      } else {
        alert("Error Update.")
      }
    },
    async cp (a = "") {
      if (a.length > 9 && navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(a)
        this.btnColor = 'c'
      } else {
        alert("Error, could not copy.")
      }
    }
  }
}
</script>
<template>
<div class="flex flex-col bg-gray-800 rounded-2xl min-h-[30rem] py-0.5 border border-gray-600">
  <div class="grid grid-flow-col justify-between items-center border-b border-b-gray-700 w-[300px] pb-1 px-1.5">
    <div class="grid items-center w-12 rounded-lg text-center min-h-[28px]">
      <p class=" text-base font-thin text-neutral-400 mr-2.5">{{listing.id}}</p>
    </div>
    <div class="text-center">
      <p class=" text-[13px] tracking-wider text-gray-300">{{ listing.username }}</p>
      <p class="text-gray-400 text-[9px]">{{ listing.ca }}</p>
    </div>
    <button @click="cp(listing.message, event)" :class="btnColor == 'c' ? 'bg-green-700 hover:bg-green-700' : 'hover:bg-gray-600'" class="text-[10px] hover:text-gray-200 text-gray-300 mr-0.5 rounded-lg w-12 py-1.5">Copy</button>
  </div>

  <pre class="text-base p-2.5 text-neutral-300 max-h-[420px] max-w-[300px] overflow-auto px-3.5">
  {{ listing.message }}
  </pre>

  <div class="px-1.5 pb-1 mt-auto">
    <div class="flex w-full rounded-[10px] overflow-hidden">
      <button v-if="showBtn == 'a' || showBtn == null" @click="approve(listing.id)" class="w-full opacity-90 hover:opacity-100 bg-green-600 min-h-[38px] text-sm font-medium">Approve</button>
      <button v-if="showBtn == 'r' || showBtn == null" @click="reject(listing.id)" class="w-full opacity-90 hover:opacity-100 bg-red-600 min-h-[38px] text-sm font-medium">Reject</button>
    </div>
  </div>
</div>
</template>