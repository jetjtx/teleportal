<script setup>
const emit = defineEmits(['update:modelValue'])
defineProps ({
  modelValue: String,
  modelModifiers: Object,
  type: {type: String, required: true},
  label: {type: String, required: true},
  focus: {type: String, required: false},
  ariaDescribedBy: {type: String, required: false},
  iserror: {type: String, default: ""},
})
</script>

<template>
<div>
<label>
  <span class="text-white text-sm">{{ label }}</span>
  <input
  ref="autofocus"
  @input="emitValue('modelValue', $event)"
  :type="type || 'text'"
  :value="modelValue"
  :aria-describedby="ariaDescribedBy"
  :class="iserror ? 'border-red-400' : 'border-gray-500'"
  class="outline-none bg-neutral-800 text-white min-h-[47px] w-full px-3 rounded mt-1 border"
  />
</label>
</div>
</template>

<script>
export default {
  name: 'TInput',
  mounted() {
    if (this.focus) {
      this.$refs.autofocus.focus();
    }
  },
  methods: {
    emitValue(propName, e) {
      let v = e.target.value

      if (this.modelModifiers == "no-whitespace") {
        v = v.replace(/\s/g, '')
      }

      this.$emit(`update:${propName}`, v)
    }
  }
}
</script>