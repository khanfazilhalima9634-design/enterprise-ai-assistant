(function(){
 const toggle=document.querySelector('.menu-toggle');
 if(toggle){
  const nav=document.querySelector('.main-nav'), actions=document.querySelector('.nav-actions');
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open'); actions.classList.toggle('open',open); toggle.setAttribute('aria-expanded',open)});
 }
 window.escapeHtml=function(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))};
 window.loadJSON=async function(path){const r=await fetch(path);if(!r.ok)throw new Error('Could not load '+path);return r.json()};
 window.iconFor=function(name){return String(name).split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase()};
})();
