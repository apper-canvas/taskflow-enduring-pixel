import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

// Initialize ApperClient for data operations
const initializeApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const taskService = {
  async getAllTasks() {
    try {
      const apperClient = initializeApperClient()
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}]
      }
      
      const response = await apperClient.fetchRecords('task_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      // Map database fields to frontend format
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c || '',
        description: task.description_c || '',
        completed: task.completed_c || false,
        priority: task.priority_c || 'Medium',
        category: task.category_c?.Name || '',
        dueDate: task.due_date_c || null,
        createdAt: task.created_at_c || new Date().toISOString(),
        completedAt: task.completed_at_c || null
      }))
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error)
      toast.error("Failed to load tasks")
      return []
    }
  },

  async getTaskById(id) {
    try {
      const apperClient = initializeApperClient()
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}}
        ]
      }
      
      const response = await apperClient.getRecordById('task_c', id, params)
      
      if (!response?.data) {
        return null
      }
      
      const task = response.data
      return {
        Id: task.Id,
        title: task.title_c || '',
        description: task.description_c || '',
        completed: task.completed_c || false,
        priority: task.priority_c || 'Medium',
        category: task.category_c?.Name || '',
        dueDate: task.due_date_c || null,
        createdAt: task.created_at_c || new Date().toISOString(),
        completedAt: task.completed_at_c || null
      }
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error)
      return null
    }
  },

  async createTask(taskData) {
    try {
      const apperClient = initializeApperClient()
      
      // Get category ID if category is provided
      let categoryId = null
      if (taskData.category) {
        const categories = await this.getAllCategories()
        const category = categories.find(cat => cat.name === taskData.category)
        categoryId = category ? category.Id : null
      }
      
      const params = {
        records: [{
          title_c: taskData.title || '',
          description_c: taskData.description || '',
          completed_c: false,
          priority_c: taskData.priority || 'Medium',
          category_c: categoryId,
          due_date_c: taskData.dueDate || null,
          created_at_c: new Date().toISOString(),
          completed_at_c: null
        }]
      }
      
      const response = await apperClient.createRecord('task_c', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, JSON.stringify(failed))
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successful.length > 0) {
          const task = successful[0].data
          return {
            Id: task.Id,
            title: task.title_c || '',
            description: task.description_c || '',
            completed: task.completed_c || false,
            priority: task.priority_c || 'Medium',
            category: taskData.category || '',
            dueDate: task.due_date_c || null,
            createdAt: task.created_at_c || new Date().toISOString(),
            completedAt: task.completed_at_c || null
          }
        }
      }
      
      throw new Error("Failed to create task")
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error)
      throw new Error(error.message || "Failed to create task")
    }
  },

  async updateTask(id, updates) {
    try {
      const apperClient = initializeApperClient()
      
      // Get category ID if category is being updated
      let categoryId = undefined
      if (updates.category !== undefined) {
        if (updates.category) {
          const categories = await this.getAllCategories()
          const category = categories.find(cat => cat.name === updates.category)
          categoryId = category ? category.Id : null
        } else {
          categoryId = null
        }
      }
      
      const updateData = {}
      if (updates.title !== undefined) updateData.title_c = updates.title
      if (updates.description !== undefined) updateData.description_c = updates.description
      if (updates.completed !== undefined) {
        updateData.completed_c = updates.completed
        updateData.completed_at_c = updates.completed ? new Date().toISOString() : null
      }
      if (updates.priority !== undefined) updateData.priority_c = updates.priority
      if (categoryId !== undefined) updateData.category_c = categoryId
      if (updates.dueDate !== undefined) updateData.due_date_c = updates.dueDate
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...updateData
        }]
      }
      
      const response = await apperClient.updateRecord('task_c', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, JSON.stringify(failed))
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successful.length > 0) {
          const task = successful[0].data
          return {
            Id: task.Id,
            title: task.title_c || '',
            description: task.description_c || '',
            completed: task.completed_c || false,
            priority: task.priority_c || 'Medium',
            category: updates.category || '',
            dueDate: task.due_date_c || null,
            createdAt: task.created_at_c || new Date().toISOString(),
            completedAt: task.completed_at_c || null
          }
        }
      }
      
      throw new Error("Failed to update task")
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error)
      throw new Error(error.message || "Failed to update task")
    }
  },

  async deleteTask(id) {
    try {
      const apperClient = initializeApperClient()
      const params = {
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord('task_c', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, JSON.stringify(failed))
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successful.length === 1
      }
      
      return false
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error)
      throw new Error(error.message || "Failed to delete task")
    }
  },

  async getAllCategories() {
    try {
      const apperClient = initializeApperClient()
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "task_count_c"}}
        ],
        orderBy: [{"fieldName": "Name", "sorttype": "ASC"}]
      }
      
      const response = await apperClient.fetchRecords('category_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      // Get task counts for each category
      const tasks = await this.getAllTasks()
      
      return response.data.map(category => ({
        Id: category.Id,
        name: category.name_c || category.Name || '',
        color: category.color_c || '#3b82f6',
        taskCount: tasks.filter(task => task.category === (category.name_c || category.Name)).length
      }))
    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error)
      return []
    }
  },

  async searchTasks(query) {
    try {
      const tasks = await this.getAllTasks()
      return tasks.filter(task => 
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase()) ||
        task.category.toLowerCase().includes(query.toLowerCase())
      )
    } catch (error) {
      console.error("Error searching tasks:", error)
      return []
    }
  },

  async getTasksByCategory(category) {
    try {
      const tasks = await this.getAllTasks()
      return tasks.filter(task => task.category === category)
    } catch (error) {
      console.error("Error fetching tasks by category:", error)
      return []
    }
  },

  async getTasksByPriority(priority) {
    try {
      const tasks = await this.getAllTasks()
      return tasks.filter(task => task.priority === priority)
    } catch (error) {
      console.error("Error fetching tasks by priority:", error)
      return []
    }
  },

  async getCompletedTasks() {
    try {
      const tasks = await this.getAllTasks()
      return tasks.filter(task => task.completed).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    } catch (error) {
      console.error("Error fetching completed tasks:", error)
      return []
    }
  },

  async getPendingTasks() {
    try {
      const tasks = await this.getAllTasks()
      return tasks.filter(task => !task.completed).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (error) {
      console.error("Error fetching pending tasks:", error)
      return []
}
  }
}