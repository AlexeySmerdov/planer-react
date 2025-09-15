// PWA Debug Script - Mobile Installation Diagnostics
console.log('🔍 PWA Installation Debug - Mobile Analysis');
console.log('================================================');

// Mobile-specific PWA installation check
const runMobilePWADiagnostic = async () => {
  console.log('\n📱 MOBILE PWA DIAGNOSTIC');
  console.log('=========================');
  
  // 1. Device Detection
  const userAgent = navigator.userAgent;
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  console.log('📱 Device Info:');
  console.log(`  Browser: ${navigator.userAgent.split(' ').pop()}`);
  console.log(`  Platform: ${isAndroid ? 'Android' : isIOS ? 'iOS' : 'Desktop'}`);
  console.log(`  Mobile: ${isMobile}`);
  
  // 2. PWA Installation State
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isIOSStandalone = window.navigator.standalone === true;
  
  if (isStandalone || isIOSStandalone) {
    console.log('✅ PWA is already installed and running!');
    return;
  }
  
  // 3. Critical PWA Requirements
  console.log('\n🔍 PWA Requirements Check:');
  
  // Manifest
  const manifestLink = document.querySelector('link[rel="manifest"]');
  console.log(`${manifestLink ? '✅' : '❌'} Manifest link: ${manifestLink?.href || 'NOT FOUND'}`);
  
  // HTTPS/localhost
  const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
  console.log(`${isSecure ? '✅' : '❌'} Secure context: ${location.protocol}`);
  
  // Service Worker
  const hasSW = 'serviceWorker' in navigator;
  console.log(`${hasSW ? '✅' : '❌'} Service Worker support: ${hasSW}`);
  
  if (hasSW) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log(`${registrations.length > 0 ? '✅' : '⚠️'} SW registered: ${registrations.length} registration(s)`);
      
      if (registrations.length > 0) {
        registrations.forEach((reg, i) => {
          console.log(`  SW ${i + 1}: ${reg.scope} (${reg.active ? 'active' : 'inactive'})`);
        });
      }
    } catch (error) {
      console.log('❌ SW check failed:', error);
    }
  }
  
  // 4. Manifest Content Check
  try {
    const response = await fetch('/manifest.webmanifest');
    if (response.ok) {
      const manifest = await response.json();
      console.log('\n📋 Manifest Analysis:');
      console.log(`  Name: ${manifest.name}`);
      console.log(`  Display: ${manifest.display}`);
      console.log(`  Start URL: ${manifest.start_url}`);
      console.log(`  Icons: ${manifest.icons?.length || 0}`);
      
      // Check critical icon sizes for mobile
      const requiredSizes = ['144x144', '192x192', '512x512'];
      const availableSizes = manifest.icons?.map(icon => icon.sizes) || [];
      
      console.log('\n🖼️ Required Icons for Mobile:');
      requiredSizes.forEach(size => {
        const hasSize = availableSizes.includes(size);
        console.log(`  ${hasSize ? '✅' : '❌'} ${size}: ${hasSize ? 'Found' : 'Missing'}`);
      });
    } else {
      console.log('❌ Manifest not accessible');
    }
  } catch (error) {
    console.log('❌ Manifest error:', error);
  }
  
  // 5. Installation Instructions
  console.log('\n📱 MOBILE INSTALLATION GUIDE:');
  console.log('==============================');
  
  if (isAndroid) {
    console.log('🤖 ANDROID CHROME:');
    console.log('  1. Tap the menu (⋮) in Chrome');
    console.log('  2. Look for "Install app" or "Add to Home screen"');
    console.log('  3. Tap "Install" when prompted');
    console.log('  Note: If no install option appears, PWA criteria may not be met');
  } else if (isIOS) {
    console.log('🍎 iOS SAFARI:');
    console.log('  1. Tap the Share button (□↗)');
    console.log('  2. Scroll down and tap "Add to Home Screen"');
    console.log('  3. Tap "Add" to confirm');
    console.log('  Note: iOS PWA installation creates a shortcut that behaves like an app');
  } else {
    console.log('💻 DESKTOP:');
    console.log('  1. Look for install icon in address bar');
    console.log('  2. Click "Install" when prompted');
  }
  
  // 6. Development vs Production Note
  if (location.hostname === 'localhost') {
    console.log('\n⚠️ DEVELOPMENT MODE NOTE:');
    console.log('  - Some PWA features work differently in development');
    console.log('  - For full PWA testing, deploy to HTTPS production environment');
    console.log('  - Mobile browsers may be more strict about PWA criteria');
  }
  
  // 7. Final Assessment
  const allRequirementsMet = manifestLink && isSecure && hasSW;
  console.log(`\n🎯 PWA MOBILE READY: ${allRequirementsMet ? '✅ YES' : '❌ NO'}`);
  
  if (!allRequirementsMet) {
    console.log('\n🔧 FIXES NEEDED:');
    if (!manifestLink) console.log('  - Add manifest link to HTML');
    if (!isSecure) console.log('  - Serve over HTTPS (or localhost for dev)');
    if (!hasSW) console.log('  - Register service worker');
  }
};

// Auto-run diagnostic
runMobilePWADiagnostic();