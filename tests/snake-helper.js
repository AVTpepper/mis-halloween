// Navigate through the actual controls and timer; never grant progress directly.
async function playTurn(page) {
  await page.locator('#snakeToggle').click();
  const player=await page.evaluate(()=>Snake.snapshot().player);
  for(let moves=0;moves<600;moves++) {
    const s=await page.evaluate(()=>Snake.snapshot());
    if(s.cleared[player]===10)return;
    const queue=[{p:s.body[0],path:[]}],seen=new Set();let path;
    while(queue.length) {
      const {p,path:route}=queue.shift(),key=p.x+','+p.y;
      if(seen.has(key))continue;seen.add(key);
      if(p.x===s.food.x&&p.y===s.food.y){path=route;break;}
      for(const [x,y,key] of [[1,0,'ArrowRight'],[0,1,'ArrowDown'],[-1,0,'ArrowLeft'],[0,-1,'ArrowUp']]) {
        if(!route.length&&x===-s.direction.x&&y===-s.direction.y)continue;
        const n={x:p.x+x,y:p.y+y};
        if(n.x<0||n.y<0||n.x>=10||n.y>=10||s.body.slice(0,-1).some(b=>b.x===n.x&&b.y===n.y))continue;
        queue.push({p:n,path:[...route,key]});
      }
    }
    if(!path?.length)throw new Error('No safe path found for test snake');
    await page.locator('#snakeCanvas').press(path[0]);
    await page.clock.runFor(Math.max(180,320-s.cleared[player]*14));
  }
  throw new Error('Snake turn did not complete');
}
module.exports={playTurn};
