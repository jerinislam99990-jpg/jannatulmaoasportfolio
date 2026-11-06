/* =====================================================================
   EDIT YOUR DETAILS HERE
   Every piece of copy, every photo and every link on the site lives in
   this file. Photos sit in /public/img and are served through the
   Netlify Image CDN (see src/lib/img.ts). `focus` is the CSS
   object-position used when a photo is cropped into a frame, so the
   important part of the picture (usually a face) always stays in view.
   ===================================================================== */

export type Photo = {
  src: string
  alt: string
  caption?: string
  /** object-position for cropping, e.g. "60% 35%" */
  focus?: string
  /** logos and certificates should never be cropped */
  contain?: boolean
}

export const profile = {
  name: 'Jannatul Maoa',
  firstName: 'Jannatul',
  lastName: 'Maoa',
  initials: 'JM',
  headline: 'Finance at Dhaka University · Leader · Pitch-stage storyteller',
  roles: [
    'Finance undergraduate',
    'Gen-Train 4.0 1st runner-up',
    'Aspire Leader, Cohort 3',
    'Community leader',
  ],
  intro:
    'I’m a BBA Finance student at the University of Dhaka, building a strong base in financial analysis, accounting and business decisions, and adding leadership and real-world operations to it.',
  email: 'jmaoa05@gmail.com',
  phone: '+880 1310-859499',
  phoneHref: 'tel:+8801310859499',
  linkedin: 'https://www.linkedin.com/in/jannatul-maoa-ab7498387/',
  location: 'Dhaka, Bangladesh',
  cv: '/docs/Jannatul-Maoa-CV.pdf',
  heroSketch: '/img/hero-sketch.png',
  heroInk: '/img/hero-ink.png',
}

export const about = {
  lede: 'I like numbers that explain something, teams that move together, and a stage where an idea has to win the room.',
  story: [
    'I’m a BBA student in Finance at the University of Dhaka with a 3.75 CGPA. My courses are building my base in financial analysis, accounting and business decision-making, and presenting in class has made me comfortable explaining numbers to people.',
    'Before university I led the Red Crescent Youth Club at Motijheel Ideal School & College as President, coordinating volunteer teams, running operations and driving community work. Since then I’ve run the online side of two fashion and lifestyle brands, managing orders, inventory and customer conversations, and I’ve joined the clubs that shape business life at Dhaka University.',
    'In October 2026 I pitched in the grand final of Gen-Train 4.0 by DUEDC and finished 1st runner-up. I’ve also completed Cohort 3 of the Aspire Leaders Program and was selected for the Jaago Women Scholarship Program.',
  ],
  value: [
    {
      k: '01',
      title: 'I read the numbers',
      text: 'Financial reporting and statistical interpretation from my Finance degree, backed by a 3.75 CGPA at the University of Dhaka.',
    },
    {
      k: '02',
      title: 'I keep operations moving',
      text: 'Over a year running orders, inventory and supplier coordination for two online brands, so nothing slipped between a customer’s message and the delivery.',
    },
    {
      k: '03',
      title: 'I lead people',
      text: 'President of a Red Crescent Youth Club at school, and now an executive in the Finance Club and DUEDC at Dhaka University.',
    },
    {
      k: '04',
      title: 'I pitch so people listen',
      text: 'A 1st runner-up finish in the Gen-Train 4.0 grand final, and the Aspire Leaders Program behind the way I frame a problem.',
    },
  ],
  howIWork: [
    ['Curious first', 'I ask what the numbers are really saying before I decide anything.'],
    ['Detail-minded', 'Orders, records and reports have to be right the first time.'],
    ['Team-first', 'I’ve led volunteers and worked in groups across every course.'],
    ['Clear speaker', 'I turn analysis into a story a room can follow.'],
  ] as const,
  skills: {
    technical: [
      'Financial Reporting',
      'Statistical Interpretation',
      'Marketing Strategy Basics',
      'Microsoft Excel',
      'Microsoft Word',
      'Microsoft PowerPoint',
      'Google Workspace',
      'CRM',
    ],
    soft: ['Communication', 'Teamwork', 'Leadership', 'Attention to Detail'],
  },
}

export const stats: Array<{ value: number; decimals?: number; prefix?: string; suffix?: string; label: string }> = [
  { value: 3.75, decimals: 2, label: 'CGPA in BBA Finance, University of Dhaka' },
  { value: 1, suffix: 'st', label: 'Runner-up at the Gen-Train 4.0 grand final' },
  { value: 15, suffix: ' mo', label: 'Running online storefronts for two brands' },
  { value: 5, label: 'Student organisations I’ve served in' },
]

export type Education = {
  org: string
  degree: string
  when: string
  score: string
  logo?: string
}

export const education: Education[] = [
  {
    org: 'University of Dhaka',
    degree: 'BBA in Finance',
    when: '2025 – Present',
    score: 'CGPA 3.75',
    logo: '/img/logo-du.jpg',
  },
  {
    org: 'Viqarunnisa Noon School & College',
    degree: 'Higher Secondary Certificate (HSC)',
    when: '2023 – 2024',
    score: 'GPA 4.92',
  },
  {
    org: 'Motijheel Ideal School & College',
    degree: 'Secondary School Certificate (SSC)',
    when: '2020 – 2022',
    score: 'GPA 5.00',
  },
]

export type Role = {
  id: string
  org: string
  role: string
  when: string
  summary: string
  points: string[]
  logo?: string
  logoBg?: string
  photos?: Photo[]
}

export const experience: Role[] = [
  {
    id: 'dominate-fashion',
    org: 'Dominate Fashion',
    role: 'Online Moderator',
    when: 'Feb 2025 – Nov 2025',
    summary:
      'Ran the online storefront of a fashion brand, from the first customer message to the order going out.',
    points: [
      'Managed incoming customer orders through social media, making sure each one was collected accurately and processed on time.',
      'Posted and curated product images to keep the brand’s page active and visually consistent.',
      'Tracked and updated inventory records so orders were fulfilled smoothly and stock stayed accurate.',
    ],
  },
  {
    id: 'pure-comfort',
    org: 'Pure Comfort',
    role: 'Online Moderator',
    when: 'Aug 2024 – Feb 2025',
    summary:
      'Looked after customers and orders for Pure Comfort across social media, working directly with the supplier.',
    points: [
      'Handled customer inquiries across social media with quick, professional replies.',
      'Boosted promotional posts to grow the brand’s reach and customer engagement.',
      'Collected and tracked incoming orders, coordinating directly with the supplier for accurate, on-time fulfilment.',
    ],
    logo: '/img/logo-pure-comfort.jpg',
  },
]

export const extracurricular: Role[] = [
  {
    id: 'finance-club',
    org: 'Dhaka University Finance Club',
    role: 'General Executive',
    when: 'Department of Finance, DU',
    summary:
      'The student club of the Department of Finance, where finance students build skills beyond the lecture hall through events, competitions and learning sessions such as FinQuest 2026.',
    points: [
      'Executive member of the club’s organising team.',
      'Part of the FinQuest 2026 team, with my own General Executive feature on the club’s page.',
    ],
    logo: '/img/logo-finance-club.jpg',
    photos: [
      {
        src: '/img/finquest-2026.jpg',
        alt: 'FinQuest 2026 poster featuring Jannatul Maoa as General Executive',
        caption: 'FinQuest 2026: my General Executive feature for the Finance Club.',
        focus: '50% 45%',
      },
    ],
  },
  {
    id: 'duedc',
    org: 'Dhaka University Entrepreneurship Development Club',
    role: 'Executive',
    when: 'DUEDC',
    summary:
      'DUEDC builds an entrepreneurial culture on campus through case competitions, capacity-building programs, workshops and networking with founders. Its Gen-Train program is where I pitched in the grand final.',
    points: [
      'Executive member of the club.',
      '1st runner-up at Gen-Train 4.0, DUEDC’s exclusive capacity-building program.',
    ],
    logo: '/img/logo-duedc.jpg',
    logoBg: '#4b1fa3',
    photos: [
      {
        src: '/img/gentrain-stage.jpg',
        alt: 'Jannatul on stage with the Gen-Train 4.0 1st runner-up board',
        caption: 'On stage at the Gen-Train 4.0 award ceremony.',
        focus: '52% 55%',
      },
    ],
  },
  {
    id: 'red-crescent',
    org: 'Red Crescent Youth Club, Motijheel Ideal School & College',
    role: 'President',
    when: 'Jan 2021 – Jan 2022',
    summary:
      'Led the school’s Red Crescent Youth unit under the Bangladesh Red Crescent Society, Dhaka City Unit.',
    points: [
      'Coordinated volunteer teams and managed the club’s day-to-day operations.',
      'Drove community initiatives with the Dhaka City Red Crescent Unit.',
      'Trained in Basic & First Aid (2018) and Basic Disaster Risk Management (2019).',
    ],
    photos: [
      {
        src: '/img/cert-rc-firstaid-2018.jpg',
        alt: 'Bangladesh Red Crescent Society certificate for Red Cross / Red Crescent Basic & First Aid Training, December 2018',
        caption: 'Red Cross / Red Crescent Basic & First Aid Training, 17–19 Dec 2018.',
        contain: true,
      },
      {
        src: '/img/cert-rc-disaster-2019.jpg',
        alt: 'Bangladesh Red Crescent Society certificate for Basic Disaster Risk Management Training, December 2019',
        caption: 'Basic Disaster Risk Management Training, 6–8 Dec 2019.',
        contain: true,
      },
    ],
  },
  {
    id: 'dumuna',
    org: 'Dhaka University Model United Nations Association',
    role: 'General Member',
    when: 'DUMUNA',
    summary:
      'The Model United Nations association of the University of Dhaka, where members debate global issues, practise diplomacy and run conferences.',
    points: ['General member of DUMUNA.'],
    logo: '/img/logo-dumuna.jpg',
  },
  {
    id: 'dot-initiative',
    org: 'Dot Initiative',
    role: 'General Member',
    when: 'Connecting Dots, Developing Futures',
    summary: 'Dot Initiative works under the idea of “Connecting Dots, Developing Futures”.',
    points: ['General member of the Dot Initiative.'],
    logo: '/img/logo-dot-initiative.jpg',
  },
]

export type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  text: string
  img: string
}

export const certifications: Certificate[] = [
  {
    id: 'gentrain',
    title: 'Gen-Train 4.0 · Certificate of Excellence, 1st Runner-up',
    issuer: 'Dhaka University Entrepreneurship Development Club',
    date: 'October 2026',
    text: 'Awarded for outstanding performance as 1st runner-up of Gen-Train 4.0, an exclusive capacity-building program, for creative and analytical skill in the grand-final pitch.',
    img: '/img/cert-gentrain.jpg',
  },
  {
    id: 'newbiesta',
    title: 'Newbiesta 6.0 · Certificate of Participation',
    issuer: 'Finance Club, Department of Finance, University of Dhaka',
    date: 'Finance Club, DU',
    text: 'Took part in Newbiesta 6.0, “Where Potential Meets Purpose”, the Finance Club’s program for new finance students.',
    img: '/img/cert-newbiesta.jpg',
  },
  {
    id: 'rc-drm',
    title: 'Basic Disaster Risk Management Training',
    issuer: 'Bangladesh Red Crescent Society, Dhaka City Unit',
    date: '6–8 December 2019',
    text: 'Completed disaster risk management training as a Red Crescent Youth member under the RCY co-curriculum activity.',
    img: '/img/cert-rc-disaster-2019.jpg',
  },
  {
    id: 'rc-firstaid',
    title: 'Red Cross / Red Crescent Basic & First Aid Training',
    issuer: 'Bangladesh Red Crescent Society, Dhaka City Unit',
    date: '17–19 December 2018',
    text: 'Completed basic and first aid training as a Red Crescent Youth member under the RCY co-curriculum activity.',
    img: '/img/cert-rc-firstaid-2018.jpg',
  },
]

export const awards = [
  { title: '1st Runner-up, Gen-Train 4.0', by: 'DU Entrepreneurship Development Club', when: '2026' },
  { title: 'Aspire Leaders Program, Cohort 3', by: 'Aspire Institute', when: '2026' },
  { title: 'Jaago Women Scholarship Program', by: 'JAAGO Foundation', when: 'Scholar' },
]

export type Moment = {
  slug: string
  tag: string
  title: string
  /** used for ordering only */
  date: string
  /** shown on the page */
  when: string
  summary: string
  body: string[]
  cover?: Photo
  photos?: Photo[]
  stamp?: [string, string]
  featured?: boolean
}

export const moments: Moment[] = [
  {
    slug: 'gen-train-4-first-runner-up',
    tag: 'Competition',
    title: '1st runner-up at the Gen-Train 4.0 grand final',
    date: '2026-10-10',
    when: '10 October 2026',
    summary:
      'Pitched our case solution in the grand final of DUEDC’s capacity-building program and finished 1st runner-up.',
    body: [
      'Gen-Train 4.0 is an exclusive capacity-building program run by the Dhaka University Entrepreneurship Development Club. After the training rounds, the finalists took their case solutions to the grand-final stage.',
      'I presented our solution, walking the judges through the user personas, the problem and the plan we built around them. We finished 1st runner-up and received the Certificate of Excellence for creative and analytical skill.',
    ],
    stamp: ['1st', 'Runner-up'],
    featured: true,
    cover: {
      src: '/img/gentrain-stage.jpg',
      alt: 'The Gen-Train 4.0 1st runner-up team on stage holding the award board',
      focus: '52% 55%',
    },
    photos: [
      {
        src: '/img/gentrain-pitch.jpg',
        alt: 'Jannatul presenting with a microphone at the Gen-Train 4.0 grand final',
        caption: 'Presenting our case at the Gen-Train 4.0 grand final.',
        focus: '58% 60%',
      },
      {
        src: '/img/gentrain-stage.jpg',
        alt: 'The 1st runner-up team on stage with the award board',
        caption: 'On stage with the 1st runner-up board.',
        focus: '52% 55%',
      },
      {
        src: '/img/boardroom.jpg',
        alt: 'A group discussion around a boardroom table with a presentation on screen',
        caption: 'Around the boardroom table.',
        focus: '50% 50%',
      },
      {
        src: '/img/cert-gentrain.jpg',
        alt: 'Gen-Train 4.0 Certificate of Excellence, 1st runner-up',
        caption: 'Gen-Train 4.0 Certificate of Excellence: 1st runner-up.',
        contain: true,
      },
    ],
  },
  {
    slug: 'aspire-leaders-program',
    tag: 'Leadership',
    title: 'Completed Cohort 3 of the Aspire Leaders Program',
    date: '2026-09-01',
    when: '2026',
    summary: 'A global leadership program by the Aspire Institute, founded by Harvard faculty.',
    body: [
      'I completed Cohort 3 of the Aspire Leaders Program by the Aspire Institute, a global leadership development program founded by Harvard faculty.',
      'It shaped how I think about leadership, setting goals and solving problems together with people who see the world differently.',
    ],
  },
  {
    slug: 'finquest-2026',
    tag: 'Club',
    title: 'General Executive for FinQuest 2026',
    date: '2026-06-01',
    when: '2026',
    summary: 'Featured as a General Executive of the Dhaka University Finance Club for FinQuest 2026.',
    body: [
      'FinQuest 2026 is one of the Finance Club’s flagship events at the Department of Finance, University of Dhaka.',
      'As a General Executive, I’m part of the team behind the club’s events and outreach.',
    ],
    cover: {
      src: '/img/finquest-2026.jpg',
      alt: 'FinQuest 2026 poster featuring Jannatul Maoa as General Executive',
      focus: '50% 45%',
    },
    photos: [
      {
        src: '/img/finquest-2026.jpg',
        alt: 'FinQuest 2026 General Executive poster',
        caption: 'My FinQuest 2026 feature from the Finance Club.',
        contain: true,
      },
    ],
  },
  {
    slug: 'jaago-women-scholarship',
    tag: 'Scholarship',
    title: 'Selected for the Jaago Women Scholarship Program',
    date: '2026-03-01',
    when: 'Scholarship',
    summary: 'A scholarship program supporting women students.',
    body: ['I was selected for the Jaago Women Scholarship Program, which supports women students as they build their education and careers.'],
  },
  {
    slug: 'newbiesta-6',
    tag: 'Certificate',
    title: 'Took part in Newbiesta 6.0',
    date: '2025-09-01',
    when: 'Finance Club, DU',
    summary: '“Where Potential Meets Purpose”, the Finance Club’s program for new finance students.',
    body: [
      'Newbiesta 6.0 by the Finance Club, Department of Finance, University of Dhaka, welcomed new finance students under the theme “Where Potential Meets Purpose”.',
    ],
    cover: { src: '/img/cert-newbiesta.jpg', alt: 'Newbiesta 6.0 certificate of participation', contain: true },
    photos: [
      { src: '/img/cert-newbiesta.jpg', alt: 'Newbiesta 6.0 certificate of participation', caption: 'Newbiesta 6.0 certificate.', contain: true },
    ],
  },
]

export type Project = {
  id: string
  course: string
  courseName?: string
  title: string
  kind: 'Term paper' | 'Group report' | 'Case pitch'
  date: string
  summary: string
  file?: string
  pages?: number
  hue: string
  photo?: Photo
}

export const projects: Project[] = [
  {
    id: 'gentrain-pitch',
    course: 'Gen-Train 4.0',
    title: 'Grand-final case pitch',
    kind: 'Case pitch',
    date: 'Oct 2026',
    summary:
      'Our grand-final case solution at Gen-Train 4.0, built around user personas and a clear plan. It finished 1st runner-up.',
    hue: '#e2366f',
    photo: {
      src: '/img/gentrain-pitch.jpg',
      alt: 'Presenting the case at Gen-Train 4.0',
      focus: '58% 60%',
    },
  },
  {
    id: 'f204-city-bank',
    course: 'F-204',
    title: 'City Bank PLC: Banking Practices & Strategic Developments',
    kind: 'Group report',
    date: 'Sep 2026',
    summary:
      'A study of City Bank PLC: its history, ownership and governance, core and digital banking products, and its fintech, sustainability and growth strategy.',
    file: '/docs/F-204-City-Bank-PLC-Report.pdf',
    pages: 26,
    hue: '#2340e8',
  },
  {
    id: 'f106-leadership',
    course: 'F-106',
    courseName: 'Principles of Management',
    title: 'Leadership in Practice: A Critical Analysis of Sir Fazle Hasan Abed',
    kind: 'Term paper',
    date: 'May 2026',
    summary:
      'An in-depth look at the leadership style, vision and contributions of BRAC’s founder, and how his transformational approach drove social development and poverty alleviation.',
    file: '/docs/F-106-Leadership-in-Practice-Sir-Fazle-Hasan-Abed.pdf',
    pages: 20,
    hue: '#f2a93b',
  },
  {
    id: 'f109-securities',
    course: 'F-109',
    courseName: 'Legal Environment of Business',
    title: 'Securities Rules in Bangladesh: Regulatory Framework and Market Impact',
    kind: 'Term paper',
    date: 'Mar 2026',
    summary:
      'Examines the rules governing Bangladesh’s securities market and the role of the BSEC in transparency, investor protection and market integrity.',
    file: '/docs/F-109-Securities-Rules-in-Bangladesh.pdf',
    pages: 23,
    hue: '#14a37f',
  },
]

export const affiliations = [
  { name: 'University of Dhaka', logo: '/img/logo-du.jpg' },
  { name: 'Department of Finance, University of Dhaka', logo: '/img/logo-du-finance.jpg' },
  { name: 'Finance Club, Department of Finance, DU', logo: '/img/logo-finance-club.jpg' },
  { name: 'Dhaka University Entrepreneurship Development Club', logo: '/img/logo-duedc.jpg' },
  { name: 'DUMUNA', logo: '/img/logo-dumuna.jpg' },
  { name: 'Dot Initiative', logo: '/img/logo-dot-initiative.jpg' },
  { name: 'Pure Comfort', logo: '/img/logo-pure-comfort.jpg' },
]

export const ticker = [
  'Financial Reporting',
  'Pitching',
  'Leadership',
  'Statistical Interpretation',
  'Operations',
  'Marketing Strategy',
  'Teamwork',
  'CRM',
  'Community',
  'Excel',
]

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/moments', label: 'Moments' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const
