import certCloudLeader from '../../assets/certificates/cert-google-cloud-leader.png';
import certHackSprint from '../../assets/certificates/cert-google-hacksprint.png';
import certAiBootcamp from '../../assets/certificates/cert-ai-bootcamp.jpeg';
import qurooCert from '../../assets/certificates/quroo-intenship.png';
import conestaCert from '../../assets/certificates/conestra.jpg';

export const CERTS = [
  {
    image: certCloudLeader,
    title: 'Cloud Digital Leader',
    issuer: 'Google Cloud',
    date: 'May 09, 2026',
    expires: 'May 09, 2029',
    type: 'Certification',
    featured: true,
    verifyUrl: 'https://www.credly.com/badges/4a2d8b20-dc1e-4c48-8a27-d081d650e420',
  },
  {
    image: certHackSprint,
    title: 'Digital Campus 2.0 on Google Cloud',
    subtitle: 'HackSprint · #G-K Hacks 2025',
    issuer: 'Google Cloud × Karunya University',
    date: '2025',
    type: 'Participation',
  },
  {
    image: certAiBootcamp,
    title: '3-Day AI Innovation Bootcamp',
    subtitle: '24-Hour Aurelion Hackathon',
    issuer: 'Karunya University · IEEE · ACM',
    date: 'Feb 26–28, 2026',
    type: 'Participation',
    sponsors: 'Eleven Labs × featherless.ai',
  },
  {
    image: qurooCert,
    title: 'Full Stack Development Internship',
    subtitle: 'Offline Internship · Jun 2026',
    issuer: 'QAROO India Pvt. Ltd.',
    date: 'June 01–20, 2026',
    type: 'Internship',
    location: 'Coimbatore',
    featured: false,
    verifyUrl: null,
  },
  {
    image: conestaCert,
    title: 'Conesta Forge — 5-Day AI Build Sprint',
    subtitle: 'Built & Shipped: Recipe Remixer',
    issuer: 'Conesta · Powered by Fludigo',
    date: 'June 26, 2026',
    type: 'Achievement',
    certId: 'CNST-FORGE-1BZMN',
    score: '2,207',
    rank: '#5',
    featured: false,
    verifyUrl: null,
  },
];

export const cameraFocusPoints = [
  { pos: [0, -0.3, 0], cam: [0, 0, 2.5], lookAt: [0, 0, 0] },
  { pos: [4, -0.3, -4], cam: [4, 0, -1.5], lookAt: [4, 0, -4] },
  { pos: [-4, -0.3, -8], cam: [-4, 0, -5.5], lookAt: [-4, 0, -8] },
  { pos: [3, -0.3, -12], cam: [3, 0, -9.5], lookAt: [3, 0, -12] },
  { pos: [-3, -0.3, -16], cam: [-3, 0, -13.5], lookAt: [-3, 0, -16] },
];
