<template>
  <div class="flex justify-center">
    <div class="w-full max-w-4xl space-y-4">
      <!-- Todo items list -->
      <div v-for="(item, index) in store.lists" :key="index" class="w-full">
        <div class="grid grid-cols-12 gap-4 items-center">
          <!-- Checkbox input -->
          <input
            type="checkbox"
            id="todo-checkbox-{{ index }}"
            v-model="item.done"
            @change="onCheck(item, index)"
            class="col-span-1 w-7 h-7 bg-gray-100 border-gray-300 rounded"
          />

          <!-- Editable label for checkbox -->
          <div class="col-span-5">
            <label
              v-if="!item.editing"
              :for="'todo-checkbox-' + index"
              class="block w-full text-sm font-medium text-gray-900 text-ellipsis overflow-hidden"
              :class="item.done ? 'line-through' : ''"
            >
              {{ item.text }}
            </label>
            <input
              v-else
              type="text"
              v-model="item.text"
              class="w-full py-2 px-3 font-medium text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              :class="item.done ? 'line-through' : ''"
              @keyup.enter="onSaveEdit(item)"
              @blur="onSaveEdit(item)"
            />
          </div>

          <!-- Priority and Label -->
          <!-- Priority and Label -->
          <div class="col-span-3 flex space-x-2">
            <div></div>
            <CheckStatus :isStatus="false" :label="item.label" />
            <CheckStatus :level="item?.priority?.level" :label="item.priority.text" />
          </div>

          <!-- Action buttons -->
          <div class="col-span-3 flex justify-end space-x-2">
            <button
              type="button"
              @click="onDelete(item.id)"
              class="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21a48.108 48.108 0 00-3.478-.397M5.812 5.79a48.108 48.108 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <button
              type="button"
              @click="onToggleEdit(item)"
              class="py-2 px-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useListStore } from '@/stores/lists'
import CheckStatus from '@/components/CheckStatus.vue'

const store = useListStore()

// Handler for checkbox change
const onCheck = (item: any, index: number) => {
  store.lists[index].done = item.done
  store.saveListsToLocalStorage()
}

// Handler for removing todo by ID
const onDelete = (id: string) => {
  store.removeTodoById(id)
}

// Handler for toggling edit mode
const onToggleEdit = (item: any) => {
  item.editing = !item.editing // Toggle editing mode
}

// Handler for saving edits
const onSaveEdit = (item: any) => {
  if (item.text.trim() !== '') {
    item.editing = false // Exit editing mode
    store.error = false
    store.saveListsToLocalStorage()
  }
}
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
