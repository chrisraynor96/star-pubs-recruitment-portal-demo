(() => {
  let menu = null;
  let activeButton = null;
  let allowNativeProfileClick = false;

  const menuItems = [
    {
      label: 'My profile',
      description: 'Update your details, preferences and experience.',
      action: () => clickNativeProfileButton()
    },
    {
      label: 'Applicant portal',
      description: 'Return to your personalised pub search.',
      action: () => navigateViaButtons(['Applicant portal', 'Portal home'])
    },
    {
      label: 'Saved pubs',
      description: 'Review the opportunities you have shortlisted.',
      action: () => navigateViaButtons(['Saved pubs'], true)
    },
    {
      label: 'Applications',
      description: 'Track progress and reopen application journeys.',
      action: () => navigateViaButtons(['Applications'], true)
    },
    {
      label: 'FAQs',
      description: 'Get help with costs, agreements and next steps.',
      action: () => navigateViaButtons(['FAQs'])
    },
    {
      label: 'Log out',
      description: 'End this mock signed-in session.',
      danger: true,
      action: () => window.location.reload()
    }
  ];

  function addStyles() {
    if (document.getElementById('star-pubs-profile-menu-styles')) return;
    const style = document.createElement('style');
    style.id = 'star-pubs-profile-menu-styles';
    style.textContent = `
      .sp-profile-menu {
        position: fixed;
        z-index: 9999;
        width: min(320px, calc(100vw - 24px));
        border: 1px solid rgba(226, 232, 240, 0.95);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 24px 70px rgba(15, 23, 42, 0.24);
        overflow: hidden;
        color: #1c1c31;
        font-family: Montserrat, ui-sans-serif, system-ui, sans-serif;
      }
      .sp-profile-menu__header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: #1c1c31;
        color: white;
      }
      .sp-profile-menu__avatar {
        display: flex;
        width: 44px;
        height: 44px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #0a87c4;
        font-weight: 900;
        border: 3px solid rgba(255,255,255,0.22);
      }
      .sp-profile-menu__name {
        font-size: 15px;
        font-weight: 900;
        line-height: 1.2;
      }
      .sp-profile-menu__meta {
        margin-top: 3px;
        font-size: 12px;
        color: rgba(255,255,255,0.68);
        font-weight: 700;
      }
      .sp-profile-menu__list {
        padding: 8px;
        display: grid;
        gap: 4px;
      }
      .sp-profile-menu__item {
        width: 100%;
        display: block;
        border: 0;
        border-radius: 14px;
        background: transparent;
        padding: 12px 12px;
        text-align: left;
        cursor: pointer;
        color: #1c1c31;
      }
      .sp-profile-menu__item:hover,
      .sp-profile-menu__item:focus-visible {
        background: #eaf6fd;
        outline: none;
      }
      .sp-profile-menu__item-title {
        display: block;
        font-size: 14px;
        font-weight: 900;
      }
      .sp-profile-menu__item-copy {
        display: block;
        margin-top: 3px;
        font-size: 12px;
        line-height: 1.45;
        color: #64748b;
        font-weight: 600;
      }
      .sp-profile-menu__item--danger .sp-profile-menu__item-title {
        color: #b42318;
      }
      .sp-profile-menu__divider {
        height: 1px;
        background: #e2e8f0;
        margin: 4px 8px;
      }
    `;
    document.head.appendChild(style);
  }

  function getInitials() {
    const text = activeButton?.textContent || 'Chris';
    const compact = text.replace(/\s+/g, ' ').trim();
    if (compact.includes('Chris')) return 'CR';
    return compact.slice(0, 2).toUpperCase() || 'CR';
  }

  function createMenu() {
    addStyles();
    const panel = document.createElement('div');
    panel.className = 'sp-profile-menu';
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-label', 'Profile menu');

    panel.innerHTML = `
      <div class="sp-profile-menu__header">
        <div class="sp-profile-menu__avatar">${getInitials()}</div>
        <div>
          <div class="sp-profile-menu__name">Chris Raynor</div>
          <div class="sp-profile-menu__meta">Signed in to applicant portal</div>
        </div>
      </div>
      <div class="sp-profile-menu__list"></div>
    `;

    const list = panel.querySelector('.sp-profile-menu__list');
    menuItems.forEach((item, index) => {
      if (index === menuItems.length - 1) {
        const divider = document.createElement('div');
        divider.className = 'sp-profile-menu__divider';
        list.appendChild(divider);
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `sp-profile-menu__item ${item.danger ? 'sp-profile-menu__item--danger' : ''}`;
      button.setAttribute('role', 'menuitem');
      button.innerHTML = `<span class="sp-profile-menu__item-title">${item.label}</span><span class="sp-profile-menu__item-copy">${item.description}</span>`;
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeMenu();
        item.action();
      });
      list.appendChild(button);
    });

    return panel;
  }

  function positionMenu() {
    if (!menu || !activeButton) return;
    const rect = activeButton.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 24);
    const left = Math.max(12, Math.min(window.innerWidth - width - 12, rect.right - width));
    const top = Math.min(window.innerHeight - 20, rect.bottom + 10);
    menu.style.width = `${width}px`;
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  function openMenu(button) {
    activeButton = button;
    menu = createMenu();
    document.body.appendChild(menu);
    positionMenu();
  }

  function closeMenu() {
    if (menu) menu.remove();
    menu = null;
  }

  function toggleMenu(button) {
    if (menu && activeButton === button) {
      closeMenu();
      return;
    }
    closeMenu();
    openMenu(button);
  }

  function clickNativeProfileButton() {
    if (!activeButton) return;
    allowNativeProfileClick = true;
    activeButton.click();
    setTimeout(() => { allowNativeProfileClick = false; }, 0);
  }

  function findButtonByText(labels) {
    const normalisedLabels = labels.map((label) => label.toLowerCase());
    return [...document.querySelectorAll('button')].find((button) => {
      const text = button.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
      return normalisedLabels.some((label) => text === label || text.includes(label));
    });
  }

  function clickButtonByText(labels) {
    const button = findButtonByText(labels);
    if (button) {
      button.click();
      return true;
    }
    return false;
  }

  function navigateViaButtons(labels, needsPortal = false) {
    if (clickButtonByText(labels)) return;
    if (needsPortal && clickButtonByText(['Applicant portal', 'Portal home'])) {
      setTimeout(() => clickButtonByText(labels), 180);
      return;
    }
    clickButtonByText(['Applicant portal', 'Portal home']);
  }

  document.addEventListener('click', (event) => {
    const profileButton = event.target.closest?.('button[aria-label="Open profile"]');
    if (profileButton && !allowNativeProfileClick) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      toggleMenu(profileButton);
      return;
    }
    if (menu && !event.target.closest?.('.sp-profile-menu')) {
      closeMenu();
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', positionMenu);
  window.addEventListener('scroll', positionMenu, true);
})();
