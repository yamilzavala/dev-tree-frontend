// import {useSelector} from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { id: 1, url: '/admin', text: 'home' },
    { id: 2, url: 'profile', text: 'profile' },
  ];

const NavLinks = () => {    
    // const user = useSelector(state => state.userState.user);
    const [selected, setSelected] = useState(1)
    
    return (
        <>
            {links.map((link) => {
                const { id, url, text } = link;
                return (
                    <li key={id} onClick={() => setSelected(id)}>
                        <NavLink className='capitalize' to={url}>
                            <span className={selected === id ? 'text-blue-600' : ''}>{text}</span>
                        </NavLink>
                    </li>
                );
            })}
      </>
    );
};

export default NavLinks;