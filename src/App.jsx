import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const base = import.meta.env.BASE_URL || '/';
const asset = (path) => `${base}images/${path}`;

const STAR_NAVY = '#1c1c31';
const STAR_BLUE = '#0a87c4';

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

const agreementOptions = ['All agreements', 'Just Add Talent', 'Leased & Tenanted', 'Investment Tenancy Agreement'];
const propertyFilters = ['Community', 'Drinks-led', 'Food opportunity', 'Sports', 'City centre', 'Beer garden', 'Live events'];
const applicationStages = ['Application ongoing', 'Submitted', 'In review', 'Application accepted', 'Application rejected'];
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

const journeySteps = ['Find a pub', 'Chat to us', 'Resources', 'Business plan', 'Documents', 'Application form'];
const journeyTiles = [
  { title: 'Your pub match', copy: 'Review the pub you selected and see why it could fit your profile.', icon: 'heart' },
  { title: 'Your documents', copy: 'Keep licences, checks and supporting documents together.', icon: 'file' },
  { title: 'Application form', copy: 'Complete the core application details when you are ready.', icon: 'file' },
  { title: 'Business plan', copy: 'Build the plan that explains how you would run the pub.', icon: 'user' },
  { title: 'Additional support', copy: 'Use guides, templates and resources to shape your next step.', icon: 'download' },
  { title: 'Chat', copy: 'Ask the Licensee Attraction team for help with your application.', icon: 'message' }
];

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
    sparkle: <><path d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2z" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    wallet: <><path d="M4 7h16v12H4z" /><path d="M16 11h4" /><path d="M7 7V5h9v2" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h6" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /><path d="M8 9h8" /><path d="M8 13h6" /></>
  };
  return paths[name] || paths.sparkle;
}

function Icon({ name, size = 20, className = '', filled = false }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>{iconPath(name)}</svg>;
}

function Button({ children, className = '', variant = 'solid', ...props }) {
  const styles = variant === 'outline' ? 'border border-white/30 bg-white/5 text-white hover:bg-white/15' : variant === 'light' ? 'border border-slate-200 bg-white text-[#1c1c31] hover:border-[#0a87c4] hover:text-[#0a87c4]' : variant === 'ghost' ? 'bg-transparent text-white hover:bg-white/10' : 'bg-[#0a87c4] text-white hover:bg-[#0877ad]';
  return <button className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black transition disabled:pointer-events-none disabled:opacity-50 ${styles} ${className}`} {...props}>{children}</button>;
}

function Card({ children, className = '' }) {
  return <div className={`rounded-[1.5rem] border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function CardContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

function GlobalStyles() {
  return <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
    body { font-family: Montserrat, ui-sans-serif, system-ui, sans-serif; }
    .faq-rich p { margin-top: 0.75rem; line-height: 1.75; color: rgb(71 85 105); }
    .faq-rich p:first-child { margin-top: 0; }
    .faq-rich ul { margin-top: 1rem; display: grid; gap: 0.65rem; color: rgb(71 85 105); }
    .faq-rich li { position: relative; padding-left: 1.3rem; line-height: 1.7; }
    .faq-rich li::before { content: ''; position: absolute; left: 0; top: 0.72rem; width: 0.38rem; height: 0.38rem; border-radius: 999px; background: ${STAR_BLUE}; }
  `}</style>;
}

function StarLogo({ mode = 'white', className = '' }) {
  const src = mode === 'dark' ? asset('Star_Pubs_Black_Blue_RGB.jpg') : asset('Star_Pubs_White_Blue_RGB.png');
  return <img src={src} alt="Star Pubs" className={`h-12 w-auto object-contain ${className}`} />;
}

function ProfileAvatar({ profile, navigate }) {
  return <button onClick={() => navigate('profile')} className="flex items-center gap-3 rounded-full bg-white/10 px-2 py-1.5 text-white transition hover:bg-white/15" aria-label="Open profile"><div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#0a87c4] text-sm font-black ring-2 ring-white/25">{profile.firstName[0]}{profile.lastName[0]}</div><span className="hidden text-sm font-bold lg:inline">{profile.firstName}</span></button>;
}

function PublicHeader({ page, navigate, signedIn, profile }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = [
    ['siteHome', 'Home'],
    ['portalHome', 'Find a pub'],
    ['agreements', 'Our agreements'],
    ['faqs', 'FAQs']
  ];
  const go = (target) => { navigate(target); setMobileOpen(false); };
  return <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8"><button onClick={() => go('siteHome')}><StarLogo mode="dark" /></button><nav className="hidden items-center gap-7 text-sm font-black text-[#1c1c31] md:flex">{nav.map(([key, label]) => <button key={key} onClick={() => go(key)} className={`${page === key ? 'text-[#0a87c4]' : 'hover:text-[#0a87c4]'}`}>{label}</button>)}</nav><div className="hidden items-center gap-3 md:flex">{signedIn ? <><Button variant="light" onClick={() => navigate('portalHome')}>Applicant portal</Button><ProfileAvatar profile={profile} navigate={navigate} /></> : <><Button variant="light" onClick={() => navigate('signin')}>Sign in</Button><Button onClick={() => navigate('signin')}>Start your journey</Button></>}</div><button className="text-[#1c1c31] md:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? 'x' : 'menu'} /></button></div><AnimatePresence>{mobileOpen && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-slate-200 bg-white md:hidden"><div className="grid gap-3 px-5 py-4 text-left text-sm font-black text-[#1c1c31]">{nav.map(([key, label]) => <button key={key} className="text-left" onClick={() => go(key)}>{label}</button>)}<Button onClick={() => go(signedIn ? 'portalHome' : 'signin')}>{signedIn ? 'Applicant portal' : 'Sign in'}</Button></div></motion.div>}</AnimatePresence></header>;
}

function PortalHeader({ page, navigate, signedIn, profile }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const link = (key, label) => <button onClick={() => { navigate(key); setMobileOpen(false); }} className={page === key ? 'text-white' : 'hover:text-white'}>{label}</button>;
  const goToVacancies = () => { navigate('portalHome'); setTimeout(() => document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' }), 50); setMobileOpen(false); };
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1c1c31]/95 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8"><button onClick={() => navigate('siteHome')} aria-label="Star Pubs home"><StarLogo /></button><nav className="hidden items-center gap-6 text-sm font-semibold text-white/80 md:flex"><button onClick={() => navigate('siteHome')} className="hover:text-white">Star Pubs home</button><span className="h-4 w-0.5 bg-white/35" />{link('portalHome', 'Portal home')}<button onClick={goToVacancies} className="hover:text-white">Vacancies</button>{link('saved', 'Saved pubs')}{link('applications', 'Applications')}{link('faqs', 'FAQs')}</nav><div className="hidden items-center gap-3 md:flex">{signedIn ? <ProfileAvatar profile={profile} navigate={navigate} /> : <Button variant="ghost" onClick={() => navigate('signin')}>Sign in</Button>}</div><button className="text-white md:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? 'x' : 'menu'} /></button></div><AnimatePresence>{mobileOpen && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#1c1c31] md:hidden"><div className="grid gap-3 px-5 py-4 text-left text-sm font-semibold text-white/80"><button className="text-left" onClick={() => { navigate('siteHome'); setMobileOpen(false); }}>Star Pubs home</button>{link('portalHome', 'Portal home')}<button className="text-left" onClick={goToVacancies}>Vacancies</button>{link('saved', 'Saved pubs')}{link('applications', 'Applications')}{link('faqs', 'FAQs')}</div></motion.div>}</AnimatePresence></header>;
}

function ImagePlaceholder({ pub, large = false, muted = false }) {
  if (pub.image) return <div className={`relative overflow-hidden rounded-[1.5rem] ${large ? 'h-72' : 'h-44'} bg-[#1c1c31]`}><img src={pub.image} alt={`${pub.pub} exterior`} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" /><div className="absolute bottom-5 left-5 right-5 text-white"><p className={`${large ? 'text-3xl' : 'text-xl'} font-black`}>{pub.pub}</p><p className="mt-1 text-sm font-semibold text-white/85">{pub.imageLabel}</p></div></div>;
  return <div className={`relative overflow-hidden rounded-[1.5rem] ${large ? 'h-72' : 'h-44'} ${muted ? 'bg-slate-300' : 'bg-[#1c1c31]'}`}><div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#0a87c4]/45 blur-2xl" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(10,135,196,0.55),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.16),transparent_40%)]" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-5 left-5 right-5 text-white"><p className={`${large ? 'text-3xl' : 'text-xl'} font-black`}>{pub.pub}</p><p className="mt-1 text-sm font-semibold text-white/75">{pub.imageLabel}</p></div></div>;
}

function AgreementBadge({ agreement }) {
  const style = agreement === 'Just Add Talent' ? 'bg-[#0a87c4] text-white' : agreement === 'Investment Tenancy Agreement' ? 'bg-[#1c1c31] text-white' : 'bg-white text-[#1c1c31] border border-slate-200';
  return <span className={`inline-flex rounded-md px-3 py-1 text-xs font-black ${style}`}>{agreement}</span>;
}

function filterVacancies(list, query = '', selectedAgreements = [], selectedPropertyFilters = []) {
  const q = query.trim().toLowerCase();
  const activeAgreements = selectedAgreements.length ? selectedAgreements : agreementOptions.filter((item) => item !== 'All agreements');
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

function SiteHomePage({ navigate, signedIn }) {
  return <><section className="relative overflow-hidden bg-[#1c1c31] text-white"><img src={asset('home-banner.jpg')} alt="Star Pubs venue" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#1c1c31]/76" /><div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><p className="text-sm font-black uppercase tracking-[0.25em] text-[#0a87c4]">Run a pub with Star Pubs</p><h1 className="mt-4 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">Find the right pub opportunity for you.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">Explore pubs across England, Scotland and Wales, compare agreement routes and sign in to manage your applicant journey in one place.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button className="h-12 px-7 text-base" onClick={() => navigate(signedIn ? 'portalHome' : 'signin')}>{signedIn ? 'Go to applicant portal' : 'Sign in to applicant portal'}</Button><Button variant="outline" className="h-12 px-7 text-base" onClick={() => navigate('portalHome')}>Browse current pubs</Button></div></motion.div><motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur"><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">How it works</p><div className="mt-5 grid gap-4">{['Find a pub that matches your location, finances and ambitions.', 'Compare Just Add Talent and Leased & Tenanted routes in plain English.', 'Sign in to save pubs, start applications and track your progress.'].map((item, index) => <div key={item} className="flex gap-4 rounded-2xl bg-white p-4 text-[#1c1c31]"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a87c4] text-sm font-black text-white">{index + 1}</div><p className="text-sm font-bold leading-6">{item}</p></div>)}</div></motion.div></div></section><section className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="grid gap-5 md:grid-cols-3">{[['Just Add Talent', 'A ready-made pub with central support, reduced running costs and a clear operating model.'], ['Leased & Tenanted', 'Run your own pub business with more freedom over the offer and local proposition.'], ['FAQs', 'Get quick answers on costs, licences, agreements, training and how to apply.']].map(([title, copy]) => <Card key={title} className="h-full"><CardContent className="p-6"><Icon name="sparkle" className="text-[#0a87c4]" size={28} /><h2 className="mt-4 text-2xl font-black text-[#1c1c31]">{title}</h2><p className="mt-3 leading-7 text-slate-600">{copy}</p><Button variant="light" className="mt-5" onClick={() => title === 'FAQs' ? navigate('faqs') : navigate('agreements')}>Learn more</Button></CardContent></Card>)}</div></section><section className="bg-[#EAF6FD] px-5 py-14 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Featured vacancies</p><h2 className="mt-2 text-4xl font-black text-[#1c1c31]">Explore current pub opportunities</h2></div><Button onClick={() => navigate('portalHome')}>View all pubs</Button></div><div className="mt-8 grid gap-5 md:grid-cols-3">{vacancies.slice(0, 3).map((pub) => <Card key={pub.id} className="overflow-hidden"><ImagePlaceholder pub={pub} /><CardContent className="p-5"><AgreementBadge agreement={pub.agreement} /><h3 className="mt-4 text-xl font-black text-[#1c1c31]">{pub.pub}</h3><p className="mt-2 text-sm font-semibold text-slate-500">{pub.location}</p><Button variant="light" className="mt-5 w-full" onClick={() => navigate('pubDetail', pub.id)}>View opportunity</Button></CardContent></Card>)}</div></div></section></>;
}

function AgreementsPage({ navigate }) {
  return <><PageHero eyebrow="Our agreements" title="Choose the route that fits how you want to run a pub." copy="Compare the supported Just Add Talent route with our Leased & Tenanted opportunities before choosing where to apply." navigate={navigate} background={asset('StarPubs-Lifestyle-1.jpg')} /><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="grid gap-6 lg:grid-cols-3"><AgreementCard title="Just Add Talent" copy="A centrally supported Management Agreement. Star Pubs sets the core offer and covers many major running costs, while you focus on delivering the offer and leading your team." items={['£4,000 in unborrowed funds', 'Weekly revenue share', 'Quarterly profit share', 'Central support and systems']} /><AgreementCard title="Leased & Tenanted" copy="Run your own pub business with more control over the offer, trading plan and local proposition. Entry costs and responsibilities vary by pub and agreement." items={['More freedom over the offer', 'You keep business profit after costs', 'Rent and operating costs apply', 'Available across multiple agreement types']} /><AgreementCard title="Temporary opportunities" copy="Some pubs may be available on a temporary basis while their longer-term future is prepared. This can provide a quicker, flexible route into running a pub." items={['Flexible route', 'Build on an existing customer base', 'Useful stepping stone', 'Pub-specific terms apply']} /></div><div className="mt-8 rounded-[1.5rem] bg-[#EAF6FD] p-6"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h3 className="text-2xl font-black text-[#1c1c31]">Still comparing your options?</h3><p className="mt-2 text-slate-600">The FAQ page explains costs, licences, the beer tie, earnings and application timings in more detail.</p></div><Button onClick={() => navigate('faqs')}>Read the FAQs</Button></div></div></section></>;
}

function AgreementCard({ title, copy, items }) {
  return <Card className="h-full"><CardContent className="p-6"><h2 className="text-2xl font-black text-[#1c1c31]">{title}</h2><p className="mt-3 leading-7 text-slate-600">{copy}</p><ul className="mt-5 grid gap-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm font-bold text-slate-700"><Icon name="check" className="shrink-0 text-[#0a87c4]" size={18} />{item}</li>)}</ul></CardContent></Card>;
}

function AgreementRouteButton({ title, description, onClick }) {
  return <button onClick={onClick} className="group w-full rounded-md bg-white px-5 py-5 text-left text-[#1c1c31] shadow-sm ring-1 ring-white/70 transition duration-200 hover:-translate-y-1 hover:shadow-xl"><div className="flex items-center justify-between gap-5"><div className="min-w-0 pr-2"><p className="text-base font-black leading-snug md:text-[1.05rem]">{title}</p><p className="mt-1.5 text-sm leading-6 text-slate-600">{description}</p></div><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a87c4]/10 text-[#0a87c4] transition duration-200 group-hover:bg-[#0a87c4] group-hover:text-white"><Icon name="arrow" size={21} /></div></div></button>;
}

function PortalHero({ navigate, setAgreements }) {
  const chooseAgreement = (agreement) => { setAgreements([agreement]); document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' }); };
  return <section className="relative overflow-hidden bg-[#1c1c31] text-white"><img src={asset('StarPubs-Lifestyle-18.jpg')} alt="Star Pubs venue" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#1c1c31]/78" /><div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90"><Icon name="sparkle" size={16} /> Applicant portal</div><h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">Search, save and apply for pubs in one place.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">Use your profile, preferred agreement type and property filters to shortlist the pub opportunities that fit you best.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button className="h-12 px-7 text-base" onClick={() => navigate('profile')}>Update profile</Button><Button variant="outline" className="h-12 px-7 text-base" onClick={() => document.getElementById('vacancies')?.scrollIntoView({ behavior: 'smooth' })}>Browse vacancies</Button></div></motion.div><motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur"><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Not sure where to start?</p><h2 className="mt-2 text-3xl font-black">Choose the route that sounds most like you.</h2><p className="mt-3 text-sm leading-6 text-white/70">This helps turn a broad vacancy list into a more relevant starting point.</p><div className="mt-6 grid gap-3.5"><AgreementRouteButton title="A ready-made pub with support" description="Explore Just Add Talent opportunities." onClick={() => chooseAgreement('Just Add Talent')} /><AgreementRouteButton title="A pub to run with more independence" description="Explore Leased & Tenanted pubs." onClick={() => chooseAgreement('Leased & Tenanted')} /><AgreementRouteButton title="A pub with investment potential" description="Explore investment opportunities." onClick={() => chooseAgreement('Investment Tenancy Agreement')} /></div></motion.div></div></section>;
}

function FilterButton({ label, selected, onClick }) {
  return <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-[13px] font-black uppercase tracking-[0.08em] transition ${selected ? 'border-[#0a87c4] bg-[#0a87c4] text-white shadow-md' : 'border-slate-300 bg-white text-[#1c1c31] hover:border-[#0a87c4] hover:text-[#0a87c4]'}`}>{selected && <span className="h-2 w-2 rounded-full bg-white" />}{label}</button>;
}

function PropertyFilterButton({ label, selected, onClick }) {
  const icon = label === 'Beer garden' ? 'sparkle' : label === 'Sports' ? 'check' : label === 'City centre' ? 'pin' : label === 'Drinks-led' ? 'wallet' : 'building';
  return <button onClick={onClick} className={`flex min-w-[112px] flex-col items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-center transition ${selected ? 'border-[#0a87c4] bg-[#0a87c4]/10 text-[#0a87c4]' : 'border-slate-200 bg-white text-slate-500 hover:border-[#0a87c4]/50 hover:text-[#0a87c4]'}`}><Icon name={icon} size={22} /><span className="text-[12px] font-black leading-tight">{label}</span></button>;
}

function VacancyCard({ vacancy, saved, toggleSave, navigate, profile }) {
  const letAgreed = vacancy.availability === 'Let agreed';
  return <motion.article layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`group rounded-[1.75rem] border border-[#0a87c4]/55 bg-white p-5 shadow-sm ring-2 ring-[#0a87c4]/10 transition hover:-translate-y-1 hover:shadow-xl ${letAgreed ? 'opacity-70 grayscale' : ''}`}><ImagePlaceholder pub={vacancy} muted={letAgreed} /><div className="mt-5 flex items-start justify-between gap-4"><div><div className="mb-3 flex flex-wrap gap-2"><span className={`inline-flex rounded-md px-3 py-1 text-xs font-black ${letAgreed ? 'bg-slate-200 text-slate-600' : 'bg-[#0a87c4]/10 text-[#0a87c4]'}`}>{vacancy.availability}</span><AgreementBadge agreement={vacancy.agreement} /></div><h3 className="text-2xl font-black text-[#1c1c31]">{vacancy.pub}</h3><p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500"><Icon name="pin" size={16} /> {vacancy.location}</p></div><button onClick={() => toggleSave(vacancy.id)} className={`rounded-full p-3 transition ${saved ? 'bg-[#0a87c4] text-white' : 'bg-slate-100 text-slate-500'}`}><Icon name="heart" size={20} filled={saved} /></button></div>{vacancy.agreement === 'Just Add Talent' && <div className="mt-4 rounded-md bg-[#0a87c4]/10 px-4 py-3 text-sm font-semibold text-[#1c1c31]"><span className="font-black text-[#0a87c4]">Ready-made pub with support:</span> weekly revenue share, profit share and Star Pubs systems already in place.</div>}<p className="mt-4 leading-7 text-slate-600">{vacancy.summary}</p><div className="mt-5 rounded-2xl bg-slate-50 p-4"><p className="text-sm font-black text-[#1c1c31]">Recommended because</p><ul className="mt-2 grid gap-2 text-sm text-slate-600">{getReasons(vacancy, profile).map((reason) => <li key={reason} className="flex gap-2"><Icon name="check" size={16} className="text-[#0a87c4]" />{reason}</li>)}</ul></div><div className="mt-5 flex flex-wrap gap-2">{vacancy.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>)}</div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button onClick={() => navigate('pubDetail', vacancy.id)} className="flex-1 rounded-2xl bg-[#0a87c4] py-6 hover:bg-[#0877ad]">View opportunity</Button>{letAgreed && <Button variant="light" className="flex-1 rounded-2xl py-6" onClick={() => navigate('similar', vacancy.id)}>Show similar pubs</Button>}</div></motion.article>;
}

function PortalHomePage({ navigate, profile, saved, toggleSave }) {
  const [query, setQuery] = useState('');
  const [agreements, setAgreements] = useState([]);
  const [features, setFeatures] = useState([]);
  const filtered = useMemo(() => filterVacancies(vacancies, query, agreements, features), [query, agreements, features]);
  const toggle = (value, setter) => setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  return <><PortalHero navigate={navigate} setAgreements={setAgreements} /><section id="vacancies" className="mx-auto max-w-7xl px-5 pt-12 lg:px-8 lg:pt-16"><Card className="-mt-8 border-0 shadow-xl"><CardContent className="grid gap-4 p-5 md:grid-cols-[1fr_160px_140px] md:p-6"><label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"><Icon name="search" className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by pub, town, county or keyword" className="w-full bg-transparent text-sm outline-none" /></label><Button className="rounded-2xl">Search pubs</Button><button onClick={() => { setQuery(''); setAgreements([]); setFeatures([]); }} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#1c1c31]">Clear</button><div className="md:col-span-3"><p className="mb-2 text-sm font-black uppercase tracking-[0.14em] text-slate-500">Filter by agreement</p><div className="flex flex-wrap gap-2">{agreementOptions.filter((item) => item !== 'All agreements').map((item) => <FilterButton key={item} label={item} selected={agreements.includes(item)} onClick={() => toggle(item, setAgreements)} />)}</div></div><div className="md:col-span-3"><p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Property filters</p><div className="mt-3 flex gap-3 overflow-x-auto pb-2">{propertyFilters.map((item) => <PropertyFilterButton key={item} label={item} selected={features.includes(item)} onClick={() => toggle(item, setFeatures)} />)}</div></div></CardContent></Card><div className="mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Live opportunities</p><h2 className="mt-2 text-4xl font-black text-[#1c1c31]">Find a pub that fits</h2></div><p className="max-w-xl text-slate-600">Use agreement and property-style filters to quickly narrow the vacancy list around the kind of pub you want to run.</p></div>{filtered.length ? <div className="mt-8 grid gap-5 lg:grid-cols-2">{filtered.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} saved={saved.includes(vacancy.id)} toggleSave={toggleSave} navigate={navigate} profile={profile} />)}</div> : <Card className="mt-8"><CardContent className="p-8 text-center"><Icon name="search" size={34} className="mx-auto text-[#0a87c4]" /><h3 className="mt-4 text-2xl font-black text-[#1c1c31]">No matching pubs found</h3><p className="mt-2 text-slate-600">Try removing a filter or broadening your search.</p></CardContent></Card>}</section></>;
}

function PageHero({ eyebrow, title, copy, navigate, side, background }) {
  return <div className="relative overflow-hidden bg-[#1c1c31] px-5 py-12 text-white lg:px-8 lg:py-16">{background && <><img src={background} alt="Star Pubs header" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#1c1c31]/78" /></>}<div className="relative mx-auto max-w-7xl"><button onClick={() => navigate('siteHome')} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white"><Icon name="back" size={18} /> Back to Star Pubs home</button><div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">{eyebrow}</p><h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight md:text-6xl">{title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{copy}</p></div>{side}</div></div></div>;
}

function InfoPill({ title, copy }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><h4 className="font-black text-[#1c1c31]">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p></div>;
}

function ComparisonTable({ headers, rows }) {
  return <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200"><div className="grid bg-[#1c1c31] text-white" style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>{headers.map((header, index) => <div key={`${header}-${index}`} className="px-4 py-3 text-sm font-black">{header}</div>)}</div>{rows.map((row, index) => <div key={row[0]} className={`grid ${index % 2 ? 'bg-white' : 'bg-slate-50'}`} style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>{row.map((cell, cellIndex) => <div key={`${row[0]}-${cellIndex}`} className={`border-t border-slate-200 px-4 py-4 text-sm leading-6 ${cellIndex === 0 ? 'font-black text-[#1c1c31]' : 'text-slate-600'}`}>{cell}</div>)}</div>)}</div>;
}

function FAQAccordion({ faq, defaultOpen = false }) {
  return <details className="group rounded-[1.25rem] border border-slate-200 bg-white shadow-sm" open={defaultOpen}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-lg font-black text-[#1c1c31]"><span>{faq.q}</span><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a87c4]/10 text-[#0a87c4] transition group-open:rotate-45"><Icon name="x" size={16} /></span></summary><div className="faq-rich border-t border-slate-100 p-5 pt-4">{faq.a}{faq.cta && <Button className="mt-5" onClick={() => window.dispatchEvent(new CustomEvent('star-pubs-navigate', { detail: 'portalHome' }))}>{faq.cta}</Button>}</div></details>;
}

function FAQPage({ navigate }) {
  React.useEffect(() => {
    const handler = (event) => navigate(event.detail || 'portalHome');
    window.addEventListener('star-pubs-navigate', handler);
    return () => window.removeEventListener('star-pubs-navigate', handler);
  }, [navigate]);
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return <><PageHero eyebrow="Running a pub FAQs" title="Running a pub with Star Pubs: frequently asked questions" copy="Get clear answers on how to run a pub with Star Pubs, including costs, licences, agreement types, training, earnings, support and how to apply." navigate={navigate} background={asset('StarPubs-Lifestyle-33.jpg')} side={<Card className="border-white/10 bg-white/10 text-white backdrop-blur"><CardContent className="p-6"><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Suggested URL</p><p className="mt-2 text-xl font-black">/getting-started/pub-faqs</p><p className="mt-4 text-sm leading-6 text-white/70">Separate FAQ page with answer-card shortcuts and four themed accordion groups.</p></CardContent></Card>} /><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="rounded-[2rem] bg-[#EAF6FD] p-6 md:p-8"><p className="text-sm font-black uppercase tracking-[0.18em] text-[#0a87c4]">Thinking about running a pub?</p><p className="mt-3 max-w-5xl text-lg leading-8 text-slate-700">Star Pubs, the pub business of HEINEKEN UK, works with operators across England, Scotland and Wales through Just Add Talent, our Management Agreement, and a range of Leased & Tenanted agreements. Use these FAQs to understand which route could suit you, what you need to get started, the costs involved and what happens after you apply.</p></div><div className="mt-10"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">At a glance</p><h2 className="mt-2 text-3xl font-black text-[#1c1c31]">Quick answers to common questions</h2></div><p className="text-sm font-semibold text-slate-500">Last reviewed: 10 September 2026</p></div><div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{quickAnswerCards.map((card) => <button key={card.title} onClick={() => card.page ? navigate(card.page) : jump(card.target)} className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#0a87c4]/60 hover:shadow-xl"><Icon name={card.icon} size={30} className="text-[#0a87c4]" /><h3 className="mt-4 text-xl font-black text-[#1c1c31]">{card.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{card.copy}</p><p className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0a87c4]">{card.action}<Icon name="arrow" size={16} /></p></button>)}</div></div><div className="mt-10 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm"><p className="mb-3 px-2 text-sm font-black uppercase tracking-[0.16em] text-slate-500">Jump to a topic</p><div className="grid gap-2 md:grid-cols-4">{faqSections.map((section) => <button key={section.id} onClick={() => jump(section.id)} className="rounded-xl bg-slate-50 p-4 text-left text-sm font-black text-[#1c1c31] transition hover:bg-[#0a87c4] hover:text-white">{section.title} →<span className="mt-1 block text-xs font-semibold opacity-70">{section.subtitle}</span></button>)}</div></div><div className="mt-10 grid gap-12">{faqSections.map((section) => <section key={section.id} id={section.id} className="scroll-mt-28"><div className="mb-5"><p className="text-sm font-black uppercase tracking-[0.18em] text-[#0a87c4]">Section</p><h2 className="mt-2 text-4xl font-black text-[#1c1c31]">{section.title}</h2><p className="mt-3 max-w-3xl leading-7 text-slate-600">{section.intro}</p></div><div className="grid gap-4">{section.faqs.map((faq, index) => <FAQAccordion key={faq.q} faq={faq} defaultOpen={index === 0} />)}</div></section>)}</div><div className="mt-12 rounded-[2rem] bg-[#1c1c31] p-8 text-white"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Ready to take the next step?</p><h2 className="mt-2 text-3xl font-black">Find a pub that fits your plans.</h2><p className="mt-3 max-w-2xl leading-7 text-white/70">Browse current pub opportunities or sign in to save pubs, manage your profile and start an application.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Button onClick={() => navigate('portalHome')}>Browse current pub opportunities</Button><Button variant="outline" onClick={() => navigate('signin')}>Sign in</Button></div></div></div></section></>;
}

function ProfilePage({ profile, setProfile, navigate, savedVacancies }) {
  const required = ['firstName', 'lastName', 'email', 'phone', 'postalCode', 'agreementInterest', 'preferredRegion', 'preferredStyle'];
  const strength = Math.round((required.filter((key) => String(profile[key] || '').trim()).length / required.length) * 100);
  const update = (field, value) => setProfile((current) => ({ ...current, [field]: value }));
  const field = (label, key) => <label className="grid gap-2 text-sm font-bold text-[#1c1c31]"><span>{label}</span><input value={profile[key] || ''} onChange={(e) => update(key, e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 font-normal outline-none focus:border-[#0a87c4]" /></label>;
  return <section><PageHero eyebrow="Candidate profile" title="Build a profile once, use it across every application." copy="A guided profile builder helps us understand what you’re looking for and recommend more relevant pub opportunities." navigate={navigate} background={asset('StarPubs-Lifestyle-16.jpg')} side={<Card className="border-white/10 bg-white/10 text-white"><CardContent className="p-6"><p className="text-sm text-white/60">Profile completion</p><p className="mt-1 text-4xl font-black">{strength}%</p><div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15"><motion.div animate={{ width: `${strength}%` }} className="h-3 rounded-full bg-[#0a87c4]" /></div></CardContent></Card>} /><div className="mx-auto max-w-5xl px-5 py-12"><Card><CardContent className="grid gap-5 p-6 md:grid-cols-2">{field('First name', 'firstName')}{field('Last name', 'lastName')}{field('Email address', 'email')}{field('Telephone number', 'phone')}{field('Postal code', 'postalCode')}<label className="grid gap-2 text-sm font-bold text-[#1c1c31]"><span>Preferred agreement</span><select value={profile.agreementInterest} onChange={(e) => update('agreementInterest', e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 font-normal outline-none focus:border-[#0a87c4]">{agreementOptions.filter((item) => item !== 'All agreements').map((item) => <option key={item}>{item}</option>)}</select></label><div className="md:col-span-2"><Button onClick={() => navigate('portalHome')}>Save and browse pubs</Button></div></CardContent></Card>{savedVacancies.length > 0 && <p className="mt-5 text-sm font-semibold text-slate-500">You currently have {savedVacancies.length} saved pubs.</p>}</div></section>;
}

function PubDetailPage({ pub, navigate, toggleSave, saved }) {
  if (!pub) return <PortalHomePage navigate={navigate} profile={initialProfile} saved={[]} toggleSave={() => {}} />;
  const letAgreed = pub.availability === 'Let agreed';
  return <section><PageHero eyebrow="Pub opportunity" title={pub.pub} copy={pub.summary} navigate={navigate} side={<Card className="border-white/10 bg-white/10 text-white"><CardContent className="p-6"><p className="text-sm text-white/60">Agreement</p><p className="text-2xl font-black">{pub.agreement}</p><p className="mt-4 text-sm text-white/60">Status</p><p className="font-black">{pub.availability}</p></CardContent></Card>} /><div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[1fr_360px] lg:px-8"><Card><CardContent className="p-6 md:p-8"><ImagePlaceholder pub={pub} large /><h2 className="mt-8 text-3xl font-black text-[#1c1c31]">Why this pub?</h2><p className="mt-4 leading-8 text-slate-600">{pub.area}</p><div className="mt-6 grid gap-3 md:grid-cols-2">{pub.features.map((item) => <div key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-[#1c1c31]"><Icon name="check" className="mb-2 text-[#0a87c4]" />{item}</div>)}</div></CardContent></Card><aside><Card><CardContent className="p-6"><h3 className="text-2xl font-black text-[#1c1c31]">Ready to apply?</h3><p className="mt-3 leading-7 text-slate-600">Start your application journey for this pub.</p><Button disabled={letAgreed} onClick={() => navigate('applicationJourney', pub.id)} className={`mt-5 w-full ${letAgreed ? 'bg-slate-500' : ''}`}>{letAgreed ? 'Let agreed' : 'Start application'}</Button><Button variant="light" className="mt-3 w-full" onClick={() => toggleSave(pub.id)}>{saved ? 'Saved' : 'Save pub'}</Button></CardContent></Card></aside></div></section>;
}

function ApplicationJourneyPage({ pub, navigate }) {
  const selectedPub = pub || vacancies[0];
  return <section><PageHero eyebrow="Application journey" title={`Apply for ${selectedPub.pub}`} copy="Work through each step at your own pace, with your pub match, documents, business plan and application form all in one place." navigate={navigate} background={asset('StarPubs-Lifestyle-54.jpg')} side={<Card className="border-white/10 bg-white/10 text-white"><CardContent className="p-6"><p className="text-sm text-white/60">Selected pub</p><p className="mt-1 text-2xl font-black">{selectedPub.pub}</p><p className="mt-2 text-white/70">{selectedPub.location}</p></CardContent></Card>} /><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><Card><CardContent className="p-6"><p className="text-center text-sm font-black uppercase tracking-[0.2em] text-[#0a87c4]">Your application journey</p><div className="mt-8 grid gap-5 lg:grid-cols-6">{journeySteps.map((step, index) => <div key={step} className="text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 ${index < 3 ? 'border-[#0a87c4] bg-[#0a87c4] text-white' : 'border-[#0a87c4] bg-white text-[#0a87c4]'} font-black`}>{index < 3 ? '✓' : index + 1}</div><h3 className="mt-3 text-sm font-black text-[#1c1c31]">{step}</h3></div>)}</div></CardContent></Card><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{journeyTiles.map((tile) => <button key={tile.title} className="min-h-[210px] rounded-[1.5rem] border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#0a87c4]"><Icon name={tile.icon} size={42} className="mx-auto text-[#0a87c4]" /><h3 className="mt-4 text-2xl font-black uppercase text-[#1c1c31]">{tile.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{tile.copy}</p></button>)}</div></div></section>;
}

function SavedPage({ savedVacancies, toggleSave, navigate, profile }) {
  return <section><PageHero eyebrow="Saved pubs" title="Keep track of the pubs you’re interested in." copy="Review saved opportunities, see what is still available and spot pubs that have moved to let agreed." navigate={navigate} background={asset('StarPubs-Lifestyle-50.jpg')} /><div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-2 lg:px-8">{savedVacancies.map((pub) => <VacancyCard key={pub.id} vacancy={pub} saved toggleSave={toggleSave} navigate={navigate} profile={profile} />)}</div></section>;
}

function ApplicationsPage({ navigate }) {
  const [filter, setFilter] = useState('All applications');
  const shown = filter === 'All applications' ? applications : applications.filter((app) => app.stage === filter);
  return <section><PageHero eyebrow="Applications" title="Track every application in one place." copy="See which pub applications are still ongoing, submitted, in review, accepted or rejected." navigate={navigate} background={asset('StarPubs-Lifestyle-54.jpg')} /><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><Card className="mb-6"><CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"><h2 className="text-2xl font-black text-[#1c1c31]">Ongoing and completed applications</h2><select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"><option>All applications</option>{applicationStages.map((stage) => <option key={stage}>{stage}</option>)}</select></CardContent></Card><div className="grid gap-5">{shown.map((app) => <Card key={app.id}><CardContent className="p-6"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><div className="mb-3 inline-flex rounded-full bg-[#0a87c4]/10 px-3 py-1 text-xs font-black text-[#0a87c4]">{app.stage}</div><h3 className="text-2xl font-black text-[#1c1c31]">{app.pub}</h3><p className="mt-2 text-sm font-semibold text-slate-500">{app.location}</p></div><Button onClick={() => navigate('applicationJourney', app.vacancyId)}>Open journey</Button></div><p className="mt-4 text-slate-600">{app.nextAction}</p></CardContent></Card>)}</div></div></section>;
}

function SimilarPage({ sourcePub, navigate, profile, saved, toggleSave }) {
  const similar = vacancies.filter((pub) => pub.id !== sourcePub?.id && pub.availability === 'Available');
  return <section><PageHero eyebrow="Similar pubs" title="This opportunity may have moved on, but others are open." copy="Keep momentum by reviewing similar pubs that are currently available." navigate={navigate} /><div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-3 lg:px-8">{similar.map((pub) => <VacancyCard key={pub.id} vacancy={pub} saved={saved.includes(pub.id)} toggleSave={toggleSave} navigate={navigate} profile={profile} />)}</div></section>;
}

function SignInPage({ navigate, setSignedIn }) {
  const [email, setEmail] = useState(dummyCredentials.email);
  const [password, setPassword] = useState(dummyCredentials.password);
  const [message, setMessage] = useState('Enter the prototype sign-in details to continue.');
  const submit = (e) => { e.preventDefault(); if (email.toLowerCase() === dummyCredentials.email && password === dummyCredentials.password) { setSignedIn(true); setMessage('Signed in successfully. Taking you to the applicant portal...'); setTimeout(() => navigate('portalHome'), 650); } else { setMessage('Those details do not match the prototype account.'); } };
  return <section><PageHero eyebrow="Candidate sign in" title="Sign in to continue your pub search." copy="This mock credentials page simulates a secure sign-in flow from the Star Pubs website into the applicant portal." navigate={navigate} /><div className="mx-auto max-w-4xl px-5 py-12"><Card><CardContent className="p-6 md:p-8"><form onSubmit={submit} className="grid gap-5"><label className="grid gap-2 text-sm font-bold text-[#1c1c31]">Email address<input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4" /></label><label className="grid gap-2 text-sm font-bold text-[#1c1c31]">Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4" /></label><div className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">{message}</div><Button type="submit">Sign in to applicant portal</Button></form></CardContent></Card></div></section>;
}

function FloatingChatBubble({ navigate }) {
  const [open, setOpen] = useState(false);
  return <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }} className="w-[min(340px,calc(100vw-2.5rem))] rounded-[1.5rem] border border-slate-200 bg-white p-5 text-[#1c1c31] shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#0a87c4]">Need help?</p><h3 className="mt-1 text-xl font-black">Chat to Star Pubs</h3></div><button type="button" onClick={() => setOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-500"><Icon name="x" size={16} /></button></div><p className="mt-3 text-sm leading-6 text-slate-600">Questions about a pub, agreement type or your application? Start a chat with the Licensee Attraction team.</p><Button className="mt-4 w-full" onClick={() => navigate('applications')}>Start chat</Button></motion.div>}</AnimatePresence><motion.button type="button" onClick={() => setOpen((current) => !current)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0a87c4] text-white shadow-2xl ring-4 ring-white/80"><Icon name={open ? 'x' : 'message'} size={26} /></motion.button></div>;
}

function runSelfTests() {
  console.assert(filterVacancies(vacancies, '', ['Just Add Talent'], []).length === 2, 'Expected two JAT vacancies');
  console.assert(filterVacancies(vacancies, '', [], ['Beer garden']).length === 2, 'Expected beer garden filter to match two vacancies');
  console.assert(faqSections.length === 4, 'Expected four FAQ topic groups');
  console.assert(faqSections.reduce((sum, section) => sum + section.faqs.length, 0) === 20, 'Expected twenty FAQ questions');
}
runSelfTests();

export default function App() {
  const [page, setPage] = useState('siteHome');
  const [param, setParam] = useState(null);
  const [saved, setSaved] = useState([1, 3, 5]);
  const [profile, setProfile] = useState(initialProfile);
  const [signedIn, setSignedIn] = useState(false);
  const currentPub = vacancies.find((pub) => pub.id === param);
  const savedVacancies = vacancies.filter((pub) => saved.includes(pub.id));
  const navigate = (nextPage, nextParam = null) => { setPage(nextPage); setParam(nextParam); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleSave = (id) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const pageComponent = page === 'siteHome' ? <SiteHomePage navigate={navigate} signedIn={signedIn} /> : page === 'agreements' ? <AgreementsPage navigate={navigate} /> : page === 'faqs' ? <FAQPage navigate={navigate} /> : page === 'profile' ? <ProfilePage profile={profile} setProfile={setProfile} navigate={navigate} savedVacancies={savedVacancies} /> : page === 'saved' ? <SavedPage savedVacancies={savedVacancies} toggleSave={toggleSave} navigate={navigate} profile={profile} /> : page === 'applications' ? <ApplicationsPage navigate={navigate} /> : page === 'applicationJourney' ? <ApplicationJourneyPage pub={currentPub} navigate={navigate} /> : page === 'pubDetail' ? <PubDetailPage pub={currentPub} navigate={navigate} toggleSave={toggleSave} saved={currentPub ? saved.includes(currentPub.id) : false} profile={profile} /> : page === 'similar' ? <SimilarPage sourcePub={currentPub} navigate={navigate} profile={profile} saved={saved} toggleSave={toggleSave} /> : page === 'signin' ? <SignInPage navigate={navigate} setSignedIn={setSignedIn} /> : <PortalHomePage navigate={navigate} profile={profile} saved={saved} toggleSave={toggleSave} />;

  const isPortalPage = ['portalHome', 'profile', 'saved', 'applications', 'applicationJourney', 'pubDetail', 'similar'].includes(page);

  return <main className="min-h-screen bg-slate-50 text-slate-900"><GlobalStyles />{isPortalPage ? <PortalHeader page={page} navigate={navigate} signedIn={signedIn} profile={profile} /> : <PublicHeader page={page} navigate={navigate} signedIn={signedIn} profile={profile} />}{pageComponent}<footer className="bg-[#1c1c31] px-5 py-10 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><button onClick={() => navigate('siteHome')}><StarLogo /></button><div className="flex flex-wrap items-center gap-3 text-sm font-bold"><button onClick={() => navigate('siteHome')} className="text-white/80 hover:text-white">Star Pubs home</button><span className="h-4 w-0.5 bg-white/35" /><button onClick={() => navigate('portalHome')} className="text-white/80 hover:text-white">Applicant portal</button><span className="h-4 w-0.5 bg-white/35" /><button onClick={() => navigate('faqs')} className="text-white/80 hover:text-white">FAQs</button></div><p className="max-w-xl text-sm leading-7 text-white/65">Leadership mock-up for a Star Pubs website and applicant portal journey.</p></div></footer><FloatingChatBubble navigate={navigate} /></main>;
}
