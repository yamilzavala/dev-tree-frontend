import { FaBarsStaggered } from 'react-icons/fa6';
import { FaCodepen } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';
import Toggle from './Toggle';
import type { User } from "../types";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = ({ data }: { data?: User }) => {
  const queryClient = useQueryClient()

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <nav className='bg-base-200/80 backdrop-blur-md relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-screen after:bg-gradient-to-r after:from-purple-500 after:via-pink-500 after:to-orange-500 after:-ml-[50vw] after:left-[50%]'>
      <div className='navbar align-element'>

        {/* HOME AND DROPDOWN */}
        <div className='navbar-start'>
          {/* Title */}
          <NavLink
            to='/'
            className='hidden lg:flex text-3xl items-center'
          >
            <FaCodepen className="hover:text-pink-500 text-gray-950 transition" />
          </NavLink>
          {/* DROPDOWN */}
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden  text-gray-950 '>
              <FaBarsStaggered className='h-6 w-6' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'
            >
              <NavLinks />
            </ul>
          </div>
        </div>

        {/* LINKS */}
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal '>
            <NavLinks />
          </ul>
        </div>

        {/* CART AND THEME */}
        <div className='navbar-end flex gap-2 sm:gap-5'>
          {/* THEME ICONS */}
          <Toggle />
          {/* LogOut */}
          {data?._id && (
            <NavLink
              className='capitalize text-xs sm:text-sm text-base-content'
              to='/auth/login'
              onClick={logout}
            >
              <span className='text-base-content px-2 py-1.5 sm:p-2 rounded-md bg-pink-300 whitespace-nowrap'>Sign Out</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;