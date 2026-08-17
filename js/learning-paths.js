(async function(){
 const data=await loadJSON('data/learning-paths.json'),grid=document.getElementById('learning-grid');
 const key='eai-progress';
 const progress=JSON.parse(localStorage.getItem(key)||'{}');
 grid.innerHTML=data.map((x,i)=>{const done=progress[x.slug]||[];const pct=Math.round(done.length/x.tasks.length*100);return `<article class="article-card learning-card"><span class="difficulty">${escapeHtml(x.level)}</span><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.duration)} • ${x.modules.length} modules</p><div class="progress"><span style="width:${pct}%"></span></div><strong>${pct}% complete</strong><h4>Modules</h4><p>${x.modules.map(escapeHtml).join(' • ')}</p><h4>Practice tasks</h4><ul class="task-list">${x.tasks.map((t,j)=>`<li><input type="checkbox" data-path="${escapeHtml(x.slug)}" data-task="${j}" ${done.includes(j)?'checked':''}><span>${escapeHtml(t)}</span></li>`).join('')}</ul></article>`}).join('');
 grid.addEventListener('change',e=>{if(!e.target.matches('input[type=checkbox]'))return;const p=e.target.dataset.path,j=Number(e.target.dataset.task);progress[p]=progress[p]||[];if(e.target.checked&&!progress[p].includes(j))progress[p].push(j);if(!e.target.checked)progress[p]=progress[p].filter(x=>x!==j);localStorage.setItem(key,JSON.stringify(progress));location.reload()});
})();
