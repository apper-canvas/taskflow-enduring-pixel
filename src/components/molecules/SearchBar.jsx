import { useState } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"

const SearchBar = ({ onSearch, onFilter, categories = [] }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")

  const handleSearch = (query) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
    onFilter({ category, priority: selectedPriority })
  }

  const handlePriorityFilter = (priority) => {
    setSelectedPriority(priority)
    onFilter({ category: selectedCategory, priority })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSelectedPriority("")
    onSearch("")
    onFilter({ category: "", priority: "" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name="Search" className="h-4 w-4 text-slate-400" />
          </div>
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 h-12 bg-slate-50 border-slate-300 focus:bg-white"
          />
        </div>

        {/* Category Filter */}
        <div className="flex-shrink-0 w-full lg:w-48">
          <Select
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="h-12 bg-slate-50 border-slate-300 focus:bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.Id} value={category.name}>
                {category.name} ({category.taskCount})
              </option>
            ))}
          </Select>
        </div>

        {/* Priority Filter */}
        <div className="flex-shrink-0 w-full lg:w-40">
          <Select
            value={selectedPriority}
            onChange={(e) => handlePriorityFilter(e.target.value)}
            className="h-12 bg-slate-50 border-slate-300 focus:bg-white"
          >
            <option value="">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </Select>
        </div>

        {/* Clear Filters */}
        {(searchQuery || selectedCategory || selectedPriority) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="flex-shrink-0 h-12 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <ApperIcon name="X" className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default SearchBar