import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { Journey, Site } from '../types';

interface ExportDataProps {
  sites: { [key: string]: Site };
  journeys: Journey[];
}

const ExportData: React.FC<ExportDataProps> = ({ sites, journeys }) => {
  const [exportType, setExportType] = useState<'json' | 'csv'>('json');

  const prepareData = () => {
    return {
      sites: Object.values(sites),
      journeys,
    };
  };

  const exportJSON = () => {
    const data = prepareData();
    const jsonString = JSON.stringify(data, null, 2);
    downloadFile(jsonString, 'journey_audit_data.json', 'application/json');
  };

  const exportCSV = () => {
    const data = prepareData();
    let csvContent = '';

    // Sites CSV
    if (data.sites.length > 0) {
      const siteHeaders = Object.keys(data.sites[0]).join(',');
      csvContent += 'Sites\n' + siteHeaders + '\n';
      data.sites.forEach((site) => {
        const row = Object.values(site).map(value => `"${value}"`).join(',');
        csvContent += row + '\n';
      });
      csvContent += '\n';
    }

    // Journeys CSV
    if (data.journeys.length > 0) {
      const journeyHeaders = Object.keys(data.journeys[0]).join(',');
      csvContent += 'Journeys\n' + journeyHeaders + '\n';
      data.journeys.forEach((journey) => {
        const row = Object.values(journey).map(value => `"${value}"`).join(',');
        csvContent += row + '\n';
      });
    }

    downloadFile(csvContent, 'journey_audit_data.csv', 'text/csv');
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (exportType === 'json') {
      exportJSON();
    } else {
      exportCSV();
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Export Data</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Export Type</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="exportType"
              value="json"
              checked={exportType === 'json'}
              onChange={() => setExportType('json')}
            />
            <span className="ml-2">JSON</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="exportType"
              value="csv"
              checked={exportType === 'csv'}
              onChange={() => setExportType('csv')}
            />
            <span className="ml-2">CSV</span>
          </label>
        </div>
      </div>
      <button
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={handleExport}
      >
        <Download className="mr-2 h-5 w-5" />
        Export {exportType.toUpperCase()}
      </button>
    </div>
  );
};

export default ExportData;