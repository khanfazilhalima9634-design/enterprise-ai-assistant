(async function(){
 const data=await loadJSON('data/comparisons.json'); const names=[...new Set(data.flatMap(x=>x.products))]; const a=document.getElementById('compare-a'),b=document.getElementById('compare-b'),c=document.getElementById('compare-c'),d=document.getElementById('compare-d');
 [a,b,c,d].forEach((el,i)=>names.sort().forEach(n=>el.insertAdjacentHTML('beforeend',`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`)));
 a.value='Power BI';b.value='Tableau';
 document.getElementById('compare-btn').addEventListener('click',()=>{
  const chosen=[a.value,b.value,c.value,d.value].filter(Boolean);let match=data.find(x=>chosen.every(n=>x.products.includes(n))&&x.products.length===chosen.length);
  if(!match){document.getElementById('comparison-result').innerHTML='<div class="empty">No saved comparison matches that exact combination. Try one of the prebuilt comparisons.</div>';return}
  document.getElementById('comparison-result').innerHTML=`<div class="comparison-box"><table><thead><tr><th>Feature</th>${match.products.map(p=>`<th>${escapeHtml(p)}</th>`).join('')}</tr></thead><tbody>${match.rows.map(r=>`<tr>${r.map(v=>`<td>${escapeHtml(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 });
})();
