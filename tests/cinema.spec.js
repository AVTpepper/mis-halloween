const {test,expect}=require('@playwright/test');
test('cutscenes pause time, skip with Escape, and advance automatically',async({page})=>{
  await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('/');
  await expect(page.getByRole('button',{name:'Teacher room',exact:true})).toBeVisible();
  await page.locator('#enterBtn').click();
  await expect(page.locator('#cutscene')).toBeVisible();
  await expect(page.locator('#cutsceneTitle')).toHaveText('The doors are closing…');
  await page.clock.runFor(4000);await expect(page.locator('#clock')).toHaveText('20:00');
  await page.keyboard.press('Escape');await expect(page.locator('#cutscene')).not.toBeVisible();
  await page.clock.runFor(1000);await expect(page.locator('#clock')).toHaveText('19:59');
  for(let i=0;i<3;i++)await page.locator('.object').nth(i).click();
  await page.locator('#value1').fill('36');await page.locator('#checkBtn').click();
  await expect(page.locator('#cutsceneChapter')).toHaveText('Room 1 cleared · digit 6 recovered');
  await page.clock.runFor(5000);await expect(page.locator('#cutscene')).not.toBeVisible();
  await expect(page.locator('#clock')).toHaveText('19:59');
  await expect(page.locator('#title')).toHaveText('The Potion of Proportions');
});
test('home actions have space and teacher access is prominent on desktop and mobile',async({page})=>{
  await page.goto('/');
  for(const width of [1280,375]) {
    await page.setViewportSize({width,height:850});
    const teacher=page.getByRole('button',{name:'Teacher room',exact:true});
    await expect(teacher).toBeVisible();
    expect(await teacher.evaluate(e=>getComputedStyle(e).backgroundColor)).toBe('rgb(255, 209, 147)');
    const a=await page.locator('#enterBtn').boundingBox();
    const b=await page.locator('.hero-actions button').nth(1).boundingBox();
    expect(Math.max(b.x-(a.x+a.width),b.y-(a.y+a.height))).toBeGreaterThanOrEqual(13);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`artifacts/home-${width}.png`,fullPage:true});
  }
  await page.getByRole('button',{name:'Teacher room',exact:true}).click();
  await expect(page.locator('#teacherGate')).toBeVisible();
});
