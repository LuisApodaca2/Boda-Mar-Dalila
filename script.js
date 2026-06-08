
const target=new Date('2026-08-01T21:00:00');
setInterval(()=>{
let d=target-new Date();
if(d<0)d=0;
document.getElementById('days').textContent=Math.floor(d/86400000);
document.getElementById('hours').textContent=Math.floor(d%86400000/3600000);
document.getElementById('minutes').textContent=Math.floor(d%3600000/60000);
document.getElementById('seconds').textContent=Math.floor(d%60000/1000);
},1000);
