import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ title, description, action, onAction, icon = "CheckSquare" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
      >
        <ApperIcon name={icon} className="w-12 h-12 text-primary-600" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-slate-900 mb-2"
      >
        {title || "No tasks yet"}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-slate-600 mb-8 max-w-sm leading-relaxed"
      >
        {description || "Start organizing your productivity by creating your first task. Stay focused and get things done!"}
      </motion.p>
      
      {action && onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onAction}
          className="btn btn-primary inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          {action}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty