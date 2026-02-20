// import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';

const links = [
    { id: 1, url: '/admin', text: 'home', end: true },
    { id: 2, url: '/admin/profile', text: 'profile', end: false },
  ];

const NavLinks = () => {    
    // const user = useSelector(state => state.userState.user);
    
    return (
        <>
            {links.map((link) => {
                const { id, url, text, end } = link;
                return (
                    <li key={id}>
                        <NavLink 
                            className='capitalize text-sm' 
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