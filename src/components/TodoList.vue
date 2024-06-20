<template>
  <div class="flex justify-center">
    <div class="justify-center space-y-4">
      <!-- TodoInput component -->
      <TodoInput />

      <!-- Todo items list -->
      <div v-for="(item, index) in store.lists" :key="index" class="w-96">
        <div class="flex items-center">
          <!-- Checkbox input -->
          <input
            type="checkbox"
            id="todo-checkbox-{{ index }}"
            v-model="item.done"
            @change="onCheck(item, index)"
            class="w-10 h-10 text-green-600 bg-gray-100 border-gray-300 rounded"
          />
          
          <!-- Label for checkbox -->
          <label
            :for="'todo-checkbox-' + index"
            class="ml-2 w-full py-4 text-sm font-medium text-gray-900"
            :class="item.done ? 'line-through' : ''"
          >
            {{ item.text }}
          </label>

          <button
            type="submit"
            @click="onDelete(item.id)"
            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useListStore } from '@/stores/lists'
import TodoInput from '@/components/TodoInput.vue'

const store = useListStore()

// Handler for checkbox change
const onCheck = (item: any, index: number) => {
  store.lists[index].done = item.done
  store.saveListsToLocalStorage()
}

// Handler for remove by ID
const onDelete = (id: string) => {
  store.removeTodoById(id)
}
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
