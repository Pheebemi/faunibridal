// Simple script to help update favicon
// Run this in your browser console on your website

console.log('FAUNi Bridals Favicon Update Helper');
console.log('Current favicon should be: /logo-dark.png');

// Check if favicon is loading
const checkFavicon = () => {
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    console.log('Favicon link found:', favicon.href);
  } else {
    console.log('No favicon link found');
  }
};

checkFavicon();

// Force favicon reload
const forceFaviconReload = () => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = '/logo-dark.png?' + Date.now(); // Cache bust
  document.head.appendChild(link);
  console.log('Favicon reloaded with cache bust');
};

console.log('Run forceFaviconReload() to force reload favicon');
