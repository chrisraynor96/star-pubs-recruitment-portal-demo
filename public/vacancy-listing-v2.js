const STAR_BLUE = '#0a87c4';
const STAR_NAVY = '#1c1c31';

const financeByAgreement = {
  'Just Add Talent': {
    label1: 'Starting funds',
    value1: '£4,000',
    label2: 'Earning model',
    value2: 'Revenue + profit share'
  },
  'Investment Tenancy Agreement': {
    label1: 'Indicative entry costs',
    value1: 'See pub details',
    label2: 'Annual rent',
    value2: 'Pub specific'
  },
  'Leased & Tenanted': {
    label1: 'Indicative entry costs',
    value1: 'See pub details',
    label2: 'Annual rent',
    value2: 'Pub specific'
  }
};

const carouselImages = [
  'rose-villa-tavern.jpg',
  'pearces-bar-edinburgh.jpg',
  'StarPubs-Lifestyle-18.jpg',
  'StarPubs-Lifestyle-50.jpg',
  'home-banner.jpg'
];

const compareState = new Map();
let compareDock;
let compareModal;

function assetUrl(name) {
  return new URL(`images/${name}`, document.baseURI).href;
}

function injectStyles() {
  if (document.getElementById('vacancy-v2-styles')) return;
  const style = document.createElement('style');
  style.id = 'vacancy-v2-styles';
  style.textContent = `
    #vacancies .vacancy-v2-grid {
      align-items: stretch;
    }
    @media (min-width: 1180px) {
      #vacancies .vacancy-v2-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
    }
    #vacancies article.vacancy-v2-card {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 0 !important;
      border: 1px solid #dbe3ea !important;
      border-radius: 1.1rem !important;
      box-shadow: 0 8px 24px rgba(28,28,49,.08) !important;
      ring: none !important;
      background: white;
      opacity: 1 !important;
      filter: none !important;
    }
    #vacancies article.vacancy-v2-card:hover {
      transform: translateY(-4px);
      border-color: rgba(10,135,196,.55) !important;
      box-shadow: 0 18px 42px rgba(28,28,49,.14) !important;
    }
    #vacancies .vacancy-v2-media {
      position: relative !important;
      height: 230px !important;
      min-height: 230px;
      border-radius: 0 !important;
      overflow: hidden;
      background: ${STAR_NAVY};
    }
    #vacancies .vacancy-v2-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity .18s ease;
    }
    #vacancies .vacancy-v2-media::after {
      content: '';
      position: absolute;
      inset: auto 0 0;
      height: 38%;
      background: linear-gradient(to top, rgba(0,0,0,.42), transparent);
      pointer-events: none;
    }
    #vacancies .vacancy-v2-media > div:not(.vacancy-v2-media-tools) {
      z-index: 2;
    }
    .vacancy-v2-media-tools {
      position: absolute;
      inset: 0;
      z-index: 8;
      pointer-events: none;
    }
    .vacancy-v2-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      padding: 7px 10px;
      border-radius: 4px;
      background: ${STAR_BLUE};
      color: white;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .09em;
      text-transform: uppercase;
      box-shadow: 0 4px 12px rgba(0,0,0,.18);
    }
    .vacancy-v2-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 38px;
      height: 48px;
      display: grid;
      place-items: center;
      border: 0;
      background: rgba(255,255,255,.94);
      color: ${STAR_BLUE};
      font-size: 28px;
      font-weight: 900;
      box-shadow: 0 3px 10px rgba(0,0,0,.12);
      pointer-events: auto;
      transition: background .18s ease, transform .18s ease;
    }
    .vacancy-v2-arrow:hover {
      background: white;
      transform: translateY(-50%) scale(1.04);
    }
    .vacancy-v2-arrow.prev { left: 0; border-radius: 0 8px 8px 0; }
    .vacancy-v2-arrow.next { right: 0; border-radius: 8px 0 0 8px; }
    .vacancy-v2-counter {
      position: absolute;
      right: 14px;
      bottom: 12px;
      padding: 5px 8px;
      border-radius: 999px;
      background: rgba(28,28,49,.82);
      color: white;
      font-size: 11px;
      font-weight: 800;
      pointer-events: none;
    }
    #vacancies .vacancy-v2-header {
      padding: 1.25rem 1.25rem 0 !important;
      margin-top: 0 !important;
    }
    #vacancies .vacancy-v2-header h3 {
      font-size: 1.28rem !important;
      line-height: 1.18 !important;
      color: ${STAR_NAVY};
    }
    #vacancies .vacancy-v2-header > button {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      border: 1px solid #e2e8f0;
      background: white !important;
      color: ${STAR_BLUE} !important;
      box-shadow: 0 3px 12px rgba(28,28,49,.06);
    }
    #vacancies .vacancy-v2-header > button:hover {
      border-color: ${STAR_BLUE};
      transform: scale(1.05);
    }
    #vacancies .vacancy-v2-summary {
      margin: .95rem 1.25rem 0 !important;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: #64748b !important;
      font-size: .88rem;
      line-height: 1.55 !important;
    }
    #vacancies .vacancy-v2-callout,
    #vacancies .vacancy-v2-reasons,
    #vacancies .vacancy-v2-tags {
      display: none !important;
    }
    .vacancy-v2-finance {
      margin: 1rem 1.25rem 0;
      padding: .95rem 0;
      border-top: 1px solid #e7edf2;
      border-bottom: 1px solid #e7edf2;
      display: grid;
      gap: .72rem;
    }
    .vacancy-v2-finance-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 16px;
    }
    .vacancy-v2-finance-label {
      color: #64748b;
      font-size: .78rem;
      font-weight: 750;
    }
    .vacancy-v2-finance-value {
      color: ${STAR_BLUE};
      text-align: right;
      font-size: 1rem;
      font-weight: 900;
    }
    .vacancy-v2-compare-row {
      margin: .9rem 1.25rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .vacancy-v2-compare-label {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      color: ${STAR_NAVY};
      font-size: .82rem;
      font-weight: 800;
      cursor: pointer;
    }
    .vacancy-v2-compare-label input {
      width: 18px;
      height: 18px;
      accent-color: ${STAR_BLUE};
    }
    .vacancy-v2-view-hint {
      color: #94a3b8;
      font-size: .74rem;
      font-weight: 700;
    }
    #vacancies .vacancy-v2-actions {
      margin-top: auto !important;
      padding: 1rem 1.25rem 1.25rem !important;
    }
    #vacancies .vacancy-v2-actions > button:first-child {
      min-height: 48px;
      border-radius: 8px !important;
    }
    #vacancies .vacancy-v2-actions > button + button {
      display: none !important;
    }
    .vacancy-v2-dock {
      position: fixed;
      left: 50%;
      bottom: 22px;
      z-index: 80;
      transform: translate(-50%, 130%);
      width: min(760px, calc(100vw - 32px));
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 14px 12px 18px;
      border-radius: 14px;
      background: ${STAR_NAVY};
      color: white;
      box-shadow: 0 20px 50px rgba(15,23,42,.34);
      opacity: 0;
      transition: transform .24s ease, opacity .24s ease;
    }
    .vacancy-v2-dock.is-visible { transform: translate(-50%, 0); opacity: 1; }
    .vacancy-v2-dock-copy { min-width: 0; }
    .vacancy-v2-dock-copy strong { display: block; font-size: .94rem; }
    .vacancy-v2-dock-names { margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: rgba(255,255,255,.68); font-size: .76rem; }
    .vacancy-v2-dock-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .vacancy-v2-dock button { border: 0; border-radius: 8px; padding: 10px 13px; font-weight: 900; font-size: .78rem; }
    .vacancy-v2-dock-clear { background: rgba(255,255,255,.1); color: white; }
    .vacancy-v2-dock-open { background: ${STAR_BLUE}; color: white; }
    .vacancy-v2-modal-wrap {
      position: fixed;
      inset: 0;
      z-index: 95;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(10,15,30,.72);
      backdrop-filter: blur(6px);
    }
    .vacancy-v2-modal-wrap.is-open { display: flex; }
    .vacancy-v2-modal {
      width: min(1040px, 100%);
      max-height: min(780px, calc(100vh - 48px));
      overflow: auto;
      border-radius: 22px;
      background: white;
      box-shadow: 0 26px 80px rgba(0,0,0,.38);
    }
    .vacancy-v2-modal-head {
      position: sticky;
      top: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 22px 24px;
      border-bottom: 1px solid #e2e8f0;
      background: white;
    }
    .vacancy-v2-modal-head h2 { margin: 0; color: ${STAR_NAVY}; font-size: 1.55rem; font-weight: 900; }
    .vacancy-v2-modal-close { width: 38px; height: 38px; border: 0; border-radius: 50%; background: #f1f5f9; color: ${STAR_NAVY}; font-size: 22px; }
    .vacancy-v2-compare-grid {
      display: grid;
      grid-template-columns: repeat(var(--count), minmax(0, 1fr));
      gap: 16px;
      padding: 24px;
    }
    .vacancy-v2-compare-card {
      border: 1px solid #dbe3ea;
      border-radius: 16px;
      overflow: hidden;
      background: white;
    }
    .vacancy-v2-compare-card img { width: 100%; height: 160px; object-fit: cover; background: ${STAR_NAVY}; }
    .vacancy-v2-compare-card-body { padding: 18px; }
    .vacancy-v2-compare-card h3 { margin: 0; color: ${STAR_NAVY}; font-size: 1.1rem; font-weight: 900; }
    .vacancy-v2-compare-card p { margin: 5px 0 0; color: #64748b; font-size: .8rem; line-height: 1.5; }
    .vacancy-v2-compare-list { margin: 15px 0 0; padding: 0; list-style: none; border-top: 1px solid #e2e8f0; }
    .vacancy-v2-compare-list li { display: flex; justify-content: space-between; gap: 10px; padding: 10px 0; border-bottom: 1px solid #edf2f7; font-size: .78rem; }
    .vacancy-v2-compare-list span:first-child { color: #64748b; font-weight: 700; }
    .vacancy-v2-compare-list span:last-child { color: ${STAR_NAVY}; text-align: right; font-weight: 900; }
    .vacancy-v2-compare-view { margin-top: 16px; width: 100%; border: 0; border-radius: 8px; padding: 12px 14px; background: ${STAR_BLUE}; color: white; font-weight: 900; }
    @media (max-width: 700px) {
      .vacancy-v2-compare-grid { grid-template-columns: 1fr; }
      .vacancy-v2-dock-names { display: none; }
      .vacancy-v2-dock { padding-left: 14px; }
    }
  `;
  document.head.appendChild(style);
}

function findAgreement(card) {
  const text = card.textContent || '';
  if (text.includes('Just Add Talent')) return 'Just Add Talent';
  if (text.includes('Investment Tenancy Agreement')) return 'Investment Tenancy Agreement';
  return 'Leased & Tenanted';
}

function ensureMediaImage(media, cardIndex) {
  let image = media.querySelector('img');
  if (!image) {
    image = document.createElement('img');
    image.alt = 'Pub opportunity image';
    image.src = assetUrl(carouselImages[cardIndex % carouselImages.length]);
    media.prepend(image);
  }
  return image;
}

function addCarousel(card, media, cardIndex, pubName) {
  if (media.querySelector('.vacancy-v2-media-tools')) return;
  const image = ensureMediaImage(media, cardIndex);
  const existingSrc = image.currentSrc || image.src;
  const sources = [existingSrc, ...carouselImages.map(assetUrl)].filter((src, index, arr) => src && arr.indexOf(src) === index);
  let current = 0;

  const tools = document.createElement('div');
  tools.className = 'vacancy-v2-media-tools';
  const badge = document.createElement('span');
  badge.className = 'vacancy-v2-badge';
  badge.textContent = cardIndex < 2 ? 'New opportunity' : 'Available now';
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'vacancy-v2-arrow prev';
  prev.setAttribute('aria-label', `Previous image for ${pubName}`);
  prev.innerHTML = '&#8249;';
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'vacancy-v2-arrow next';
  next.setAttribute('aria-label', `Next image for ${pubName}`);
  next.innerHTML = '&#8250;';
  const counter = document.createElement('span');
  counter.className = 'vacancy-v2-counter';
  counter.textContent = `1/${sources.length}`;

  const show = (delta) => {
    current = (current + delta + sources.length) % sources.length;
    image.style.opacity = '.3';
    window.setTimeout(() => {
      image.src = sources[current];
      image.style.opacity = '1';
      counter.textContent = `${current + 1}/${sources.length}`;
    }, 90);
  };
  prev.addEventListener('click', (event) => { event.stopPropagation(); show(-1); });
  next.addEventListener('click', (event) => { event.stopPropagation(); show(1); });
  tools.append(badge, prev, next, counter);
  media.appendChild(tools);
}

function ensureCompareUi() {
  if (!compareDock) {
    compareDock = document.createElement('div');
    compareDock.className = 'vacancy-v2-dock';
    compareDock.innerHTML = `<div class="vacancy-v2-dock-copy"><strong>Compare selected pubs</strong><div class="vacancy-v2-dock-names"></div></div><div class="vacancy-v2-dock-actions"><button class="vacancy-v2-dock-clear" type="button">Clear</button><button class="vacancy-v2-dock-open" type="button">Compare</button></div>`;
    document.body.appendChild(compareDock);
    compareDock.querySelector('.vacancy-v2-dock-clear').addEventListener('click', clearCompare);
    compareDock.querySelector('.vacancy-v2-dock-open').addEventListener('click', openCompare);
  }
  if (!compareModal) {
    compareModal = document.createElement('div');
    compareModal.className = 'vacancy-v2-modal-wrap';
    compareModal.innerHTML = `<div class="vacancy-v2-modal" role="dialog" aria-modal="true" aria-label="Compare pub opportunities"><div class="vacancy-v2-modal-head"><div><p style="margin:0;color:${STAR_BLUE};font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase">Pub comparison</p><h2>Compare opportunities side by side</h2></div><button class="vacancy-v2-modal-close" type="button" aria-label="Close comparison">×</button></div><div class="vacancy-v2-compare-grid"></div></div>`;
    document.body.appendChild(compareModal);
    compareModal.querySelector('.vacancy-v2-modal-close').addEventListener('click', closeCompare);
    compareModal.addEventListener('click', (event) => { if (event.target === compareModal) closeCompare(); });
  }
}

function updateCompareDock() {
  ensureCompareUi();
  const values = [...compareState.values()];
  compareDock.classList.toggle('is-visible', values.length > 0);
  compareDock.querySelector('.vacancy-v2-dock-copy strong').textContent = values.length === 1 ? '1 pub selected' : `${values.length} pubs selected`;
  compareDock.querySelector('.vacancy-v2-dock-names').textContent = values.map((item) => item.name).join('  •  ');
  compareDock.querySelector('.vacancy-v2-dock-open').textContent = `Compare${values.length ? ` (${values.length})` : ''}`;
}

function clearCompare() {
  compareState.clear();
  document.querySelectorAll('.vacancy-v2-compare-label input').forEach((input) => { input.checked = false; });
  updateCompareDock();
  closeCompare();
}

function closeCompare() {
  if (compareModal) compareModal.classList.remove('is-open');
}

function openCompare() {
  ensureCompareUi();
  const values = [...compareState.values()];
  if (!values.length) return;
  const grid = compareModal.querySelector('.vacancy-v2-compare-grid');
  grid.style.setProperty('--count', Math.min(values.length, 3));
  grid.innerHTML = '';
  values.forEach((item) => {
    const panel = document.createElement('div');
    panel.className = 'vacancy-v2-compare-card';
    panel.innerHTML = `<img src="${item.image}" alt="${item.name}"><div class="vacancy-v2-compare-card-body"><h3>${item.name}</h3><p>${item.location}</p><ul class="vacancy-v2-compare-list"><li><span>Agreement</span><span>${item.agreement}</span></li><li><span>${item.finance.label1}</span><span>${item.finance.value1}</span></li><li><span>${item.finance.label2}</span><span>${item.finance.value2}</span></li><li><span>Status</span><span>${item.status}</span></li></ul><button type="button" class="vacancy-v2-compare-view">View opportunity</button></div>`;
    panel.querySelector('.vacancy-v2-compare-view').addEventListener('click', () => {
      closeCompare();
      item.viewButton?.click();
    });
    grid.appendChild(panel);
  });
  compareModal.classList.add('is-open');
}

function enhanceCard(card, cardIndex) {
  if (card.dataset.vacancyV2 === 'true') return;
  const heading = card.querySelector('h3');
  if (!heading) return;
  card.dataset.vacancyV2 = 'true';
  card.classList.add('vacancy-v2-card');
  card.parentElement?.classList.add('vacancy-v2-grid');

  const pubName = heading.textContent.trim();
  const agreement = findAgreement(card);
  const finance = financeByAgreement[agreement] || financeByAgreement['Leased & Tenanted'];
  const directChildren = [...card.children];
  const media = directChildren[0];
  const header = directChildren[1];
  if (!media || !header) return;
  media.classList.add('vacancy-v2-media');
  header.classList.add('vacancy-v2-header');
  addCarousel(card, media, cardIndex, pubName);

  const directParagraph = directChildren.find((child) => child.tagName === 'P');
  if (directParagraph) directParagraph.classList.add('vacancy-v2-summary');

  const callout = directChildren.find((child) => child !== header && child !== media && child.tagName === 'DIV' && child.textContent.includes('Ready-made pub with support'));
  if (callout) callout.classList.add('vacancy-v2-callout');

  const reasons = directChildren.find((child) => child.tagName === 'DIV' && child.textContent.includes('Recommended because'));
  if (reasons) reasons.classList.add('vacancy-v2-reasons');

  const tags = directChildren.find((child) => child.tagName === 'DIV' && child.className.includes('flex-wrap') && child.querySelectorAll('span').length > 0 && !child.textContent.includes('Available'));
  if (tags) tags.classList.add('vacancy-v2-tags');

  const actions = directChildren[directChildren.length - 1];
  if (actions?.tagName === 'DIV') actions.classList.add('vacancy-v2-actions');
  const viewButton = actions?.querySelector('button');

  const locationNode = [...header.querySelectorAll('p')].find((node) => node.textContent.trim());
  const location = locationNode?.textContent.trim() || 'Location details on pub page';
  const status = card.textContent.includes('Let agreed') ? 'Let agreed' : 'Available';

  const financeBox = document.createElement('div');
  financeBox.className = 'vacancy-v2-finance';
  financeBox.innerHTML = `<div class="vacancy-v2-finance-row"><span class="vacancy-v2-finance-label">${finance.label1}</span><strong class="vacancy-v2-finance-value">${finance.value1}</strong></div><div class="vacancy-v2-finance-row"><span class="vacancy-v2-finance-label">${finance.label2}</span><strong class="vacancy-v2-finance-value">${finance.value2}</strong></div>`;

  const compareRow = document.createElement('div');
  compareRow.className = 'vacancy-v2-compare-row';
  const compareLabel = document.createElement('label');
  compareLabel.className = 'vacancy-v2-compare-label';
  compareLabel.innerHTML = '<input type="checkbox"> Compare';
  const hint = document.createElement('span');
  hint.className = 'vacancy-v2-view-hint';
  hint.textContent = 'Select up to 3';
  compareRow.append(compareLabel, hint);

  const image = media.querySelector('img');
  const compareItem = {
    id: pubName,
    name: pubName,
    location,
    agreement,
    status,
    finance,
    image: image?.currentSrc || image?.src || assetUrl(carouselImages[cardIndex % carouselImages.length]),
    viewButton
  };

  compareLabel.querySelector('input').addEventListener('change', (event) => {
    if (event.target.checked) {
      if (compareState.size >= 3) {
        event.target.checked = false;
        window.alert('You can compare up to three pubs at a time.');
        return;
      }
      compareState.set(pubName, compareItem);
    } else {
      compareState.delete(pubName);
    }
    updateCompareDock();
  });

  if (actions) {
    card.insertBefore(financeBox, actions);
    card.insertBefore(compareRow, actions);
  } else {
    card.append(financeBox, compareRow);
  }

  const saveButton = header.querySelector(':scope > button');
  if (saveButton) saveButton.setAttribute('aria-label', `Save ${pubName}`);
}

function enhanceListings() {
  injectStyles();
  const cards = [...document.querySelectorAll('#vacancies article')];
  cards.forEach((card, index) => enhanceCard(card, index));
  if (cards.length) ensureCompareUi();
}

let scheduled = false;
const observer = new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(() => {
    scheduled = false;
    enhanceListings();
  });
});

observer.observe(document.body, { childList: true, subtree: true });
window.addEventListener('DOMContentLoaded', enhanceListings);
window.setTimeout(enhanceListings, 500);
