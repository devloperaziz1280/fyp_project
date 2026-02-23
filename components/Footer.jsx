import { FiGlobe } from 'react-icons/fi'

const Footer = () => {
  return (
    <div
      className="h-18 fixed left-0 right-0 bottom-0 px-4 sm:px-20 py-4 flex flex-col sm:flex-row
      justify-center sm:justify-between bg-gradient-to-r from-[#1e0f47] via-[#2a1f6f] to-[#0b173d] border-t border-[#ffffff08] z-40"
    >
      <p className="flex space-x-4 items-center text-gray-100 text-sm sm:text-lg">
        Gomal Design Studio &copy; {new Date().getFullYear()} All rights reserved.
      </p>
      <div className="flex space-x-3 justify-center items-center font-medium text-gray-300 text-sm sm:text-lg">
        <FiGlobe className="text-gray-300" />
        <p className="hidden sm:block">English (US)</p>
      </div>
    </div>
  )
}

export default Footer
