import React from 'react';
import { Site, SiteSize } from '../types';
import { Globe, Users, Phone, Mail, FileText } from 'lucide-react';

interface SiteDetailsProps {
  site: Site;
}

const SiteDetails: React.FC<SiteDetailsProps> = ({ site }) => {
  const getSizeLabel = (size: SiteSize) => {
    switch (size) {
      case SiteSize.Small:
        return 'Small';
      case SiteSize.Medium:
        return 'Medium';
      case SiteSize.Large:
        return 'Large';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-100">{site.name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-300">{site.details}</p>
      </div>
      <div className="border-t border-gray-700 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-700">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400 flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Website
            </dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              <a href={site.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">
                {site.link}
              </a>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Company
            </dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              {site.companyName}
              <p className="text-gray-400 mt-1">{site.companyDescription}</p>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400">Contact</dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              <p>{site.contactName} ({site.contactRole})</p>
              <p className="flex items-center mt-1">
                <Phone className="mr-2 h-4 w-4" />
                {site.phoneNumber}
              </p>
              <p className="flex items-center mt-1">
                <Mail className="mr-2 h-4 w-4" />
                <a href={`mailto:${site.email}`} className="text-indigo-400 hover:text-indigo-300">
                  {site.email}
                </a>
              </p>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400">Size</dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              {getSizeLabel(site.size)}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400">Built With</dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              <ul className="flex flex-wrap gap-2">
                {site.builtWith.map((tech, index) => (
                  <li key={index} className="bg-gray-700 px-2 py-1 rounded-md text-xs">
                    {tech}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400 flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Full Metadata
            </dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              <pre className="whitespace-pre-wrap bg-gray-900 p-2 rounded-md">
                {site.fullMetaData}
              </pre>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default SiteDetails;