import { Journey, Site, JourneyStatus, SiteSize } from '../types';

// Mock data for journeys
export const mockJourneys: Journey[] = [
  {
    id: '1',
    status: JourneyStatus.Find,
    nextStep: JourneyStatus.Survey,
    siteId: '1',
    discoveredDate: new Date('2023-03-01'),
  },
  {
    id: '2',
    status: JourneyStatus.Survey,
    nextStep: JourneyStatus.Pitch,
    siteId: '2',
    discoveredDate: new Date('2023-03-05'),
    outreachDate: new Date('2023-03-10'),
  },
  {
    id: '3',
    status: JourneyStatus.Pitch,
    nextStep: JourneyStatus.Audit,
    siteId: '3',
    discoveredDate: new Date('2023-02-28'),
    outreachDate: new Date('2023-03-07'),
    followupDate: new Date('2023-03-15'),
  },
];

// Mock data for sites
export const mockSites: { [key: string]: Site } = {
  '1': {
    id: '1',
    link: 'https://example1.com',
    name: 'Example Site 1',
    details: 'An e-commerce website selling handmade crafts',
    fullMetaData: 'Full metadata for Example Site 1',
    size: SiteSize.Small,
    builtWith: ['React', 'Node.js', 'MongoDB'],
    companyName: 'Crafty Creations',
    companyDescription: 'A small business specializing in unique handmade items',
    contactName: 'Jane Doe',
    contactRole: 'Owner',
    contactMethod: 'Email',
    meetingNotes: '',
    email: 'jane@example1.com',
    phoneNumber: '+1 (555) 123-4567',
  },
  '2': {
    id: '2',
    link: 'https://example2.com',
    name: 'Example Site 2',
    details: 'A blog about sustainable living',
    fullMetaData: 'Full metadata for Example Site 2',
    size: SiteSize.Medium,
    builtWith: ['WordPress', 'PHP', 'MySQL'],
    companyName: 'Green Living Blog',
    companyDescription: 'A popular blog promoting eco-friendly lifestyle choices',
    contactName: 'John Smith',
    contactRole: 'Editor',
    contactMethod: 'Phone',
    meetingNotes: '',
    email: 'john@example2.com',
    phoneNumber: '+1 (555) 987-6543',
  },
  '3': {
    id: '3',
    link: 'https://example3.com',
    name: 'Example Site 3',
    details: 'A SaaS platform for project management',
    fullMetaData: 'Full metadata for Example Site 3',
    size: SiteSize.Large,
    builtWith: ['Angular', 'Django', 'PostgreSQL'],
    companyName: 'ProjectPro',
    companyDescription: 'A growing startup offering innovative project management solutions',
    contactName: 'Alice Johnson',
    contactRole: 'CTO',
    contactMethod: 'Email',
    meetingNotes: '',
    email: 'alice@example3.com',
    phoneNumber: '+1 (555) 246-8135',
  },
};