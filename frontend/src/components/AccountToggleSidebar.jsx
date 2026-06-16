import React from 'react'
import {FiChevronDown , FiChevronUp} from 'react-icons/fi'

const AccountToggleSidebar = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4  border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded translate-colors relative gap-2 w-full items-center">
        <img src="/svg.png" alt="User" className="w-8 h-8 text-sm" />
      <div className="text-start mt-2">
        <span className="text-sm font-semibold text-gray-900">Admin</span>
      </div>
      <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" 
      />
      <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
     </button>
    </div>
  )
}

export default AccountToggleSidebar
