import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { Journey, Site } from '../types';

interface ImportDataProps {
  onImport: (sites: { [key: string]: Site }, journeys: Journey[]) => void;
  existingSites: { [key: string]: Site };
  existingJourneys: Journey[];
}

const ImportData: React.FC<ImportDataProps> = ({ onImport, existingSites, existingJourneys }) => {
  const [inputData, setInputData] = useState('');
  const [importType, setImportType] = useState<'json' | 'csv'>('json');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setInputData(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csvData: string): { sites: { [key: string]: Site }, journeys: Journey[] } => {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const sites: { [key: string]: Site } = {};
    const journeys: Journey[] = [];

    lines.slice(1).forEach(line => {
      const values = line.split(',').map(value => value.trim());
      const item: any = {};
      headers.forEach((header, index) => {
        item[header] = values[index];
      });

      if ('siteId' in item) {
        journeys.push(item as Journey);
      } else if ('id' in item) {
        sites[item.id] = item as Site;
      }
    });

    return { sites, journeys };
  };

  const parseData = () => {
    try {
      if (importType === 'json') {
        const data = JSON.parse(inputData);
        return {
          sites: data.sites.reduce((acc: { [key: string]: Site }, site: Site) => {
            acc[site.id] = site;
            return acc;
          }, {}),
          journeys: data.journeys || []
        };
      } else {
        return parseCSV(inputData);
      }
    } catch (error) {
      console.error('Error parsing data:', error);
      return { sites: {}, journeys: [] };
    }
  };

  const handleImport = () => {
    const { sites: importedSites, journeys: importedJourneys } = parseData();

    // Merge imported sites with existing sites
    const updatedSites = { ...existingSites };
    let newSitesCount = 0;
    let updatedSitesCount = 0;
    Object.entries(importedSites).forEach(([id, site]) => {
      if (id in updatedSites) {
        updatedSites[id] = { ...updatedSites[id], ...site };
        updatedSitesCount++;
      } else {
        updatedSites[id] = site;
        newSitesCount++;
      }
    });

    // Merge imported journeys with existing journeys
    const updatedJourneys = [...existingJourneys];
    let newJourneysCount = 0;
    let updatedJourneysCount = 0;
    importedJourneys.forEach(importedJourney => {
      const existingIndex = updatedJourneys.findIndex(j => j.id === importedJourney.id);
      if (existingIndex !== -1) {
        updatedJourneys[existingIndex] = { ...updatedJourneys[existingIndex], ...importedJourney };
        updatedJourneysCount++;
      } else {
        updatedJourneys.push(importedJourney);
        newJourneysCount++;
      }
    });

    onImport(updatedSites, updatedJourneys);
    setInputData('');

    // Show toast message with import summary
    toast.success(
      <div>
        <p>Import successful!</p>
        <p>Sites: {newSitesCount} new, {updatedSitesCount} updated</p>
        <p>Journeys: {newJourneysCount} new, {updatedJourneysCount} updated</p>
      </div>,
      { duration: 5000 }
    );
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Import Data</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Import Type</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="importType"
              value="json"
              checked={importType === 'json'}
              onChange={() => setImportType('json')}
            />
            <span className="ml-2">JSON</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="importType"
              value="csv"
              checked={importType === 'csv'}
              onChange={() => setImportType('csv')}
            />
            <span className="ml-2">CSV</span>
          </label>
        </div>
      </div>
      <textarea
        className="w-full h-40 p-2 text-gray-900 bg-gray-100 rounded"
        placeholder={`Paste your ${importType.toUpperCase()} data here...`}
        value={inputData}
        onChange={handleInputChange}
      />
      <div className="mt-4 flex justify-between items-center">
        <label className="flex items-center px-4 py-2 bg-gray-700 text-white rounded cursor-pointer hover:bg-gray-600">
          <Upload className="mr-2 h-5 w-5" />
          Upload File
          <input
            type="file"
            className="hidden"
            accept={importType === 'json' ? '.json' : '.csv'}
            onChange={handleFileUpload}
          />
        </label>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={handleImport}
        >
          <FileText className="inline-block mr-2 h-5 w-5" />
          Import Data
        </button>
      </div>
    </div>
  );
};

export default ImportData;