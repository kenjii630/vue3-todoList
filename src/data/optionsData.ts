
export interface Item {
  id: number
  name: string
  value: string
 // Optional: Add or modify any other keys as needed
}

export interface Priority {
  id: number
  name: string
  level: number
 // Optional: Add or modify any other keys as needed
}

const labels: Item[] = [
  { id: 1, name: 'Personal', value: 'p' },
  { id: 2, name: 'Work', value: 'w' }
]

const priority: Priority[] = [
  { id: 1, name: 'High', level: 3 },
  { id: 2, name: 'Medium', level: 2 },
  { id: 3, name: 'Low', level: 1 }
]

export { labels, priority }
