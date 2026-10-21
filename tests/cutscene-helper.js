async function skipCutscene(page) {
  if(await page.locator('#cutscene').isVisible())await page.locator('#cutscene').getByRole('button',{name:'Continue',exact:false}).click();
}
module.exports={skipCutscene};
