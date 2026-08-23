(async function(){
 const data=await loadJSON('data/troubleshooting.json'), software=await loadJSON('data/software.json');
 const sel=document.getElementById('ts-software'); software.forEach(x=>sel.insertAdjacentHTML('beforeend',`<option value="${x.id}">${escapeHtml(x.name)}</option>`));
 const id=new URLSearchParams(location.search).get('software'); if(id)sel.value=id;
 document.getElementById('diagnose-btn').addEventListener('click',()=>{
 const error = document.getElementById('ts-error').value.trim().toLowerCase();
const context = document.getElementById('ts-context').value.trim().toLowerCase();
const chosen = sel.value;

const text = `${error} ${context}`;

let x = data.find(v => {
  if (chosen && v.software !== chosen) return false;

  const titleWords = v.title.toLowerCase().split(/\s+/);
  const slugWords = v.slug.toLowerCase().split('-');

  return (
    titleWords.some(w => w.length > 3 && text.includes(w)) ||
    slugWords.some(w => w.length > 3 && text.includes(w))
  );
});

// GitHub authentication special case
if (!x && chosen === "github-enterprise") {
  if (
    text.includes("authentication failed") ||
    text.includes("invalid credentials") ||
    text.includes("permission denied") ||
    text.includes("403") ||
    text.includes("personal access token") ||
    text.includes("pat") ||
    text.includes("clone")
  ) {
    x = data.find(v =>
      v.software === "github-enterprise" &&
      (
        v.slug.includes("auth") ||
        v.slug.includes("authentication") ||
        v.slug.includes("clone")
      )
    );
  }
}

// Generic fallback
if (!x && chosen) x = data.find(v => v.software === chosen);

if (!x) {
  x =
    data.find(v => text.includes("403") && v.slug.includes("403")) ||
    data.find(v => text.includes("401") && v.slug.includes("401")) ||
    data.find(v => text.includes("refresh") && v.slug.includes("refresh"));
}
  
  const box=document.getElementById('diagnosis');
  if(!x){box.innerHTML='<div class="result-content"><div class="alert"><strong>No confident match.</strong> The demo knowledge base does not contain a sufficiently close troubleshooting guide. Try the AI Assistant or search the Error Code database.</div></div>';return}
  box.innerHTML=`<div class="result-content"><div class="demo-banner"><strong>Demo diagnosis</strong><span>This response came from the local troubleshooting database, not a live AI model.</span></div><h2>${escapeHtml(x.title)}</h2><p>${escapeHtml(x.problem)}</p><h3>Symptoms</h3><ul>${x.symptoms.map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ul><h3>Likely Causes</h3><ul>${x.causes.map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ul><h3>Quick Fix</h3><ul>${x.quickFix.map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ul><h3>Detailed Fix</h3><ol>${x.detailedFix.map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ol><h3>Diagnostic Steps</h3><ul>${x.diagnostics.map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ul><h3>Prevention</h3><p>${escapeHtml(x.prevention)}</p></div>`;
 });
})();
