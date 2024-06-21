<template>
  <div class="flex">
    <div class="w-96 mr-1">
      <div class="relative w-full min-w-[200px] h-10">
        <!-- Input todo list -->
        <input
          class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Add New ..."
          type="text"
          name="search"
          v-model="store.newTodo"
          @keyup.enter="addTodo"
          :class="{ 'border-red-600 text-red-500': store.error }"
        />
      </div>
    </div>
    <div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        @click="addTodo"
      >
        Note
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useListStore } from '@/stores/lists'

const store = useListStore()

watchEffect(() => {
  if (store.priority.text) {
    store.emptyPriority = false
  }

  if (store.label) {
    store.emptyLabel = false
  }
})

// funciton
const addTodo = () => {
  if (store.newTodo.trim()) {
    if (!store.priority.text || !store.label) {
      store.emptyPriority = !store.priority.text
      store.emptyLabel = !store.label
      store.error = true
      return
    }

    const todoItem = {
      id: crypto.randomUUID(),
      text: store.newTodo,
      done: false,
      priority: { text: store.priority.text, level: store.priority.level },
      label: store.label
    }

    store.emptyLabel = false
    store.emptyPriority = false
    store.error = false

    store.addTodo(todoItem) // Call store action to add todoItem
    store.newTodo = '' // Clear input after adding todo
  }
}
// Initialize the store and retrieve lists from localStorage
store.retrieveListsFromLocalStorage()

// Register window.onbeforeunload to log 'bye' before page refresh
window.onbeforeunload = () => {
  store.saveNewTodoBeforeRefresh(store.newTodo)
}
</script>

<style scoped></style>
