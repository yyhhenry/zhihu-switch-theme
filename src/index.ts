function nonNullable<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error('value is null or undefined');
  }
  return value;
}

const switchThemeSvg = `
<svg width="24" height="24" viewBox="0 0 24 24"
    aria-hidden="true" fill="currentColor"
    stroke="currentColor">
    <path fill-rule="evenodd" d="M2 2 L22 2 L2 22Z" clip-rule="evenodd"></path>
    <path fill="none" d="M2 22 L22 2 L22 22Z"></path>
</svg>
`;
const storageKey = 'zhihu-switch-theme';
const buttonList = nonNullable(
  document.querySelector<HTMLDivElement>('.CornerButtons div.CornerAnimayedFlex'),
);
buttonList.style.height = '90px';
const upButton = nonNullable(buttonList.querySelector<HTMLButtonElement>('button'));

type Theme = 'light' | 'dark';
function isTheme(theme: unknown): theme is Theme {
  return typeof theme === 'string' && (theme === 'light' || theme === 'dark');
}

function flipTheme(theme: Theme): Theme {
  if (theme === 'light') {
    return 'dark';
  } else {
    return 'light';
  }
}
function getTheme(): Theme {
  const theme = document.documentElement.getAttribute('data-theme');
  if (!isTheme(theme)) {
    throw new Error('html element data-theme is not a valid theme');
  }
  return theme;
}
function applyTheme(theme: Theme) {
  if (theme !== getTheme()) {
    setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.set('theme', theme);
      location.href = url.href;
    });
  }
}
function storeTheme(theme: Theme) {
  localStorage.setItem(storageKey, theme);
}
function getStoredTheme(): Theme {
  const theme = localStorage.getItem(storageKey);
  return isTheme(theme) ? theme : 'dark';
}
function switchTheme() {
  const theme = flipTheme(getTheme());
  applyTheme(theme);
  storeTheme(theme);
}

function addSwitchThemeButton() {
  const button = document.createElement('button');
  button.setAttribute('data-tooltip', '切换主题');
  button.setAttribute('data-tooltip-position', 'left');
  button.className = upButton.className;
  button.innerHTML = switchThemeSvg;
  button.addEventListener('click', () => switchTheme());
  buttonList.appendChild(button);
}

addSwitchThemeButton();
applyTheme(getStoredTheme());
