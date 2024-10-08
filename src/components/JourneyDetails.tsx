import React from 'react';
import { Journey, Site } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';

interface JourneyDetailsProps {
  journey: Journey;
  site: Site;
}

const JourneyDetails: React.FC<JourneyDetailsProps> = ({ journey, site }) => {
  return (
    <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-100">Journey Details</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-300">Overview of the current journey status.</p>
      </div>
      <div className="border-t border-gray-700 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-700">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400">Site</dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">{site.name}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400">Current Status</dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2 flex items-center">
              <span className="mr-2">{journey.status}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="ml-2">{journey.nextStep}</span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400 flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Key Dates
            </dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              <p>Discovered: {journey.discoveredDate.toLocaleDateString()}</p>
              {journey.outreachDate && <p>Outreach: {journey.outreachDate.toLocaleDateString()}</p>}
              {journey.followupDate && <p>Follow-up: {journey.followupDate.toLocaleDateString()}</p>}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default JourneyDetails;