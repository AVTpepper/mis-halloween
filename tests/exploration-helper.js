const {skipCutscene}=require('./cutscene-helper');
async function collectVisible(page){
  const count=await page.locator('.object').count();
  for(let i=0;i<count;i++){
    const object=page.locator('.object').nth(i);
    if(await object.isVisible()&&!(await object.getAttribute('class')).includes('found')){await object.click();await skipCutscene(page);}
  }
}
async function solveMechanism(page){
  if((await page.locator('#activityTitle').textContent()).startsWith('1 /'))await page.locator('#activityNext').click();
  if(await page.locator('.scene-discovery').isVisible())return;
  const room=Number((await page.locator('#roomNo').textContent()).match(/\d+/)[0])-1;
  if(room===0){await page.locator('#sceneMinute').focus();await page.locator('#sceneMinute').press('End');for(let i=0;i<12;i++)await page.locator('#sceneMinute').press('ArrowLeft');}
  if(room===1){for(let i=0;i<3;i++)await page.getByRole('button',{name:/^Add orange drop/}).click();for(let i=0;i<2;i++)await page.getByRole('button',{name:/^Add purple drop/}).click();}
  if(room===2){for(const [i,type] of ['Observation','Assumption','Observation'].entries())await page.locator('.evidence-sort').nth(i).getByRole('button',{name:type,exact:true}).click();}
  if(room===3){await page.locator('#robotLight').selectOption('dark');await page.getByRole('button',{name:'Run robot test',exact:true}).click();await page.locator('#robotModule').selectOption('sensor');await page.getByRole('button',{name:'Run robot test',exact:true}).click();}
  if(room===4){for(const [target,mark] of ['I','II','III','IV','V'].entries()){const up=page.getByRole('button',{name:`Move strip ${mark} up`,exact:true});while(await up.evaluate(b=>Array.from(b.closest('ol').children).indexOf(b.closest('li')))>target)await up.click();}}
  if(room===5){for(let i=0;i<2;i++)await page.getByRole('button',{name:`Player ${i+1} power · OFF`,exact:true}).click();}
}
async function investigateRoom(page){
  if((await page.locator('#activityTitle').textContent()).startsWith('4 /'))return;
  await collectVisible(page);await solveMechanism(page);
  await page.locator('#activityNext').click();
  await collectVisible(page);await page.locator('#activityNext').click();
}
module.exports={investigateRoom,solveMechanism,collectVisible};
