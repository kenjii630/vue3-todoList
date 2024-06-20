import { defineStore } from 'pinia'
interface Todo {
  id: string
  text: string
  done: boolean
}

interface ListStoreState {
  lists: Todo[]
  newTodo: string
}

export const useListStore = defineStore('counter', {
  state: (): ListStoreState => ({
    lists: [],
    newTodo: ''
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    addTodo(todo: Todo) {
      this.lists.push(todo)
      this.saveListsToLocalStorage()
    },
    removeTodoById(id: string) {
      const index = this.lists.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        this.lists.splice(index, 1)
        this.saveListsToLocalStorage() // Optionally save updated lists to localStorage
      }
    },
    saveListsToLocalStorage() {
      // Serialize lists array to JSON
      const serializedLists = JSON.stringify(this.lists)
      // Save serialized lists to localStorage
      localStorage.setItem('todoLists', serializedLists)
    },
    retrieveListsFromLocalStorage() {
        try {
            // Retrieve lists array and string from localStorage
            const storedLists = localStorage.getItem('todoLists')
            const todoText = localStorage.getItem('text')
            if (storedLists) {
                // Parse JSON string back to array of objects
                this.lists = JSON.parse(storedLists)
            }
            if (todoText) {
                this.newTodo = todoText
            }
        } catch {}
      
    },
    saveNewTodoBeforeRefresh(text: string) {
      // Save serialized lists to localStorage
      localStorage.setItem('text', text)
    }
  }
})
