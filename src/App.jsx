import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    imageLabel: 'Village destination pub',
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
    imageLabel: 'Community local exterior',
    idealFor: 'A community-minded licensee who can build regular trade through sport, events and local engagement.',
    area: 'A local trading area with scope to build loyalty and repeat visits through consistent standards and community activity.',
    features: ['Wet-led opportunity', 'Sports focus', 'Fixtures and fittings deal', 'Local customer base']
  },
  {
    id: 5,
    pub: 'The Crown Inn',
    location: 'Leeds, West Yorkshire',
    region: 'Yorkshire',
    agreement: 'Leased & Tenanted',
    investment: 'Community pub opportunity',
    type: 'Suburban local',
    tags: ['Community', 'Sports', 'Beer garden'],
    summary: 'A well-positioned local pub with a strong surrounding community and scope for an experienced operator.',
    availability: 'Let agreed',
    imageLabel: 'Suburban local pub',
    idealFor: 'An experienced local pub operator who can build trade around sport, community and outdoor space.',
    area: 'A suburban trading location with the potential to serve regulars, families and sports-led occasions.',
    features: ['Community pub', 'Sports opportunity', 'Beer garden', 'Suburban location']
  }
];

const agreementOptions = ['Just Add Talent', 'Leased & Tenanted', 'Investment Tenancy Agreement'];
const propertyFilters = ['Community', 'Drinks-led', 'Food opportunity', 'Sports', 'City centre', 'Beer garden', 'Live events'];
const stages = ['Application ongoing', 'Submitted', 'In review', 'Application accepted', 'Application rejected'];
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
  { id: 101, vacancyId: 1, pub: 'The Rose Villa Tavern', location: 'Birmingham, West Midlands', agreement: 'Just Add Talent', stage: 'Application ongoing', progress: 25, nextAction: 'Complete your business plan and upload supporting documents.' },
  { id: 102, vacancyId: 2, pub: 'Pearce’s Bar', location: 'Edinburgh, Scotland', agreement: 'Just Add Talent', stage: 'Submitted', progress: 50, nextAction: 'Your application has been submitted to the regional team.' },
  { id: 103, vacancyId: 4, pub: 'Ring O Bells', location: 'Chester, Cheshire', agreement: 'Leased & Tenanted', stage: 'Application accepted', progress: 100, nextAction: 'A member of our Licensee Attraction team will be in touch to discuss the next steps.' },
  { id: 104, vacancyId: 5, pub: 'The Crown Inn', location: 'Leeds, West Yorkshire', agreement: 'Leased & Tenanted', stage: 'Application rejected', progress: 100, nextAction: 'This application has not progressed, but you can still explore similar opportunities.' }
];

const journeySteps = [
  { title: 'Find a pub', copy: 'Choose the opportunity you want to progress.', status: 'done' },
  { title: 'Chat to us', copy: 'Ask questions before you commit time.', status: 'done' },
  { title: 'Our resources', copy: 'Use guides and templates to prepare.', status: 'done' },
  { title: 'Business plan', copy: 'Set out how you would run the pub.', status: 'active' },
  { title: 'Upload documents', copy: 'Add the files needed for review.', status: 'todo' },
  { title: 'Application form', copy: 'Submit when every section is ready.', status: 'todo' }
];

const journeyTiles = [
  { title: 'Your pub match', copy: 'Review the pub you selected, revisit the details and compare similar opportunities.', action: 'Review match', icon: 'heart' },
  { title: 'Your documents', copy: 'Keep ID, proof of funds and supporting files together in one checklist.', action: 'Manage documents', icon: 'file' },
  { title: 'Application form', copy: 'Complete the key applicant questions and save your progress as you go.', action: 'Continue form', icon: 'form' },
  { title: 'Business plan', copy: 'Shape your plan for sales, team, trading rhythm and local marketing.', action: 'Build plan', icon: 'user' },
  { title: 'Additional support', copy: 'Download guides, templates and pub-running resources before you submit.', action: 'View resources', icon: 'download' },
  { title: 'Chat', copy: 'Ask the recruitment team a question about the pub, agreement or next step.', action: 'Start chat', icon: 'message' }
];

const howItWorks = [
  { title: 'Find a suitable pub', copy: 'Search by location, agreement type and the features that matter to you.' },
  { title: 'Save and compare', copy: 'Shortlist opportunities and return to them when you are ready.' },
  { title: 'Apply with support', copy: 'Use the guided application journey to move through each step clearly.' }
];

function iconPath(name) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    pin: <><path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6z" />,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M18 9h2v12" /><path d="M8 7h4" /><path d="M8 11h4" /><path d="M8 15h4" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h6" /></>,
    form: <><path d="M4 4h16v16H4z" /><path d="M8 8h8" /><path d="M8 12h8" /><path d="M8 16h5" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /><path d="M8 8h8" /><path d="M8 12h6" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    back: <><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>,
    menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
    x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
    sparkle: <><path d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2z" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>
  };
  return paths[name] || paths.sparkle;
}

function Icon({ name, size = 20, className = '', filled = false }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>{iconPath(name)}</svg>;
}

function Button({ children, className = '', variant = 'solid', ...props }) {
  const styles = variant === 'outline' ? 'border border-white/30 bg-white/5 text-white hover:bg-white/15' : variant === 'light' ? 'border border-slate-200 bg-white text-[#1c1c31] hover:border-[#0a87c4] hover:text-[#0a87c4]' : variant === 'ghost' ? 'bg-transparent text-white hover:bg-white/10' : 'bg-[#0a87c4] text-white hover:bg-[#0877ad]';
  return <button className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition disabled:pointer-events-none disabled:opacity-50 ${styles} ${className}`} {...props}>{children}</button>;
}

function Card({ children, className = '' }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function CardContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

function StarLogo({ className = '' }) {
  return <img src={asset('Star_Pubs_White_Blue_RGB.png')} alt="Star Pubs" className={`h-11 w-auto object-contain ${className}`} />;
}

function avatarFor(profile) {
  const initials = `${profile.firstName?.[0] || 'C'}${profile.lastName?.[0] || 'R'}`.toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="#0a87c4"/><circle cx="66" cy="28" r="24" fill="#65c4ef" opacity="0.55"/><text x="48" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="white">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function filterVacancies(list, query, selectedAgreements, selectedPropertyFilters) {
  const q = query.trim().toLowerCase();
  const activeAgreements = selectedAgreements.length ? selectedAgreements : agreementOptions;
  return list.filter((vacancy) => {
    const text = [vacancy.pub, vacancy.location, vacancy.agreement, vacancy.type, vacancy.summary, vacancy.region, ...vacancy.tags].join(' ').toLowerCase();
    const matchesText = !q || text.includes(q);
    const matchesAgreement = activeAgreements.includes(vacancy.agreement);
    const matchesProperty = !selectedPropertyFilters.length || selectedPropertyFilters.some((item) => text.includes(item.toLowerCase()));
    return matchesText && matchesAgreement && matchesProperty;
  });
}

function getReasons(vacancy, profile) {
  const reasons = [];
  if (vacancy.agreement === profile.agreementInterest) reasons.push('Matches your preferred agreement');
  if (vacancy.region === profile.preferredRegion) reasons.push('Located in your preferred region');
  if ([vacancy.type, ...vacancy.tags].join(' ').toLowerCase().includes(profile.preferredStyle.toLowerCase().split(' ')[0])) reasons.push('Similar to your preferred pub style');
  if (vacancy.availability === 'Available') reasons.push('Available to apply for now');
  return reasons.length ? reasons.slice(0, 3) : ['Could broaden your search'];
}

function Header({ page, navigate, signedIn, profile }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const link = (key, label) => <button onClick={() => { navigate(key); setMobileOpen(false); }} className={page === key ? 'text-white' : 'hover:text-white'}>{label}</button>;
  const goToVacancies = () => { navigate('home'); setTimeout(() => document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' }), 50); setMobileOpen(false); };
  const closeAndProfile = () => { setMobileOpen(false); navigate('profile'); };
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1c1c31]/95 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8"><button onClick={() => navigate('home')} aria-label="Star Pubs portal home"><StarLogo /></button><nav className="hidden items-center gap-6 text-sm font-semibold text-white/80 md:flex">{link('home', 'Portal home')}<button onClick={goToVacancies} className="hover:text-white">Vacancies</button>{link('saved', 'Saved pubs')}{link('applications', 'Applications')}{link('profile', 'Profile')}</nav><div className="hidden gap-3 md:flex">{signedIn ? <button onClick={() => navigate('profile')} className="flex items-center gap-3 rounded-full bg-white/10 py-1 pl-1 pr-4 text-sm font-bold text-white ring-1 ring-white/15 hover:bg-white/15"><img src={avatarFor(profile)} alt="Mock profile" className="h-10 w-10 rounded-full ring-2 ring-[#0a87c4]" /><span>{profile.firstName || 'My profile'}</span></button> : <><Button variant="ghost" onClick={() => navigate('signin')}>Sign in</Button><Button onClick={() => navigate('profile')}>Create profile</Button></>}</div><button className="text-white md:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? 'x' : 'menu'} /></button></div><AnimatePresence>{mobileOpen && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#1c1c31] md:hidden"><div className="grid gap-3 px-5 py-4 text-left text-sm font-semibold text-white/80">{link('home', 'Portal home')}<button className="text-left" onClick={goToVacancies}>Vacancies</button>{link('saved', 'Saved pubs')}{link('applications', 'Applications')}{link('profile', 'Profile')}{signedIn ? <button className="flex items-center gap-3 text-left" onClick={closeAndProfile}><img src={avatarFor(profile)} alt="Mock profile" className="h-9 w-9 rounded-full" /> My profile</button> : <Button variant="ghost" onClick={() => { setMobileOpen(false); navigate('signin'); }}>Sign in</Button>}</div></motion.div>}</AnimatePresence></header>;
}

function ImagePlaceholder({ pub, large = false, muted = false }) {
  if (pub.image) return <div className={`relative overflow-hidden rounded-[1.5rem] ${large ? 'h-72' : 'h-44'} bg-[#1c1c31]`}><img src={pub.image} alt={`${pub.pub} exterior`} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-5 left-5 right-5 text-white"><p className={`${large ? 'text-3xl' : 'text-xl'} font-black`}>{pub.pub}</p><p className="mt-1 text-sm font-semibold text-white/85">{pub.imageLabel}</p></div></div>;
  return <div className={`relative overflow-hidden rounded-[1.5rem] ${large ? 'h-72' : 'h-44'} ${muted ? 'bg-slate-300' : 'bg-[#1c1c31]'}`}><div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#0a87c4]/45 blur-2xl" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(10,135,196,0.55),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.16),transparent_40%)]" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-5 left-5 right-5 text-white"><p className={`${large ? 'text-3xl' : 'text-xl'} font-black`}>{pub.pub}</p><p className="mt-1 text-sm font-semibold text-white/75">{pub.imageLabel}</p></div></div>;
}

function AgreementRouteButton({ title, description, onClick }) {
  return <button onClick={onClick} className="group w-full rounded-md bg-white px-5 py-5 text-left text-[#1c1c31] shadow-sm ring-1 ring-white/70 transition duration-200 hover:-translate-y-1 hover:shadow-xl"><div className="flex items-center justify-between gap-5"><div className="min-w-0 pr-2"><p className="text-base font-black leading-snug md:text-[1.05rem]">{title}</p><p className="mt-1.5 text-sm leading-6 text-slate-600">{description}</p></div><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a87c4]/10 text-[#0a87c4] transition duration-200 group-hover:bg-[#0a87c4] group-hover:text-white"><Icon name="arrow" size={21} /></div></div></button>;
}

function Hero({ navigate, setAgreement }) {
  const chooseAgreement = (agreement) => { setAgreement([agreement]); document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' }); };
  return <section className="relative overflow-hidden bg-[#1c1c31] text-white"><img src={asset('StarPubs-Lifestyle-18.jpg')} alt="Star Pubs venue" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#1c1c31]/78" /><div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90"><Icon name="sparkle" size={16} /> Candidate portal prototype</div><h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">Find the right pub to run with Star Pubs.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">Search live opportunities, save your favourites and move through a clearer application journey when you are ready.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button className="h-12 px-7 text-base" onClick={() => document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' })}>Find pubs</Button><Button variant="outline" className="h-12 px-7 text-base" onClick={() => navigate('profile')}>Create profile</Button></div></motion.div><motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur"><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Start with your route</p><h2 className="mt-2 text-3xl font-black">Choose the opportunity type that suits you.</h2><p className="mt-3 text-sm leading-6 text-white/70">Use these shortcuts to filter vacancies around your preferred agreement.</p><div className="mt-6 grid gap-3.5"><AgreementRouteButton title="A ready-made pub with support" description="Explore Just Add Talent opportunities." onClick={() => chooseAgreement('Just Add Talent')} /><AgreementRouteButton title="A pub to run with more independence" description="Explore Leased & Tenanted pubs." onClick={() => chooseAgreement('Leased & Tenanted')} /><AgreementRouteButton title="A pub with investment potential" description="Explore investment opportunities." onClick={() => chooseAgreement('Investment Tenancy Agreement')} /></div></motion.div></div></section>;
}

function FilterButton({ label, selected, onClick }) {
  return <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-[13px] font-black uppercase tracking-[0.08em] transition ${selected ? 'border-[#0a87c4] bg-[#0a87c4] text-white shadow-md' : 'border-slate-300 bg-white text-[#1c1c31] hover:border-[#0a87c4] hover:text-[#0a87c4]'}`}>{selected && <span className="h-2 w-2 rounded-full bg-white" />}{label}</button>;
}

function PropertyFilterButton({ label, selected, onClick }) {
  const icon = label === 'Beer garden' ? 'sparkle' : label === 'Sports' ? 'check' : label === 'City centre' ? 'pin' : label === 'Food opportunity' ? 'file' : 'building';
  return <button onClick={onClick} className={`flex min-w-[118px] flex-col items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-center transition ${selected ? 'border-[#0a87c4] bg-[#0a87c4]/10 text-[#0a87c4]' : 'border-slate-200 bg-white text-slate-500 hover:border-[#0a87c4]/50 hover:text-[#0a87c4]'}`}><Icon name={icon} size={22} /><span className="text-[12px] font-black leading-tight">{label}</span></button>;
}

function VacancyCard({ vacancy, saved, toggleSave, navigate, profile }) {
  const letAgreed = vacancy.availability === 'Let agreed';
  return <motion.article layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`group rounded-[1.75rem] border border-[#0a87c4]/55 bg-white p-5 shadow-sm ring-2 ring-[#0a87c4]/10 transition hover:-translate-y-1 hover:shadow-xl ${letAgreed ? 'opacity-70 grayscale' : ''}`}><ImagePlaceholder pub={vacancy} muted={letAgreed} /><div className="mt-5 flex items-start justify-between gap-4"><div><div className="mb-3 flex flex-wrap gap-2"><span className={`inline-flex rounded-md px-3 py-1 text-xs font-black ${letAgreed ? 'bg-slate-200 text-slate-600' : 'bg-[#0a87c4]/10 text-[#0a87c4]'}`}>{vacancy.availability}</span><span className={`inline-flex rounded-md px-3 py-1 text-xs font-black ${vacancy.agreement === 'Just Add Talent' ? 'bg-[#0a87c4] text-white' : 'bg-[#1c1c31] text-white'}`}>{vacancy.agreement}</span></div><h3 className="text-2xl font-black text-[#1c1c31]">{vacancy.pub}</h3><p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500"><Icon name="pin" size={16} /> {vacancy.location}</p></div><button onClick={() => toggleSave(vacancy.id)} className={`rounded-full p-3 transition ${saved ? 'bg-[#0a87c4] text-white' : 'bg-slate-100 text-slate-500'}`} aria-label={saved ? 'Remove saved pub' : 'Save pub'}><Icon name="heart" size={20} filled={saved} /></button></div>{vacancy.agreement === 'Just Add Talent' && <div className="mt-4 rounded-md bg-[#0a87c4]/10 px-4 py-3 text-sm font-semibold text-[#1c1c31]"><span className="font-black text-[#0a87c4]">Ready-made pub with support:</span> weekly revenue share, profit share and Star Pubs systems already in place.</div>}<p className="mt-4 leading-7 text-slate-600">{vacancy.summary}</p><div className="mt-5 rounded-2xl bg-slate-50 p-4"><p className="text-sm font-black text-[#1c1c31]">Recommended because</p><ul className="mt-2 grid gap-2 text-sm text-slate-600">{getReasons(vacancy, profile).map((reason) => <li key={reason} className="flex gap-2"><Icon name="check" size={16} className="text-[#0a87c4]" />{reason}</li>)}</ul></div><div className="mt-5 flex flex-wrap gap-2">{vacancy.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>)}</div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button onClick={() => navigate('pubDetail', vacancy.id)} className="flex-1 rounded-2xl bg-[#0a87c4] py-6 hover:bg-[#0877ad]">View opportunity</Button>{letAgreed && <Button variant="light" className="flex-1 rounded-2xl py-6" onClick={() => navigate('similar', vacancy.id)}>Show similar pubs</Button>}</div></motion.article>;
}

function HomePage({ navigate, profile, saved, toggleSave }) {
  const [query, setQuery] = useState('');
  const [agreements, setAgreements] = useState([]);
  const [features, setFeatures] = useState([]);
  const filtered = useMemo(() => filterVacancies(vacancies, query, agreements, features), [query, agreements, features]);
  const toggle = (value, setter) => setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  return <><Hero navigate={navigate} setAgreement={setAgreements} /><section className="mx-auto max-w-7xl px-5 pt-10 lg:px-8"><div className="grid gap-4 md:grid-cols-3">{howItWorks.map((item, index) => <Card key={item.title}><CardContent className="p-5"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a87c4]/10 text-sm font-black text-[#0a87c4]">{index + 1}</div><h2 className="text-xl font-black text-[#1c1c31]">{item.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p></CardContent></Card>)}</div></section><section id="vacancies" className="mx-auto max-w-7xl px-5 pt-8 lg:px-8 lg:pt-12"><Card className="border-0 shadow-xl"><CardContent className="grid gap-4 p-5 md:grid-cols-[1fr_160px_140px] md:p-6"><label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"><Icon name="search" className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by pub, town, county or keyword" className="w-full bg-transparent text-sm outline-none" /></label><Button className="rounded-2xl" onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}>Search pubs</Button><button onClick={() => { setQuery(''); setAgreements([]); setFeatures([]); }} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#1c1c31] transition hover:border-[#0a87c4] hover:text-[#0a87c4]">Clear</button><div className="md:col-span-3"><p className="mb-2 text-sm font-black uppercase tracking-[0.14em] text-slate-500">Filter by agreement</p><div className="flex flex-wrap gap-2">{agreementOptions.map((item) => <FilterButton key={item} label={item} selected={agreements.includes(item)} onClick={() => toggle(item, setAgreements)} />)}</div></div><div className="md:col-span-3"><p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Property filters</p><div className="mt-3 flex gap-3 overflow-x-auto pb-2">{propertyFilters.map((item) => <PropertyFilterButton key={item} label={item} selected={features.includes(item)} onClick={() => toggle(item, setFeatures)} />)}</div></div></CardContent></Card><div id="results" className="mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Live opportunities</p><h2 className="mt-2 text-4xl font-black text-[#1c1c31]">Find a pub that fits</h2></div><p className="max-w-xl text-slate-600">Use agreement and property-style filters to quickly narrow the vacancy list around the kind of pub you want to run.</p></div>{filtered.length ? <div className="mt-8 grid gap-5 lg:grid-cols-2">{filtered.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} saved={saved.includes(vacancy.id)} toggleSave={toggleSave} navigate={navigate} profile={profile} />)}</div> : <Card className="mt-8"><CardContent className="p-8 text-center"><h3 className="text-2xl font-black text-[#1c1c31]">No matching pubs found</h3><p className="mt-2 text-slate-600">Try removing a filter or broadening your search term.</p><Button className="mt-5" onClick={() => { setQuery(''); setAgreements([]); setFeatures([]); }}>Reset search</Button></CardContent></Card>}</section></>;
}

function PageHero({ eyebrow, title, copy, navigate, side, background }) {
  return <div className="relative overflow-hidden bg-[#1c1c31] px-5 py-12 text-white lg:px-8 lg:py-16">{background && <><img src={background} alt="Star Pubs header" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#1c1c31]/78" /></>}<div className="relative mx-auto max-w-7xl"><button onClick={() => navigate('home')} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white"><Icon name="back" size={18} /> Back to portal home</button><div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">{eyebrow}</p><h1 className="mt-3 max-w-3xl text-5xl font-black leading-tight md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{copy}</p></div>{side}</div></div></div>;
}

function ProfilePage({ profile, setProfile, navigate, onProfileSaved }) {
  const required = ['firstName', 'lastName', 'email', 'phone', 'postalCode', 'agreementInterest', 'preferredRegion', 'preferredStyle'];
  const strength = Math.round((required.filter((key) => String(profile[key] || '').trim()).length / required.length) * 100);
  const update = (field, value) => setProfile((current) => ({ ...current, [field]: value }));
  const field = (label, key) => <label className="grid gap-2 text-sm font-bold text-[#1c1c31]"><span>{label}</span><input value={profile[key] || ''} onChange={(e) => update(key, e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 font-normal outline-none focus:border-[#0a87c4]" /></label>;
  return <section><PageHero eyebrow="Candidate profile" title="Build a profile once, use it across every application." copy="A guided profile builder helps us understand what you’re looking for and recommend more relevant pub opportunities." navigate={navigate} background={asset('StarPubs-Lifestyle-16.jpg')} side={<Card className="border-white/10 bg-white/10 text-white"><CardContent className="flex items-center gap-5 p-6"><img src={avatarFor(profile)} alt="Mock profile" className="h-16 w-16 rounded-full ring-4 ring-[#0a87c4]" /><div className="flex-1"><p className="text-sm text-white/60">Profile completion</p><p className="mt-1 text-4xl font-black">{strength}%</p><div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15"><motion.div animate={{ width: `${strength}%` }} className="h-3 rounded-full bg-[#0a87c4]" /></div></div></CardContent></Card>} /><div className="mx-auto max-w-5xl px-5 py-12"><Card><CardContent className="grid gap-5 p-6 md:grid-cols-2">{field('First name', 'firstName')}{field('Last name', 'lastName')}{field('Email address', 'email')}{field('Telephone number', 'phone')}{field('Postal code', 'postalCode')}<label className="grid gap-2 text-sm font-bold text-[#1c1c31]"><span>Preferred agreement</span><select value={profile.agreementInterest} onChange={(e) => update('agreementInterest', e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 font-normal outline-none focus:border-[#0a87c4]">{agreementOptions.map((item) => <option key={item}>{item}</option>)}</select></label><div className="md:col-span-2"><Button onClick={() => { onProfileSaved(); navigate('home'); }}>Save and browse pubs</Button></div></CardContent></Card></div></section>;
}

function PubDetailPage({ pub, navigate, toggleSave, saved }) {
  if (!pub) return <HomePage navigate={navigate} profile={initialProfile} saved={[]} toggleSave={() => {}} />;
  const letAgreed = pub.availability === 'Let agreed';
  return <section><PageHero eyebrow="Pub opportunity" title={pub.pub} copy={pub.summary} navigate={navigate} side={<Card className="border-white/10 bg-white/10 text-white"><CardContent className="p-6"><p className="text-sm text-white/60">Agreement</p><p className="text-2xl font-black">{pub.agreement}</p><p className="mt-4 text-sm text-white/60">Status</p><p className="font-black">{pub.availability}</p></CardContent></Card>} /><div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[1fr_360px] lg:px-8"><Card><CardContent className="p-6 md:p-8"><ImagePlaceholder pub={pub} large /><h2 className="mt-8 text-3xl font-black text-[#1c1c31]">Why this pub?</h2><p className="mt-4 leading-8 text-slate-600">{pub.area}</p><div className="mt-6 grid gap-3 md:grid-cols-2">{pub.features.map((item) => <div key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-[#1c1c31]"><Icon name="check" className="mb-2 text-[#0a87c4]" />{item}</div>)}</div></CardContent></Card><aside><Card><CardContent className="p-6"><h3 className="text-2xl font-black text-[#1c1c31]">Ready to apply?</h3><p className="mt-3 leading-7 text-slate-600">Start a guided application journey for this pub. You can save progress and come back later.</p><Button disabled={letAgreed} onClick={() => navigate('applicationJourney', pub.id)} className={`mt-5 w-full ${letAgreed ? 'bg-slate-500' : ''}`}>{letAgreed ? 'Let agreed' : 'Start application'}</Button><Button variant="light" className="mt-3 w-full" onClick={() => toggleSave(pub.id)}>{saved ? 'Saved' : 'Save pub'}</Button></CardContent></Card></aside></div></section>;
}

function ApplicationJourneyPage({ pub, navigate }) {
  const selectedPub = pub || vacancies[0];
  return <section><PageHero eyebrow="Application journey" title={`Apply for ${selectedPub.pub}`} copy="A clear step-by-step area for this pub, with your plan, documents, resources and final application together." navigate={navigate} background={asset('StarPubs-Lifestyle-54.jpg')} side={<Card className="border-white/10 bg-white/10 text-white"><CardContent className="p-6"><p className="text-sm text-white/60">Selected pub</p><p className="mt-1 text-2xl font-black">{selectedPub.pub}</p><p className="mt-2 text-white/70">{selectedPub.location}</p></CardContent></Card>} /><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><Card><CardContent className="p-6"><p className="text-center text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Your application journey</p><div className="mt-8 grid gap-5 lg:grid-cols-6">{journeySteps.map((step, index) => <div key={step.title} className="text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 ${step.status === 'done' ? 'border-[#0a87c4] bg-[#0a87c4] text-white' : 'border-[#0a87c4] bg-white text-[#0a87c4]'} font-black`}>{step.status === 'done' ? '✓' : index + 1}</div><h3 className="mt-3 text-sm font-black text-[#1c1c31]">{step.title}</h3><p className="mt-1 text-xs leading-5 text-slate-600">{step.copy}</p></div>)}</div></CardContent></Card><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{journeyTiles.map((tile) => <button key={tile.title} className="group min-h-[220px] rounded-[1.5rem] border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#0a87c4]"><Icon name={tile.icon} size={42} className="mx-auto text-[#0a87c4]" filled={tile.icon === 'heart'} /><h3 className="mt-4 text-2xl font-black uppercase text-[#1c1c31]">{tile.title}</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">{tile.copy}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0a87c4]">{tile.action}<Icon name="arrow" size={15} /></span></button>)}</div><Card className="mt-8 bg-[#EAF6FD]"><CardContent className="flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center"><div><p className="text-sm font-black uppercase tracking-[0.16em] text-[#0a87c4]">Need help?</p><h3 className="mt-1 text-2xl font-black text-[#1c1c31]">Support is available before you submit.</h3><p className="mt-2 text-slate-600">Use chat if you want to check anything about this pub, your agreement type or the next application step.</p></div><Button onClick={() => navigate('pubDetail', selectedPub.id)}>Back to pub details</Button></CardContent></Card></div></section>;
}

function SavedPage({ savedVacancies, toggleSave, navigate, profile }) {
  return <section><PageHero eyebrow="Saved pubs" title="Keep track of the pubs you’re interested in." copy="Review saved opportunities, see what is still available and spot pubs that have moved to let agreed." navigate={navigate} background={asset('StarPubs-Lifestyle-50.jpg')} /><div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-2 lg:px-8">{savedVacancies.length ? savedVacancies.map((pub) => <VacancyCard key={pub.id} vacancy={pub} saved toggleSave={toggleSave} navigate={navigate} profile={profile} />) : <Card><CardContent className="p-8"><h2 className="text-2xl font-black text-[#1c1c31]">No saved pubs yet</h2><p className="mt-2 text-slate-600">Save pubs from the vacancy list to compare them later.</p><Button className="mt-5" onClick={() => navigate('home')}>Browse vacancies</Button></CardContent></Card>}</div></section>;
}

function ApplicationsPage({ navigate }) {
  const [filter, setFilter] = useState('All applications');
  const shown = filter === 'All applications' ? applications : applications.filter((app) => app.stage === filter);
  return <section><PageHero eyebrow="Applications" title="Track every application in one place." copy="See which pub applications are still ongoing, submitted, in review, accepted or rejected." navigate={navigate} background={asset('StarPubs-Lifestyle-54.jpg')} /><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><Card className="mb-6"><CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"><h2 className="text-2xl font-black text-[#1c1c31]">Ongoing and completed applications</h2><select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"><option>All applications</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></CardContent></Card><div className="grid gap-5">{shown.map((app) => <Card key={app.id}><CardContent className="p-6"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><div className="mb-3 inline-flex rounded-full bg-[#0a87c4]/10 px-3 py-1 text-xs font-black text-[#0a87c4]">{app.stage}</div><h3 className="text-2xl font-black text-[#1c1c31]">{app.pub}</h3><p className="mt-2 text-sm font-semibold text-slate-500">{app.location}</p></div><Button onClick={() => navigate('applicationJourney', app.vacancyId)}>Open journey</Button></div><p className="mt-4 text-slate-600">{app.nextAction}</p></CardContent></Card>)}</div></div></section>;
}

function SimilarPage({ sourcePub, navigate, profile, saved, toggleSave }) {
  const similar = vacancies.filter((pub) => pub.id !== sourcePub?.id && pub.availability === 'Available');
  return <section><PageHero eyebrow="Similar pubs" title="This opportunity may have moved on, but others are open." copy="Keep momentum by reviewing similar pubs that are currently available." navigate={navigate} /><div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-3 lg:px-8">{similar.map((pub) => <VacancyCard key={pub.id} vacancy={pub} saved={saved.includes(pub.id)} toggleSave={toggleSave} navigate={navigate} profile={profile} />)}</div></section>;
}

function SignInPage({ navigate, onSignIn }) {
  const [email, setEmail] = useState(dummyCredentials.email);
  const [password, setPassword] = useState(dummyCredentials.password);
  const [message, setMessage] = useState('Enter the prototype sign-in details to continue.');
  const submit = (e) => { e.preventDefault(); if (email.toLowerCase() === dummyCredentials.email && password === dummyCredentials.password) { setMessage('Signed in. Taking you back to your portal homepage...'); onSignIn(); setTimeout(() => navigate('home'), 650); } else { setMessage('Those details do not match the prototype account.'); } };
  return <section><PageHero eyebrow="Candidate sign in" title="Sign in to continue your pub search." copy="This mock credentials page simulates a secure sign-in flow for the recruitment portal." navigate={navigate} /><div className="mx-auto max-w-4xl px-5 py-12"><Card><CardContent className="p-6 md:p-8"><form onSubmit={submit} className="grid gap-5"><label className="grid gap-2 text-sm font-bold text-[#1c1c31]">Email address<input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 font-normal" /></label><label className="grid gap-2 text-sm font-bold text-[#1c1c31]">Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 font-normal" /></label><div className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">{message}</div><Button type="submit">Sign in</Button></form></CardContent></Card></div></section>;
}

function FloatingChatBubble({ navigate }) {
  const [open, setOpen] = useState(false);
  return <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }} className="w-[min(340px,calc(100vw-2.5rem))] rounded-[1.5rem] border border-slate-200 bg-white p-5 text-[#1c1c31] shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#0a87c4]">Need help?</p><h3 className="mt-1 text-xl font-black">Chat to Star Pubs</h3></div><button type="button" onClick={() => setOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-500" aria-label="Close chat"><Icon name="x" size={16} /></button></div><p className="mt-3 text-sm leading-6 text-slate-600">Questions about a pub, agreement type or your application? Start a chat with the Licensee Attraction team.</p><Button className="mt-4 w-full" onClick={() => navigate('applications')}>Start chat</Button></motion.div>}</AnimatePresence><motion.button type="button" onClick={() => setOpen((current) => !current)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0a87c4] text-white shadow-2xl ring-4 ring-white/80" aria-label="Open chat"><Icon name={open ? 'x' : 'message'} size={26} /></motion.button></div>;
}

function runSelfTests() {
  console.assert(filterVacancies(vacancies, '', ['Just Add Talent'], []).length === 2, 'Expected two Just Add Talent vacancies');
  console.assert(filterVacancies(vacancies, '', [], ['Beer garden']).length === 2, 'Expected beer garden filter to match two vacancies');
  console.assert(vacancies.find((pub) => pub.id === 2)?.image.includes('pearces-bar-edinburgh.jpg'), 'Expected Pearce’s Bar image to pull from GitHub Pages assets');
  console.assert(journeyTiles.every((tile) => tile.copy !== 'Complete this step at your own pace.'), 'Expected journey tile copy to be unique');
}
runSelfTests();

export default function App() {
  const [page, setPage] = useState('home');
  const [param, setParam] = useState(null);
  const [saved, setSaved] = useState([1, 3, 5]);
  const [profile, setProfile] = useState(initialProfile);
  const [signedIn, setSignedIn] = useState(false);
  const currentPub = vacancies.find((pub) => pub.id === param);
  const savedVacancies = vacancies.filter((pub) => saved.includes(pub.id));
  const navigate = (nextPage, nextParam = null) => { setPage(nextPage); setParam(nextParam); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleSave = (id) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const pageComponent = page === 'profile'
    ? <ProfilePage profile={profile} setProfile={setProfile} navigate={navigate} onProfileSaved={() => setSignedIn(true)} />
    : page === 'saved'
      ? <SavedPage savedVacancies={savedVacancies} toggleSave={toggleSave} navigate={navigate} profile={profile} />
      : page === 'applications'
        ? <ApplicationsPage navigate={navigate} />
        : page === 'applicationJourney'
          ? <ApplicationJourneyPage pub={currentPub} navigate={navigate} />
          : page === 'pubDetail'
            ? <PubDetailPage pub={currentPub} navigate={navigate} toggleSave={toggleSave} saved={currentPub ? saved.includes(currentPub.id) : false} profile={profile} />
            : page === 'similar'
              ? <SimilarPage sourcePub={currentPub} navigate={navigate} profile={profile} saved={saved} toggleSave={toggleSave} />
              : page === 'signin'
                ? <SignInPage navigate={navigate} onSignIn={() => setSignedIn(true)} />
                : <HomePage navigate={navigate} profile={profile} saved={saved} toggleSave={toggleSave} />;

  return <main className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }}><Header page={page} navigate={navigate} signedIn={signedIn} profile={profile} />{pageComponent}<footer className="bg-[#1c1c31] px-5 py-10 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><button onClick={() => navigate('home')}><StarLogo /></button><div className="flex flex-wrap items-center gap-3 text-sm font-bold"><button onClick={() => navigate('home')} className="text-white/80 hover:text-white">Portal home</button><span className="h-4 w-0.5 bg-white/35" /><button onClick={() => navigate('applications')} className="text-white/80 hover:text-white">Applications</button></div><p className="max-w-xl text-sm leading-7 text-white/65">Prototype for a standalone recruitment portal on starpubs.co.uk.</p></div></footer><FloatingChatBubble navigate={navigate} /></main>;
}
