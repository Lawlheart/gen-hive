import React from 'react';
import { Journey, JourneyStatus } from '../types';
import { ChevronRight } from 'lucide-react';

interface JourneyListProps {
  journeys: Journey[];
  onSelectJourney: (journey: Journey) => void;
}

const JourneyList: React.FC<JourneyListProps> = ({ journeys, onSelectJourney }) => {
  const getStatusColor = (status: JourneyStatus) => {
    switch (status) {
      case JourneyStatus.Find:
        return 'bg-blue-900 text-blue-200';
      case JourneyStatus.Survey:
        return 'bg-green-900 text-green-200';
      case JourneyStatus.Pitch:
        return 'bg-yellow-900 text-yellow-200';
      case JourneyStatus.Audit:
        return 'bg-purple-900 text-purple-200';
      case JourneyStatus.Deck:
        return 'bg-pink-900 text-pink-200';
      case JourneyStatus.Presentation:
        return 'bg-red-900 text-red-200';
      default:
        return 'bg-gray-900 text-gray-200';
    }
  };

  return (
    <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-700">
        {journeys.map((journey) => (
          <li key={journey.id}>
            <button
              onClick={() => onSelectJourney(journey)}
              className="block hover:bg-gray-700 w-full text-left"
            >
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-indigo-400 truncate">
                    {journey.siteId}
                  </p>
                  <p className={`ml-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(journey.status)}`}>
                    {journey.status}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-400">
                    Next: {journey.nextStep}
                  </p>
                  <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JourneyList;