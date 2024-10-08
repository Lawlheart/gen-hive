import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Journey, Site } from './types';
import JourneyList from './components/JourneyList';
import JourneyDetails from './components/JourneyDetails';
import SiteDetails from './components/SiteDetails';
import ImportData from './components/ImportData';
import ExportData from './components/ExportData';
import AuditPage from './components/AuditPage';
import AuditList from './components/AuditList';
import CreateAudit from './components/CreateAudit';
import { PlusCircle } from 'lucide-react';
import { mockJourneys, mockSites } from './mocks/mockData';

function App() {
  const [journeys, setJourneys] = useState<Journey[]>(mockJourneys);
  const [sites, setSites] = useState<{ [key: string]: Site }>(mockSites);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [showAudit, setShowAudit] = useState(false);

  const handleSelectJourney = (journey: Journey) => {
    setSelectedJourney(journey);
    setSelectedSite(sites[journey.siteId]);
    setShowAudit(false);
  };

  const handleImport = (
    importedSites: { [key: string]: Site },
    importedJourneys: Journey[]
  ) => {
    setSites((prevSites) => ({
      ...prevSites,
      ...importedSites,
    }));

    setJourneys((prevJourneys) => {
      const updatedJourneys = [...prevJourneys];
      importedJourneys.forEach((importedJourney) => {
        const existingIndex = updatedJourneys.findIndex(
          (j) => j.id === importedJourney.id
        );
        if (existingIndex !== -1) {
          updatedJourneys[existingIndex] = {
            ...updatedJourneys[existingIndex],
            ...importedJourney,
          };
        } else {
          updatedJourneys.push(importedJourney);
        }
      });
      return updatedJourneys;
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Toaster position="top-right" />
        <header className="bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-100">
              Journey - Audit Flow
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/audits" className="text-gray-300 hover:text-white">
                    Audits
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <div className="mb-6 flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Journeys</h2>
                      <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        New Journey
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <JourneyList
                          journeys={journeys}
                          onSelectJourney={handleSelectJourney}
                        />
                      </div>
                      <div>
                        {selectedJourney && selectedSite && (
                          <>
                            <JourneyDetails
                              journey={selectedJourney}
                              site={selectedSite}
                            />
                            <SiteDetails site={selectedSite} />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ImportData
                        onImport={handleImport}
                        existingSites={sites}
                        existingJourneys={journeys}
                      />
                      <ExportData sites={sites} journeys={journeys} />
                    </div>
                  </div>
                }
              />
              <Route path="/audits" element={<AuditList />} />
              <Route path="/audit/new" element={<CreateAudit />} />
              <Route path="/audit/:id" element={<AuditPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
