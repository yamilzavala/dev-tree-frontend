import { NavLink, useLocation } from 'react-router-dom';

const links = [
    { id: 1, url: '/admin', text: 'home', end: true },
    { id: 2, url: '/admin/profile', text: 'profile', end: false },
  ];
const homeLinks = [
    { id: 1, url: '/auth/login', text: 'login', end: true },
    { id: 2, url: '/auth/register', text: 'register', end: false },
  ];

const NavLinks = () => {    
  const location = useLocation()
  const currentLinks = location.pathname === '/' ? homeLinks : links;
    
    return (
        <>
            {currentLinks.map((link) => {
                const { id, url, text, end } = link;
                return (
                    <li key={id}>
                        <NavLink 
                            className='capitalize text-sm  text-base-content ' 
                            to={url}
                            end={end}
                        >
                            {({ isActive }) => (
                                <span className={isActive ? 'text-pink-500' : ''}>{text}</span>
                            )}
                        </NavLink>
                    </li>
                );
            })}
      </>
    );
};

export default NavLinks;