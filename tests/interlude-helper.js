async function catchFirefly(page) {
  const field=page.locator('.firefly-field');
  await field.focus();
  const point=await page.locator('#firefly').evaluate(button=>{
    const rect=button.parentElement.getBoundingClientRect();
    return {x:rect.x+rect.width*parseFloat(button.style.getPropertyValue('--x'))/100,y:rect.y+rect.height*parseFloat(button.style.getPropertyValue('--y'))/100};
  });
  await page.mouse.move(point.x,point.y);
  await field.press('Enter');
}
module.exports={catchFirefly};
