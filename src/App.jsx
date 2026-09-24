import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const base = import.meta.env.BASE_URL || '/';
const asset = (path) => base + 'images/' + path;

const STAR_NAVY = '#1c1c31';
const STAR_BLUE = '#0a87c4';
const STAR_PALE = '#eaf6fd';

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
    features: ['Ornate period features', 'City centre location', 'Drinks-led trading style', 'Strong local identity'],
    costs: '£4,000 unborrowed funds',
    earnings: 'Revenue share + profit share'
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
    summary: 'A city centre opportunity designed for day-to-night trade, events and premium drinks occasions.',
    availability: 'Available',
    image: asset('pearces-bar-edinburgh.jpg'),
    imageLabel: 'Premium city bar exterior',
    idealFor: 'A confident host who can deliver high standards, events and premium drinks trade.',
    area: 'Positioned for strong city footfall, with a trading opportunity that can flex from daytime visits into evening events.',
    features: ['Refurbishment planned', 'Premium drinks focus', 'Live events potential', 'High footfall location'],
    costs: '£4,000 unborrowed funds',
    earnings: 'Revenue share + profit share'
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
    image: asset('StarPubs-Lifestyle-18.jpg'),
    imageLabel: 'Village destination pub',
    idealFor: 'An experienced operator with the ambition to grow a food-led community and destination offer.',
    area: 'A village-style setting with scope to draw from locals and destination guests looking for a quality pub visit.',
    features: ['Investment opportunity', 'Food-led potential', 'Beer garden', 'Community role'],
    costs: 'Pub-specific entry costs',
    earnings: 'Business profit after costs'
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
    image: asset('StarPubs-Lifestyle-50.jpg'),
    imageLabel: 'Community local exterior',
    idealFor: 'A community-minded licensee who can build regular trade through sport, events and local engagement.',
    area: 'A local trading area with scope to build loyalty and repeat visits through consistent standards and community activity.',
    features: ['Wet-led opportunity', 'Sports focus', 'Fixtures and fittings deal', 'Local customer base'],
    costs: 'Pub-specific entry costs',
    earnings: 'Business profit after costs'
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
    image: asset('StarPubs-Lifestyle-54.jpg'),
    imageLabel: 'Suburban local pub',
    idealFor: 'An experienced local pub operator who can build trade around sport, community and outdoor space.',
    area: 'A suburban trading location with the potential to serve regulars, families and sports-led occasions.',
    features: ['Community pub', 'Sports opportunity', 'Beer garden', 'Suburban location'],
    costs: 'Pub-specific entry costs',
    earnings: 'Business profit after costs'
  }
];

const agreementOptions = ['Just Add Talent', 'Leased & Tenanted', 'Investment Tenancy Agreement'];
const propertyFilters = ['Community', 'Drinks-led', 'Food opportunity', 'Sports', 'City centre', 'Beer garden', 'Live events'];
const regions = ['All regions', 'Scotland', 'West Midlands', 'East Midlands', 'North West', 'Yorkshire'];
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
  { id: 101, vacancyId: 1, pub: 'The Rose Villa Tavern', location: 'Birmingham, West Midlands', agreement: 'Just Add Talent', stage: 'Application ongoing', progress: 56, nextAction: 'Continue your business plan and upload your supporting documents.' },
  { id: 102, vacancyId: 2, pub: 'Pearce’s Bar', location: 'Edinburgh, Scotland', agreement: 'Just Add Talent', stage: 'Submitted', progress: 100, nextAction: 'Your application has been submitted to the regional team.' },
  { id: 103, vacancyId: 4, pub: 'Ring O Bells', location: 'Chester, Cheshire', agreement: 'Leased & Tenanted', stage: 'Application accepted', progress: 100, nextAction: 'A member of our Licensee Attraction team will be in touch to discuss the next steps.' },
  { id: 104, vacancyId: 5, pub: 'The Crown Inn', location: 'Leeds, West Yorkshire', agreement: 'Leased & Tenanted', stage: 'Application rejected', progress: 100, nextAction: 'This application has not progressed, but you can still explore similar opportunities.' }
];

const quickAnswerCards = [
  { title: 'Can first-time publicans apply?', copy: 'Yes. The right route depends on your experience, transferable skills, finances and the individual pub.', icon: 'user', action: 'Learn about experience', target: 'getting-started' },
  { title: 'What is the lowest-cost route?', copy: 'Just Add Talent currently requires £4,000 in unborrowed funds. Leased & Tenanted entry costs vary by pub and usually start from £10,000.', icon: 'wallet', action: 'Compare costs', target: 'money-costs-earnings' },
  { title: 'Where are opportunities available?', copy: 'Star Pubs has pubs across England, Scotland and Wales, from community locals to food-led, high street and destination pubs.', icon: 'pin', action: 'Browse pubs', page: 'portalHome' },
  { title: 'What should I do first?', copy: 'Browse current pub opportunities, compare the agreement types and apply for the pub that best fits you.', icon: 'search', action: 'Find a pub', page: 'portalHome' }
];

const faqSections = [
  {
    id: 'getting-started',
    title: 'Getting started',
    subtitle: 'Experience, skills, licences and finding a pub.',
    intro: 'The essentials: how to apply, how to choose a pub and what experience, skills and setup you may need.',
    faqs: [
      {
        q: 'How do I apply to run a pub with Star Pubs?',
        a: <><p>Browse the website to find a pub opportunity that suits you and apply online from that pub’s page.</p><p>If you are not ready to choose a specific pub yet, you can submit a generic application, compare the agreement options or register for vacancy alerts first.</p><p>After you apply, a Licensee Attraction Manager will contact you to learn more about your experience, skills and plans. The next steps depend on whether the pub is offered on Just Add Talent or a Leased & Tenanted agreement, with time built in for you to understand the pub and agreement before you commit.</p></>,
        cta: 'Find a pub to run'
      },
      {
        q: 'How do I find the right pub opportunity for me?',
        a: <><p>Start with the four things that will shape your shortlist.</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><InfoPill title="Location" copy="Where you want to operate." /><InfoPill title="Investment" copy="How much start-up capital you have to launch your pub business." /><InfoPill title="Freedom" copy="How much control you want over the pub’s offer." /><InfoPill title="Experience" copy="The skills and track record you can bring." /></div><p className="mt-4">Then compare each pub’s agreement type, entry costs, trading style, facilities and any planned investment. The best fit is not simply the biggest or busiest pub; it is the opportunity that matches your strengths, lifestyle and commercial ambitions.</p></>
      },
      {
        q: 'Do I need previous pub or hospitality experience?',
        a: <><p>No, not for every opportunity.</p><p>Star Pubs considers the skills and experience needed for the individual pub and agreement. Some opportunities can suit first-time publicans, while others need an experienced hospitality operator.</p><p>Our Just Add Talent management agreement can suit people with strong transferable skills in customer service, people management, retail, marketing, cash management or stock management. For Leased & Tenanted pubs, the experience required depends on the scale, offer and complexity of the business. Each pub advert explains the type of licensee we are looking for.</p></>
      },
      {
        q: 'What skills, qualifications and licences do I need to run a pub?',
        a: <><p>You need strong people and business skills, a personal licence, the right to work in the UK and the ability to pass a credit check. Star Pubs will guide you through the licensing and pre-entry training required before you take on a pub.</p><ul><li>A personal licence.</li><li>The right to work in the UK.</li><li>The ability to pass a credit check.</li><li>For Leased & Tenanted applicants, pre-entry training includes the BII’s Pre-Entry Awareness Training.</li></ul><p>Useful skills include customer service, team leadership, commercial awareness, cash and stock control, marketing, compliance and the ability to deliver a consistent retail offer.</p></>
      },
      {
        q: 'Can I run a pub with my partner, family member or business partner?',
        a: <><p>Yes. You can discuss a joint application or business arrangement with Star Pubs.</p><p>The right setup depends on the agreement, the legal structure of the business and who will be responsible for the day-to-day operation of the pub.</p><ul><li>Be clear about who will sign the agreement and how responsibilities will be divided.</li><li>Agree how the business will be funded and who will hold the required personal licence.</li><li>For Just Add Talent, you are required to set up a limited company.</li><li>For Leased & Tenanted pubs, you can operate as a sole trader, partnership or limited company.</li></ul></>
      }
    ]
  },
  {
    id: 'understanding-agreements',
    title: 'Understanding the agreements',
    subtitle: 'Just Add Talent, Leased & Tenanted, the tie and control.',
    intro: 'How Just Add Talent and Leased & Tenanted agreements differ, what the drinks tie means and how much control you have.',
    faqs: [
      {
        q: 'What types of pub agreement does Star Pubs offer?',
        a: <><p>There are two main routes: Just Add Talent, our Management Agreement, and our Leased & Tenanted model.</p><ul><li><strong>Just Add Talent:</strong> a centrally supported Management Agreement where Star Pubs sets the core offer and covers most major operating costs.</li><li><strong>Leased & Tenanted:</strong> you run your own pub business with more freedom over the offer and take responsibility for rent and operating costs.</li><li><strong>Leased & Tenanted options:</strong> Foundation Tenancy and Investment Tenancy in England, Wales and Scotland, plus Fully Repairing and Insuring leases in England and Wales.</li><li><strong>Temporary opportunities:</strong> selected pubs may also be offered on a temporary agreement while their longer-term future is prepared.</li></ul><p>Every advertised pub shows the agreement being offered so you can understand the commercial model before applying.</p></>
      },
      {
        q: 'What is the Just Add Talent Management Agreement?',
        a: <><p>Just Add Talent is Star Pubs’ Management Agreement: we set the core pub offer and cover most major operating costs, while you deliver the offer and employ and manage your team.</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><InfoPill title="Entry" copy="£4,000 in unborrowed funds." /><InfoPill title="Operating costs" copy="No rent, utilities, business rates or maintenance cost for the operator." /><InfoPill title="Weekly revenue share" copy="Currently 20% to 30% of net turnover, depending on the size of the pub and whether food is part of the offer." /><InfoPill title="Quarterly profit share" copy="20% of the pub’s net operating profit, uncapped." /><InfoPill title="Your role" copy="Deliver the core offer and recruit, employ and manage the pub team." /><InfoPill title="Agreement length" copy="Open-ended. The operator can currently end it with three months’ notice." /></div><p className="mt-4">The exact terms and percentage for an individual pub are confirmed as part of the commercial agreement.</p></>
      },
      {
        q: 'What is the difference between Just Add Talent and a leased or tenanted pub?',
        a: <><p>The biggest difference is how much of the business model Star Pubs provides and how much commercial responsibility you take on.</p><ComparisonTable headers={['', 'Just Add Talent', 'Leased & Tenanted']} rows={[
          ['Entry cost', '£4,000 in unborrowed funds', 'Varies by pub; most require a minimum of £10,000'],
          ['Core offer', 'Set by Star Pubs', 'More freedom to shape your own offer'],
          ['Major operating costs', 'Most covered by Star Pubs', 'You pay rent and normal operating costs'],
          ['How you earn', 'Weekly revenue share plus quarterly profit share', 'You keep the business profit after costs'],
          ['Drinks tie', 'Core offer set by Star Pubs', 'Backed by HEINEKEN UK, agreements are tied for beer, cider, alcopops and soft drinks but free-of-tie on wine and spirits']
        ]} /></>
      },
      {
        q: 'What is the difference between a Foundation Tenancy, an Investment Tenancy and an FRI Lease?',
        a: <><p>They are different Leased & Tenanted agreements, with different terms, repair responsibilities and exit rights.</p><div className="mt-4 grid gap-3 md:grid-cols-2"><InfoPill title="Foundation Tenancy - England & Wales" copy="Five-year fixed term and fixed rent, three months’ tenant notice and reduced repair obligations." /><InfoPill title="Foundation Tenancy - Scotland" copy="Three-year fixed term and fixed rent, three months’ tenant notice and reduced repair obligations." /><InfoPill title="Investment Tenancy - England & Wales" copy="Five-year rolling term for qualifying invested pubs, with rent review every five years and Landlord and Tenant Act 1954 protection." /><InfoPill title="Investment Tenancy - Scotland" copy="Five-year fixed term for qualifying invested pubs, fixed rent for the term and reduced repair obligations." /><InfoPill title="FRI Lease - England & Wales only" copy="Minimum ten-year term, assignable after two years, five-year rent reviews and full repairing responsibility." /><InfoPill title="Which should I assess?" copy="The agreement shown on the individual pub opportunity page is the one to review for that pub." /></div></>
      },
      {
        q: 'What is the beer tie and which drinks can I buy from other suppliers?',
        a: <><p>Backed by HEINEKEN UK, all Leased & Tenanted agreements are tied for beer, cider, alcopops and soft drinks but free-of-tie on wine and spirits. For Just Add Talent, the drinks offer is set by Star Pubs.</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><InfoPill title="Purchased through Star Pubs" copy="Beer, cider, alcopops and soft drinks." /><InfoPill title="Free-of-tie" copy="Wine and spirits." /></div><p className="mt-4">Additional rights may apply depending on where the pub is located. In Scotland, the Scottish Pubs Code includes a guest beer right for eligible tied tenants. Always check the exact tie terms in the agreement you are considering.</p></>
      },
      {
        q: 'What legal protections and pub codes apply to my agreement?',
        a: <><p>The legal position depends on the agreement and whether the pub is in England and Wales or Scotland.</p><ul><li><strong>England and Wales:</strong> Star Pubs is covered by the Pubs Code for tied pub tenants. The Foundation Tenancy is contracted out of the Landlord and Tenant Act 1954, while the Investment Tenancy and FRI Lease are protected by it.</li><li><strong>Scotland:</strong> the Scottish Pubs Code has applied since 31 March 2025 and includes rights around fair rent assessment, guest beer and Market Rent Only requests.</li><li><strong>Before signing:</strong> always take independent legal advice so you understand the protections and termination rights that apply to your agreement.</li></ul></>
      },
      {
        q: 'How much control will I have over the pub’s food, drinks, events and team?',
        a: <><p>It depends on the agreement. Just Add Talent gives you a defined core offer to deliver; Leased & Tenanted agreements give you more freedom to shape your own pub business.</p><ComparisonTable headers={['', 'Just Add Talent', 'Leased & Tenanted']} rows={[
          ['Food and drinks', 'Star Pubs sets the core retail offer, menus and brands', 'You can shape your own offer, subject to the agreement and drinks tie'],
          ['Team', 'You recruit, employ and manage your team', 'You recruit, employ and manage your team'],
          ['Events and marketing', 'You are responsible for local events, entertainment and pub marketing, with Star Pubs support and resources available', 'You shape your own events, marketing and customer proposition'],
          ['Free-of-tie', 'Core offer applies', 'Wine and spirits are free-of-tie']
        ]} /></>
      }
    ]
  },
  {
    id: 'money-costs-earnings',
    title: 'Money, costs and earnings',
    subtitle: 'Entry capital, responsibilities, profit and rent.',
    intro: 'Clear answers on the money you may need, which costs sit with you and how earnings and rent work.',
    faqs: [
      {
        q: 'How much money do I need to run a pub with Star Pubs?',
        a: <><p>It depends on the agreement and the pub. Just Add Talent currently requires £4,000 in unborrowed funds; Leased & Tenanted entry costs vary by opportunity.</p><p>As a broad guide, Star Pubs currently illustrates the following levels for Leased & Tenanted opportunities:</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><InfoPill title="Around £10,000" copy="Smaller pubs or opportunities that may suit a first-time operator." /><InfoPill title="Around £30,000" copy="Medium-sized pub opportunities." /><InfoPill title="£50,000+" copy="Larger opportunities that may suit experienced or multi-site operators." /><InfoPill title="Check the pub page" copy="These figures are guides, not fixed prices. Each opportunity page shows the indicative entry-cost breakdown." /></div></>
      },
      {
        q: 'What upfront and ongoing costs will I be responsible for, and what does Star Pubs cover?',
        a: <><p>Your responsibilities depend on the agreement. Just Add Talent removes many major pub running costs; Leased & Tenanted licensees take responsibility for a wider range of business costs.</p><ComparisonTable headers={['', 'Just Add Talent', 'Leased & Tenanted']} rows={[
          ['Star Pubs covers', 'Stock, rent, utilities, business rates and maintenance', 'Support depends on the pub and agreement'],
          ['You cover', 'Your team costs, your own income and business expenses outside the agreement, such as liability insurance', 'Entry costs, rent and the normal costs of operating the business'],
          ['Entry costs', '£4,000 in unborrowed funds', 'Can include deposit, stock, fixtures and fittings and working capital'],
          ['Repairs', 'Maintenance covered by Star Pubs', 'Foundation and Investment Tenancies have reduced obligations; FRI Lease carries full repairing responsibility']
        ]} /><p className="mt-4">The individual pub page and pre-entry information will set out the specific costs and responsibilities for the opportunity.</p></>
      },
      {
        q: 'How do earnings and profit potential work under each agreement?',
        a: <><p>Just Add Talent uses a revenue-share model plus an uncapped quarterly profit share. Leased & Tenanted operators keep the profit their own pub business generates after costs.</p><ul><li><strong>Just Add Talent:</strong> currently a weekly revenue share of 20% to 30% of net turnover, from which you pay staff wages, your own income and business expenses not covered by Star Pubs, plus 20% of net operating profit paid quarterly.</li><li><strong>Leased & Tenanted:</strong> you keep the business profit after rent, product and operating costs. Earnings therefore depend on the pub’s trading performance and how the business is run.</li><li><strong>Before commitment:</strong> Star Pubs provides financial information for Leased & Tenanted pubs, including a rent assessment and shadow profit-and-loss information to support your business planning.</li></ul></>
      },
      {
        q: 'How is the rent set and reviewed on a leased or tenanted pub?',
        a: <><p>The proposed rent is set out before you sign and is supported by a rent assessment so you can review the assumptions as part of your business plan.</p><ul><li><strong>Foundation Tenancy:</strong> rent is fixed for the term - five years in England and Wales and three years in Scotland.</li><li><strong>Investment Tenancy:</strong> rent is fixed for the relevant five-year term. In England and Wales, where the agreement can roll, rent is reviewed every five years.</li><li><strong>FRI Lease:</strong> rent is reviewed every five years.</li><li><strong>Annual increases:</strong> Star Pubs’ current new agreements do not have annual RPI rent increases.</li><li>Always review the pub-specific rent assessment and take independent financial and legal advice before signing.</li></ul></>
      }
    ]
  },
  {
    id: 'application-training-support',
    title: 'Application, training and ongoing support',
    subtitle: 'What happens next, timescales, training and exit.',
    intro: 'What the journey looks like after you apply, how long it can take and what support is available before and after opening.',
    faqs: [
      {
        q: 'What happens after I apply to run a pub?',
        a: <><p>A Licensee Attraction Manager will contact you first to understand your experience, skills and plans.</p><p>If the opportunity looks like a good fit, you move through a structured process designed to help you get the right pub on the right agreement for your needs.</p><div className="mt-4 grid gap-3 md:grid-cols-2"><InfoPill title="Leased & Tenanted journey" copy="Telephone interview, meeting with the Business Development Manager, pre-entry training, business plan, business-plan interview, final preparations and start day." /><InfoPill title="Just Add Talent journey" copy="Assessment journey, Just Add Knowledge training, business proposal, five days of on-the-job House of Excellence training, final signing and start day." /></div></>
      },
      {
        q: 'How long does the application process take?',
        a: <><p>As a guide, Leased & Tenanted applications typically take a minimum of six months, while the minimum expectation for Just Add Talent is typically three months.</p><p>Every case is different. Licensing, training, business planning, professional advice, checks and any refurbishment can all affect timing. The attraction team will keep you updated as you progress rather than promising a fixed opening date at the start.</p></>
      },
      {
        q: 'What training and support will I receive before and after opening?',
        a: <><p>Training starts before you take on the pub and support continues after opening.</p><ul><li><strong>Leased & Tenanted:</strong> Innside Knowledge, a two-day virtual course.</li><li><strong>Just Add Talent:</strong> Just Add Knowledge, a two-day virtual course covering the key aspects of running a Just Add Talent pub, followed by a practical five-day on-the-job House of Excellence programme at a high-performing Just Add Talent pub.</li><li><strong>Both routes:</strong> the initial programmes include one year’s BII subscription and access to Star Pubs’ e-learning platform, with more than 50 modules covering areas such as food safety, allergens, conflict management and interview skills.</li><li><strong>Once you are trading:</strong> a Business Development Manager provides ongoing support, alongside marketing, retail, operational and online resources such as MyStar.</li></ul></>
      },
      {
        q: 'What happens if I need to leave the agreement early or the pub is not right for me?',
        a: <><p>Your exit rights depend on the agreement, so make sure you understand them fully and take independent legal advice before committing.</p><ul><li><strong>Just Add Talent:</strong> the current agreement can be ended by the operator with three months’ notice.</li><li><strong>Foundation Tenancy:</strong> in England, Wales and Scotland, the tenant can terminate with three months’ notice.</li><li><strong>Investment Tenancy:</strong> longer-term arrangements have different termination provisions. In England and Wales, the five-year rolling agreement can generally end at the five-year anniversary.</li><li><strong>FRI Lease:</strong> minimum ten-year agreement, assignable after two years subject to the lease terms.</li></ul><p>The application process is designed to help you decide whether the pub and agreement are right for you before you sign.</p></>
      }
    ]
  }
];


const cx = (...classes) => classes.filter(Boolean).join(' ');

function iconPath(name) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    pin: <><path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6z" />,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M18 9h2v12" /><path d="M8 7h4M8 11h4M8 15h4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    back: <><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    x: <><path d="M18 6 6 18M6 6l12 12" /></>,
    sparkle: <path d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2z" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    file: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
    message: <><path d="M4 5h16v11H8l-4 4z" /></>,
    wallet: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M16 9h5v6h-5a3 3 0 0 1 0-6z" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M14 3h7v18h-7" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    filter: <><path d="M4 6h16M7 12h10M10 18h4" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>
  };
  return paths[name] || paths.sparkle;
}

function Icon({ name, size = 20, className = '', filled = false }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{iconPath(name)}</svg>;
}

function Button({ children, variant = 'solid', className = '', ...props }) {
  const variants = {
    solid: 'bg-[#0a87c4] text-white hover:bg-[#0877ad] shadow-sm',
    navy: 'bg-[#1c1c31] text-white hover:bg-[#272744]',
    light: 'border border-slate-200 bg-white text-[#1c1c31] hover:border-[#0a87c4] hover:text-[#0a87c4]',
    ghost: 'bg-white/10 text-white hover:bg-white/15',
    soft: 'bg-[#eaf6fd] text-[#086f9f] hover:bg-[#d8effb]'
  };
  return <button className={cx('inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0a87c4]/25 disabled:pointer-events-none disabled:opacity-50', variants[variant], className)} {...props}>{children}</button>;
}

function StarLogo({ mode = 'white', className = '' }) {
  const src = mode === 'dark' ? asset('Star_Pubs_Black_Blue_RGB.jpg') : asset('Star_Pubs_White_Blue_RGB.png');
  return <img src={src} alt="Star Pubs" className={cx('h-11 w-auto object-contain', className)} />;
}

function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return <div className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center')}><p className="text-xs font-black uppercase tracking-[0.22em] text-[#0a87c4]">{eyebrow}</p><h2 className="mt-3 text-3xl font-black leading-tight text-[#1c1c31] md:text-5xl">{title}</h2>{copy && <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{copy}</p>}</div>;
}

function InfoPill({ title, copy }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="font-black text-[#1c1c31]">{title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p></div>;
}

function ComparisonTable({ headers, rows }) {
  return <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200"><table className="w-full min-w-[640px] border-collapse text-left text-sm"><thead><tr>{headers.map((header) => <th key={header} className="bg-[#1c1c31] px-4 py-3 font-black text-white">{header || ' '}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} className="border-t border-slate-200">{row.map((cell, cellIndex) => <td key={cellIndex} className={cx('px-4 py-3 align-top leading-6', cellIndex === 0 ? 'bg-slate-50 font-black text-[#1c1c31]' : 'text-slate-600')}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function AgreementBadge({ agreement }) {
  if (agreement === 'Just Add Talent') return <span className="inline-flex rounded-md bg-[#0a87c4] px-3 py-1.5 text-xs font-black text-white">{agreement}</span>;
  if (agreement === 'Investment Tenancy Agreement') return <span className="inline-flex rounded-md bg-[#1c1c31] px-3 py-1.5 text-xs font-black text-white">Investment Tenancy</span>;
  return <span className="inline-flex rounded-md border border-[#1c1c31] bg-white px-3 py-1.5 text-xs font-black text-[#1c1c31]">{agreement}</span>;
}

function AccountMenu({ profile, navigate, onLogout }) {
  const [open, setOpen] = useState(false);
  const initials = profile.firstName[0] + profile.lastName[0];
  const items = [
    ['profile', 'My profile', 'Update your details and preferences', 'user'],
    ['portalHome', 'Applicant portal', 'Return to your personalised search', 'home'],
    ['saved', 'Saved pubs', 'Review your shortlist', 'heart'],
    ['applications', 'Applications', 'Track application progress', 'file'],
    ['faqs', 'FAQs', 'Get help with the process', 'message']
  ];
  return <div className="relative"><button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full bg-white/10 p-1.5 pr-3 text-white transition hover:bg-white/15" aria-expanded={open}><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a87c4] text-xs font-black ring-2 ring-white/20">{initials}</span><span className="hidden text-sm font-black lg:inline">{profile.firstName}</span><Icon name="chevronDown" size={16} /></button><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} className="absolute right-0 mt-3 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white text-[#1c1c31] shadow-2xl"><div className="bg-[#1c1c31] p-4 text-white"><div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a87c4] text-sm font-black">{initials}</span><div><p className="font-black">{profile.firstName + ' ' + profile.lastName}</p><p className="mt-0.5 text-xs text-white/65">{profile.email}</p></div></div></div><div className="p-2">{items.map(([target, label, copy, icon]) => <button key={target} onClick={() => { setOpen(false); navigate(target); }} className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"><span className="mt-0.5 text-[#0a87c4]"><Icon name={icon} size={18} /></span><span><span className="block text-sm font-black">{label}</span><span className="mt-0.5 block text-xs leading-5 text-slate-500">{copy}</span></span></button>)}<div className="my-2 border-t border-slate-200" /><button onClick={() => { setOpen(false); onLogout(); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-black text-red-600 transition hover:bg-red-50"><Icon name="logout" size={18} />Log out</button></div></motion.div>}</AnimatePresence></div>;
}

function PublicHeader({ page, navigate, signedIn, profile, onLogout }) {
  const [open, setOpen] = useState(false);
  const nav = [['portalHome', 'Find a pub'], ['agreements', 'Our agreements'], ['faqs', 'FAQs']];
  return <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8"><button onClick={() => navigate('siteHome')} aria-label="Star Pubs home"><StarLogo mode="dark" /></button><nav className="hidden items-center gap-7 text-sm font-black text-[#1c1c31] md:flex">{nav.map(([target, label]) => <button key={target} onClick={() => navigate(target)} className={cx('transition hover:text-[#0a87c4]', page === target && 'text-[#0a87c4]')}>{label}</button>)}</nav><div className="hidden items-center gap-3 md:flex">{signedIn ? <><Button variant="light" onClick={() => navigate('portalHome')}>Applicant portal</Button><AccountMenu profile={profile} navigate={navigate} onLogout={onLogout} /></> : <><Button variant="light" onClick={() => navigate('signin')}>Sign in</Button><Button onClick={() => navigate('portalHome')}>Find a pub</Button></>}</div><button className="rounded-lg p-2 text-[#1c1c31] md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu"><Icon name={open ? 'x' : 'menu'} /></button></div><AnimatePresence>{open && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-slate-200 bg-white md:hidden"><div className="grid gap-2 px-5 py-4">{nav.map(([target, label]) => <button key={target} className="rounded-lg px-3 py-3 text-left text-sm font-black text-[#1c1c31] hover:bg-slate-50" onClick={() => { setOpen(false); navigate(target); }}>{label}</button>)}<Button onClick={() => { setOpen(false); navigate(signedIn ? 'portalHome' : 'signin'); }}>{signedIn ? 'Applicant portal' : 'Sign in'}</Button></div></motion.div>}</AnimatePresence></header>;
}

function PortalHeader({ page, navigate, signedIn, profile, onLogout }) {
  const [open, setOpen] = useState(false);
  const nav = [['portalHome', 'Portal home'], ['saved', 'Saved pubs'], ['applications', 'Applications'], ['faqs', 'FAQs']];
  const goVacancies = () => { navigate('portalHome'); setTimeout(() => document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' }), 100); };
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1c1c31]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8"><button onClick={() => navigate('siteHome')} aria-label="Star Pubs home"><StarLogo /></button><nav className="hidden items-center gap-5 text-sm font-bold text-white/75 md:flex"><button onClick={() => navigate('siteHome')} className="hover:text-white">Star Pubs home</button><span className="h-4 w-px bg-white/25" />{nav.map(([target, label]) => <button key={target} onClick={() => navigate(target)} className={cx('transition hover:text-white', page === target && 'text-white')}>{label}</button>)}<button onClick={goVacancies} className="hover:text-white">Vacancies</button></nav><div className="hidden md:block">{signedIn ? <AccountMenu profile={profile} navigate={navigate} onLogout={onLogout} /> : <Button variant="ghost" onClick={() => navigate('signin')}>Sign in</Button>}</div><button className="rounded-lg p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu"><Icon name={open ? 'x' : 'menu'} /></button></div><AnimatePresence>{open && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#1c1c31] md:hidden"><div className="grid gap-2 px-5 py-4 text-sm font-bold text-white/80"><button className="rounded-lg px-3 py-3 text-left hover:bg-white/5" onClick={() => { setOpen(false); navigate('siteHome'); }}>Star Pubs home</button>{nav.map(([target, label]) => <button key={target} className="rounded-lg px-3 py-3 text-left hover:bg-white/5" onClick={() => { setOpen(false); navigate(target); }}>{label}</button>)}<button className="rounded-lg px-3 py-3 text-left hover:bg-white/5" onClick={() => { setOpen(false); goVacancies(); }}>Vacancies</button></div></motion.div>}</AnimatePresence></header>;
}

function HeroImage({ src, alt, children, overlay = 'strong' }) {
  return <div className="absolute inset-0"><img src={src} alt={alt} className="h-full w-full object-cover" /><div className={cx('absolute inset-0', overlay === 'gradient' ? 'bg-[linear-gradient(90deg,rgba(28,28,49,0.92)_0%,rgba(28,28,49,0.82)_50%,rgba(28,28,49,0.58)_100%)]' : 'bg-[#1c1c31]/80')} />{children}</div>;
}

function PublicHomePage({ navigate, signedIn }) {
  const featured = vacancies.filter((v) => v.availability === 'Available').slice(0, 3);
  return <><section className="relative isolate overflow-hidden bg-[#1c1c31] text-white"><HeroImage src={asset('home-banner.jpg')} alt="Star Pubs pub interior" overlay="gradient" /><div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1.05fr_0.75fr] lg:px-8"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><p className="text-xs font-black uppercase tracking-[0.24em] text-[#47b9ea]">Run a pub with Star Pubs</p><h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.98] tracking-tight md:text-7xl">Find the pub opportunity that fits your ambition.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">Explore available pubs, understand the agreement options and move from discovery to application in one connected journey.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button className="px-7 py-4 text-base" onClick={() => navigate('portalHome')}>Find a pub <Icon name="arrow" size={18} /></Button><Button variant="ghost" className="px-7 py-4 text-base" onClick={() => navigate(signedIn ? 'portalHome' : 'signin')}>{signedIn ? 'Open applicant portal' : 'Sign in / create profile'}</Button></div></motion.div><div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md"><p className="text-sm font-black uppercase tracking-[0.18em] text-[#47b9ea]">A clearer route to running a pub</p><div className="mt-6 grid gap-4">{[['1', 'Discover', 'Search by location, agreement and pub style.'], ['2', 'Shortlist', 'Save the pubs that feel right and compare options.'], ['3', 'Apply', 'Move through your application in one place.']].map(([number, title, copy]) => <div key={number} className="flex gap-4 rounded-2xl bg-white/10 p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a87c4] font-black">{number}</span><div><p className="font-black">{title}</p><p className="mt-1 text-sm leading-6 text-white/70">{copy}</p></div></div>)}</div></div></div></section>
  <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><SectionHeading eyebrow="Choose your route" title="Different ways to run a Star Pubs pub" copy="Start with the operating model that feels closest to what you want, then explore the individual pub opportunities available on that route." /><div className="mt-8 grid gap-5 lg:grid-cols-3">{[
    ['Just Add Talent', 'A supported management agreement with a lower entry point and a defined core offer.', 'Just Add Talent'],
    ['Leased & Tenanted', 'Run your own pub business with more freedom to shape the offer and trading plan.', 'Leased & Tenanted'],
    ['Investment opportunities', 'Explore pubs where planned investment can help unlock the next chapter.', 'Investment Tenancy Agreement']
  ].map(([title, copy, agreement]) => <button key={title} onClick={() => navigate('portalHome', null, {agreement})} className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#0a87c4]/40 hover:shadow-xl"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf6fd] text-[#0a87c4]"><Icon name="building" /></span><h3 className="mt-5 text-2xl font-black text-[#1c1c31]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{copy}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0a87c4]">Explore opportunities <Icon name="arrow" size={16} /></span></button>)}</div></section>
  <section className="bg-[#eaf6fd]"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><SectionHeading eyebrow="Featured opportunities" title="A few pubs to get you started" copy="Browse current examples, then use the applicant portal to filter the wider vacancy list around what matters to you." /><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{featured.map((pub) => <PublicPubCard key={pub.id} pub={pub} navigate={navigate} />)}</div><div className="mt-8"><Button onClick={() => navigate('portalHome')}>View all pub opportunities</Button></div></div></section>
  <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><SectionHeading eyebrow="Support from day one" title="Understand the opportunity before you commit" copy="Use the FAQs and agreement guides to understand costs, responsibilities, training and what happens after you apply." /><div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => navigate('faqs')}>Read the FAQs</Button><Button variant="light" onClick={() => navigate('agreements')}>Compare agreements</Button></div></div><img src={asset('dream-pub-studio.jpg')} alt="Star Pubs support" className="h-[360px] w-full rounded-[2rem] object-cover shadow-xl" /></div></section></>;
}

function PublicPubCard({ pub, navigate }) {
  return <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"><div className="relative h-56"><img src={pub.image} alt={pub.pub} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-4 left-4"><AgreementBadge agreement={pub.agreement} /></div></div><div className="p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-[#0a87c4]">{pub.availability}</p><h3 className="mt-2 text-2xl font-black text-[#1c1c31]">{pub.pub}</h3><p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500"><Icon name="pin" size={16} />{pub.location}</p><p className="mt-4 line-clamp-3 leading-7 text-slate-600">{pub.summary}</p><Button variant="light" className="mt-5 w-full" onClick={() => navigate('pubDetail', pub.id)}>View opportunity</Button></div></article>;
}

function AgreementsPage({ navigate }) {
  const cards = [
    { title: 'Just Add Talent', eyebrow: 'Management Agreement', copy: 'A centrally supported route where Star Pubs sets the core retail offer and covers most major operating costs.', points: ['£4,000 in unborrowed funds', 'Weekly revenue share', '20% quarterly net operating profit share', 'You recruit and manage the pub team'] },
    { title: 'Foundation Tenancy', eyebrow: 'Leased & Tenanted', copy: 'A fixed-term tenancy designed to give you more control over the pub business and a clear commercial framework.', points: ['More freedom over the retail offer', 'Fixed rent for the term', 'Reduced repair obligations', 'Pub-specific entry costs'] },
    { title: 'Investment Tenancy', eyebrow: 'Leased & Tenanted', copy: 'A tenancy for qualifying pubs where investment forms part of the opportunity and longer-term commercial plan.', points: ['Planned investment', 'Five-year structure varies by nation', 'Reduced repair obligations', 'Pub-specific rent and entry costs'] }
  ];
  return <><section className="bg-[#1c1c31] text-white"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#47b9ea]">Our agreements</p><h1 className="mt-3 max-w-4xl text-5xl font-black md:text-6xl">Choose the operating model that fits your ambition.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">The agreement shapes your entry costs, responsibilities, freedom and how you earn. Compare the routes before you shortlist individual pubs.</p></div></section><section className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="grid gap-5 lg:grid-cols-3">{cards.map((card) => <article key={card.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-black uppercase tracking-[0.16em] text-[#0a87c4]">{card.eyebrow}</p><h2 className="mt-2 text-3xl font-black text-[#1c1c31]">{card.title}</h2><p className="mt-4 leading-7 text-slate-600">{card.copy}</p><ul className="mt-5 grid gap-3">{card.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700"><Icon name="check" size={18} className="mt-0.5 shrink-0 text-[#0a87c4]" />{point}</li>)}</ul><Button className="mt-6 w-full" onClick={() => navigate('portalHome', null, {agreement: card.title === 'Just Add Talent' ? 'Just Add Talent' : card.title === 'Investment Tenancy' ? 'Investment Tenancy Agreement' : 'Leased & Tenanted'})}>View matching pubs</Button></article>)}</div><div className="mt-10 rounded-[2rem] bg-[#eaf6fd] p-6 md:p-8"><h2 className="text-2xl font-black text-[#1c1c31]">Need more detail?</h2><p className="mt-2 max-w-3xl leading-7 text-slate-600">The FAQ page covers the drinks tie, entry costs, training, application stages, rent and responsibilities in more depth.</p><Button variant="navy" className="mt-5" onClick={() => navigate('faqs')}>Read agreement FAQs</Button></div></section></>;
}

function PageHero({ eyebrow, title, copy, backgroundImage, children, navigate, backLabel = 'Back to vacancies' }) {
  return <section className="relative overflow-hidden bg-[#1c1c31] text-white">{backgroundImage && <HeroImage src={backgroundImage} alt="" overlay="gradient" />}<div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">{navigate && <button onClick={() => navigate('portalHome')} className="mb-8 inline-flex items-center gap-2 text-sm font-black text-white/75 hover:text-white"><Icon name="back" size={18} />{backLabel}</button>}<div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-[#47b9ea]">{eyebrow}</p><h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">{title}</h1>{copy && <p className="mt-5 max-w-3xl text-lg leading-8 text-white/78">{copy}</p>}</div>{children}</div></div></section>;
}

function filterVacancies(list, query, agreements, features, region, availableOnly) {
  const q = query.trim().toLowerCase();
  return list.filter((pub) => {
    const searchable = [pub.pub, pub.location, pub.region, pub.agreement, pub.type, pub.summary, ...pub.tags, ...pub.features].join(' ').toLowerCase();
    const textMatch = !q || searchable.includes(q);
    const agreementMatch = !agreements.length || agreements.includes(pub.agreement);
    const featureMatch = !features.length || features.some((feature) => searchable.includes(feature.toLowerCase()));
    const regionMatch = region === 'All regions' || pub.region === region;
    const availabilityMatch = !availableOnly || pub.availability === 'Available';
    return textMatch && agreementMatch && featureMatch && regionMatch && availabilityMatch;
  });
}

function PortalHomePage({ navigate, profile, saved, toggleSave, initialAgreement }) {
  const [query, setQuery] = useState('');
  const [agreements, setAgreements] = useState(initialAgreement ? [initialAgreement] : []);
  const [features, setFeatures] = useState([]);
  const [region, setRegion] = useState('All regions');
  const [availableOnly, setAvailableOnly] = useState(true);
  const [sort, setSort] = useState('Recommended');
  const filtered = useMemo(() => {
    const list = filterVacancies(vacancies, query, agreements, features, region, availableOnly);
    if (sort === 'A-Z') return [...list].sort((a, b) => a.pub.localeCompare(b.pub));
    if (sort === 'Region') return [...list].sort((a, b) => a.region.localeCompare(b.region));
    return list;
  }, [query, agreements, features, region, availableOnly, sort]);

  const toggleItem = (value, setter) => setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  const clearFilters = () => { setQuery(''); setAgreements([]); setFeatures([]); setRegion('All regions'); setAvailableOnly(true); };

  return <><PageHero eyebrow="Applicant portal" title={'Welcome back, ' + profile.firstName + '. Find your next pub opportunity.'} copy="Use your profile, agreement preferences and pub features to narrow the vacancy list. Save opportunities and return to them when you are ready." backgroundImage={asset('StarPubs-Lifestyle-18.jpg')}><div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur"><p className="text-sm font-black text-white">Your search profile</p><div className="mt-4 grid gap-3 text-sm text-white/75"><p><span className="font-black text-white">Preferred agreement:</span> {profile.agreementInterest}</p><p><span className="font-black text-white">Preferred region:</span> {profile.preferredRegion}</p><p><span className="font-black text-white">Saved pubs:</span> {saved.length}</p></div><Button variant="ghost" className="mt-5 w-full" onClick={() => navigate('profile')}>Update profile</Button></div></PageHero>
  <section id="vacancies" className="mx-auto max-w-7xl px-5 py-10 lg:px-8"><div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl md:p-6"><div className="grid gap-3 lg:grid-cols-[1fr_190px_160px]"><label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-[#0a87c4] focus-within:ring-4 focus-within:ring-[#0a87c4]/10"><Icon name="search" className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by pub, place or keyword" className="w-full bg-transparent text-sm outline-none" /></label><select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#0a87c4]">{regions.map((item) => <option key={item}>{item}</option>)}</select><Button variant="light" onClick={clearFilters}>Clear filters</Button></div><div className="mt-5 border-t border-slate-200 pt-5"><div className="flex flex-wrap items-center justify-between gap-3"><p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-slate-500"><Icon name="filter" size={17} />Agreement type</p><label className="flex items-center gap-2 text-sm font-bold text-slate-600"><input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} className="h-4 w-4 accent-[#0a87c4]" />Available now</label></div><div className="mt-3 flex flex-wrap gap-2">{agreementOptions.map((item) => <FilterChip key={item} label={item} selected={agreements.includes(item)} onClick={() => toggleItem(item, setAgreements)} />)}</div></div><div className="mt-5 border-t border-slate-200 pt-5"><p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Pub features</p><div className="mt-3 flex gap-3 overflow-x-auto pb-2">{propertyFilters.map((item) => <FeatureChip key={item} label={item} selected={features.includes(item)} onClick={() => toggleItem(item, setFeatures)} />)}</div></div></div>
  <div className="mt-9 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-[0.18em] text-[#0a87c4]">{filtered.length + ' opportunities'}</p><h2 className="mt-2 text-3xl font-black text-[#1c1c31] md:text-4xl">Pub vacancies</h2></div><label className="flex items-center gap-2 text-sm font-bold text-slate-600">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-black text-[#1c1c31]"><option>Recommended</option><option>A-Z</option><option>Region</option></select></label></div>
  {filtered.length ? <div className="mt-6 grid gap-6 lg:grid-cols-2">{filtered.map((pub) => <VacancyCard key={pub.id} pub={pub} profile={profile} saved={saved.includes(pub.id)} toggleSave={toggleSave} navigate={navigate} />)}</div> : <EmptyState title="No pubs match those filters" copy="Try removing a feature, widening the region or viewing pubs that are not currently available." action="Reset filters" onAction={clearFilters} />}</section></>;
}

function FilterChip({ label, selected, onClick }) {
  return <button onClick={onClick} className={cx('inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-black transition', selected ? 'border-[#0a87c4] bg-[#0a87c4] text-white' : 'border-slate-300 bg-white text-[#1c1c31] hover:border-[#0a87c4] hover:text-[#0a87c4]')}>{selected && <span className="h-2 w-2 rounded-full bg-white" />}{label}</button>;
}

function FeatureChip({ label, selected, onClick }) {
  return <button onClick={onClick} className={cx('flex min-w-[118px] flex-col items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-center transition', selected ? 'border-[#0a87c4] bg-[#eaf6fd] text-[#0a87c4]' : 'border-slate-200 bg-white text-slate-500 hover:border-[#0a87c4]/50 hover:text-[#0a87c4]')}><Icon name={label === 'City centre' ? 'pin' : label === 'Sports' ? 'check' : 'building'} size={22} /><span className="text-xs font-black">{label}</span></button>;
}

function getRecommendationReasons(pub, profile) {
  const reasons = [];
  if (pub.agreement === profile.agreementInterest) reasons.push('Matches your preferred agreement');
  if (pub.region === profile.preferredRegion) reasons.push('Located in your preferred region');
  if (pub.availability === 'Available') reasons.push('Available to apply for now');
  if (pub.tags.some((tag) => tag.toLowerCase().includes(profile.preferredStyle.toLowerCase().split(' ')[0]))) reasons.push('Similar to your preferred pub style');
  return reasons.slice(0, 3);
}

function VacancyCard({ pub, profile, saved, toggleSave, navigate }) {
  const reasons = getRecommendationReasons(pub, profile);
  const letAgreed = pub.availability === 'Let agreed';
  return <article className={cx('overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl', letAgreed ? 'border-slate-200 opacity-75' : 'border-[#0a87c4]/35')}><div className="relative h-64 overflow-hidden bg-slate-200"><img src={pub.image} alt={pub.pub} className={cx('h-full w-full object-cover', letAgreed && 'grayscale')} /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" /><div className="absolute left-4 top-4 flex gap-2"><span className={cx('rounded-md px-3 py-1.5 text-xs font-black', letAgreed ? 'bg-slate-800 text-white' : 'bg-white text-[#1c1c31]')}>{pub.availability}</span><AgreementBadge agreement={pub.agreement} /></div><button onClick={() => toggleSave(pub.id)} className={cx('absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition', saved ? 'bg-[#0a87c4] text-white' : 'bg-white text-slate-600 hover:text-[#0a87c4]')} aria-label={saved ? 'Remove from saved pubs' : 'Save pub'}><Icon name="heart" filled={saved} /></button><div className="absolute bottom-5 left-5 right-5 text-white"><h3 className="text-3xl font-black">{pub.pub}</h3><p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white/80"><Icon name="pin" size={16} />{pub.location}</p></div></div><div className="p-5 md:p-6"><div className="grid gap-3 sm:grid-cols-2"><InfoPill title="Entry" copy={pub.costs} /><InfoPill title="How you earn" copy={pub.earnings} /></div><p className="mt-5 leading-7 text-slate-600">{pub.summary}</p>{reasons.length > 0 && <div className="mt-5 rounded-2xl bg-[#eaf6fd] p-4"><p className="text-sm font-black text-[#1c1c31]">Why this could suit you</p><ul className="mt-2 grid gap-2">{reasons.map((reason) => <li key={reason} className="flex gap-2 text-sm text-slate-600"><Icon name="check" size={16} className="mt-0.5 shrink-0 text-[#0a87c4]" />{reason}</li>)}</ul></div>}<div className="mt-5 flex flex-wrap gap-2">{pub.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{tag}</span>)}</div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button className="flex-1" onClick={() => navigate('pubDetail', pub.id)}>View opportunity</Button>{letAgreed && <Button variant="light" className="flex-1" onClick={() => navigate('similar', pub.id)}>Show similar pubs</Button>}</div></div></article>;
}

function EmptyState({ title, copy, action, onAction }) {
  return <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf6fd] text-[#0a87c4]"><Icon name="search" size={26} /></span><h3 className="mt-5 text-2xl font-black text-[#1c1c31]">{title}</h3><p className="mx-auto mt-2 max-w-xl leading-7 text-slate-600">{copy}</p>{action && <Button className="mt-5" onClick={onAction}>{action}</Button>}</div>;
}

function PubDetailPage({ pub, navigate, saved, toggleSave, onApply }) {
  if (!pub) return null;
  const letAgreed = pub.availability === 'Let agreed';
  return <><PageHero eyebrow="Pub opportunity" title={pub.pub} copy={pub.summary} backgroundImage={pub.image} navigate={navigate}><div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur"><p className="text-sm text-white/60">Agreement</p><p className="mt-1 text-xl font-black">{pub.agreement}</p><p className="mt-4 text-sm text-white/60">Status</p><p className="mt-1 font-black">{pub.availability}</p></div></PageHero><section className="mx-auto grid max-w-7xl gap-7 px-5 py-12 lg:grid-cols-[1fr_360px] lg:px-8"><div><div className="grid gap-5 md:grid-cols-2">{pub.features.map((feature) => <div key={feature} className="rounded-2xl border border-slate-200 bg-white p-5"><Icon name="check" className="text-[#0a87c4]" /><p className="mt-3 font-black text-[#1c1c31]">{feature}</p></div>)}</div><div className="mt-7 rounded-[1.75rem] border border-slate-200 bg-white p-6 md:p-8"><h2 className="text-3xl font-black text-[#1c1c31]">The opportunity</h2><p className="mt-4 leading-8 text-slate-600">{pub.area}</p><h3 className="mt-7 text-xl font-black text-[#1c1c31]">Who could this suit?</h3><p className="mt-3 leading-8 text-slate-600">{pub.idealFor}</p></div></div><aside className="lg:sticky lg:top-28 lg:self-start"><div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg"><p className="text-xs font-black uppercase tracking-[0.16em] text-[#0a87c4]">Key details</p><div className="mt-5 grid gap-4"><InfoPill title="Entry" copy={pub.costs} /><InfoPill title="Earnings model" copy={pub.earnings} /><InfoPill title="Investment" copy={pub.investment} /></div><Button disabled={letAgreed} className="mt-6 w-full py-4 text-base" onClick={() => onApply(pub.id)}>{letAgreed ? 'Let agreed' : 'Start application'}</Button><Button variant="light" className="mt-3 w-full" onClick={() => toggleSave(pub.id)}>{saved ? 'Remove from saved' : 'Save pub'}</Button></div></aside></section></>;
}

function SignInPage({ navigate, onSignedIn }) {
  const [email, setEmail] = useState(dummyCredentials.email);
  const [password, setPassword] = useState(dummyCredentials.password);
  const [message, setMessage] = useState('');
  const submit = (e) => { e.preventDefault(); if (email.toLowerCase() === dummyCredentials.email && password === dummyCredentials.password) { setMessage('Signed in. Opening your applicant portal...'); setTimeout(onSignedIn, 500); } else { setMessage('Those details do not match the prototype account.'); } };
  return <><PageHero eyebrow="Applicant sign in" title="Pick up where you left off." copy="Sign in to access saved pubs, your profile, applications and your personal application journey." backgroundImage={asset('StarPubs-Lifestyle-16.jpg')} /><section className="mx-auto max-w-lg px-5 py-12"><form onSubmit={submit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-8"><h2 className="text-2xl font-black text-[#1c1c31]">Sign in</h2><p className="mt-2 text-sm leading-6 text-slate-500">Prototype credentials are pre-filled for the leadership demo.</p><label className="mt-6 grid gap-2 text-sm font-black text-[#1c1c31]">Email address<input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0a87c4] focus:ring-4 focus:ring-[#0a87c4]/10" /></label><label className="mt-4 grid gap-2 text-sm font-black text-[#1c1c31]">Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0a87c4] focus:ring-4 focus:ring-[#0a87c4]/10" /></label>{message && <div className={cx('mt-4 rounded-xl p-3 text-sm font-bold', message.startsWith('Signed') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>{message}</div>}<Button type="submit" className="mt-6 w-full py-4 text-base">Sign in</Button><button type="button" onClick={() => navigate('siteHome')} className="mt-4 w-full text-sm font-black text-slate-500 hover:text-[#0a87c4]">Back to Star Pubs home</button></form></section></>;
}

function ProfilePage({ profile, setProfile, navigate }) {
  const fields = [
    ['First name', 'firstName'], ['Last name', 'lastName'], ['Email address', 'email'], ['Phone', 'phone'], ['Postcode', 'postalCode']
  ];
  const required = ['firstName', 'lastName', 'email', 'phone', 'postalCode', 'agreementInterest', 'preferredRegion'];
  const completion = Math.round(required.filter((key) => String(profile[key] || '').trim()).length / required.length * 100);
  const update = (key, value) => setProfile((current) => ({ ...current, [key]: value }));
  return <><PageHero eyebrow="My profile" title="Build your profile once. Use it across every pub application." copy="Your profile helps us tailor recommendations and reduces the information you need to repeat." backgroundImage={asset('StarPubs-Lifestyle-16.jpg')} navigate={navigate}><div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur"><div className="flex items-end justify-between"><div><p className="text-sm text-white/60">Profile completion</p><p className="mt-1 text-4xl font-black">{completion}%</p></div><Icon name="user" size={34} className="text-[#47b9ea]" /></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#0a87c4] transition-all" style={{width: completion + '%'}} /></div></div></PageHero><section className="mx-auto max-w-5xl px-5 py-12"><div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8"><div className="grid gap-5 md:grid-cols-2">{fields.map(([label, key]) => <label key={key} className="grid gap-2 text-sm font-black text-[#1c1c31]">{label}<input value={profile[key] || ''} onChange={(e) => update(key, e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0a87c4] focus:ring-4 focus:ring-[#0a87c4]/10" /></label>)}<label className="grid gap-2 text-sm font-black text-[#1c1c31]">Preferred agreement<select value={profile.agreementInterest} onChange={(e) => update('agreementInterest', e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none"><option>Just Add Talent</option><option>Leased & Tenanted</option><option>Investment Tenancy Agreement</option></select></label><label className="grid gap-2 text-sm font-black text-[#1c1c31]">Preferred region<select value={profile.preferredRegion} onChange={(e) => update('preferredRegion', e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none">{regions.filter((r) => r !== 'All regions').map((r) => <option key={r}>{r}</option>)}</select></label></div><div className="mt-7 flex flex-wrap gap-3"><Button onClick={() => navigate('portalHome')}>Save and browse pubs</Button><Button variant="light" onClick={() => navigate('applications')}>View applications</Button></div></div></section></>;
}

function SavedPage({ savedPubs, toggleSave, navigate, profile }) {
  return <><PageHero eyebrow="Saved pubs" title="Your shortlist, all in one place." copy="Return to the pubs you are interested in and keep an eye on availability before you apply." backgroundImage={asset('StarPubs-Lifestyle-50.jpg')} navigate={navigate} /><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">{savedPubs.length ? <div className="grid gap-6 lg:grid-cols-2">{savedPubs.map((pub) => <VacancyCard key={pub.id} pub={pub} profile={profile} saved toggleSave={toggleSave} navigate={navigate} />)}</div> : <EmptyState title="You have not saved any pubs yet" copy="Save opportunities while you browse and they will appear here for quick access." action="Browse vacancies" onAction={() => navigate('portalHome')} />}</section></>;
}

function ApplicationsPage({ navigate }) {
  const [filter, setFilter] = useState('All');
  const stages = ['All', 'Application ongoing', 'Submitted', 'Application accepted', 'Application rejected'];
  const shown = filter === 'All' ? applications : applications.filter((app) => app.stage === filter);
  const stageTone = (stage) => stage === 'Application accepted' ? 'bg-green-100 text-green-800' : stage === 'Application rejected' ? 'bg-red-100 text-red-800' : stage === 'Submitted' ? 'bg-amber-100 text-amber-800' : 'bg-[#eaf6fd] text-[#086f9f]';
  return <><PageHero eyebrow="Applications" title="Track every application in one place." copy="See what is complete, what is waiting on Star Pubs and what you need to do next." backgroundImage={asset('StarPubs-Lifestyle-54.jpg')} navigate={navigate} /><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="text-sm font-black uppercase tracking-[0.16em] text-[#0a87c4]">{shown.length + ' applications'}</p><h2 className="mt-1 text-3xl font-black text-[#1c1c31]">Your application activity</h2></div><select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#1c1c31]">{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></div><div className="mt-7 grid gap-5">{shown.map((app) => <article key={app.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><span className={cx('inline-flex rounded-full px-3 py-1 text-xs font-black', stageTone(app.stage))}>{app.stage}</span><h3 className="mt-3 text-2xl font-black text-[#1c1c31]">{app.pub}</h3><p className="mt-1 text-sm font-semibold text-slate-500">{app.location}</p></div><Button onClick={() => navigate('applicationJourney', app.vacancyId)}>{app.stage === 'Application ongoing' ? 'Continue application' : 'Open journey'}</Button></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#0a87c4]" style={{width: app.progress + '%'}} /></div><p className="mt-4 text-sm leading-6 text-slate-600"><span className="font-black text-[#1c1c31]">Next:</span> {app.nextAction}</p></article>)}</div></section></>;
}

const journeyTaskTemplates = [
  { id: 'match', title: 'Your pub match', copy: 'Review the pub you selected and why it could fit your profile.', icon: 'heart', defaultStatus: 'complete' },
  { id: 'chat', title: 'Chat to us', copy: 'Ask the Licensee Attraction team any questions before you continue.', icon: 'message', defaultStatus: 'complete' },
  { id: 'resources', title: 'Our resources', copy: 'Read the guides and agreement information relevant to this pub.', icon: 'download', defaultStatus: 'complete' },
  { id: 'plan', title: 'Business plan', copy: 'Build the plan that explains how you would run and grow the pub.', icon: 'file', defaultStatus: 'in-progress' },
  { id: 'documents', title: 'Upload documents', copy: 'Add the licences, checks and supporting documents we need.', icon: 'file', defaultStatus: 'not-started' },
  { id: 'form', title: 'Application form', copy: 'Complete the final application details when the earlier tasks are ready.', icon: 'user', defaultStatus: 'not-started' }
];

function ApplicationJourneyPage({ pub, navigate }) {
  const selectedPub = pub || vacancies[0];
  const [status, setStatus] = useState(() => Object.fromEntries(journeyTaskTemplates.map((task) => [task.id, task.defaultStatus])));
  const completeCount = journeyTaskTemplates.filter((task) => status[task.id] === 'complete').length;
  const completion = Math.round(completeCount / journeyTaskTemplates.length * 100);
  const markNext = (task) => setStatus((current) => ({ ...current, [task.id]: current[task.id] === 'complete' ? 'complete' : 'complete' }));
  const statusLabel = (value) => value === 'complete' ? 'Complete' : value === 'in-progress' ? 'In progress' : 'Not started';
  return <><PageHero eyebrow="Application journey" title={'Apply for ' + selectedPub.pub} copy="Work through each step at your own pace, see what is complete and keep every part of your application in one place." backgroundImage={selectedPub.image} navigate={navigate}><div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur"><p className="text-sm text-white/60">Overall progress</p><p className="mt-1 text-4xl font-black">{completion}%</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#0a87c4]" style={{width: completion + '%'}} /></div></div></PageHero><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6"><p className="text-center text-xs font-black uppercase tracking-[0.18em] text-[#0a87c4]">Your application journey</p><div className="mt-7 grid gap-4 lg:grid-cols-6">{journeyTaskTemplates.map((task, index) => <div key={task.id} className="relative text-center"><span className={cx('mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-black', status[task.id] === 'complete' ? 'border-[#0a87c4] bg-[#0a87c4] text-white' : status[task.id] === 'in-progress' ? 'border-[#0a87c4] bg-white text-[#0a87c4]' : 'border-slate-300 bg-white text-slate-400')}>{status[task.id] === 'complete' ? '✓' : index + 1}</span><p className="mt-3 text-sm font-black text-[#1c1c31]">{task.title}</p><p className="mt-1 text-xs font-bold text-slate-400">{statusLabel(status[task.id])}</p></div>)}</div></div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{journeyTaskTemplates.map((task) => <article key={task.id} className={cx('rounded-[1.75rem] border bg-white p-6 shadow-sm', status[task.id] === 'in-progress' ? 'border-[#0a87c4] ring-4 ring-[#0a87c4]/10' : 'border-slate-200')}><div className="flex items-start justify-between gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf6fd] text-[#0a87c4]"><Icon name={task.icon} /></span><span className={cx('rounded-full px-3 py-1 text-xs font-black', status[task.id] === 'complete' ? 'bg-green-100 text-green-800' : status[task.id] === 'in-progress' ? 'bg-[#eaf6fd] text-[#086f9f]' : 'bg-slate-100 text-slate-500')}>{statusLabel(status[task.id])}</span></div><h2 className="mt-5 text-2xl font-black text-[#1c1c31]">{task.title}</h2><p className="mt-2 min-h-[72px] leading-6 text-slate-600">{task.copy}</p>{status[task.id] === 'complete' ? <Button variant="light" className="mt-5 w-full">Review</Button> : <Button className="mt-5 w-full" onClick={() => markNext(task)}>{status[task.id] === 'in-progress' ? 'Continue and mark complete' : 'Start task'}</Button>}</article>)}</div><div className="mt-8 rounded-[1.75rem] bg-[#eaf6fd] p-6"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#0a87c4]">Need help?</p><h3 className="mt-2 text-2xl font-black text-[#1c1c31]">The Licensee Attraction team can support your application.</h3><p className="mt-2 text-slate-600">Use chat whenever you are unsure what is needed next.</p></div><Button variant="navy">Open chat</Button></div></div></section></>;
}

function SimilarPage({ sourcePub, navigate, saved, toggleSave, profile }) {
  const similar = vacancies.filter((pub) => pub.id !== sourcePub?.id && pub.availability === 'Available');
  return <><PageHero eyebrow="Similar pubs" title="Keep your search moving." copy="This opportunity may have moved on, but these available pubs could still match what you are looking for." navigate={navigate} /><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="grid gap-6 lg:grid-cols-2">{similar.map((pub) => <VacancyCard key={pub.id} pub={pub} profile={profile} saved={saved.includes(pub.id)} toggleSave={toggleSave} navigate={navigate} />)}</div></section></>;
}

function FAQAccordion({ item }) {
  const [open, setOpen] = useState(false);
  return <div className="border-b border-slate-200"><button onClick={() => setOpen(!open)} className="flex w-full items-start justify-between gap-5 py-5 text-left"><span className="text-lg font-black leading-7 text-[#1c1c31]">{item.q}</span><span className={cx('mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf6fd] text-[#0a87c4] transition', open && 'rotate-180')}><Icon name="chevronDown" size={17} /></span></button><AnimatePresence>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="faq-copy pb-6 text-sm leading-7 text-slate-600">{item.a}</div></motion.div>}</AnimatePresence></div>;
}

function FAQPage({ navigate }) {
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return <><section className="relative overflow-hidden bg-[#1c1c31] text-white"><HeroImage src={asset('StarPubs-Lifestyle-18.jpg')} alt="" overlay="gradient" /><div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#47b9ea]">Running a pub FAQs</p><h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight md:text-6xl">Running a pub with Star Pubs: frequently asked questions</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">Clear answers on costs, licences, agreement types, training, earnings, support and how to apply.</p></div></section><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{quickAnswerCards.map((card) => <button key={card.title} onClick={() => card.page ? navigate(card.page) : jump(card.target)} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#0a87c4]/40 hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf6fd] text-[#0a87c4]"><Icon name={card.icon} /></span><h2 className="mt-4 text-lg font-black text-[#1c1c31]">{card.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{card.copy}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0a87c4]">{card.action}<Icon name="arrow" size={15} /></span></button>)}</div><div className="mt-12 grid gap-8 lg:grid-cols-[240px_1fr]"><aside className="lg:sticky lg:top-28 lg:self-start"><p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Jump to</p><div className="mt-3 grid gap-2">{faqSections.map((section) => <button key={section.id} onClick={() => jump(section.id)} className="rounded-xl px-3 py-3 text-left text-sm font-black text-[#1c1c31] hover:bg-[#eaf6fd] hover:text-[#0a87c4]">{section.title}</button>)}</div></aside><div className="grid gap-8">{faqSections.map((section) => <section id={section.id} key={section.id} className="scroll-mt-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#0a87c4]">{section.subtitle}</p><h2 className="mt-2 text-3xl font-black text-[#1c1c31]">{section.title}</h2><p className="mt-3 leading-7 text-slate-600">{section.intro}</p><div className="mt-5">{section.faqs.map((item) => <FAQAccordion key={item.q} item={item} />)}</div></section>)}</div></div><div className="mt-10 rounded-[2rem] bg-[#1c1c31] p-7 text-white md:p-9"><h2 className="text-3xl font-black">Ready to explore the opportunities?</h2><p className="mt-3 max-w-2xl leading-7 text-white/70">Browse current vacancies or sign in to continue an application you have already started.</p><div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => navigate('portalHome')}>Find a pub</Button><Button variant="ghost" onClick={() => navigate('signin')}>Sign in</Button></div></div></section></>;
}

function FloatingChatBubble({ navigate }) {
  const [open, setOpen] = useState(false);
  return <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }} className="w-[min(350px,calc(100vw-2.5rem))] rounded-[1.5rem] border border-slate-200 bg-white p-5 text-[#1c1c31] shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#0a87c4]">Need help?</p><h3 className="mt-1 text-xl font-black">Chat to Star Pubs</h3></div><button onClick={() => setOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-500"><Icon name="x" size={16} /></button></div><p className="mt-3 text-sm leading-6 text-slate-600">Ask about a pub, agreement type or the next step in your application.</p><div className="mt-4 grid gap-2"><Button className="w-full" onClick={() => navigate('applications')}>Application help</Button><Button variant="light" className="w-full" onClick={() => navigate('faqs')}>Browse FAQs</Button></div></motion.div>}</AnimatePresence><motion.button onClick={() => setOpen(!open)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0a87c4] text-white shadow-2xl ring-4 ring-white" aria-label="Open chat"><Icon name={open ? 'x' : 'message'} size={26} /></motion.button></div>;
}

function Footer({ navigate, portal = false }) {
  return <footer className="mt-16 bg-[#1c1c31] text-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1fr_auto] lg:px-8"><div><button onClick={() => navigate('siteHome')}><StarLogo /></button><p className="mt-4 max-w-xl text-sm leading-7 text-white/60">Leadership prototype showing how the public Star Pubs recruitment journey and applicant portal could work as one connected experience.</p></div><div className="flex flex-wrap gap-5 text-sm font-bold text-white/70"><button onClick={() => navigate('portalHome')} className="hover:text-white">Find a pub</button><button onClick={() => navigate('faqs')} className="hover:text-white">FAQs</button><button onClick={() => navigate('agreements')} className="hover:text-white">Agreements</button><a href={base + 'vacancy-listing-concepts.html'} className="hover:text-white">Leadership card concepts</a>{portal && <button onClick={() => navigate('siteHome')} className="hover:text-white">Star Pubs home</button>}</div></div></footer>;
}

export default function App() {
  const [page, setPage] = useState('siteHome');
  const [param, setParam] = useState(null);
  const [routeOptions, setRouteOptions] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState([1, 3]);
  const currentPub = vacancies.find((pub) => pub.id === param);
  const savedPubs = vacancies.filter((pub) => saved.includes(pub.id));

  const navigate = (nextPage, nextParam = null, options = {}) => {
    setPage(nextPage);
    setParam(nextParam);
    setRouteOptions(options || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSave = (id) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const logout = () => { setSignedIn(false); setPendingRoute(null); navigate('siteHome'); };
  const beginApplication = (pubId) => {
    if (signedIn) navigate('applicationJourney', pubId);
    else { setPendingRoute({ page: 'applicationJourney', param: pubId }); navigate('signin'); }
  };
  const finishSignIn = () => {
    setSignedIn(true);
    if (pendingRoute) { const next = pendingRoute; setPendingRoute(null); navigate(next.page, next.param); }
    else navigate('portalHome');
  };

  const publicPages = ['siteHome', 'agreements', 'faqs'];
  const portalPages = ['portalHome', 'profile', 'saved', 'applications', 'pubDetail', 'applicationJourney', 'similar'];
  const isPublic = publicPages.includes(page);
  const isPortal = portalPages.includes(page);

  let content;
  if (page === 'siteHome') content = <PublicHomePage navigate={navigate} signedIn={signedIn} />;
  else if (page === 'agreements') content = <AgreementsPage navigate={navigate} />;
  else if (page === 'faqs') content = <FAQPage navigate={navigate} />;
  else if (page === 'signin') content = <SignInPage navigate={navigate} onSignedIn={finishSignIn} />;
  else if (page === 'profile') content = <ProfilePage profile={profile} setProfile={setProfile} navigate={navigate} />;
  else if (page === 'saved') content = <SavedPage savedPubs={savedPubs} toggleSave={toggleSave} navigate={navigate} profile={profile} />;
  else if (page === 'applications') content = <ApplicationsPage navigate={navigate} />;
  else if (page === 'pubDetail') content = <PubDetailPage pub={currentPub} navigate={navigate} saved={currentPub ? saved.includes(currentPub.id) : false} toggleSave={toggleSave} onApply={beginApplication} />;
  else if (page === 'applicationJourney') content = <ApplicationJourneyPage pub={currentPub} navigate={navigate} />;
  else if (page === 'similar') content = <SimilarPage sourcePub={currentPub} navigate={navigate} saved={saved} toggleSave={toggleSave} profile={profile} />;
  else content = <PortalHomePage navigate={navigate} profile={profile} saved={saved} toggleSave={toggleSave} initialAgreement={routeOptions.agreement} />;

  return <main className="min-h-screen bg-[#f7f9fb] text-slate-900">{isPublic && <PublicHeader page={page} navigate={navigate} signedIn={signedIn} profile={profile} onLogout={logout} />}{isPortal && <PortalHeader page={page} navigate={navigate} signedIn={signedIn} profile={profile} onLogout={logout} />}{content}<Footer navigate={navigate} portal={isPortal} /><FloatingChatBubble navigate={navigate} /></main>;
}
