export interface HubConfig {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features?: string[] | Array<{ icon: string; text: string }>;
  badges?: string[];
  gradient: string;
  bgGradient?: string;
  textColor: string;
  large?: boolean;
}

export interface BoardConfig {
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
}

export interface SecurityFeature {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  gradient: string;
}

export interface HeroWord {
  word: string;
  image: string;
  color: string;
}

export interface FeatureConfig {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export const siteConfig = {
  siteName: 'Dockly',
  logo: {
    src: '/dockly-logo.png',
    alt: 'Dockly Logo',
  },

  // Header Configuration
  header: {
    menus: [
      {
        key: 'howItWorks',
        label: 'How it Works',
        subMenu: [
          { key: 'hubs', label: 'Hubs', sectionId: 'hubs' },
          { key: 'boards', label: 'Boards', sectionId: 'boards' },
        ],
      },
      { key: 'security', label: 'Security', sectionId: 'security' },
      { key: 'pricing', label: 'Pricing', sectionId: 'pricing' },
      { key: 'faqs', label: 'FAQs', sectionId: 'faqs' },
    ],
    buttons: {
      waitlist: 'Join the Waitlist',
    },
  },

  // Hero Section Configuration
  hero: {
    title: 'Organize Your',
    cycleWords: [
      { word: 'Family', image: '/family.jpg', color: '#ec4899' },
      { word: 'Finance', image: '/finance.jpg', color: '#3b82f6' },
      { word: 'Home', image: '/home.jpg', color: '#10b981' },
      { word: 'Health', image: '/health.jpg', color: '#ef4444' },
      {
        word: 'Digital Life',
        image: '/planner.jpg',
        color: '#8b5cf6',
      },
    ],
    subtitle:
      'Connect and manage everything that matters - from calendars and finances to family planning and personal projects. Dockly brings it all together in one beautiful, intelligent workspace.',
    emailPlaceholder: 'Enter your email address',
    waitlistButton: 'Join the Waitlist',
    features: [
      {
        text: 'Get 25% off if you join waitlist',
        icon: 'Percent',
        color: '#f59e0b',
      },
      { text: 'Bank level security', icon: 'Shield', color: '#3b82f6' },
      { text: 'Auto sync everywhere', icon: 'RotateCcw', color: '#06b6d4' },
    ],
  },

  // Features Section Configuration
  features: {
    title: 'Everything You Need, Beautifully Connected',
    subtitle:
      'Dockly consists of 4 powerful Hubs for core management and 5 specialized Boards for contextual organization. Your digital life, finally organized.',
    items: [
      {
        icon: 'Link',
        title: 'Connect Everything',
        description:
          'Link all your accounts, files, and services in one secure place',
        gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      },
      {
        icon: 'Brain',
        title: 'Smart Organization',
        description:
          'AI-powered insights and suggestions to keep you organized',
        gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
      },
      {
        icon: 'Users',
        title: 'Seamless Management',
        description:
          'Built for individuals and families to collaborate seamlessly',
        gradient: 'linear-gradient(135deg, #10b981, #fbbf24)',
      },
    ],
  },

  // Video Section
  video: {
    title: 'See Dockly in Action',
    subtitle: 'Watch how Dockly transforms your digital organization',
    youtubeId: '4NRXx6U8ABQ',
    thumbnailText: 'Play Demo Video',
    thumbnailImage: '/dashboard.jpg',
  },

  // Hubs Configuration
  hubs: {
    title: '5 Powerful Hubs',
    subtitle:
      'Centralized utilities that bring all your essential tools together',
    items: [
      {
        icon: 'BarChart3',
        title: 'Dashboard',
        subtitle: 'Your Command Center',
        description:
          'Get a complete snapshot of your digital life with customizable widgets, quick actions, and intelligent alerts. Your personal mission control for daily management and engagement.',
        features: ['Quick Actions', 'Smart Alerts', 'Customizable'],
        gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        bgGradient: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
        textColor: '#2563eb',
        image: '/dashboard1.jpg',
        large: true,
      },
      {
        icon: 'Calendar',
        title: 'Planner',
        subtitle: 'Calendar & To-dos',
        description:
          'Unified calendar and to-do system for personal, family, and work life with natural language input.',
        features: [
          { icon: 'CheckCircle', text: 'Multi-calendar sync' },
          { icon: 'CheckCircle', text: 'Smart task creation' },
        ],
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
        textColor: '#059669',
      },
      {
        icon: 'StickyNote',
        title: 'Notes',
        subtitle: 'Notes & Ideas',
        description:
          'Capture thoughts, ideas, and important information with rich formatting and smart organization.',
        badges: ['Rich Text', 'Tags', 'Search'],
        gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        textColor: '#7c3aed',
      },
      {
        icon: 'FolderOpen',
        title: 'Files',
        subtitle: 'Documents & Storage',
        description:
          'Central repository for all important documents, synced from cloud storage or uploaded directly.',
        features: [
          { icon: 'Cloud', text: 'Cloud sync' },
          { icon: 'Search', text: 'Smart search' },
        ],
        gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
        textColor: '#2563eb',
      },
      {
        icon: 'BookOpen',
        title: 'Accounts',
        subtitle: 'Bookmarks & Vaults',
        description:
          'Organize all your frequently used bookmarks and secure vault access for instant retrieval.',
        features: [
          { icon: 'Bookmark', text: 'Smart bookmarks' },
          { icon: 'Lock', text: 'Secure vault' },
        ],
        gradient: 'linear-gradient(135deg, #ef4444, #ec4899)',
        textColor: '#dc2626',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions',
    subtitle: 'Get instant answers to common questions...',
    items: [
      {
        question: 'What is Dockly and how does it work?',
        answer: 'Dockly is an all-in-one workspace...',
      },
    ],
  },
  // Boards Configuration
  boards: {
    title: '4 Specialized Hubs',
    subtitle:
      'Domain-specific workspaces tailored for different aspects of your life',
    items: [
      {
        icon: 'Heart',
        title: 'Family',
        description:
          'Shared planning, family calendar, digital legacy, and collaborative tools for the whole family.',
        features: [
          'Family calendar & events',
          'Shared tasks & chores',
          'Digital legacy planning',
          'Important contacts',
        ],
        gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        bgGradient: 'linear-gradient(135deg, #fdf2f8, #fef7f7)',
        borderColor: '#fce7f3',
        textColor: '#db2777',
        image: '/family.jpg',
      },
      {
        icon: 'Home',
        title: 'Home',
        description:
          'Property management, maintenance, assets, and everything related to your home and belongings.',
        features: [
          'Property information',
          'Home maintenance',
          'Insurance & utilities',
          'Assets & equipment',
        ],
        gradient: 'linear-gradient(135deg, #10b981, #059669)',
        bgGradient: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)',
        borderColor: '#d1fae5',
        textColor: '#059669',
        image: '/family.jpg',
      },
      {
        icon: 'TrendingUp',
        title: 'Finance',
        description:
          'Complete financial dashboard with account consolidation, budgeting, and savings goals.',
        features: [
          'Account overview',
          'Budget management',
          'Savings goals',
          'Transaction tracking',
        ],
        gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
        bgGradient: 'linear-gradient(135deg, #eff6ff, #eef2ff)',
        borderColor: '#dbeafe',
        textColor: '#2563eb',
        image: '/family.jpg',
      },
      {
        icon: 'Activity',
        title: 'Health',
        description:
          'Health tracking, medical records, appointments, and wellness goals for you and your family.',
        features: [
          'Health tracking',
          'Medical records',
          'Appointment scheduling',
          'Wellness goals',
        ],
        gradient: 'linear-gradient(135deg, #ef4444, #ec4899)',
        bgGradient: 'linear-gradient(135deg, #fef2f2, #fdf2f8)',
        borderColor: '#fecaca',
        textColor: '#dc2626',
        image: '/family.jpg',
      },
    ],
  },

  // Security Section
  security: {
    title: 'Security Without Compromise',
    subtitle:
      'Dockly connects your digital life without storing your sensitive information.',
    features: [
      {
        icon: 'Lock',
        title: 'Passwordless Authentication',
        description:
          'Secure access using email and phone OTP verification instead of traditional passwords. We leverage the latest in multi-factor authentication technology.',
      },
      {
        icon: 'ShieldX',
        title: 'No Sensitive Storage',
        description:
          "We don't store your passwords—we connect to your existing password manager. Your sensitive data stays securely where it belongs while remaining accessible.",
      },
      {
        icon: 'Key',
        title: 'End-to-End Encryption',
        description:
          'Your data is encrypted in transit and at rest for maximum security. We use industry-standard protocols to ensure your information remains private.',
      },
    ],
  },

  // Pricing Section
  pricing: {
    title: 'Your first week is on us',
    subtitle:
      'Dockly is your home base for digital clarity. See and manage your life, all in one place, and make plans you can feel good about.',
    subtext: 'All for less than two cups of coffee per month.',
    guaranteeText: '7-day free trial • Cancel anytime • No hidden fees',
    plans: [
      {
        name: 'Monthly',
        description: 'Perfect for trying out Dockly',
        price: '$12.99',
        period: 'USD/month',
        features: [
          'All Hubs & Boards',
          'Unlimited connections',
          'Priority support',
          'Mobile & web access',
        ],
        buttonText: 'Start Free Trial',
        billingNote: 'Billed $99.99 yearly*',
        gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      },
      {
        name: 'Yearly',
        description: 'Best value - save 25%',
        price: '$8.33',
        period: 'USD/month',
        features: [
          'All Monthly features',
          '25% discount',
          'Early access to new features',
          'Premium integrations',
        ],
        buttonText: 'Sign up',
        billingNote: 'Billed $99.99 yearly*',
        popular: true,
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
      },
    ],
    features: [
      {
        icon: 'Link',
        title: 'Connect & Manage',
        desc: 'Bring everything together into one smart hub.',
        color: 'linear-gradient(135deg, #e0f2fe, #dbeafe)',
      },
      {
        icon: 'Users',
        title: 'Family & Legacy',
        desc: 'Keep key family info secure & shareable.',
        color: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
      },
      {
        icon: 'Home',
        title: 'Home & Property',
        desc: 'Track maintenance, providers & warranties.',
        color: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
      },
      {
        icon: 'Heart',
        title: 'Health & Wellness',
        desc: 'Manage health info, insurance & wellness plans.',
        color: 'linear-gradient(135deg, #fee2e2, #fecaca)',
      },
      {
        icon: 'DollarSign',
        title: 'Finances',
        desc: 'Get clarity on accounts, bills & documents.',
        color: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      },
      {
        icon: 'Calendar',
        title: 'Planner',
        desc: 'Manage your digital life with tasks & schedules.',
        color: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
      },
    ],
    taxNote: 'plus tax where applicable',
  },

  // CTA Section
  cta: {
    title: 'Ready to Get Organized?',
    subtitle:
      'Start your journey to a more organized digital life. Connect your accounts, set up your hubs, and customize your boards.',
    steps: [
      {
        number: '1',
        title: 'Connect Your Life',
        description:
          'Link your calendars, accounts, files, and password managers securely',
      },
      {
        number: '2',
        title: 'Customize Your Space',
        description:
          'Set up your hubs and boards to match your lifestyle and priorities',
      },
      {
        number: '3',
        title: 'Stay Organized',
        description:
          'Enjoy intelligent insights and seamless organization across all your devices',
      },
    ],
    buttons: {
      primary: 'Start Free Trial',
      secondary: 'Book Demo',
    },
  },

  // Footer Configuration
  footer: {
    description:
      'Organize your digital life in one beautiful, intelligent workspace.',
    links: {
      Product: ['Features', 'Pricing', 'Security', 'Integrations'],
      Company: ['About', 'Blog', 'Careers', 'Contact'],
      Support: [
        'Help Center',
        'Privacy Policy',
        'Terms of Service',
        'API Docs',
      ],
    },
    copyright: '© 2025 Dockly. All rights reserved.',
    socialLinks: {
      twitter: '#',
      facebook: '#',
      pinterest: '#',
    },
  },
};
