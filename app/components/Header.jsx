import { NavLink, useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, [location]);

  function logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    navigate('/auth');
  }

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
        {role && (
          <div
            className="px-3 py-1 min-w-24 text-center border rounded transition font-bold hover:text-white border-[#dc3545] text-[#dc3545] hover:bg-[#dc3545] cursor-pointer"
            onClick={logout}
          >
            Logout
          </div>
        )}
      </div>
    </nav>
  );
}
