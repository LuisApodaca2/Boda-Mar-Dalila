
const target = new Date("2026-08-01T21:00:00");
setInterval(()=>{
 const now = new Date();
 const diff = target-now;
 const d=Math.floor(diff/86400000);
 const h=Math.floor((diff%86400000)/3600000);
 const m=Math.floor((diff%3600000)/60000);
 const s=Math.floor((diff%60000)/1000);
 document.getElementById("countdown").textContent=`${d} días ${h} horas ${m} minutos ${s} segundos`;
},1000);
