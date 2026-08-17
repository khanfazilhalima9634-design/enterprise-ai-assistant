(async function(){
 try{
  const data=await loadJSON('data/software.json');
  const home=document.getElementById('home-software');
  const grid=document.getElementById('software-grid');
  const search=document.getElementById('software-search');
  const cat=document.getElementById('software-category');
  const platform=document.getElementById('software-platform');
  [...new Set(data.map(x=>x.category))].sort().forEach(x=>cat&&cat.insertAdjacentHTML('beforeend',`<option>${escapeHtml(x)}</option>`));
  [...new Set(data.map(x=>x.platform))].sort().forEach(x=>platform&&platform.insertAdjacentHTML('beforeend',`<option>${escapeHtml(x)}</option>`));
  function card(x){return `<a class="software-card" href="software.html?software=${encodeURIComponent(x.id)}"><span class="software-icon">${escapeHtml(iconFor(x.name))}</span><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.description)}</p><div class="card-meta"><span class="tag">${escapeHtml(x.category)}</span><span class="tag">${x.tutorials} tutorials</span><span class="tag">${x.troubleshooting} fixes</span></div></a>`}
  if(home) home.innerHTML=data.slice(0,12).map(card).join('');
  function render(){
   const q=(search?.value||'').toLowerCase(), c=cat?.value||'', p=platform?.value||'';
   const out=data.filter(x=>(!q||(x.name+' '+x.category+' '+x.description).toLowerCase().includes(q))&&(!c||x.category===c)&&(!p||x.platform===p));
   if(grid) grid.innerHTML=out.map(card).join('');
   document.getElementById('software-empty')?.classList.toggle('hidden',out.length>0);
  }
  [search,cat,platform].forEach(e=>e?.addEventListener('input',render));
  render();
  const id=new URLSearchParams(location.search).get('software');
  if(id){
   const x=data.find(v=>v.id===id);
   if(x) renderDetail(x);
  }
  function renderDetail(x){
   document.title=x.name+' | Enterprise AI Software Assistant';
   const main=document.querySelector('main');
   main.innerHTML=`<section class="page-hero"><div class="container"><div class="eyebrow">${escapeHtml(x.category.toUpperCase())}</div><h1>${escapeHtml(x.name)}</h1><p>${escapeHtml(x.description)}</p><a class="btn btn-dark" target="_blank" rel="noopener" href="${escapeHtml(x.officialUrl)}">Official website ↗</a></div></section>
   <section class="section"><div class="container"><div class="two-col"><div class="article-card"><h2>What is it?</h2><p>${escapeHtml(x.description)} This profile is a practical starting point for learning and troubleshooting.</p><h3>At a glance</h3><div class="card-meta"><span class="tag">${escapeHtml(x.platform)}</span><span class="tag">${x.tutorials} tutorials</span><span class="tag">${x.troubleshooting} troubleshooting guides</span></div></div><div class="article-card"><h2>Popular guides</h2><p>Use the site search to find tutorials and troubleshooting entries for ${escapeHtml(x.name)}.</p><a class="text-link" href="tutorials.html?software=${encodeURIComponent(x.id)}">Browse tutorials →</a><br><br><a class="text-link" href="troubleshooting.html?software=${encodeURIComponent(x.id)}">Browse troubleshooting →</a></div></div></div></section>`;
  }
 }catch(e){console.error(e)}
})();
