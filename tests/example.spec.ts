import { test, expect, chromium } from '@playwright/test';

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

test('Mint XENFT', async () => {
  const extensionPath = "c/Users/mi_ha/AppData/Local/Google/Chrome/User\ Data/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/10.29.0_0";
  const browser = await chromium.launch({
    headless: false,
    channel: "chrome",
    args: [
      `--disable-extensions-except=${extensionPath}`
    ],
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto('https://xen.network/mainnet/xenft/torrent');

  await delay(14000);

  await page.waitForSelector('button:has-text("Connect Wallet")');

  await page.click('button:has-text("Connect Wallet")');

});
