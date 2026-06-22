import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-stone-500">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Admin Profile</h1>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-4 max-w-md">
        <div className="flex justify-between items-center py-2 border-b border-stone-100">
          <span className="text-stone-500 text-sm">Name</span>
          <span className="text-stone-900 font-medium">{user.name}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-stone-100">
          <span className="text-stone-500 text-sm">Username</span>
          <span className="text-stone-900 font-medium">{user.username}</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-stone-500 text-sm">Role</span>
          <span className="text-stone-900 font-medium capitalize">{user.role}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;