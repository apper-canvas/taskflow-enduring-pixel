import taskData from "@/services/mockData/tasks.json"
import categoryData from "@/services/mockData/categories.json"

let tasks = [...taskData]
let categories = [...categoryData]

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))

export const taskService = {
  async getAllTasks() {
    await delay()
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  },

  async getTaskById(id) {
    await delay()
    const task = tasks.find(t => t.Id === parseInt(id))
    return task ? { ...task } : null
  },

  async createTask(taskData) {
    await delay()
    const maxId = Math.max(...tasks.map(t => t.Id), 0)
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async updateTask(id, updates) {
    await delay()
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
    if (taskIndex === -1) throw new Error("Task not found")
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      completedAt: updates.completed && !tasks[taskIndex].completed 
        ? new Date().toISOString() 
        : tasks[taskIndex].completedAt
    }
    
    tasks[taskIndex] = updatedTask
    return { ...updatedTask }
  },

  async deleteTask(id) {
    await delay()
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
    if (taskIndex === -1) throw new Error("Task not found")
    
    const deletedTask = tasks.splice(taskIndex, 1)[0]
    return { ...deletedTask }
  },

  async getAllCategories() {
    await delay()
    const categoriesWithCounts = categories.map(category => ({
      ...category,
      taskCount: tasks.filter(task => task.category === category.name).length
    }))
    return [...categoriesWithCounts]
  },

  async searchTasks(query) {
    await delay()
    const searchResults = tasks.filter(task => 
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase()) ||
      task.category.toLowerCase().includes(query.toLowerCase())
    )
    return [...searchResults]
  },

  async getTasksByCategory(category) {
    await delay()
    const filteredTasks = tasks.filter(task => task.category === category)
    return [...filteredTasks]
  },

  async getTasksByPriority(priority) {
    await delay()
    const filteredTasks = tasks.filter(task => task.priority === priority)
    return [...filteredTasks]
  },

  async getCompletedTasks() {
    await delay()
    const completedTasks = tasks.filter(task => task.completed)
    return [...completedTasks].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
  },

  async getPendingTasks() {
    await delay()
    const pendingTasks = tasks.filter(task => !task.completed)
    return [...pendingTasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
}