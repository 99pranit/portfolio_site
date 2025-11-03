export const roles = [
  'Data Scientist',
  'AI Engineer',
  'ML Engineer',
  'Data Engineer',
  'Problem Solver'
];

export const stats = [
  { label: 'Projects Completed', value: 15, suffix: '+' },
  { label: 'Technologies', value: 20, suffix: '+' },
  { label: 'Client Satisfaction', value: 95, suffix: '%' },
  { label: 'Years Experience', value: 3, suffix: '+' }
];

export const experience = [
  {
    title: 'Analyst - Data Engineer',
    company: 'Mathco',
    location: 'Bengaluru, KN',
    period: 'June 2022 – Oct 2023',
    achievements: [
      'Built sales dashboard on Tableau, improving team performance by 20%',
      'Designed ETL pipeline architecture for multiple data sources',
      'Led client calls and delivered technical presentations',
      'Developed GCP cluster recommendation tool'
    ],
    tech: ['Tableau', 'GCP', 'ETL', 'Python']
  },
  {
    title: 'Analyst Intern',
    company: 'Mathco',
    location: 'Bengaluru, KN',
    period: 'Jan 2022 – June 2022',
    achievements: [
      'Customer segmentation for credit card sales leads',
      'EDA on customer demographics and spending patterns',
      'Built KPI dashboard on Co.dx platform'
    ],
    tech: ['Python', 'Data Analysis', 'Visualization']
  }
];

export const projects = [
  {
    title: 'Multi-Prompt Technique Ensemble',
    category: 'AI/ML',
    tag: 'AI in Education',
    period: 'Mar 2025 – Oct 2025',
    tech: ['Python', 'TensorFlow', 'Hugging Face', 'LLM'],
    description: "Context-aware framework with role-based reasoning to classify questions into Bloom's Taxonomy levels",
    metrics: [
      { label: 'Accuracy', value: 79 },
      { label: 'F1 Score', value: 77 }
    ],
    status: 'Publication Accepted',
    color: 'from-cyan-500 to-blue-500',
    github: 'https://github.com/pranitdas/multi-prompt-ensemble'
  },
  {
    title: 'Human Activity Detection',
    category: 'IoT',
    tag: 'Smart Device',
    period: 'Mar 2025 – Apr 2025',
    tech: ['Python', 'TensorFlow', 'TinyML', 'IoT'],
    description: 'Hierarchical classification model using GY-91 sensor and ESP32-S3 for real-time activity recognition',
    metrics: [
      { label: 'Accuracy', value: 92 },
      { label: 'Categories', value: 7 }
    ],
    color: 'from-purple-500 to-pink-500',
    github: 'https://github.com/pranitdas/human-activity-detection'
  }
];

export const projectCategories = ['all', 'AI/ML', 'IoT'];

export const skillLevels = [
  { name: 'Python', level: 95 },
  { name: 'Machine Learning', level: 90 },
  { name: 'Deep Learning', level: 85 },
  { name: 'Data Engineering', level: 88 },
  { name: 'SQL & Databases', level: 90 },
  { name: 'Cloud (GCP)', level: 82 }
];

export const softSkills = [
  { name: 'Leadership', icon: 'Users', color: 'cyan' },
  { name: 'Problem-Solving', icon: 'Lightbulb', color: 'purple' },
  { name: 'Innovation', icon: 'Sparkles', color: 'pink' },
  { name: 'Storytelling', icon: 'Terminal', color: 'cyan' },
  { name: 'Teamwork', icon: 'Users', color: 'purple' },
  { name: 'Quick Learning', icon: 'Target', color: 'pink' }
];
