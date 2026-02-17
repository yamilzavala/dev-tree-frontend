import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useEffect, useState } from "react";
import { getThemeFromLocalStorage, themes } from '../utils';

const Toggle = () => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage())

  const handleTheme = () => {
    const {light, dark} = themes;
    const newTheme = theme === light ? dark : light;
    
    setTheme(newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme)
  }, [theme])

    return (        
        <div className='navbar-end'>            
            <label className='swap swap-rotate '>
            {/* this hidden checkbox controls the state */}
            <input type='checkbox' onChange={handleTheme} />
        
            {/* sun icon */}
            <BsSunFill className='swap-on h-4 w-4' />
        
            {/* moon icon */}
            <BsMoonFill className='swap-off h-4 w-4' />
            </label>
        </div>
    );
};

export default Toggle;