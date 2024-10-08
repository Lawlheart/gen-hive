import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAudit: React.FC = () => {
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would create a new audit here
    // For now, we'll just navigate to a new audit page with a random ID
    const newAuditId = Math.floor(Math.random() * 1000);
    navigate(`/audit/${newAuditId}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Create New Audit</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow">
        <div>
          <label htmlFor="siteName" className="block text-sm font-medium text-gray-300">
            Site Name
          </label>
          <input
            type="text"
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div>
          <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-300">
            Site URL
          </label>
          <input
            type="url"
            id="siteUrl"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            required
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Audit
        </button>
      </form>
    </div>
  );
};

export default CreateAudit;