import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const base = import.meta.env.BASE_URL || '/';
const asset = (path) => `${base}images/${path}`;

const vacancies = [
  {
    id: 1,
    pub: 'The Rose Villa Tavern',
    location: 'Birmingham, West Midlands',
    region: 'West Midlands',
    agreement: 'Just Add Talent',
    investment: 'Ready-made pub',
    type: 'Historic city pub',
    tags: ['City centre', 'Character pub', 'Drinks-led'],
    summary: 'A standout opportunity in the Jewellery Quarter with beautiful period features and a loyal local audience.',
    availability: 'Available',
    image: asset('rose-villa-tavern.jpg'),
    imageLabel: 'Historic pub exterior',
    matchScore: 94,
    idealFor: 'A character-led operator who can build a drinks-led city centre pub with personality.',
    area: 'Located in Birmingham’s Jewellery Quarter, close to offices, independents and a strong evening circuit.',
    features: ['Ornate period features', 'City centre location', 'Drinks-led trading style', 'Strong local identity']
  },
  {
    id: 2,
    pub: 'Pearce’s Bar',
    location: 'Edinburgh, Scotland',
    region: 'Scotland',
    agreement: 'Just Add Talent',
    investment: 'Refurbishment planned',
    type: 'Premium city bar',
    tags: ['Live events', 'High footfall', 'Premium drinks'],
    summary: 'A refreshed city centre pub designed for day-to-night trade, events and premium drinks occasions.',
    availability: 'Available',
    image: asset('pearces-bar-edinburgh.jpg'),
    imageLabel: 'Premium city bar exterior',
    matchScore: 88,
    idealFor: 'A confident host who can deliver high standards, events and premium drinks trade.',
    area: 'Positioned for strong city footfall, with a trading opportunity that can flex from daytime visits into evening events.',
    features: ['Refurbishment planned', 'Premium drinks focus', 'Live events potential', 'High footfall location']
  },
  {
    id: 3,
    pub: 'The Gregory Arms',
    location: 'Grantham, Lincolnshire',
    region: 'East Midlands',
    agreement: 'Investment Tenancy Agreement',
    investment: 'Significant investment',
    type: 'Village destination pub',
    tags: ['Food opportunity', 'Beer garden', 'Community local'],
    summary: 'A characterful pub with scope to grow everyday local trade and destination visits after investment.',
    availability: 'Let agreed',
    image: asset('StarPubs-Lifestyle-50.jpg'),
    imageLabel: 'Village destination pub',
    matchScore: 81,
    idealFor: 'An experienced operator with the ambition to grow a food-led community and destination offer.',
    area: 'A village-style setting with scope to draw from locals and destination guests looking for a quality pub visit.',
    features: ['Investment opportunity', 'Food-led potential', 'Beer garden', 'Community role']
  },
  {
    id: 4,
    pub: 'Ring O Bells',
    location: 'Chester, Cheshire',
    region: 'North West',
    agreement: 'Leased & Tenanted',
    investment: 'Fixtures & fittings deal available',
    type: 'Community local',
    tags: ['Wet-led', 'Sports', 'Local following'],
    summary: 'A welcoming local with strong community foundations and clear scope for a hands-on licensee.',
    availability: 'Available',
    image: asset('StarPubs-Lifestyle-33.jpg'),
    imageLabel: 'Community local exterior',
    matchScore: 76,
    idealFor: 'A community-minded licensee who can build regular trade through sport, events and local engagement.',
    area: 'A local trading area with scope to build loyalty and repeat visits through consistent standards and community activity.',
    features: ['Wet-led opportunity', 'Sports focus', 'Fixtures and fittings deal', 'Local customer base']
  },
  {
    id: 5,
    pub: 'The Crown Inn',
    location: 'Leeds, West Yorkshire',
    region: 'Yorkshire and Humber',
    agreement: 'Leased & Tenanted',
    investment: 'Community pub opportunity',
    type: 'Suburban local',
    tags: ['Community', 'Sports', 'Beer garden'],
    summary: 'A well-positioned local pub with a strong surrounding community and scope for an experienced operator.',
    availability: 'Let agreed',
    image: asset('StarPubs-Lifestyle-1.jpg'),
    imageLabel: 'Suburban local pub',
    matchScore: 72,
    idealFor: 'An experienced local pub operator who can build trade around sport, community and outdoor space.',
    area: 'A suburban trading location with the potential to serve regulars, families and sports-led occasions.',
    features: ['Community pub', 'Sports opportunity', 'Beer garden', 'Suburban location']
  }
];

const agreementOptions = ['Just Add Talent', 'Leased & Tenanted', 'Investment Tenancy Agreement'];
const propertyFilters = [
  { label: 'Community', icon: 'users' },
  { label: 'Drinks-led', icon: 'glass' },
  { label: 'Food opportunity', icon: 'fork' },
  { label: 'Sports', icon: 'screen' },
  { label: 'City centre', icon: 'building' },
  { label: 'Beer garden', icon: 'tree' },
  { label: 'Live events', icon: 'music' }
];

const journeySteps = ['Find a pub', 'Chat to us', 'Our resources', 'Business plan', 'Upload documents', 'Application form'];
const dummyCredentials = { email: 'chris.raynor@email.com', password: 'StarPubs123' };

const initialProfile = {
  firstName: 'Chris',
  lastName: 'Raynor',
  email: 'chris.raynor@email.com',
  phone: '',
  postalCode: '',
  agreementInterest: 'Just Add Talent',
  preferredRegion: 'West Midlands',
  preferredStyle: 'Character pub',
  experienceLevel: 'Hospitality management experience',
  startDate: 'Within 3 months'
};

const applications = [
  { id: 101, vacancyId: 1, pub: 'The Rose Villa Tavern', location: 'Birmingham, West Midlands', agreement: 'Just Add Talent', stage: 'Application ongoing', progress: 25, nextAction: 'Continue your business plan and upload supporting documents.' },
  { id: 102, vacancyId: 2, pub: 'Pearce’s Bar', location: 'Edinburgh, Scotland', agreement: 'Just Add Talent', stage: 'Submitted', progress: 50, nextAction: 'Your application has been submitted to the regional team.' },
  { id: 103, vacancyId: 4, pub: 'Ring O Bells', location: 'Chester, Cheshire', agreement: 'Leased & Tenanted', stage: 'Application accepted', progress: 100, nextAction: 'A member of our Licensee Attraction team will be in touch to discuss the next steps.' },
  { id: 104, vacancyId: 5, pub: 'The Crown Inn', location: 'Leeds, West Yorkshire', agreement: 'Leased & Tenanted', stage: 'Application rejected', progress: 100, nextAction: 'This application has not progressed, but you can still explore similar opportunities.' }
];

function Icon({ name, size = 20, className = '', filled = false }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    pin: <><path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6z" />,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M18 9h2v12" /><path d="M8 7h4" /><path d="M8 11h4" /><path d="M8 15h4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    back: <><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>,
    menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
    x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
    sparkle: <><path d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2z" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    document: <><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h5" /><path d="M9 13h6" /><path d="M9 17h6" /></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></>,
    chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></>,
    tree: <><path d="M12 22V12" /><path d="M7 12h10l-5-9z" /><path d="M5 18h14l-7-10z" /></>,
    fork: <><path d="M6 3v8" /><path d="M10 3v8" /><path d="M8 11v10" /><path d="M18 3v18" /><path d="M14 7a4 4 0 0 0 4 4" /></>,
    screen: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 21h8" /><path d="M12 16v5" /></>,
    glass: <><path d="M8 22h8" /><path d="M12 15v7" /><path d="M7 3h10l-1 8a4 4 0 0 1-8 0z" /></>,
    music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>{paths[name] || paths.sparkle}</svg>;
}

function FontStyles() {
  return <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
    .star-pubs-prototype, .star-pubs-prototype * { font-family: 'Montserrat', Arial, sans-serif; }
    .thin-scroll::-webkit-scrollbar { height: 8px; }
    .thin-scroll::-webkit-scrollbar-thumb { background: rgba(10, 135, 196, .25); border-radius: 999px; }
  `}</style>;
}

function StarLogo({ variant = 'white', className = '' }) {
  const src = variant === 'white' ? asset('Star_Pubs_White_Blue_RGB.png') : asset('Star_Pubs_Black_Blue_RGB.jpg');
  return <img src={src} alt="Star Pubs" className={`h-12 w-auto object-contain ${className}`} />;
}

function MockAvatar({ profile }) {
  return <button className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 py-1 pl-1 pr-3 text-left text-white transition hover:bg-white/15" aria-label="Signed in profile">
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a87c4] text-sm font-black text-white ring-2 ring-white/25">{profile.firstName[0]}{profile.lastName[0]}</span>
    <span className="hidden leading-tight lg:block"><span className="block text-xs font-bold">Signed in</span><span className="block text-[11px] text-white/70">{profile.firstName} {profile.lastName}</span></span>
  </button>;
}

function Button({ children, className = '', variant = 'solid', ...props }) {
  const styles = { solid: 'bg-[#0a87c4] text-white hover:bg-[#0877ad]', navy: 'bg-[#1c1c31] text-white hover:bg-[#101022]', outline: 'border border-white/35 bg-white/5 text-white hover:bg-white/15', light: 'border border-slate-200 bg-white text-[#1c1c31] hover:border-[#0a87c4] hover:text-[#0a87c4]', subtle: 'bg-[#eaf6fd] text-[#1c1c31] hover:bg-[#d7eefb]', ghost: 'bg-transparent text-white hover:bg-white/10' }[variant];
  return <button className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-extrabold transition disabled:pointer-events-none disabled:opacity-50 ${styles} ${className}`} {...props}>{children}</button>;
}

function PublicHeader({ navigate, signedIn, profile, goToPortal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const goToSection = (id) => { navigate('starHome', null, false); setMobileOpen(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); };
  const nav = [['featured-pubs', 'Find a pub'], ['agreements', 'Agreements'], ['support', 'Support'], ['why-star', 'Why Star Pubs']];
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1c1c31]/95 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
      <button onClick={() => navigate('starHome')} aria-label="Star Pubs home" className="shrink-0"><StarLogo /></button>
      <nav className="hidden items-center gap-6 text-sm font-bold text-white/80 md:flex">{nav.map(([id, label]) => <button key={id} onClick={() => goToSection(id)} className="hover:text-white">{label}</button>)}<button onClick={goToPortal} className="hover:text-white">Applicant portal</button></nav>
      <div className="hidden items-center gap-3 md:flex">{signedIn ? <MockAvatar profile={profile} /> : <Button variant="ghost" onClick={() => navigate('signin')}>Sign in</Button>}<Button onClick={goToPortal}>Start your journey</Button></div>
      <button className="text-white md:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? 'x' : 'menu'} /></button>
    </div>
    <AnimatePresence>{mobileOpen && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#1c1c31] md:hidden"><div className="grid gap-3 px-5 py-4 text-left text-sm font-semibold text-white/80">{nav.map(([id, label]) => <button key={id} className="text-left" onClick={() => goToSection(id)}>{label}</button>)}<button className="text-left" onClick={goToPortal}>Applicant portal</button><Button variant="ghost" onClick={() => { navigate('signin'); setMobileOpen(false); }}>Sign in</Button></div></motion.div>}</AnimatePresence>
  </header>;
}

function PortalHeader({ page, navigate, signedIn, profile }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const link = (key, label) => <button onClick={() => { navigate(key); setMobileOpen(false); }} className={page === key ? 'text-white' : 'hover:text-white'}>{label}</button>;
  const goToVacancies = () => { navigate('portalHome', null, false); setTimeout(() => document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' }), 50); setMobileOpen(false); };
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1c1c31]/95 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
      <button onClick={() => navigate('starHome')} aria-label="Star Pubs home"><StarLogo /></button>
      <nav className="hidden items-center gap-5 text-sm font-semibold text-white/80 md:flex">{link('starHome', 'Star Pubs home')}<span className="h-4 w-0.5 bg-white/35" />{link('portalHome', 'Portal home')}<button onClick={goToVacancies} className="hover:text-white">Vacancies</button>{link('profile', 'Profile')}{link('saved', 'Saved pubs')}{link('applications', 'Applications')}</nav>
      <div className="hidden items-center gap-3 md:flex">{signedIn ? <MockAvatar profile={profile} /> : <Button variant="ghost" onClick={() => navigate('signin')}>Sign in</Button>}</div>
      <button className="text-white md:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? 'x' : 'menu'} /></button>
    </div>
    <AnimatePresence>{mobileOpen && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#1c1c31] md:hidden"><div className="grid gap-3 px-5 py-4 text-left text-sm font-semibold text-white/80">{link('starHome', 'Star Pubs home')}{link('portalHome', 'Portal home')}<button className="text-left" onClick={goToVacancies}>Vacancies</button>{link('profile', 'Profile')}{link('saved', 'Saved pubs')}{link('applications', 'Applications')}{!signedIn && <Button variant="ghost" onClick={() => navigate('signin')}>Sign in</Button>}</div></motion.div>}</AnimatePresence>
  </header>;
}

function ChatBubble({ navigate }) {
  return <button onClick={() => navigate('journey')} className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#0a87c4] text-white shadow-2xl shadow-[#0a87c4]/30 ring-4 ring-white transition hover:-translate-y-1 hover:bg-[#0877ad]" aria-label="Open chat"><Icon name="chat" size={28} /></button>;
}

function SectionHeading({ eyebrow, title, copy, centre = false }) {
  return <div className={centre ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}><p className="text-xs font-black uppercase tracking-[0.35em] text-[#0a87c4]">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight text-[#1c1c31] md:text-5xl">{title}</h2>{copy && <p className="mt-4 text-base leading-8 text-slate-600">{copy}</p>}</div>;
}

function StarHomePage({ navigate, signedIn, goToPortal }) {
  const featured = vacancies.filter((vacancy) => vacancy.availability === 'Available').slice(0, 3);
  return <main className="bg-white">
    <section className="relative overflow-hidden bg-[#1c1c31]"><div className="absolute inset-0"><img src={asset('home-banner.jpg')} alt="" className="h-full w-full object-cover opacity-40" /><div className="absolute inset-0 bg-gradient-to-r from-[#1c1c31] via-[#1c1c31]/90 to-[#1c1c31]/40" /></div><div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-28"><div className="max-w-3xl text-white"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#55c6f3]">Star Pubs</p><h1 className="mt-5 text-5xl font-black leading-tight tracking-tight md:text-7xl">Run a pub with the right support behind you.</h1><p className="mt-6 max-w-2xl text-lg leading-9 text-white/80">An improved Star Pubs homepage concept that connects pub seekers into a signed-in applicant portal, helping them search, save and progress applications in one place.</p><div className="mt-8 flex flex-wrap gap-3"><Button onClick={goToPortal}>{signedIn ? 'Go to applicant portal' : 'Sign in to applicant portal'} <Icon name="arrow" /></Button><Button variant="outline" onClick={() => document.getElementById('featured-pubs')?.scrollIntoView({ behavior: 'smooth' })}>View featured pubs</Button></div></div><div className="rounded-[2rem] border border-white/15 bg-white p-6 shadow-2xl"><div className="rounded-[1.5rem] bg-[#eaf6fd] p-5"><p className="text-xs font-black uppercase tracking-[0.25em] text-[#0a87c4]">Candidate journey</p><h2 className="mt-3 text-2xl font-black text-[#1c1c31]">One clear route from interest to application.</h2><p className="mt-3 text-sm leading-7 text-slate-600">Users can sign in, build a profile, save pubs, view matched opportunities and continue an application for a specific pub.</p></div><div className="mt-5 grid gap-3">{['Find the right pub', 'Save opportunities', 'Build your application', 'Track next steps'].map((item, index) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a87c4] text-sm font-black text-white">{index + 1}</span><span className="font-extrabold text-[#1c1c31]">{item}</span></div>)}</div></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="grid gap-4 md:grid-cols-3">{[['Find a pub', 'Search available opportunities by location, agreement type and pub style.', 'search'], ['Understand your route', 'Compare Just Add Talent, leased and investment opportunities in plain English.', 'document'], ['Apply with confidence', 'Use a guided portal to keep documents, business plans and updates together.', 'check']].map(([title, copy, icon]) => <div key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf6fd] text-[#0a87c4]"><Icon name={icon} /></div><h3 className="mt-5 text-xl font-black text-[#1c1c31]">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p></div>)}</div></section>
    <section id="agreements" className="bg-[#f6fbfe] py-16"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeading eyebrow="Agreements" title="Choose the pub route that fits your ambition." copy="The homepage gives prospects a simpler way to understand their options before they enter the portal." /><div className="mt-8 grid gap-5 md:grid-cols-3">{[['Just Add Talent', 'A ready-made pub opportunity with support across key operating areas.', 'Best for operators looking for a managed pub model with clear structure.'], ['Leased & Tenanted', 'A more traditional route for operators who want to build their own pub business.', 'Best for experienced operators ready to shape the offer locally.'], ['Investment Tenancy', 'A pub opportunity supported by planned investment and a clear vision.', 'Best for operators ready to grow trade after refurbishment.']].map(([title, copy, detail]) => <div key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#0a87c4]">{title}</p><p className="mt-4 text-sm leading-7 text-slate-600">{copy}</p><p className="mt-4 rounded-2xl bg-[#eaf6fd] p-4 text-sm font-bold leading-6 text-[#1c1c31]">{detail}</p></div>)}</div></div></section>
    <section id="featured-pubs" className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><SectionHeading eyebrow="Featured pubs" title="Opportunities ready to explore." copy="A public-facing teaser that encourages prospects to sign in and continue in the applicant portal." /><Button variant="navy" onClick={goToPortal}>Open applicant portal</Button></div><div className="mt-8 grid gap-6 md:grid-cols-3">{featured.map((pub) => <button key={pub.id} onClick={() => navigate('pubDetail', pub.id)} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><ImagePanel pub={pub} /><div className="p-5"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#0a87c4]">{pub.agreement}</p><h3 className="mt-2 text-xl font-black text-[#1c1c31]">{pub.pub}</h3><p className="mt-1 text-sm font-semibold text-slate-500">{pub.location}</p><p className="mt-3 text-sm leading-6 text-slate-600">{pub.summary}</p></div></button>)}</div></section>
    <section id="support" className="bg-[#1c1c31] py-16 text-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8"><div><p className="text-xs font-black uppercase tracking-[0.35em] text-[#55c6f3]">Support</p><h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">Make the next step feel easier.</h2><p className="mt-4 text-base leading-8 text-white/75">For leadership, this shows how the website can reduce friction: explain the offer, prompt sign-in, and carry the applicant through a structured portal journey.</p></div><div className="grid gap-4 md:grid-cols-2">{[['Clearer entry point', 'A single sign-in route for candidates who are ready to act.'], ['Better lead quality', 'Profiles and preferences help shape more relevant conversations.'], ['Saved pub journeys', 'Applicants can return to pubs they are considering.'], ['Application visibility', 'Progress, tasks and next steps are surfaced clearly.']].map(([title, copy]) => <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5"><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-7 text-white/70">{copy}</p></div>)}</div></div></section>
    <section id="why-star" className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="overflow-hidden rounded-[2rem] bg-[#eaf6fd]"><div className="grid lg:grid-cols-2"><img src={asset('dream-pub-studio.jpg')} alt="Dream Pub Studio" className="h-full min-h-80 w-full object-cover" /><div className="p-8 lg:p-12"><SectionHeading eyebrow="Why Star Pubs" title="A stronger digital shop window for pub recruitment." copy="This concept keeps the familiar Star Pubs feel, then improves the candidate journey with clearer calls to action, simpler routes and an applicant portal built around progress." /><div className="mt-8 flex flex-wrap gap-3"><Button onClick={goToPortal}>Sign in and continue</Button><Button variant="light" onClick={() => navigate('starHome')}>Back to top</Button></div></div></div></div></section>
  </main>;
}

function SignInPage({ navigate, onSignIn }) {
  const [email, setEmail] = useState(dummyCredentials.email);
  const [password, setPassword] = useState(dummyCredentials.password);
  return <main className="min-h-[calc(100vh-84px)] bg-[#f6fbfe] px-5 py-16"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.95fr_1.05fr]"><div className="rounded-[2rem] bg-[#1c1c31] p-8 text-white shadow-2xl"><StarLogo /><p className="mt-10 text-xs font-black uppercase tracking-[0.35em] text-[#55c6f3]">Applicant portal sign in</p><h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">Pick up where you left off.</h1><p className="mt-5 text-base leading-8 text-white/75">Signing in takes applicants straight into the portal, where they can save pubs, complete their profile, continue applications and track next steps.</p><div className="mt-8 grid gap-3">{['Your saved pubs', 'Profile and preferences', 'Business plan progress', 'Application updates'].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"><Icon name="check" className="text-[#55c6f3]" /><span className="font-bold">{item}</span></div>)}</div></div><form onSubmit={(event) => { event.preventDefault(); onSignIn(); }} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#0a87c4]">Mock sign in</p><h2 className="mt-3 text-3xl font-black text-[#1c1c31]">Access the applicant portal</h2><p className="mt-3 text-sm leading-7 text-slate-600">For the prototype, the fields are pre-filled so the leadership demo can show the full signed-in journey quickly.</p><label className="mt-8 block text-sm font-black text-[#1c1c31]">Email address</label><input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-sm outline-none transition focus:border-[#0a87c4] focus:ring-4 focus:ring-[#0a87c4]/10" /><label className="mt-5 block text-sm font-black text-[#1c1c31]">Password</label><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-sm outline-none transition focus:border-[#0a87c4] focus:ring-4 focus:ring-[#0a87c4]/10" /><Button className="mt-7 w-full">Sign in to applicant portal <Icon name="arrow" /></Button><button type="button" onClick={() => navigate('starHome')} className="mt-5 text-sm font-bold text-[#0a87c4] hover:underline">Back to Star Pubs home</button></form></div></main>;
}

function PortalHomePage({ query, setQuery, selectedAgreements, toggleAgreement, selectedPropertyFilters, togglePropertyFilter, clearFilters, filtered, saved, toggleSave, navigate, profile }) {
  return <main className="bg-slate-50"><section className="relative overflow-hidden bg-[#1c1c31]"><div className="absolute inset-0"><img src={asset('StarPubs-Lifestyle-18.jpg')} alt="" className="h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-r from-[#1c1c31] via-[#1c1c31]/95 to-[#1c1c31]/55" /></div><div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-20"><div className="text-white"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#55c6f3]">Applicant portal</p><h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Find, save and apply for pub opportunities.</h1><p className="mt-5 max-w-2xl text-base leading-8 text-white/75">A candidate-first portal concept: personal recommendations, clearer filters and one place to manage the journey from first interest to application.</p><div className="mt-7 flex flex-wrap gap-3"><Button onClick={() => document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' })}>Search vacancies</Button><Button variant="outline" onClick={() => navigate('profile')}>Complete profile</Button></div></div><div className="rounded-[2rem] border border-white/15 bg-white p-6 shadow-2xl"><div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0a87c4] text-lg font-black text-white">{profile.firstName[0]}{profile.lastName[0]}</span><div><p className="text-sm font-bold text-slate-500">Welcome back</p><h2 className="text-2xl font-black text-[#1c1c31]">{profile.firstName}, your next step is ready.</h2></div></div><div className="mt-6 rounded-[1.5rem] bg-[#eaf6fd] p-5"><div className="flex items-center justify-between"><p className="font-black text-[#1c1c31]">Profile completion</p><p className="font-black text-[#0a87c4]">72%</p></div><div className="mt-3 h-3 overflow-hidden rounded-full bg-white"><div className="h-full w-[72%] rounded-full bg-[#0a87c4]" /></div><p className="mt-3 text-sm leading-6 text-slate-600">Add your postcode and phone number to make enquiries faster.</p></div></div></div></section><section className="mx-auto max-w-7xl px-5 py-10 lg:px-8"><div className="grid gap-4 md:grid-cols-4">{[['Saved pubs', saved.length, 'heart'], ['Applications', applications.length, 'document'], ['Available now', vacancies.filter((item) => item.availability === 'Available').length, 'check'], ['Best match', `${Math.max(...vacancies.map((item) => item.matchScore))}%`, 'sparkle']].map(([label, value, icon]) => <div key={label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-bold text-slate-500">{label}</p><Icon name={icon} className="text-[#0a87c4]" /></div><p className="mt-2 text-3xl font-black text-[#1c1c31]">{value}</p></div>)}</div></section><section id="vacancies" className="mx-auto max-w-7xl px-5 pb-16 lg:px-8"><div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-7"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><SectionHeading eyebrow="Search" title="Find your best-fit pub." copy="Filter by agreement first, then use property-style filters to narrow the list around the kind of pub you want to run." /><Button variant="subtle" onClick={clearFilters}>Clear filters</Button></div><div className="mt-7 grid gap-4 md:grid-cols-[1fr_160px]"><label className="block"><span className="text-sm font-black text-[#1c1c31]">Search by pub, town or keyword</span><div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-[#0a87c4] focus-within:ring-4 focus-within:ring-[#0a87c4]/10"><Icon name="search" className="text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Birmingham, beer garden or sports" className="w-full border-0 bg-transparent text-sm outline-none" /></div></label><div className="flex items-end"><Button className="w-full">Search pubs</Button></div></div><div className="mt-7"><p className="text-sm font-black text-[#1c1c31]">Agreement type</p><div className="mt-3 flex flex-wrap gap-3">{agreementOptions.map((agreement) => <FilterPill key={agreement} active={selectedAgreements.includes(agreement)} onClick={() => toggleAgreement(agreement)}>{agreement}</FilterPill>)}</div></div><div className="mt-7 border-t border-slate-100 pt-6"><p className="text-sm font-black text-[#1c1c31]">Property-style filters</p><div className="thin-scroll mt-3 flex gap-3 overflow-x-auto pb-2">{propertyFilters.map((filter) => <button key={filter.label} onClick={() => togglePropertyFilter(filter.label)} className={`min-w-[132px] rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${selectedPropertyFilters.includes(filter.label) ? 'border-[#0a87c4] bg-[#eaf6fd] text-[#1c1c31] ring-2 ring-[#0a87c4]/20' : 'border-slate-200 bg-white text-slate-600 hover:border-[#0a87c4]'}`}><Icon name={filter.icon} className="text-[#0a87c4]" /><span className="mt-3 block text-sm font-extrabold">{filter.label}</span></button>)}</div></div></div><div className="mt-8 flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-[0.25em] text-[#0a87c4]">{filtered.length} pub{filtered.length === 1 ? '' : 's'} found</p><h2 className="mt-2 text-3xl font-black text-[#1c1c31]">Recommended opportunities</h2></div><p className="max-w-md text-sm leading-6 text-slate-500">Match scores are illustrative for the demo, based on profile preferences, location and pub style.</p></div>{filtered.length > 0 ? <div className="mt-6 grid gap-6 lg:grid-cols-2">{filtered.map((pub) => <VacancyCard key={pub.id} pub={pub} saved={saved.includes(pub.id)} toggleSave={toggleSave} navigate={navigate} />)}</div> : <div className="mt-6 rounded-[2rem] border border-dashed border-[#0a87c4]/40 bg-[#eaf6fd] p-10 text-center"><Icon name="search" size={40} className="mx-auto text-[#0a87c4]" /><h3 className="mt-4 text-2xl font-black text-[#1c1c31]">No pubs match those filters yet.</h3><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">Clear the filters or broaden the search to show more opportunities. In the live site, this could also trigger an alert sign-up for future vacancies.</p><Button className="mt-6" onClick={clearFilters}>Show all pubs</Button></div>}</section></main>;
}

function FilterPill({ active, children, onClick }) { return <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-extrabold transition ${active ? 'border-[#0a87c4] bg-[#0a87c4] text-white shadow-md shadow-[#0a87c4]/20' : 'border-slate-200 bg-white text-[#1c1c31] hover:border-[#0a87c4]'}`}>{active && <span className="h-2 w-2 rounded-full bg-white" />}{children}</button>; }
function ImagePanel({ pub, large = false }) { return <div className={`relative overflow-hidden bg-[#1c1c31] ${large ? 'h-80 rounded-[2rem]' : 'h-52'}`}><img src={pub.image} alt={`${pub.pub} exterior`} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" /><div className="absolute bottom-4 left-4 right-4 text-white"><p className="text-sm font-bold text-white/75">{pub.imageLabel}</p></div></div>; }
function AvailabilityBadge({ status }) { return <span className={`rounded-full px-3 py-1 text-xs font-black ${status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{status}</span>; }
function AgreementBadge({ agreement }) { const style = agreement === 'Just Add Talent' ? 'bg-[#0a87c4] text-white' : agreement.includes('Investment') ? 'bg-[#1c1c31] text-white' : 'bg-white text-[#1c1c31] border border-slate-200'; return <span className={`rounded-full px-3 py-1 text-xs font-black ${style}`}>{agreement}</span>; }

function VacancyCard({ pub, saved, toggleSave, navigate }) {
  const isAvailable = pub.availability === 'Available';
  return <motion.article layout className={`overflow-hidden rounded-[2rem] border border-[#0a87c4]/35 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${!isAvailable ? 'opacity-75' : ''}`}><ImagePanel pub={pub} /><div className="p-6"><div className="flex flex-wrap items-center gap-2"><AgreementBadge agreement={pub.agreement} /><AvailabilityBadge status={pub.availability} /><span className="rounded-full bg-[#eaf6fd] px-3 py-1 text-xs font-black text-[#0a87c4]">{pub.matchScore}% match</span></div><div className="mt-4 flex items-start justify-between gap-4"><div><h3 className="text-2xl font-black text-[#1c1c31]">{pub.pub}</h3><p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-500"><Icon name="pin" size={16} />{pub.location}</p></div><button onClick={() => toggleSave(pub.id)} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${saved ? 'border-[#0a87c4] bg-[#eaf6fd] text-[#0a87c4]' : 'border-slate-200 text-slate-400 hover:border-[#0a87c4] hover:text-[#0a87c4]'}`} aria-label={saved ? 'Remove saved pub' : 'Save pub'}><Icon name="heart" filled={saved} /></button></div><p className="mt-4 text-sm leading-7 text-slate-600">{pub.summary}</p><div className="mt-4 flex flex-wrap gap-2">{pub.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>)}</div><div className="mt-6 flex flex-wrap gap-3"><Button variant="light" onClick={() => navigate('pubDetail', pub.id)}>View details</Button>{isAvailable ? <Button onClick={() => navigate('journey', pub.id)}>Start application</Button> : <Button variant="subtle" onClick={() => navigate('portalHome')}>Show similar pubs</Button>}</div></div></motion.article>;
}

function PubDetailPage({ pub, saved, toggleSave, navigate }) {
  return <main className="bg-slate-50 px-5 py-10 lg:px-8"><div className="mx-auto max-w-7xl"><button onClick={() => navigate('portalHome')} className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#0a87c4]"><Icon name="back" />Back to vacancies</button><div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><div><ImagePanel pub={pub} large /><div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><div className="flex flex-wrap items-center gap-2"><AgreementBadge agreement={pub.agreement} /><AvailabilityBadge status={pub.availability} /><span className="rounded-full bg-[#eaf6fd] px-3 py-1 text-xs font-black text-[#0a87c4]">{pub.matchScore}% profile match</span></div><h1 className="mt-4 text-4xl font-black text-[#1c1c31]">{pub.pub}</h1><p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-500"><Icon name="pin" size={16} />{pub.location}</p><p className="mt-5 text-base leading-8 text-slate-600">{pub.summary}</p><div className="mt-7 grid gap-5 md:grid-cols-2"><InfoBlock title="The area" copy={pub.area} /><InfoBlock title="Ideal operator" copy={pub.idealFor} /></div><div className="mt-7"><h2 className="text-xl font-black text-[#1c1c31]">Key features</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{pub.features.map((feature) => <div key={feature} className="flex items-center gap-3 rounded-2xl bg-[#eaf6fd] p-4 text-sm font-bold text-[#1c1c31]"><Icon name="check" className="text-[#0a87c4]" />{feature}</div>)}</div></div></div></div><aside className="space-y-5"><div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><p className="text-xs font-black uppercase tracking-[0.25em] text-[#0a87c4]">Next step</p><h2 className="mt-3 text-2xl font-black text-[#1c1c31]">Ready to apply for this pub?</h2><p className="mt-3 text-sm leading-7 text-slate-600">Start a guided application journey for this specific opportunity. The portal keeps your documents, business plan and form together.</p><Button className="mt-6 w-full" onClick={() => navigate('journey', pub.id)}>Start application journey</Button><Button className="mt-3 w-full" variant="light" onClick={() => toggleSave(pub.id)}>{saved ? 'Saved to your list' : 'Save this pub'}</Button></div><div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><h3 className="text-xl font-black text-[#1c1c31]">Why this matches</h3><div className="mt-4 grid gap-3">{getReasons(pub, initialProfile).map((reason) => <div key={reason} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700"><Icon name="sparkle" className="text-[#0a87c4]" />{reason}</div>)}</div></div></aside></div></div></main>;
}
function InfoBlock({ title, copy }) { return <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5"><h3 className="font-black text-[#1c1c31]">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{copy}</p></div>; }

function ApplicationJourneyPage({ pub, navigate }) {
  const tiles = [{ title: 'Your pub match', icon: 'heart', copy: `Review why ${pub.pub} matches your profile and preferred pub style.`, action: 'Review match' }, { title: 'Your documents', icon: 'upload', copy: 'Upload CVs, proof of funds and any supporting information in one place.', action: 'Upload documents' }, { title: 'Application form', icon: 'document', copy: 'Complete the core application questions and return whenever you need to.', action: 'Open form' }, { title: 'Business plan', icon: 'building', copy: 'Build your plan around the local area, offer, marketing and first 90 days.', action: 'Continue plan' }, { title: 'Additional support', icon: 'sparkle', copy: 'Access guides, agreement explainers and useful resources before submitting.', action: 'View resources' }, { title: 'Chat', icon: 'chat', copy: 'Ask the recruitment team a question about this pub or your application.', action: 'Start chat' }];
  return <main className="bg-slate-50 px-5 py-10 lg:px-8"><div className="mx-auto max-w-7xl"><button onClick={() => navigate('pubDetail', pub.id)} className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#0a87c4]"><Icon name="back" />Back to {pub.pub}</button><div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-start"><div><p className="text-xs font-black uppercase tracking-[0.35em] text-[#0a87c4]">Your application journey</p><h1 className="mt-3 text-4xl font-black text-[#1c1c31]">Apply for {pub.pub}</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">A guided applicant hub for one pub, designed to make each step clear and reduce drop-off during the application process.</p></div><AgreementBadge agreement={pub.agreement} /></div><div className="mt-8 grid gap-5 md:grid-cols-6">{journeySteps.map((step, index) => { const complete = index < 3; const current = index === 3; return <div key={step} className="relative text-center">{index < journeySteps.length - 1 && <div className={`absolute left-1/2 top-5 hidden h-1 w-full md:block ${complete ? 'bg-[#0a87c4]' : 'bg-slate-200'}`} />}<div className={`relative mx-auto flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white text-sm font-black ${complete ? 'border-[#0a87c4] bg-[#0a87c4] text-white' : current ? 'border-[#0a87c4] text-[#0a87c4]' : 'border-slate-300 text-slate-400'}`}>{complete ? <Icon name="check" size={18} /> : index + 1}</div><p className="mt-3 text-sm font-black text-[#1c1c31]">{step}</p></div>; })}</div></div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{tiles.map((tile, index) => <button key={tile.title} className={`min-h-[220px] rounded-[2rem] border bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${index === 3 ? 'border-[#0a87c4] ring-4 ring-[#0a87c4]/10' : 'border-slate-200'}`}><Icon name={tile.icon} size={42} className="mx-auto text-[#0a87c4]" /><h2 className="mt-5 text-2xl font-black uppercase text-[#1c1c31]">{tile.title}</h2><p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-600">{tile.copy}</p><span className="mt-5 inline-flex rounded-full bg-[#eaf6fd] px-4 py-2 text-xs font-black text-[#0a87c4]">{tile.action}</span></button>)}</div></div></main>;
}

function ProfilePage({ profile, setProfile }) { const update = (field, value) => setProfile((current) => ({ ...current, [field]: value })); return <PageLayout image={asset('StarPubs-Lifestyle-16.jpg')} eyebrow="Profile" title="Build a stronger applicant profile." copy="Capture the details that help the recruitment team understand fit, preferences and readiness."><div className="grid gap-8 lg:grid-cols-[1fr_340px]"><div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><h2 className="text-2xl font-black text-[#1c1c31]">Your details</h2><div className="mt-6 grid gap-5 md:grid-cols-2">{[['firstName', 'First name'], ['lastName', 'Last name'], ['email', 'Email address'], ['phone', 'Phone number'], ['postalCode', 'Postcode'], ['preferredRegion', 'Preferred region']].map(([field, label]) => <label key={field} className="block"><span className="text-sm font-black text-[#1c1c31]">{label}</span><input value={profile[field]} onChange={(event) => update(field, event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0a87c4] focus:ring-4 focus:ring-[#0a87c4]/10" /></label>)}</div></div><aside className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#0a87c4] text-3xl font-black text-white">{profile.firstName[0]}{profile.lastName[0]}</div><h3 className="mt-5 text-center text-xl font-black text-[#1c1c31]">{profile.firstName} {profile.lastName}</h3><p className="mt-2 text-center text-sm text-slate-500">{profile.email}</p><div className="mt-6 rounded-2xl bg-[#eaf6fd] p-4"><p className="font-black text-[#1c1c31]">Profile strength</p><div className="mt-3 h-3 rounded-full bg-white"><div className="h-full w-[72%] rounded-full bg-[#0a87c4]" /></div><p className="mt-3 text-sm leading-6 text-slate-600">Add missing contact information to make the application smoother.</p></div></aside></div></PageLayout>; }
function SavedPubsPage({ saved, toggleSave, navigate }) { const savedPubs = vacancies.filter((pub) => saved.includes(pub.id)); return <PageLayout image={asset('StarPubs-Lifestyle-50.jpg')} eyebrow="Saved pubs" title="Keep opportunities in one place." copy="A simple shortlist makes it easier for prospects to compare and return later."><div className="grid gap-6 lg:grid-cols-2">{savedPubs.map((pub) => <VacancyCard key={pub.id} pub={pub} saved toggleSave={toggleSave} navigate={navigate} />)}</div></PageLayout>; }
function ApplicationsPage({ navigate }) { return <PageLayout image={asset('StarPubs-Lifestyle-54.jpg')} eyebrow="Applications" title="Track every application clearly." copy="Applicants can see progress, next actions and outcomes without searching through emails."><div className="grid gap-5">{applications.map((application) => <div key={application.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-start"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#0a87c4]">{application.stage}</p><h2 className="mt-2 text-2xl font-black text-[#1c1c31]">{application.pub}</h2><p className="mt-1 text-sm font-bold text-slate-500">{application.location}</p></div><AgreementBadge agreement={application.agreement} /></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#0a87c4]" style={{ width: `${application.progress}%` }} /></div><p className="mt-4 text-sm leading-7 text-slate-600">{application.nextAction}</p><div className="mt-5"><Button variant="light" onClick={() => navigate(application.stage === 'Application ongoing' ? 'journey' : 'pubDetail', application.vacancyId)}>View application</Button></div></div>)}</div></PageLayout>; }
function PageLayout({ image, eyebrow, title, copy, children }) { return <main className="bg-slate-50"><section className="relative overflow-hidden bg-[#1c1c31]"><div className="absolute inset-0"><img src={image} alt="" className="h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-r from-[#1c1c31] to-[#1c1c31]/70" /></div><div className="relative mx-auto max-w-7xl px-5 py-16 text-white lg:px-8"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#55c6f3]">{eyebrow}</p><h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-8 text-white/75">{copy}</p></div></section><section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">{children}</section></main>; }
function Footer({ navigate }) { return <footer className="bg-[#101022] px-5 py-10 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><StarLogo /><div className="flex flex-wrap gap-5 text-sm font-semibold text-white/70"><button onClick={() => navigate('starHome')} className="hover:text-white">Star Pubs home</button><button onClick={() => navigate('portalHome')} className="hover:text-white">Applicant portal</button><button onClick={() => navigate('profile')} className="hover:text-white">Profile</button></div></div></footer>; }
function getReasons(vacancy, profile) { const reasons = []; if (vacancy.agreement === profile.agreementInterest) reasons.push('Matches your preferred agreement'); if (vacancy.region === profile.preferredRegion) reasons.push('Located in your preferred region'); if ([vacancy.type, ...vacancy.tags].join(' ').toLowerCase().includes(profile.preferredStyle.toLowerCase().split(' ')[0])) reasons.push('Similar to your preferred pub style'); if (vacancy.availability === 'Available') reasons.push('Available to apply for now'); return reasons.length ? reasons.slice(0, 3) : ['Could broaden your search']; }
function filterVacancies(list, query, selectedAgreements = [], selectedPropertyFilters = []) { const q = query.trim().toLowerCase(); return list.filter((vacancy) => { const text = [vacancy.pub, vacancy.location, vacancy.agreement, vacancy.type, vacancy.summary, vacancy.region, ...vacancy.tags].join(' ').toLowerCase(); const matchesText = !q || text.includes(q); const matchesAgreement = !selectedAgreements.length || selectedAgreements.includes(vacancy.agreement); const matchesProperty = !selectedPropertyFilters.length || selectedPropertyFilters.some((item) => text.includes(item.toLowerCase())); return matchesText && matchesAgreement && matchesProperty; }); }

export default function App() {
  const [page, setPage] = useState('starHome');
  const [signedIn, setSignedIn] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [query, setQuery] = useState('');
  const [selectedAgreements, setSelectedAgreements] = useState([]);
  const [selectedPropertyFilters, setSelectedPropertyFilters] = useState([]);
  const [saved, setSaved] = useState([1, 3]);
  const [activePubId, setActivePubId] = useState(1);
  const activePub = vacancies.find((pub) => pub.id === activePubId) || vacancies[0];
  const filtered = useMemo(() => filterVacancies(vacancies, query, selectedAgreements, selectedPropertyFilters), [query, selectedAgreements, selectedPropertyFilters]);
  const navigate = (nextPage, pubId = null, scrollTop = true) => { if (pubId) setActivePubId(pubId); setPage(nextPage); if (scrollTop) setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0); };
  const goToPortal = () => { signedIn ? navigate('portalHome') : navigate('signin'); };
  const handleSignIn = () => { setSignedIn(true); setPage('portalHome'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0); };
  const toggleAgreement = (agreement) => setSelectedAgreements((current) => current.includes(agreement) ? current.filter((item) => item !== agreement) : [...current, agreement]);
  const togglePropertyFilter = (filter) => setSelectedPropertyFilters((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  const clearFilters = () => { setQuery(''); setSelectedAgreements([]); setSelectedPropertyFilters([]); };
  const toggleSave = (id) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const isPublicPage = page === 'starHome' || page === 'signin';
  return <div className="star-pubs-prototype min-h-screen bg-white text-slate-900"><FontStyles />{isPublicPage ? <PublicHeader navigate={navigate} signedIn={signedIn} profile={profile} goToPortal={goToPortal} /> : <PortalHeader page={page} navigate={navigate} signedIn={signedIn} profile={profile} />}{page === 'starHome' && <StarHomePage navigate={navigate} signedIn={signedIn} goToPortal={goToPortal} />}{page === 'signin' && <SignInPage navigate={navigate} onSignIn={handleSignIn} />}{page === 'portalHome' && <PortalHomePage query={query} setQuery={setQuery} selectedAgreements={selectedAgreements} toggleAgreement={toggleAgreement} selectedPropertyFilters={selectedPropertyFilters} togglePropertyFilter={togglePropertyFilter} clearFilters={clearFilters} filtered={filtered} saved={saved} toggleSave={toggleSave} navigate={navigate} profile={profile} />}{page === 'pubDetail' && <PubDetailPage pub={activePub} saved={saved.includes(activePub.id)} toggleSave={toggleSave} navigate={navigate} />}{page === 'journey' && <ApplicationJourneyPage pub={activePub} navigate={navigate} />}{page === 'profile' && <ProfilePage profile={profile} setProfile={setProfile} />}{page === 'saved' && <SavedPubsPage saved={saved} toggleSave={toggleSave} navigate={navigate} />}{page === 'applications' && <ApplicationsPage navigate={navigate} />}<ChatBubble navigate={navigate} /><Footer navigate={navigate} /></div>;
}
