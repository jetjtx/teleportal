<script setup>
import TInput from '@/components/TInput.vue'
// import { onMounted } from 'vue';
// import { useRouter } from "vue-router"
</script>

<template>
  <main class="mx-auto text-gray-100">

    <form class="px-4 py-5 mt-10 bg-gray-700 rounded-lg min-w-[24rem] grid gap-4" action="/admin/signin">
      <h1 class="text-2xl text-center font-semibold mb-3">Teleportal</h1>
      <p class="text-xl mb-3 mx-auto">Welcome back</p>

      <TInput
        focus="true"
        @click="data.msgerror = ''"
        label="Email"
        type="email"
        ariaDescribedBy="User name"
        v-model.no-whitespace="data.email"
      />
      
      <TInput
        @click="data.msgerror = ''"
        label="Password"
        type="password"
        ariaDescribedBy="Password"
        v-model="data.password"
      />
      
      <button
        @click="checklogin($event)"
        class="my-3 text-[15px] rounded border border-blue-600 bg-blue-700 min-h-[38px]"
      >SIGN IN</button>

      <div v-if="data.msgerror" class="text-sm bg-red-500 text-center py-1">
        <p>{{ data.msgerror }}</p>
      </div>
    </form>

    <!-- <TheWelcome /> -->
  </main>
</template>

<script>
export default {
  data() {
    // const router = useRouter()
    return {
      data: {
        email: '',
        password: '',
        msgerror: '',
      },
      // router
    }
  },
  setup() {
    // onMounted(async () => {
    //   const url = "http://localhost:8888/admin/dashboard"
    //   const res = await fetch(url, {
    //     credentials: true
    //   })
    //   if (res.status !== 200) {
    //     console.log(res.statusText)
    //     console.log(res.data)
    //   }
    // })
    
    // const data = reactive({
    //   email: '',
    //   password: '',
    //   msgerror: '',
    // })
    // return {
    //   data    
    // }
  },
  created () {
    document.title = "Login | Teleportal"
  },
  methods: {
    async checkEmail() {
      this.data.msgerror = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.data.email) ?
        'Invalid email address.' : '';
    },
    async checklogin(e) {
      e.preventDefault()

      this.checkEmail()
      if (this.data.msgerror.length > 0) {return}
      this.data.msgerror = this.data.password.length < 8 ? 'Invalid login.' : '';
      if (this.data.msgerror.length > 0) {return}
      
      let body = new FormData()
      body.append("emailaddress", this.data.email)
      body.append("password", this.data.password)

      const r = await fetch('https://b.checkin.sg/api/auth/signin', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        body: body,
      })
      if (r.status == 200) {
        this.$router.push({name: 'dashboard'})
      } else {
        this.data.msgerror = 'Invalid username/password';
      }
    },
  }
}
</script>