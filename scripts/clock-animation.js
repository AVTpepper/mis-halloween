// Original canvas artwork. A deterministic frame renderer for the MP4 generator.
window.drawClockFrame=function(time){
  const canvas=document.querySelector('canvas'),c=canvas.getContext('2d');
  const gradient=c.createRadialGradient(480,240,20,480,270,600);
  gradient.addColorStop(0,'#463059');gradient.addColorStop(1,'#100d20');
  c.fillStyle=gradient;c.fillRect(0,0,960,540);
  for(let i=0;i<40;i++){c.fillStyle=`rgba(239,210,164,${.15+.2*Math.sin(time+i)**2})`;c.beginPath();c.arc((i*139)%960,(i*83+time*7)%540,1.4,0,Math.PI*2);c.fill();}
  c.textAlign='center';c.fillStyle='#ffcf8a';c.font='bold 29px Georgia';c.fillText('The Clockmaker’s Secret',480,48);
  c.fillStyle='#d5c8e6';c.font='16px system-ui';c.fillText('Two haunted clocks. One hidden mechanism.',480,78);
  function gear(x,y,r,angle){
    c.save();c.translate(x,y);c.rotate(angle);c.strokeStyle='#c89d6880';c.lineWidth=10;
    for(let i=0;i<12;i++){c.rotate(Math.PI/6);c.fillStyle='#c89d6880';c.fillRect(r-5,-7,17,14);}
    c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.stroke();
    c.lineWidth=5;for(let i=0;i<6;i++){c.rotate(Math.PI/3);c.beginPath();c.moveTo(0,0);c.lineTo(r-4,0);c.stroke();}
    c.fillStyle='#20162f';c.beginPath();c.arc(0,0,9,0,Math.PI*2);c.fill();c.restore();
  }
  gear(480,365,43,time*.8);gear(480,135,24,-time);gear(115,400,27,-time*.7);gear(845,400,27,time*.7);
  function clock(x,color,label,phase){
    c.save();c.translate(x,240);c.shadowColor=color;c.shadowBlur=14;
    c.fillStyle='#302039';c.strokeStyle=color;c.lineWidth=4;c.beginPath();c.roundRect(-113,-122,226,347,32);c.fill();c.stroke();c.shadowBlur=0;
    // Swinging pendulum: actual movement is present in every frame.
    const swing=Math.sin(time*3.4+phase)*.55;
    c.save();c.translate(0,100);c.rotate(swing);c.strokeStyle=color;c.lineWidth=6;c.beginPath();c.moveTo(0,0);c.lineTo(0,78);c.stroke();
    c.fillStyle=color;c.beginPath();c.arc(0,78,24,0,Math.PI*2);c.fill();c.restore();
    c.fillStyle='#eadac1';c.strokeStyle=color;c.lineWidth=10;c.beginPath();c.arc(0,0,100,0,Math.PI*2);c.fill();c.stroke();
    c.strokeStyle='#53405b';c.lineWidth=3;
    for(let i=0;i<12;i++){const a=i*Math.PI/6;c.beginPath();c.moveTo(Math.sin(a)*82,-Math.cos(a)*82);c.lineTo(Math.sin(a)*91,-Math.cos(a)*91);c.stroke();}
    c.fillStyle='#433148';c.font='bold 18px Georgia';c.fillText('12',0,-64);c.fillText('6',0,78);c.fillText('3',72,6);c.fillText('9',-72,6);
    function hand(angle,length,width){c.save();c.rotate(angle);c.strokeStyle='#433148';c.lineWidth=width;c.lineCap='round';c.beginPath();c.moveTo(0,8);c.lineTo(0,-length);c.stroke();c.restore();}
    hand(time*1.6+phase,70,5);hand(time*.35+phase,46,8);
    c.fillStyle=color;c.beginPath();c.arc(0,0,8,0,Math.PI*2);c.fill();
    const pulse=(time*.65+phase) % 1;
    c.strokeStyle=color;c.globalAlpha=(1-pulse)*.6;c.lineWidth=3;c.beginPath();c.arc(0,0,108+pulse*30,-.8,.8);c.stroke();c.beginPath();c.arc(0,0,108+pulse*30,Math.PI-.8,Math.PI+.8);c.stroke();c.globalAlpha=1;
    c.fillStyle=color;c.font='bold 20px system-ui';c.fillText(label,0,260);c.restore();
  }
  clock(285,'#e2b373','Chimes every 9 minutes',0);
  clock(675,'#c5b4e7','Chimes every 12 minutes',.8);
  c.fillStyle='#a98057';c.fillRect(75,474,810,9);
};
