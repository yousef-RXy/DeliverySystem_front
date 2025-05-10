import { NavLink, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import AuthButton from './AuthButton';

export default function Header() {
  const [isMerchant, setIsMerchant] = useState(false);
  const location = useLocation();

  const def = 'font-medium hover:text-[#ffa91e] transition ';
  const active = def + 'text-[#ffa91e]';
  const notActive = def + 'text-white';

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      setIsMerchant(localStorage.getItem('role') === 'Merchant');
    }
  }, [location]);

  return (
    <nav className="sticky top-0 w-full bg-[#14213D] z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className="text-white font-bold text-xl font-serif px-3 py-1 rounded hover:no-underline"
          >
            Delivery
          </NavLink>
        </div>

        {/* Hamburger Button */}
        <div
          className={`flex absolute drop-shadow-2xl shadow-2xl top-full left-0 w-full bg-[#14213D] flex-col items-center gap-4 py-4 md:flex md:static md:flex-row md:bg-transparent md:w-auto md:py-0`}
        >
          {/* {isMerchant ? (
                <NavLink
                  to="/manage"
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  View Requests
                </NavLink>
              ) : null} */}
        </div>
      </div>
    </nav>
  );
}
