import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAVY = '#1c1c31';
const BLUE = '#0a87c4';

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
    imageLabel: 'Historic pub exterior',
    idealFor: 'A character-led operator who can build a drinks-led city centre pub with personality.',
    area: 'Located in Birmingham’s Jewellery Quarter, close to offices, independents and a strong evening circuit.',
    demographics: 'The pub benefits from a mixed customer base of local residents, workers, visitors and after-work socialisers.',
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
    imageLabel: 'Premium city bar exterior',
    idealFor: 'A confident host who can deliver high standards, events and premium drinks trade.',
    area: 'Positioned for strong city footfall, with a trading opportunity that can flex from daytime visits into evening events.',
    demographics: 'The customer base is likely to include city workers, visitors, students and weekend socialisers.',
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
    demographics: 'The pub is suited to families, local residents, diners and weekend visitors.',
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
    demographics: 'The pub is suited to local regulars, sports fans and social drinkers looking for a welcoming community pub.',
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
    demographics: 'The customer base is likely to include local residents, families and weekend social groups.',
    features: ['Community pub', 'Sports opportunity', 'Beer garden', 'Suburban location']
  }
];

const agreementOptions = ['All agreements', 'Just Add Talent', 'Leased & Tenanted', 'Investment Tenancy Agreement'];
const stages = ['Application ongoing', 'Submitted', 'In review', 'Application accepted', 'Application rejected'];
const dummyCredentials = { email: 'chris.raynor@email.com', password: 'StarPubs123' };

const applications = [
  { id: 101, vacancyId: 1, pub: 'The Rose Villa Tavern', location: 'Birmingham, West Midlands', agreement: 'Just Add Talent', stage: 'Application ongoing', progress: 25, lastUpdated: 'Today', nextAction: 'Complete personal details' },
  { id: 102, vacancyId: 2, pub: 'Pearce’s Bar', location: 'Edinburgh, Scotland', agreement: 'Just Add Talent', stage: 'Submitted', progress: 50, lastUpdated: '2 days ago', nextAction: 'Await confirmation from the recruitment team' },
  { id: 103, vacancyId: 3, pub: 'The Gregory Arms', location: 'Grantham, Lincolnshire', agreement: 'Investment Tenancy Agreement', stage: 'In review', progress: 75, lastUpdated: '5 days ago', nextAction: 'Recruitment team review in progress' },
  { id: 104, vacancyId: 4, pub: 'Ring O Bells', location: 'Chester, Cheshire', agreement: 'Leased & Tenanted', stage: 'Application accepted', progress: 100, lastUpdated: '1 week ago', nextAction: 'A member of our Licensee attraction team will be in touch to discuss the next steps' },
  { id: 105, vacancyId: 5, pub: 'The Crown Inn', location: 'Leeds, West Yorkshire', agreement: 'Leased & Tenanted', stage: 'Application rejected', progress: 100, lastUpdated: '2 weeks ago', nextAction: 'Show similar pubs' }
];

const initialProfile = {
  profileImage: '',
  firstName: 'Chris',
  lastName: 'Raynor',
  email: 'chris.raynor@email.com',
  city: 'Birmingham',
  agreementInterest: 'Just Add Talent',
  preferredRegion: 'West Midlands',
  preferredStyle: 'Character pub',
  experienceLevel: 'Hospitality management experience',
  startDate: 'Within 3 months',
  referralSource: '',
  searchMonths: '',
  phone: '',
  postalCode: ''
};

function iconPath(name) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    pin: <><path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6z" />,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M18 9h2v12" /><path d="M8 7h4" /><path d="M8 11h4" /><path d="M8 15h4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    back: <><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>,
    menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
    x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
    sparkle: <><path d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2z" /></>
  };
  return paths[name] || paths.sparkle;
}

function Icon({ name, size = 20, className = '', filled = false }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>{iconPath(name)}</svg>;
}

function Button({ children, className = '', variant = 'solid', ...props }) {
  const styles = variant === 'outline' ? 'border border-white/30 bg-white/5 text-white hover:bg-white/15' : variant === 'light' ? 'border border-slate-200 bg-white text-[#1c1c31] hover:border-[#0a87c4] hover:text-[#0a87c4]' : variant === 'ghost' ? 'bg-transparent text-white hover:bg-white/10' : 'bg-[#0a87c4] text-white hover:bg-[#0877ad]';
  return <button className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition disabled:pointer-events-none disabled:opacity-50 ${styles} ${className}`} {...props}>{children}</button>;
}

function Card({ children, className = '' }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function CardContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

function StarMark() {
  return <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm"><span className="text-2xl font-black text-[#1c1c31]">★</span></div><div className="leading-none"><div className="text-2xl font-black tracking-[0.16em] text-white">STAR</div><div className="text-xs font-semibold tracking-[0.55em] text-white/80">PUBS</div></div></div>;
}

function getReasons(vacancy, profile) {
  const reasons = [];
  if (vacancy.agreement === profile.agreementInterest) reasons.push('Matches your preferred agreement');
  if (vacancy.region === profile.preferredRegion) reasons.push('Located in your preferred region');
  if ([vacancy.type, ...vacancy.tags].join(' ').toLowerCase().includes(profile.preferredStyle.toLowerCase().split(' ')[0])) reasons.push('Similar to your preferred pub style');
  if (vacancy.availability === 'Available') reasons.push('Available to apply for now');
  return reasons.length ? reasons.slice(0, 3) : ['Could broaden your search'];
}

function getSimilarPubs(sourcePub) {
  if (!sourcePub) return vacancies.filter((pub) => pub.availability === 'Available');
  return vacancies.filter((pub) => pub.id !== sourcePub.id && pub.availability === 'Available').slice(0, 3);
}

function Header({ page, navigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const link = (key, label) => <button onClick={() => { navigate(key); setMobileOpen(false); }} className={page === key ? 'text-white' : 'hover:text-white'}>{label}</button>;
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1c1c31]/95 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><button onClick={() => navigate('home')}><StarMark /></button><nav className="hidden items-center gap-7 text-sm font-semibold text-white/80 md:flex">{link('home', 'Home')}<button onClick={() => document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white">Vacancies</button>{link('profile', 'Profile')}{link('saved', 'Saved pubs')}{link('applications', 'Applications')}</nav><div className="hidden gap-3 md:flex"><Button variant="ghost" onClick={() => navigate('signin')}>Sign in</Button><Button onClick={() => navigate('profile')}>Create profile</Button></div><button className="text-white md:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? 'x' : 'menu'} /></button></div><AnimatePresence>{mobileOpen && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#1c1c31] md:hidden"><div className="grid gap-3 px-5 py-4 text-left text-sm font-semibold text-white/80">{link('home', 'Home')}{link('profile', 'Profile')}{link('saved', 'Saved pubs')}{link('applications', 'Applications')}<Button variant="ghost" onClick={() => navigate('signin')}>Sign in</Button></div></motion.div>}</AnimatePresence></header>;
}

function ImagePlaceholder({ pub, large = false, muted = false }) {
  return <div className={`relative overflow-hidden rounded-[1.5rem] ${large ? 'h-72' : 'h-44'} ${muted ? 'bg-slate-300' : 'bg-[#1c1c31]'}`}><div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#0a87c4]/45 blur-2xl" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(10,135,196,0.55),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.16),transparent_40%)]" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute left-5 top-5 rounded-2xl bg-white/15 p-3 text-white backdrop-blur"><Icon name="building" size={large ? 30 : 24} /></div><div className="absolute bottom-5 left-5 right-5 text-white"><p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Image placeholder</p><p className={`${large ? 'text-3xl' : 'text-xl'} mt-1 font-black`}>{pub.pub}</p><p className="mt-1 text-sm font-semibold text-white/75">{pub.imageLabel}</p></div></div>;
}

function AgreementRouteButton({ title, description, onClick }) {
  return <button onClick={onClick} className="group w-full rounded-[1.35rem] bg-white px-5 py-5 text-left text-[#1c1c31] shadow-sm ring-1 ring-white/70 transition duration-200 hover:-translate-y-1 hover:shadow-xl"><div className="flex items-center justify-between gap-5"><div className="min-w-0 pr-2"><p className="text-base font-black leading-snug md:text-[1.05rem]">{title}</p><p className="mt-1.5 text-sm leading-6 text-slate-600">{description}</p></div><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a87c4]/10 text-[#0a87c4] transition duration-200 group-hover:bg-[#0a87c4] group-hover:text-white group-active:scale-95"><Icon name="arrow" size={21} className="transition-transform duration-200 group-hover:translate-x-1" /></div></div></button>;
}

function Hero({ navigate, setAgreement }) {
  const chooseAgreement = (agreement) => { setAgreement(agreement); document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' }); };
  return <section className="relative overflow-hidden bg-[#1c1c31] text-white"><div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#0a87c4]/30 blur-3xl" /><div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90"><Icon name="sparkle" size={16} /> Find your right-fit pub</div><h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">Find the pub opportunity that fits your ambition.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">Create a profile, save pubs, track applications and discover Star Pubs opportunities across our estate.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button className="h-12 px-7 text-base" onClick={() => navigate('profile')}>Start your profile</Button><Button variant="outline" className="h-12 px-7 text-base" onClick={() => document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' })}>Browse vacancies</Button></div></motion.div><motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur"><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Not sure where to start?</p><h2 className="mt-2 text-3xl font-black">Choose the route that sounds most like you.</h2><p className="mt-3 text-sm leading-6 text-white/70">This helps turn a broad vacancy list into a more relevant starting point.</p><div className="mt-6 grid gap-3.5"><AgreementRouteButton title="A ready-made pub with support" description="Explore Just Add Talent opportunities." onClick={() => chooseAgreement('Just Add Talent')} /><AgreementRouteButton title="A pub to run with more independence" description="Explore Leased & Tenanted pubs." onClick={() => chooseAgreement('Leased & Tenanted')} /><AgreementRouteButton title="A pub with investment potential" description="Explore investment opportunities." onClick={() => chooseAgreement('Investment Tenancy Agreement')} /></div></motion.div></div></section>;
}

function VacancyCard({ vacancy, saved, toggleSave, navigate, profile }) {
  const letAgreed = vacancy.availability === 'Let agreed';
  return <motion.article layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`group rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${letAgreed ? 'opacity-70 grayscale' : ''}`}><ImagePlaceholder pub={vacancy} muted={letAgreed} /><div className="mt-5 flex items-start justify-between gap-4"><div><div className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-black ${letAgreed ? 'bg-slate-200 text-slate-600' : 'bg-[#0a87c4]/10 text-[#0a87c4]'}`}>{vacancy.availability}</div><h3 className="text-2xl font-black text-[#1c1c31]">{vacancy.pub}</h3><p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500"><Icon name="pin" size={16} /> {vacancy.location}</p></div><button onClick={() => toggleSave(vacancy.id)} className={`rounded-full p-3 transition ${saved ? 'bg-[#0a87c4] text-white' : 'bg-slate-100 text-slate-500'}`}><Icon name="heart" size={20} filled={saved} /></button></div><p className="mt-4 leading-7 text-slate-600">{vacancy.summary}</p><div className="mt-5 rounded-2xl bg-slate-50 p-4"><p className="text-sm font-black text-[#1c1c31]">Recommended because</p><ul className="mt-2 grid gap-2 text-sm text-slate-600">{getReasons(vacancy, profile).map((reason) => <li key={reason} className="flex gap-2"><Icon name="check" size={16} className="text-[#0a87c4]" />{reason}</li>)}</ul></div><div className="mt-5 flex flex-wrap gap-2">{vacancy.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>)}</div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button onClick={() => navigate('pubDetail', vacancy.id)} className="flex-1 rounded-2xl bg-[#1c1c31] py-6 hover:bg-[#0a87c4]">View opportunity</Button>{letAgreed && <Button variant="light" className="flex-1 rounded-2xl py-6" onClick={() => navigate('similar', vacancy.id)}>Show similar pubs</Button>}</div></motion.article>;
}

function HomePage({ navigate, profile, saved, toggleSave }) {
  const [query, setQuery] = useState('');
  const [agreement, setAgreement] = useState('All agreements');
  const filtered = useMemo(() => vacancies.filter((vacancy) => {
    const text = [vacancy.pub, vacancy.location, vacancy.agreement, vacancy.type, ...vacancy.tags].join(' ').toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (agreement === 'All agreements' || vacancy.agreement === agreement);
  }), [query, agreement]);
  return <><Hero navigate={navigate} setAgreement={setAgreement} /><section id="vacancies" className="mx-auto max-w-7xl px-5 pt-12 lg:px-8 lg:pt-16"><Card className="-mt-8 border-0 shadow-xl"><CardContent className="grid gap-4 p-5 md:grid-cols-[1fr_240px_160px] md:p-6"><label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"><Icon name="search" className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by pub, town, county or keyword" className="w-full bg-transparent text-sm outline-none" /></label><select value={agreement} onChange={(e) => setAgreement(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">{agreementOptions.map((item) => <option key={item}>{item}</option>)}</select><Button className="rounded-2xl">Search pubs</Button></CardContent></Card><div className="mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Live opportunities</p><h2 className="mt-2 text-4xl font-black text-[#1c1c31]">Find a pub that fits</h2></div><p className="max-w-xl text-slate-600">Explainable recommendations replace black-box match scores, helping candidates understand why a pub could suit them.</p></div><div className="mt-8 grid gap-5 lg:grid-cols-2">{filtered.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} saved={saved.includes(vacancy.id)} toggleSave={toggleSave} navigate={navigate} profile={profile} />)}</div></section></>;
}

function PageHero({ eyebrow, title, copy, navigate, side }) {
  return <div className="bg-[#1c1c31] px-5 py-12 text-white lg:px-8 lg:py-16"><div className="mx-auto max-w-7xl"><button onClick={() => navigate('home')} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white"><Icon name="back" size={18} /> Back to vacancies</button><div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">{eyebrow}</p><h1 className="mt-3 max-w-3xl text-5xl font-black leading-tight md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{copy}</p></div>{side}</div></div></div>;
}

function ProfilePage({ profile, setProfile, navigate, savedVacancies }) {
  const [step, setStep] = useState(0);
  const required = ['referralSource', 'searchMonths', 'firstName', 'lastName', 'email', 'phone', 'postalCode', 'agreementInterest', 'preferredRegion', 'preferredStyle'];
  const strength = Math.round((required.filter((key) => String(profile[key] || '').trim()).length / required.length) * 100);
  const initials = `${profile.firstName?.[0] || 'C'}${profile.lastName?.[0] || 'R'}`;
  const update = (field, value) => setProfile((current) => ({ ...current, [field]: value }));
  const field = (label, key, type = 'text') => <label className="grid gap-2 text-sm font-bold text-[#1c1c31]"><span>{label}</span><input type={type} value={profile[key] || ''} onChange={(e) => update(key, e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 font-normal outline-none focus:border-[#0a87c4]" /></label>;
  const select = (label, key, options) => <label className="grid gap-2 text-sm font-bold text-[#1c1c31]"><span>{label}</span><select value={profile[key] || ''} onChange={(e) => update(key, e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 font-normal outline-none focus:border-[#0a87c4]"><option value="">Choose...</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
  return <section className="bg-slate-50"><PageHero eyebrow="Candidate profile" title="Build a profile once, use it across every application." copy="A guided profile builder helps us understand what you’re looking for and recommend more relevant pub opportunities." navigate={navigate} side={<Card className="border-white/10 bg-white/10 text-white shadow-2xl backdrop-blur"><CardContent className="p-6"><div className="mb-6 flex flex-col items-center text-center"><div className="flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[#0a87c4] text-4xl font-black text-white">{initials}</div><p className="mt-3 text-sm font-bold text-white/70">{profile.firstName} {profile.lastName}</p></div><p className="text-sm text-white/60">Profile completion</p><p className="mt-1 text-4xl font-black">{strength}%</p><div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15"><motion.div initial={false} animate={{ width: `${strength}%` }} transition={{ type: 'spring', stiffness: 70, damping: 18 }} className="h-3 rounded-full bg-[#0a87c4]" /></div></CardContent></Card>} /><div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[1fr_380px] lg:px-8"><Card><CardContent className="p-6 md:p-8"><div className="mb-6 flex flex-wrap gap-2">{['Background', 'About you', 'Preferences', 'Contact', 'Review'].map((item, index) => <button key={item} onClick={() => setStep(index)} className={`rounded-full px-4 py-2 text-sm font-black ${step === index ? 'bg-[#0a87c4] text-white' : 'bg-slate-100 text-slate-600'}`}>{index + 1}. {item}</button>)}</div>{step === 0 && <div className="grid gap-5 md:grid-cols-2">{select('How did you hear about Star Pubs?', 'referralSource', ['Website', 'Social media', 'FindMyPub', 'Referred', 'Event'])}{select('How long have you been searching?', 'searchMonths', ['Less than 1 month', '1-3 months', '3-6 months', '6-12 months'])}</div>}{step === 1 && <div className="grid gap-5 md:grid-cols-2">{field('First name', 'firstName')}{field('Last name', 'lastName')}{field('Email address', 'email')}{field('Telephone number', 'phone')}</div>}{step === 2 && <div className="grid gap-5 md:grid-cols-2">{select('Preferred agreement', 'agreementInterest', ['Just Add Talent', 'Leased & Tenanted', 'Investment Tenancy Agreement', 'Open to all agreements'])}{select('Preferred region', 'preferredRegion', ['West Midlands', 'Scotland', 'East Midlands', 'North West', 'Yorkshire'])}{select('Preferred pub style', 'preferredStyle', ['Character pub', 'Community local', 'Premium city bar', 'Food-led destination'])}{select('Experience level', 'experienceLevel', ['First-time pub applicant', 'Hospitality management experience', 'Experienced licensee/operator'])}</div>}{step === 3 && <div className="grid gap-5 md:grid-cols-2">{field('City', 'city')}{field('Postal code', 'postalCode')}{select('Earliest start date', 'startDate', ['Immediately', 'Within 1 month', 'Within 3 months', '3+ months'])}</div>}{step === 4 && <div className="rounded-2xl bg-slate-50 p-5"><h3 className="text-xl font-black text-[#1c1c31]">Review profile</h3><p className="mt-2 text-slate-600">{profile.firstName} {profile.lastName}, {profile.email}, looking for {profile.agreementInterest} opportunities in {profile.preferredRegion}.</p></div>}<div className="mt-8 flex justify-between"><Button variant="light" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>{step < 4 ? <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>Continue</Button> : <Button onClick={() => navigate('home')}>Save and browse pubs</Button>}</div></CardContent></Card><aside className="grid content-start gap-6"><Card><CardContent className="p-6"><h3 className="text-xl font-black text-[#1c1c31]">Saved pubs</h3><div className="mt-5 grid gap-3">{savedVacancies.map((pub) => <button key={pub.id} onClick={() => navigate('saved')} className="rounded-2xl bg-slate-50 p-4 text-left"><p className="font-black text-[#1c1c31]">{pub.pub}</p><p className="mt-1 text-sm text-slate-500">{pub.location}</p></button>)}</div></CardContent></Card></aside></div></section>;
}

function PubDetailPage({ pub, navigate, toggleSave, saved, profile }) {
  if (!pub) return null;
  const letAgreed = pub.availability === 'Let agreed';
  const similar = getSimilarPubs(pub);
  return <section className="bg-slate-50"><div className="bg-[#1c1c31] px-5 py-10 text-white lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]"><div><button onClick={() => navigate('home')} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/75"><Icon name="back" size={18} /> Back to vacancies</button><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">{pub.agreement}</p><h1 className="mt-3 text-5xl font-black leading-tight md:text-6xl">{pub.pub}</h1><p className="mt-4 flex items-center gap-2 text-white/75"><Icon name="pin" size={18} /> {pub.location}</p><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{pub.summary}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button disabled={letAgreed} onClick={() => navigate('profile')}>{letAgreed ? 'Let agreed' : 'Start application'}</Button><Button variant="outline" onClick={() => toggleSave(pub.id)}>{saved ? 'Remove from saved' : 'Save pub'}</Button>{letAgreed && <Button variant="outline" onClick={() => navigate('similar', pub.id)}>Show similar pubs</Button>}</div></div><ImagePlaceholder pub={pub} large muted={letAgreed} /></div></div><div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[1fr_360px] lg:px-8"><div className="grid gap-6"><Card><CardContent className="p-6 md:p-8"><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">The opportunity</p><h2 className="mt-2 text-3xl font-black text-[#1c1c31]">Why this pub is worth a look</h2><p className="mt-3 text-slate-600">{pub.idealFor}</p><div className="mt-6 grid gap-4 md:grid-cols-2">{pub.features.map((feature) => <div key={feature} className="rounded-2xl bg-slate-50 p-4 font-black text-[#1c1c31]"><Icon name="check" className="mb-2 text-[#0a87c4]" />{feature}</div>)}</div></CardContent></Card><Card><CardContent className="p-6 md:p-8"><h2 className="text-3xl font-black text-[#1c1c31]">The area</h2><p className="mt-3 leading-7 text-slate-600">{pub.area}</p><div className="mt-6 rounded-2xl bg-slate-50 p-5"><h3 className="font-black text-[#1c1c31]">Demographics</h3><p className="mt-2 leading-7 text-slate-600">{pub.demographics}</p></div></CardContent></Card></div><aside className="grid content-start gap-6"><Card><CardContent className="p-6"><h3 className="text-xl font-black text-[#1c1c31]">Recommended because</h3><ul className="mt-4 grid gap-3 text-sm text-slate-600">{getReasons(pub, profile).map((reason) => <li key={reason} className="flex gap-2"><Icon name="check" size={16} className="text-[#0a87c4]" />{reason}</li>)}</ul></CardContent></Card><Card><CardContent className="p-6"><h3 className="text-xl font-black text-[#1c1c31]">Similar pubs</h3><div className="mt-4 grid gap-3">{similar.map((item) => <button key={item.id} onClick={() => navigate('pubDetail', item.id)} className="rounded-2xl bg-slate-50 p-4 text-left"><p className="font-black text-[#1c1c31]">{item.pub}</p><p className="text-sm text-slate-500">{item.location}</p></button>)}</div></CardContent></Card></aside></div></section>;
}

function SavedPage({ savedVacancies, toggleSave, navigate }) {
  return <section><PageHero eyebrow="Saved pubs" title="Keep track of the pubs you’re interested in." copy="Review saved opportunities, see what is still available and spot pubs that have moved to let agreed." navigate={navigate} side={<Stats stats={[['Saved', savedVacancies.length], ['Available', savedVacancies.filter((p) => p.availability === 'Available').length], ['Let agreed', savedVacancies.filter((p) => p.availability === 'Let agreed').length]]} />} /><div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-2 lg:px-8">{savedVacancies.map((pub) => <VacancyCard key={pub.id} vacancy={pub} saved toggleSave={toggleSave} navigate={navigate} profile={initialProfile} />)}</div></section>;
}

function Stats({ stats }) {
  return <Card className="border-white/10 bg-white/10 text-white shadow-2xl backdrop-blur"><CardContent className={`grid gap-3 p-5 text-center ${stats.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>{stats.map(([label, value]) => <div key={label} className="rounded-2xl bg-white/10 px-2 py-4"><p className="text-3xl font-black leading-none">{value}</p><p className="mt-2 text-[10px] font-bold uppercase leading-tight tracking-[0.06em] text-white/55">{label}</p></div>)}</CardContent></Card>;
}

function ApplicationsPage({ navigate }) {
  const [filter, setFilter] = useState('All applications');
  const shown = filter === 'All applications' ? applications : applications.filter((app) => app.stage === filter);
  return <section><PageHero eyebrow="Applications" title="Track every application in one place." copy="See which pub applications are still ongoing, submitted, in review, accepted or rejected." navigate={navigate} side={<Stats stats={[['Total', applications.length], ['Active', applications.filter((app) => !['Application accepted', 'Application rejected'].includes(app.stage)).length], ['Accepted', applications.filter((app) => app.stage === 'Application accepted').length], ['Rejected', applications.filter((app) => app.stage === 'Application rejected').length]]} />} /><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><Card className="mb-6"><CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"><h2 className="text-2xl font-black text-[#1c1c31]">Ongoing and completed applications</h2><select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"><option>All applications</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></CardContent></Card><div className="grid gap-5">{shown.map((app) => <ApplicationCard key={app.id} app={app} navigate={navigate} />)}</div></div></section>;
}

function ApplicationCard({ app, navigate }) {
  const rejected = app.stage === 'Application rejected';
  const accepted = app.stage === 'Application accepted';
  const source = vacancies.find((pub) => pub.id === app.vacancyId);
  const index = stages.indexOf(app.stage);
  return <Card><CardContent className="grid gap-6 p-5 lg:grid-cols-[1fr_360px]"><div><div className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-black ${accepted ? 'bg-green-50 text-green-700' : rejected ? 'bg-red-50 text-red-700' : 'bg-[#0a87c4]/10 text-[#0a87c4]'}`}>{app.stage}</div><h3 className="text-2xl font-black text-[#1c1c31]">{app.pub}</h3><p className="mt-2 text-sm font-semibold text-slate-500">{app.location}</p><p className="mt-5 leading-7 text-slate-600">{rejected ? 'This opportunity was not progressed on this occasion, but there may be other pubs that suit your experience and preferences.' : 'Your application is being handled by the Licensee Attraction team.'}</p><div className="mt-6 grid gap-3 md:grid-cols-3"><div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-400">Agreement</p><p className="font-black text-[#1c1c31]">{app.agreement}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-400">Next action</p><p className="font-black text-[#1c1c31]">{app.nextAction}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-400">Progress</p><p className="font-black text-[#1c1c31]">{app.progress}%</p></div></div>{rejected && <Button className="mt-5" onClick={() => navigate('similar', source?.id)}>Show similar pubs</Button>}</div><div className="rounded-3xl bg-slate-50 p-5"><h4 className="mb-5 font-black text-[#1c1c31]">Application stage</h4>{stages.map((stage, i) => <div key={stage} className="flex gap-3"><div className="flex flex-col items-center"><div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${i <= index ? rejected && i === index ? 'bg-red-600 text-white' : 'bg-[#0a87c4] text-white' : 'bg-white text-slate-300'}`}>{i <= index ? '✓' : i + 1}</div>{i < stages.length - 1 && <div className={`h-8 w-0.5 ${i < index ? 'bg-[#0a87c4]' : 'bg-slate-200'}`} />}</div><div><p className={`font-black ${i === index ? 'text-[#1c1c31]' : 'text-slate-500'}`}>{stage}</p>{i === index && <p className="text-sm text-slate-500">Current stage</p>}</div></div>)}</div></CardContent></Card>;
}

function SimilarPage({ sourcePub, navigate, profile, saved, toggleSave }) {
  return <section><PageHero eyebrow="Similar pubs" title="This opportunity may have moved on, but others are open." copy="Keep momentum by reviewing similar pubs that are currently available." navigate={navigate} side={<Card className="border-white/10 bg-white/10 text-white"><CardContent className="p-6"><p className="text-sm text-white/60">Based on</p><p className="mt-1 text-2xl font-black">{sourcePub?.pub || 'your preferences'}</p></CardContent></Card>} /><div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-3 lg:px-8">{getSimilarPubs(sourcePub).map((pub) => <VacancyCard key={pub.id} vacancy={pub} saved={saved.includes(pub.id)} toggleSave={toggleSave} navigate={navigate} profile={profile} />)}</div></section>;
}

function SignInPage({ navigate }) {
  const [email, setEmail] = useState(dummyCredentials.email);
  const [password, setPassword] = useState(dummyCredentials.password);
  const [message, setMessage] = useState('Use the dummy credentials shown to simulate signing in.');
  const submit = (e) => { e.preventDefault(); if (email.toLowerCase() === dummyCredentials.email && password === dummyCredentials.password) { setMessage('Signed in successfully. Redirecting to your profile...'); setTimeout(() => navigate('profile'), 650); } else { setMessage('Those details do not match the dummy account.'); } };
  return <section><PageHero eyebrow="Candidate sign in" title="Sign in to continue your pub search." copy="This mock credentials page simulates a secure sign-in flow using a dummy email address and password." navigate={navigate} side={<Card className="border-white/10 bg-white/10 text-white"><CardContent className="p-6"><p className="text-sm text-white/60">Email</p><p className="font-black">{dummyCredentials.email}</p><p className="mt-4 text-sm text-white/60">Password</p><p className="font-black">{dummyCredentials.password}</p></CardContent></Card>} /><div className="mx-auto max-w-4xl px-5 py-12"><Card><CardContent className="p-6 md:p-8"><form onSubmit={submit} className="grid gap-5"><input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4" /><div className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">{message}</div><Button type="submit">Sign in</Button></form></CardContent></Card></div></section>;
}

export default function App() {
  const [page, setPage] = useState('home');
  const [param, setParam] = useState(null);
  const [saved, setSaved] = useState([1, 3, 5]);
  const [profile, setProfile] = useState(initialProfile);
  const currentPub = vacancies.find((pub) => pub.id === param);
  const savedVacancies = vacancies.filter((pub) => saved.includes(pub.id));
  const navigate = (nextPage, nextParam = null) => { setPage(nextPage); setParam(nextParam); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleSave = (id) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return <main className="min-h-screen bg-slate-50 font-sans text-slate-900"><Header page={page} navigate={navigate} />{page === 'profile' ? <ProfilePage profile={profile} setProfile={setProfile} navigate={navigate} savedVacancies={savedVacancies} /> : page === 'saved' ? <SavedPage savedVacancies={savedVacancies} toggleSave={toggleSave} navigate={navigate} /> : page === 'applications' ? <ApplicationsPage navigate={navigate} /> : page === 'pubDetail' ? <PubDetailPage pub={currentPub} navigate={navigate} toggleSave={toggleSave} saved={currentPub ? saved.includes(currentPub.id) : false} profile={profile} /> : page === 'similar' ? <SimilarPage sourcePub={currentPub} navigate={navigate} profile={profile} saved={saved} toggleSave={toggleSave} /> : page === 'signin' ? <SignInPage navigate={navigate} /> : <HomePage navigate={navigate} profile={profile} saved={saved} toggleSave={toggleSave} />}<footer className="bg-[#1c1c31] px-5 py-10 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><StarMark /><p className="max-w-xl text-sm leading-7 text-white/65">Prototype for a standalone recruitment portal on starpubs.co.uk, using Star Pubs colours, clear typography, dynamic cards and candidate-first functionality.</p></div></footer></main>;
}
