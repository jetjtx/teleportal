<script setup>
import TInput from '../components/TInput.vue'
</script>

<template>
  <main class="grid justify-center text-gray-100">
    <form class="grid gap-5 px-4 py-5 mt-10 bg-gray-700 min-w-[24rem] rounded-lg" action="/signup">
      <h1 class="text-2xl text-center font-semibold mb-3">Steinway Portal</h1>
      <p class="text-xl mb-3 mx-auto">Create an account</p>

      <div>
        <TInput
          @click="email.e= ''"
          @focusout="checkEmail"
          label="Email"
          type="email"
          focus="true"
          :iserror="email.e"
          v-model.no-whitespace="email.v"
        />
        <div v-if="email.e" class="mt-1 text-sm text-red-400"><p>{{ email.e }}</p></div>
      </div>

      <div>
        <TInput
          @keyup="validatePassword()"
          label="Password"
          type="password"
          ariaDescribedBy="Password"
          v-model="password.v"
        />

        <div class="relative grid grid-flow-col gap-3 px-4 my-5">
            <div class="group text-center cursor-default">
                <div class="invalid" :class="{'valid': password.lc}"></div>
                <p class="font-semibold text-xl">a</p>
                <p class="text-xs">Lowercase</p>
                <small :class="ptip">At least one lowercase letter</small>
            </div>
            <div class="group text-center cursor-default">
                <div class="invalid" :class="{'valid': password.uc}"></div>
                <p class="font-semibold text-xl">A</p>
                <p class="text-xs">Uppercase</p>
                <small :class="ptip">At least one uppercase letter</small>
            </div>
            <div class="group text-center cursor-default">
                <div class="invalid" :class="{'valid': password.num}"></div>
                <p class="font-semibold text-xl whitespace-nowrap">0-9</p>
                <p class="text-xs">Digit</p>
                <small :class="ptip">At least one digit</small>
            </div>
            <div class="group text-center cursor-default">
                <div class="invalid" :class="{'valid': password.sym}"></div>
                <p class="font-semibold text-xl">%</p>
                <p class="text-xs">Symbol</p>
                <small :class="ptip">At least one symbol</small>
            </div>
            <div class="group text-center cursor-default">
                <div class="invalid" :class="{'valid': password.char}"></div>
                <p class="font-semibold text-xl">8+</p>
                <p class="text-xs">Characters</p>
                <small :class="ptip" class="right-0">8 or more characters</small>
            </div>
        </div>
      </div>

      <div>
        <TInput
          @click="confirmpassword.e = ''"
          @focusout="validateConfirmPassword()"
          label="Confirm Password"
          type="password"
          ariaDescribedBy="Confirm Password"
          :iserror="confirmpassword.e"
          v-model="confirmpassword.v"
        />
        <div v-if="confirmpassword.e" class="mt-1 text-sm text-red-400">{{ confirmpassword.e }}</div>
      </div>
      
      <div>
        <label class="block my-1 text-xs">
          <input v-model="tos.v" class="mr-2" type="checkbox">
          I agree to <a class="text-red-300" href="/tos" target="_blank">Term of Service</a>
        </label>
        <div v-if="tos.e" class="mt-1 text-sm text-red-400">{{ tos.e }}</div>
      </div>
      
      <button :disabled="registerBtn" class="disabled:opacity-70 my-3 text-[15px] rounded border border-blue-600 bg-blue-700 min-h-[38px]">Create an account</button>
    </form>

    <div class="text-[15px] text-gray-400 py-4 text-center">
      <RouterLink to="/signin">Sign In</RouterLink> | 
      <RouterLink to="/forgotpassword">Forgot Password</RouterLink>
    </div>

  </main>
</template>

<script>
export default {
  data() {
    return {
      ptip: `z-10 hidden absolute top-0 px-2 bg-zinc-600 rounded text-white whitespace-nowrap group-hover:block`,
      email: { v: '', e: '' },
      password: { v: '', lc: !1, uc: !1, num: !1, sym: !1, char: !1 },
      confirmpassword: { v: '', e: '' },
      tos: { v: !1, e: '' },
    }
  },
  created () {
    document.title = "Sign up | Demo"
  },
  computed: {
    registerBtn() {
      return this.email.v !== ""
        && this.email.e === ""
        && this.confirmpassword.v !== ""
        && this.confirmpassword.e === ""
        && this.password.v === this.confirmpassword.v
        && this.validatePassword()
        && this.tos.v
        ? false : true;
    }
  },
  methods: {
    async checkEmail() {
      if (this.email.v.length < 6) {
        this.email.e = "Required email address.";
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email.v)) {
        this.email.e = "Invalid email address.";
      } else {
        this.email.e = "";
      }
    },
    async validatePassword() {
      const p = this.password.v, s = this.password;
      s.uc = /[A-Z]/.test(p);
      s.lc = /[a-z]/.test(p);
      s.num = /\d/.test(p);
      s.sym = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(p);
      s.char = p.length > 7;
      return s.uc && s.lc && s.num && s.sym && s.char;
    },
    async validateConfirmPassword() {
      this.confirmpassword.e = this.password.v !== this.confirmpassword.v
      && this.validatePassword() ? 'Passwords does not match.' : '';
    },
  }
}
</script>