
const target=new Date('2026-08-01T21:00:00');
function update(){
let d=target-new Date();
if(d<0)d=0;
days.textContent=Math.floor(d/86400000);
hours.textContent=Math.floor(d%86400000/3600000);
minutes.textContent=Math.floor(d%3600000/60000);
seconds.textContent=Math.floor(d%60000/1000);
}
update();
setInterval(update,1000);
