<template>
  <main class="pt-12">
    <div class="flex justify-center pb-6">
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-6xl"
        >Todo List</span
      >
    </div>
    <!-- TodoInput component -->
    <div class="flex justify-center">
      <div class="mb-10">
        <TodoInput class="mr-6" />
      </div>
      <div class="mr-4">
        <DropdownOption title="Priority" :options="priority" @change="handlePriorityChange" :error="store.emptyPriority" />
      </div>
      <div>
        <DropdownOption title="Label" :options="labels" @change="handleLabelChange" :error="store.emptyLabel" />
      </div>
    </div>

    <TodoList />
  </main>
</template>

<script setup lang="ts">
interface DropdownOption {
  id: number
  name: string
  value: any // Adjust the type based on what 'value' represents
  color: string
  level: number
}

import { ref } from 'vue'
import TodoList from '@/components/TodoList.vue'
import TodoInput from '@/components/TodoInput.vue'
import DropdownOption from '@/components/DropdownOption.vue'
import { labels, priority } from '@/data/optionsData'
import { useListStore } from '@/stores/lists'

const store = useListStore()

const handlePriorityChange = (option: DropdownOption) => {
  console.log(option)

  store.priority = { text: option.name, level: option.level }
}
const handleLabelChange = (option: DropdownOption) => {
  store.label = option.name
}
</script>
