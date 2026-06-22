import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiChevronUp, FiUser, FiLock, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountToggleSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex p-0.5 hover:bg-stone-200 rounded translate-colors relative gap-2 w-full items-center text-stone-900"
        >
          <img src="/svg.png" alt="User" className="w-8 h-8 text-sm" />
          <div className="text-start mt-2">
            <span className="text-sm font-semibold text-gray-900">{user?.name || 'Account'}</span>
          </div>
          {isOpen ? (
            <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs text-stone-600" />
          ) : (
            <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs text-stone-600" />
          )}
        </button>

        {isOpen && (
          <div className="bg-white rounded-lg shadow-lg border border-stone-200 p-2 mt-2 absolute w-full z-50">
            <div className="px-3 py-2 text-sm text-stone-600 border-b border-stone-100">
              <span className="font-medium">{user?.name}</span>
              <span className="text-stone-400 mx-1">—</span>
              <span className="capitalize">{user?.role}</span>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/admin/profile');
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded transition-colors"
            >
              <FiUser className="text-stone-500" />
              Admin Profile
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/admin/change-password');
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded transition-colors"
            >
              <FiLock className="text-stone-500" />
              Change Password
            </button>

            <div className="border-t border-stone-100 my-1" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded transition-colors"
            >
              <FiLogOut className="text-stone-500" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountToggleSidebar;