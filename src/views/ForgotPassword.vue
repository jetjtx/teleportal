<script setup>
import TInput from '@/components/TInput.vue'
</script>

<template>
  <main class="grid justify-center text-gray-100">

    <form class="px-4 py-5 mt-10 bg-gray-700 rounded-lg min-w-[24rem] grid gap-4" action="/forgotpassword">
      <h1 class="text-2xl text-center font-semibold mb-3">Steinway Portal</h1>
      <p class="text-xl mb-3 mx-auto">Forgot Password</p>

      <TInput
        focus="true"
        @click="msgerror = ''"
        label="Email"
        type="email"
        ariaDescribedBy="User name"
        v-model.no-whitespace="email"
      />
      
      <button @click="checklogin($event)" class="my-3 text-[15px] rounded border border-blue-600 bg-blue-700 min-h-[38px]">SIGN IN</button>

      <div v-if="msgerror" class="text-sm bg-red-500 text-center py-1">
        <p>{{ msgerror }}</p>
      </div>
    </form>
    <div class="text-[15px] text-gray-400 py-4 text-center">
      <RouterLink to="/signin">Sign in</RouterLink>
    </div>
    
    <!-- <TheWelcome /> -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      msgerror: '',
    }
  },
  created () {
    document.title = "Forgot Password | Demo"
  },
  methods: {
    async checkEmail() {
      this.msgerror = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) ?
        'Invalid email address.' : '';
    },
    async checklogin(e) {
      this.checkEmail()
      if (this.msgerror) { return e.preventDefault() }
    },
  }
}
</script>