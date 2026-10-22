const {test,expect}=require('@playwright/test');

test('desktop workspace keeps status and lock actions within the viewport in every room',async({page})=>{
  await page.goto('/');
  for(const viewport of [{width:1366,height:768},{width:1280,height:720},{width:1024,height:600}]){
    await page.setViewportSize(viewport);
    for(let room=0;room<6;room++){
      await page.evaluate(room=>{
        Exploration.restore(Exploration.snapshot().map(s=>({...s,done:true,failed:true,passed:true})));
        index=room;started=true;inspected=[0,1,2];render();show('game');
      },room);
      for(const selector of ['.top','#teamStatus','.status','#title','#checkBtn','.room>.row','.footer']){
        const box=await page.locator(selector).boundingBox();
        expect(box.y,`${selector} above viewport`).toBeGreaterThanOrEqual(0);
        expect(box.y+box.height,`${selector} below viewport in room ${room+1}`).toBeLessThanOrEqual(viewport.height);
      }
      expect(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight)).toBe(true);
      // Long answers remain reachable inside their panel without moving the page.
      await page.locator('#challenge').evaluate(e=>e.scrollTop=e.scrollHeight);
      await expect(page.locator('#checkBtn')).toBeInViewport();
      await page.locator('.room-brief summary').click();
      await expect(page.locator('#checkBtn')).toBeInViewport();
      if(room===0&&viewport.width===1366)await page.screenshot({path:'artifacts/viewport-desktop.png'});
    }
  }
});
