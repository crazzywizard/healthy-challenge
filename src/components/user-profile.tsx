'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types/challenge';

interface UserProfileFormProps {
  userProfile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
}

export function UserProfileForm({ userProfile, onSave }: UserProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>({
    name: userProfile?.name || '',
    startingWeight: userProfile?.startingWeight || 0
  });
  const [isEditing, setIsEditing] = useState(!userProfile);

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'name' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.startingWeight > 0) {
      onSave(formData);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!isEditing && userProfile) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-gray-600 text-sm">Name:</span>
            <p className="font-medium text-gray-800">{userProfile.name}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Starting Weight:</span>
            <p className="font-medium text-gray-800">{userProfile.startingWeight} lbs</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {userProfile ? 'Edit Profile' : 'Set Up Your Profile'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="startingWeight" className="block text-sm font-medium text-gray-700 mb-1">
            Starting Weight (lbs) *
          </label>
          <input
            type="number"
            id="startingWeight"
            value={formData.startingWeight || ''}
            onChange={(e) => handleInputChange('startingWeight', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {userProfile ? 'Update Profile' : 'Save Profile'}
          </button>
          {userProfile && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
