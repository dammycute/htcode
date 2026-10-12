import projects from '@/data/work-projects.json';

export const site = {
  name: 'Damilola Olawoore',
  brand: 'Ht-code',
  location: 'Ibadan, Nigeria',
  email: 'damilolaolawoore03@gmail.com',
  resume: '/Damilola-Olawoore-Resume.pdf',
  colorFlood: 'https://color-fill-game.vercel.app',
  photo: '/me-studio.jpg',
  socials: [
    { label: 'GitHub', href: 'https://github.com/dammycute' },
    { label: 'X', href: 'https://x.com/ht__code' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/htcode/' },
  ],
};

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'capabilities', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const experience = [
  {
    role: 'Software Developer',
    company: 'CVtoCareer',
    dates: 'Jul 2026 – Present',
    place: 'Remote',
    points: [
      'Built an AI job classification pipeline (Llama 3.3 70B on DigitalOcean Gradient) that scores jobs as HQA, MQA or LQA, with a resumable backfill script and Slack approval for MQA jobs.',
      'Delivered the Missing Info feature end to end: staff backend, expiry cron job, audit trail on every lifecycle action and the customer review flow.',
      'Strengthened PII handling with hash-based email and phone lookups across both backends, and fixed a Sequelize hook that left encrypted fields null after updates.',
      'Built CEC tracking models, routes and admin components with role-based routing; added PayPal payment refresh and CV upload follow-up emails.',
    ],
  },
  {
    role: 'Freelance Software Developer',
    company: 'Kreva & Co.',
    dates: 'Jan 2026 – Present',
    place: 'United Kingdom',
    points: [
      'Build responsive, SEO-optimised websites and content-managed applications with Next.js, React and MongoDB.',
      'Delivered the Egmos Montessori School platform, with a JWT-secured admin dashboard, and the RCCG Providence Centre church management system.',
    ],
  },
  {
    role: 'Backend Developer (Freelance)',
    company: 'Flash',
    dates: 'Jul 2025 – Feb 2026',
    place: 'Remote',
    points: [
      'Built the backend for a multi-chain crypto wallet supporting Ethereum, BSC, Solana and Bitcoin.',
      'Developed transaction broadcasting and reconciliation with real-time status tracking on Celery and Redis.',
    ],
  },
  {
    role: 'Backend Developer Intern',
    company: 'Techies Collab',
    dates: 'Aug 2024 – Oct 2024',
    place: 'Remote',
    points: [
      'Built the backend for a B2B marketplace: REST APIs for authentication, products, cart and vendor dashboards.',
      'Integrated Paystack payments and JWT authentication in a five-developer Agile team.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'RealOwn Realty',
    dates: 'Oct 2022 – Dec 2023',
    place: 'Remote',
    points: [
      'Built a custom analytics dashboard with real-time visualisation of user engagement.',
      'Optimised 15+ responsive components for a 95+ PageSpeed score, and refactored 12+ with React hooks, cutting page load times by 28%.',
    ],
  },
  {
    role: 'Full Stack Intern',
    company: 'Zuri Team',
    dates: 'May 2022 – Aug 2022',
    place: 'Remote',
    points: [
      'Built a content management system with an analytics dashboard and an interactive learning platform.',
      'Implemented JWT authentication and CDN-backed media storage, reducing login response times by 60%.',
    ],
  },
];

export const capabilities = [
  { title: 'Languages', body: 'TypeScript and JavaScript across the stack, Python for backend work.', items: ['TypeScript', 'JavaScript', 'Python'] },
  { title: 'Backend', body: 'APIs, background jobs and real-time services in Node and Django.', items: ['Node.js', 'Express', 'Django', 'DRF', 'Celery', 'BullMQ', 'Socket.IO'] },
  { title: 'Frontend and data', body: 'App Router interfaces on top of relational and document stores.', items: ['Next.js', 'React', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { title: 'Security and AI', body: 'Protecting personal data, and putting LLM classification to work.', items: ['JWT', 'AES-256-GCM', 'PII encryption', 'LLM classification', 'Prompt engineering'] },
  { title: 'Tools and APIs', body: 'Shipping and integrating with the services around the code.', items: ['Git', 'Docker', 'Vercel', 'DigitalOcean', 'PayPal', 'Paystack', 'Slack API'] },
];

export function getProjects() {
  return projects.map((p) => ({ ...p, slug: p.id }));
}

export function getProject(slug) {
  return getProjects().find((p) => p.slug === slug);
}

export function hasCaseStudy(p) {
  return Boolean(p.caseStudy);
}
