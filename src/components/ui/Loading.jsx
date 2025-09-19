import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-48 animate-pulse"></div>
        <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-32 animate-pulse"></div>
      </div>

      {/* Task Form Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
      >
        <div className="space-y-4">
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-24 animate-pulse"></div>
          <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-full animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-32 animate-pulse"></div>
          <div className="h-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-full animate-pulse"></div>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search Bar Skeleton */}
      <div className="flex gap-4">
        <div className="flex-1 h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
        <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-32 animate-pulse"></div>
      </div>

      {/* Task Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 border border-slate-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse mt-1"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-full mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-red-200 to-red-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-16 animate-pulse"></div>
                    <div className="h-6 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-full w-12 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading