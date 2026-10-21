const {test,expect}=require('@playwright/test');
async function inspect(page) {
  const count=await page.locator('.object').count();
  for(let i=0;i<count;i++) await page.locator('.object').nth(i).click();
}
async function choice(page,group,letter) {
  await page.locator(`[data-group="${group}"] button`).filter({hasText:new RegExp(`^${letter} ·`)}).click();
}
test('team explores every room, recovers progress, and rescues Pip',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await page.getByRole('button',{name:'Escape room',exact:true}).click();
  await expect(page.locator('#title')).toHaveText('The Clockmaker’s Secret');
  await expect(page.locator('#checkBtn')).toBeDisabled();
  await inspect(page);await page.locator('#value1').fill('12');await page.locator('#checkBtn').click();
  await expect(page.locator('#feedback')).toContainText('lock stays closed');
  await page.locator('#value1').fill('36');await page.locator('#checkBtn').click();
  await inspect(page);await page.locator('#value2a').fill('8');
  for(let i=0;i<9;i++)await page.locator('.jar').nth(i).click();
  await expect(page.locator('#jarCount')).toContainText('9 of 12');
  await page.reload();await page.locator('#enterBtn').click();
  await expect(page.locator('#value2a')).toHaveValue('8');await expect(page.locator('.jar.filled')).toHaveCount(9);
  await page.locator('#value2b').fill('9');await page.locator('#checkBtn').click();
  await inspect(page);await choice(page,'fact','B');await choice(page,'headline','B');await page.locator('#checkBtn').click();
  await inspect(page);await choice(page,'step','B');await choice(page,'upgrade','C');await page.locator('#checkBtn').click();
  await inspect(page);await choice(page,'claim','B');await page.locator('#value5').fill('check');await page.locator('#checkBtn').click();
  await expect(page.locator('#final')).toBeVisible();
  await page.getByRole('button',{name:'Home',exact:true}).click();await page.getByRole('button',{name:'Escape room',exact:true}).click();
  await expect(page.locator('#final')).toBeVisible();
  await page.locator('#finalCode').fill('11111');await page.getByRole('button',{name:'Unlock the painting'}).click();
  await expect(page.locator('#finalFeedback')).toContainText('remains shut');
  await page.locator('#finalCode').fill('69245');await page.locator('#finalCode').press('Enter');
  await expect(page.locator('#win')).toBeVisible();
  await page.reload();await page.locator('#enterBtn').click();await expect(page.locator('#win')).toBeVisible();
  expect(errors).toEqual([]);
});
test('pause, refresh, timeout, restart and mobile layout',async({page})=>{
  await page.setViewportSize({width:375,height:812});await page.clock.install();await page.goto('/');
  await page.locator('#enterBtn').click();await page.clock.fastForward(5000);await expect(page.locator('#clock')).toHaveText('19:55');
  await page.locator('#pauseBtn').click();await page.clock.fastForward(60000);await expect(page.locator('#clock')).toHaveText('19:55');
  await page.reload();await page.locator('#enterBtn').click();await expect(page.locator('#pauseBtn')).toHaveText('Resume');
  await page.locator('#pauseBtn').click();await page.clock.fastForward(1200000);await expect(page.locator('#clock')).toHaveText('00:00');
  await expect(page.locator('#pauseBtn')).toBeDisabled();
  await inspect(page);await page.locator('#value1').fill('36');await page.locator('#checkBtn').click();
  await expect(page.locator('#title')).toContainText('Potion');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  page.once('dialog',d=>d.dismiss());await page.getByRole('button',{name:'Start a new team game'}).click();await expect(page.locator('#title')).toContainText('Potion');
  page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Start a new team game'}).click();await expect(page.locator('#clock')).toHaveText('20:00');
  await expect(page.locator('#title')).toContainText('Clockmaker');await expect(page.locator('#pauseBtn')).toHaveText('Pause');
});
test('costume voting uses configured form and accessible empty state',async({page})=>{
  await page.goto('/');await page.getByRole('button',{name:'Costume awards',exact:true}).click();
  await expect(page.locator('#formShell')).toContainText('teacher connects');
  await expect(page.locator('.teacher')).toHaveCount(0);
  await page.route('**/game.js',async route=>{
    const response=await route.fetch();const body=(await response.text()).replace("const GOOGLE_FORM_URL='';","const GOOGLE_FORM_URL='https://docs.google.com/forms/d/e/example/viewform';");
    await route.fulfill({response,body});
  });
  await page.route('https://docs.google.com/**',r=>r.fulfill({body:'Voting form'}));
  await page.reload();
  await expect(page.locator('#formShell iframe')).toHaveAttribute('src',/embedded=true/);
  await expect(page.locator('#formShell a')).toHaveAttribute('target','_blank');
});
