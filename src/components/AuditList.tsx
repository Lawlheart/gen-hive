import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, PlusCircle } from 'lucide-react';

interface Audit {
  id: string;
  siteId: string;
  siteName: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Scheduled';
}

const mockAudits: Audit[] = [
  { id: '1', siteId: '1', siteName: 'Example Site 1', date: '2023-05-01', status: 'Completed' },
  { id: '2', siteId: '2', siteName: 'Example Site 2', date: '2023-05-15', status: 'In Progress' },
  { id: '3', siteId: '3', siteName: 'Example Site 3', date: '2023-06-01', status: 'Scheduled' },
];

const AuditList: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Audit List</h1>
        <Link
          to="/audit/new"
          className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          New Audit
        </Link>
      </div>
      <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-700">
          {mockAudits.map((audit) => (
            <li key={audit.id}>
              <Link to={`/audit/${audit.id}`} className="block hover:bg-gray-700">
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-indigo-400 truncate">{audit.siteName}</p>
                      <p className="text-sm text-gray-400">ID: {audit.siteId}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {audit.status}
                    </p>
                    <p className="ml-2 text-sm text-gray-400">{audit.date}</p>
                    <ArrowRight className="ml-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuditList;