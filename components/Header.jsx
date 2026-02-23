import { BiCube } from 'react-icons/bi'
import Link from 'next/link'
import { ConnectBtn } from '.'
import { AiOutlineHome } from 'react-icons/ai' // clean outline
import { BiBuildingHouse } from 'react-icons/bi' // elegant outline
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { MdAddHome } from 'react-icons/md'
import { FaHome } from 'react-icons/fa' // solid classic
import { HiOutlineHome } from 'react-icons/hi' // modern line icon

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#120a3a]/95 via-[#1a0f4f]/95 to-[#0a0730]/95 backdrop-blur-md border-b border-[#6d28d9]/40 shadow-lg sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer group transition-transform duration-300 hover:scale-105">
            <BiCube className="text-6xl text-[#7c3aed] group-hover:text-white transition-colors duration-300" />
            <span className="text-white font-mono font-semibold text-2xl group-hover:text-[#7c3aed] transition-colors duration-300">
              De-Renters
            </span>
          </div>
        </Link>

        <ButtonGroup />
        <ConnectBtn />
      </div>
    </header>
  )
}

const ButtonGroup = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link href="/">
        <div className="flex items-center space-x-2 cursor-pointer group transition hover:scale-105">
          <AiOutlineHome className="text-4xl text-[#7c3aed] group-hover:text-white transition-colors duration-300" />
          <span className="text-white font-mono font-semibold text-lg  group-hover:text-[#7c3aed] transition-colors duration-300">
            {' '}
            Home
          </span>
        </div>
      </Link>
      <Link href="/properties">
        <div className="flex items-center space-x-2 cursor-pointer group transition hover:scale-105">
          <BiBuildingHouse className="text-4xl text-[#7c3aed] group-hover:text-white transition-colors duration-300" />
          <span className="text-white font-mono font-semibold text-lg group-hover:text-[#7c3aed] transition-colors duration-300">
            {' '}
            Properties
          </span>
        </div>
      </Link>
      <Link href="/room/add">
        <div className="flex items-center space-x-2 cursor-pointer group transition hover:scale-105">
          <MdAddHome className="text-4xl text-[#7c3aed] group-hover:text-white transition-colors duration-300" />
          <span className="text-white font-mono font-semibold text-lg group-hover:text-[#7c3aed] transition-colors duration-300">
            {' '}
            Add Property
          </span>
        </div>
      </Link>
    </nav>
  )
}

export default Header

//  <Link href="/"
//       className="text-gray-300 hover:text-white transition-colors">
//         Home
//       </Link>
