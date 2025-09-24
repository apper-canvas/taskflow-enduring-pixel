import { toast } from "react-toastify"

// Initialize ApperClient for data operations
const initializeApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const assigneeService = {
  async getAllAssignees() {
    try {
      const apperClient = initializeApperClient()
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}}
        ],
        orderBy: [{"fieldName": "Name", "sorttype": "ASC"}]
      }
      
      const response = await apperClient.fetchRecords('assignee_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        // If no assignees exist, create the initial ones
        await this.createInitialAssignees()
        return this.getAllAssignees()
      }
      
return response.data.map(assignee => ({
        Id: assignee.Id,
        name: assignee.Name || '',
        assignee_c: assignee.assignee_c || null
      }))
    } catch (error) {
      console.error("Error fetching assignees:", error?.response?.data?.message || error)
      toast.error("Failed to load assignees")
      return []
    }
  },

  async getAssigneeById(id) {
    try {
      const apperClient = initializeApperClient()
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}}
        ]
      }
      
      const response = await apperClient.getRecordById('assignee_c', id, params)
      
      if (!response?.data) {
        return null
      }
      
      const assignee = response.data
return {
        Id: assignee.Id,
        name: assignee.Name || '',
        assignee_c: assignee.assignee_c || null
      }
    } catch (error) {
      console.error(`Error fetching assignee ${id}:`, error?.response?.data?.message || error)
      return null
    }
  },

  async createAssignee(assigneeData) {
    try {
      const apperClient = initializeApperClient()
      const params = {
        records: [{
Name: assigneeData.name || '',
          assignee_c: assigneeData.assignee_c || null
        }]
      }
      
      const response = await apperClient.createRecord('assignee_c', params)
      
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
          const assignee = successful[0].data
          return {
Id: assignee.Id,
            name: assignee.Name || '',
            assignee_c: assignee.assignee_c || null
          }
        }
      }
      
      throw new Error("Failed to create assignee")
    } catch (error) {
      console.error("Error creating assignee:", error?.response?.data?.message || error)
      throw new Error(error.message || "Failed to create assignee")
    }
  },

  async updateAssignee(id, updates) {
    try {
      const apperClient = initializeApperClient()
      const updateData = {}
      
      if (updates.name !== undefined) {
updateData.Name = updates.name
      }
      if (updates.assignee_c !== undefined) {
        updateData.assignee_c = updates.assignee_c
      }
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...updateData
        }]
      }
      
      const response = await apperClient.updateRecord('assignee_c', params)
      
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
          const assignee = successful[0].data
return {
            Id: assignee.Id,
            name: assignee.Name || '',
            assignee_c: assignee.assignee_c || null
          }
        }
      }
      
      throw new Error("Failed to update assignee")
    } catch (error) {
      console.error("Error updating assignee:", error?.response?.data?.message || error)
      throw new Error(error.message || "Failed to update assignee")
    }
  },

  async deleteAssignee(id) {
    try {
      const apperClient = initializeApperClient()
      const params = {
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord('assignee_c', params)
      
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
      console.error("Error deleting assignee:", error?.response?.data?.message || error)
      throw new Error(error.message || "Failed to delete assignee")
    }
  },

  async createInitialAssignees() {
    try {
      const initialAssignees = [
        { name: "David Chen" },
        { name: "Sarah Johnson" },
        { name: "Jennifer Park" }
      ]

      const apperClient = initializeApperClient()
      const params = {
records: initialAssignees.map(assignee => ({
          Name: assignee.name,
          assignee_c: assignee.assignee_c || null
        }))
      }
      
      const response = await apperClient.createRecord('assignee_c', params)
      
      if (!response.success) {
        console.error("Failed to create initial assignees:", response.message)
        return false
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} initial assignees:`, JSON.stringify(failed))
        }
        
        if (successful.length > 0) {
          toast.success(`Successfully created ${successful.length} assignees`)
          return true
        }
      }
      
      return false
    } catch (error) {
      console.error("Error creating initial assignees:", error?.response?.data?.message || error)
      return false
    }
  }
}