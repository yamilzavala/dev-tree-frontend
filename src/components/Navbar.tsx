import { FaCodepen } from "react-icons/fa";
import { FaBarsStaggered } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';
import Toggle from './Toggle';

const Navbar = () => {

  return (
    <nav className='bg-base-200'>
      <div className='navbar align-element '>

        {/* HOME AND DROPDOWN */}
        <div className='navbar-start'>
          {/* Title */}
          <NavLink
            to='/admin'
            className='hidden lg:flex text-3xl items-center'
          >
            <FaCodepen />
          </NavLink>
          {/* DROPDOWN */}
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <FaBarsStaggered className='h-6 w-6' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'
            >
              <NavLinks/>
            </ul>
          </div>
        </div>

        {/* LINKS */}
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal '>
            <NavLinks/>
          </ul>
        </div>
        
        {/* CART AND THEME */}
        <div className='navbar-end'>
          {/* THEME ICONS */}
          <Toggle/>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;