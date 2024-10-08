import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface AuditItem {
  question: string;
  type: 'yesno' | 'score' | 'priority';
  options?: string[];
}

interface AuditSection {
  title: string;
  description?: string;
  items: AuditItem[];
}

const firstImpressionsSections: AuditSection[] = [
  {
    title: 'First Impressions',
    description: 'Before we dive into the specifics of usability and accessibility, assess your first impression of the website by considering the following prompts.',
    items: [
      { question: 'Is it clear what purpose the website serves?', type: 'yesno' },
      { question: 'Is the visual design of the website aesthetically pleasing?', type: 'yesno' },
      { question: 'Does the website have a cohesive color scheme that is used across all pages of the site?', type: 'yesno' },
      { question: 'Do you feel like you have enough information to know what to do?', type: 'yesno' },
    ],
  },
  {
    title: 'Website Basics',
    items: [
      { question: 'Website has a Privacy Policy', type: 'yesno' },
      { question: 'Website has Terms and Conditions', type: 'yesno' },
      { question: 'Website has an Accessibility Statement', type: 'yesno' },
      { question: 'Website has a Cookie Policy and Consent Notification', type: 'yesno' },
      { question: 'Website has a Data Storage Disclosure', type: 'yesno' },
      { question: 'Website has a Copyright Notification', type: 'yesno' },
      { question: 'Website is using HTTPS (essential if ecommerce)', type: 'yesno' },
    ],
  },
];

const basicAccessibilitySection: AuditSection = {
  title: 'Basic Accessibility',
  description: 'Accessibility scores measure how easily a website is to use for people with disabilities of all kinds. This quick review will allow you to find the most common WCAG failures according to the WebAIM 1 Million Study https://webaim.org/projects/million',
  items: [
    { question: 'A "skip link" is provided as the very top of the page, and is revealed on focus.', type: 'score' },
    { question: 'Target areas and calls to action are set to be at least 44x44 pixels.', type: 'score' },
    { question: 'Large text (24px and larger) has a contrast ratio of text at least 3:1', type: 'score' },
    { question: 'Body and other small text (<24px) has a contrast ratio of at least 4.5:1', type: 'score' },
    { question: 'Link text copy is assigned a contrast of at least 3:1 against its surrounding text.', type: 'score' },
    { question: 'Images do not have text embedded in them.', type: 'score' },
    { question: 'Informative images are provided with meaningful alt text describing their content.', type: 'score' },
    { question: 'Active images are provided with meaningful alt text describing their purpose.', type: 'score' },
    { question: 'Decorative images identified so they can be ignored by assistive technologies.', type: 'score' },
    { question: 'Complex images are given alt text and an extended full text description.', type: 'score' },
    { question: 'Form controls (inputs) are assigned a visible, meaningful text label.', type: 'score' },
    { question: 'Field labels are left-justified and to the left of the field, or above.', type: 'score' },
    { question: 'Required fields are identified as such in the label text.', type: 'score' },
    { question: 'Links\' purpose may be discerned from link text alone, or their immediate context.', type: 'score' },
    { question: 'Links are visually distinct from surrounding text, and not just by color alone.', type: 'score' },
    { question: 'Buttons have visible text labels or ARIA-labels', type: 'score' },
    { question: 'Document type is specified.', type: 'score' },
    { question: 'Changes in language within the page are specified for assistive technologies.', type: 'score' },
  ],
};

const AuditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [auditResponses, setAuditResponses] = useState<{ [key: string]: any }>({});
  const [auditInfo, setAuditInfo] = useState<{ siteName: string; date: string } | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the audit data based on the id
    // For now, we'll just set some mock data
    setAuditInfo({
      siteName: `Example Site ${id}`,
      date: new Date().toISOString().split('T')[0],
    });
  }, [id]);

  const handleInputChange = (question: string, field: string, value: string) => {
    setAuditResponses(prev => ({
      ...prev,
      [question]: {
        ...prev[question],
        [field]: value
      }
    }));
  };

  const renderAuditItem = (item: AuditItem, section: string) => {
    const response = auditResponses[item.question] || {};

    return (
      <div key={item.question} className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h4 className="text-lg font-semibold mb-2">{item.question}</h4>
        {section === 'First Impressions' && (
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Response:</label>
            <div className="flex space-x-4">
              {['yes', 'no', 'other'].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600"
                    name={`${item.question}-response`}
                    value={option}
                    checked={response.response === option}
                    onChange={(e) => handleInputChange(item.question, 'response', e.target.value)}
                  />
                  <span className="ml-2 capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {section === 'Basic Accessibility' && (
          <>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Score:</label>
              <select
                className="w-full rounded-md bg-gray-700 border-gray-600 text-white"
                value={response.score || ''}
                onChange={(e) => handleInputChange(item.question, 'score', e.target.value)}
              >
                <option value="">Select a score</option>
                {['always', 'usually', 'sometimes', 'rarely', 'never', 'n/a'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Priority:</label>
              <select
                className="w-full rounded-md bg-gray-700 border-gray-600 text-white"
                value={response.priority || ''}
                onChange={(e) => handleInputChange(item.question, 'priority', e.target.value)}
              >
                <option value="">Select priority</option>
                {['critical', 'major', 'medium', 'low', 'not a priority'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Comments:</label>
          <textarea
            className="w-full rounded-md bg-gray-700 border-gray-600 text-white"
            value={response.comments || ''}
            onChange={(e) => handleInputChange(item.question, 'comments', e.target.value)}
            rows={3}
          />
        </div>
        {section === 'Basic Accessibility' && (
          <div>
            <label className="block text-sm font-medium mb-1">Issue(s):</label>
            <textarea
              className="w-full rounded-md bg-gray-700 border-gray-600 text-white"
              value={response.issues || ''}
              onChange={(e) => handleInputChange(item.question, 'issues', e.target.value)}
              rows={3}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-2">Website Audit</h1>
      {auditInfo && (
        <div className="mb-6 text-gray-300">
          <p>Site: {auditInfo.siteName}</p>
          <p>Date: {auditInfo.date}</p>
        </div>
      )}
      {[...firstImpressionsSections, basicAccessibilitySection].map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          {section.description && <p className="mb-4 text-gray-300">{section.description}</p>}
          <div className="space-y-4">
            {section.items.map((item) => renderAuditItem(item, section.title))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuditPage;