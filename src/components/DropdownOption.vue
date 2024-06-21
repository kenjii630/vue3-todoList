<template>
  <div>
    <span class=" underline tracking-wide">
        {{ title }}
    </span>
    :
    <button
      id="dropdownDefaultButton"
      @click="toggleDropdown"
      class="font-medium text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button"
      :class="{ ' text-red-500': error }"
    >
      {{ selectedOption?.name ?? 'Select' }}
      <svg
        class="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
        :class="{'animate-ping': error}"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
      
    </button>

    <!-- Dropdown menu -->
    <div
      id="dropdown"
      v-if="dropdownVisible"
      class="z-10 bg-white rounded-lg shadow mt-2 absolute w-44"
    >
      <button
        v-for="(option, index) in props.options"
        :key="option.id"
        @click="selectOption(option)"
        class="block px-4 py-2 w-full hover:bg-gray-200 text-left"
      >
        {{ option.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const dropdownVisible = ref(false)
const selectedOption = ref(null)

const props = defineProps({
  title: {
    type: String,
    default: 'Drop Down'
  },
  options: {
    type: Array,
    default: () => []
  },
  error: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change'])

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

const selectOption = (option) => {
  selectedOption.value = option
  toggleDropdown() // Close dropdown after selecting an option
  emit('change', option) // Emit event with selected option
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
