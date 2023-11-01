type Theme = 'light' | 'dark';
function assertNonNullable<T>(value: T, name?: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(`${name ?? 'The value'} is null or undefined`);
  }
}
function setTheme(theme?: Theme) {
  const url = new URL(location.href);
  if (theme !== undefined) {
    url.searchParams.set('theme', theme);
  } else {
    const themeNow = document.documentElement.getAttribute('data-theme');
    if (!themeNow || themeNow === 'light') {
      url.searchParams.set('theme', 'dark');
    } else {
      url.searchParams.set('theme', 'light');
    }
  }
  location.href = url.href;
}

(() => {
  const buttonList = document.querySelector<HTMLDivElement>(
    '.CornerButtons div.CornerAnimayedFlex',
  );
  assertNonNullable(buttonList, 'buttonList');
  buttonList.style.height = '90px';
  const switchTheme = document.createElement('button');
  switchTheme.setAttribute('data-tooltip', '切换主题');
  switchTheme.setAttribute('data-tooltip-position', 'left');
  switchTheme.setAttribute('data-tooltip-will-hide-on-click', 'true');
  switchTheme.setAttribute('aria-label', '切换主题');
  switchTheme.setAttribute('type', 'button');
  const upButton = buttonList.firstChild;
  assertNonNullable(upButton, 'upButton');
  if (!(upButton instanceof HTMLButtonElement)) {
    throw new Error('upButton is not HTMLButtonElement');
  }
  switchTheme.className = upButton.className;
  switchTheme.innerHTML = `
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" stroke="currentColor"><path fill-rule="evenodd" d="M2 2 L22 2 L2 22Z" clip-rule="evenodd"></path><path fill="none" d="M2 22 L22 2 L22 22Z"></path></svg>
  `;
  switchTheme.addEventListener('click', () => setTheme());
  buttonList.appendChild(switchTheme);
})();
