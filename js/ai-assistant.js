(async function(){
 const data=await loadJSON('data/troubleshooting.json');
 const messages=document.getElementById('chat-messages'), input=document.getElementById('chat-input'), form=document.getElementById('chat-form');
 function add(role,html){const div=document.createElement('div');div.className='message '+role;div.innerHTML=html;messages.appendChild(div);messages.scrollTop=messages.scrollHeight}
 function answer(q){
  const t=q.toLowerCase();
  let x=data.find(v=>v.slug.split('-').some(w=>w.length>4&&t.includes(w)));
  if(t.includes('power bi')&&t.includes('refresh'))x=data.find(v=>v.slug==='power-bi-refresh-failed');
  if(t.includes('403')&&t.includes('azure'))x=data.find(v=>v.slug==='azure-403-error');
  if(t.includes('401')&&t.includes('azure'))x=data.find(v=>v.slug==='azure-401-error');
  if(t.includes('salesforce')&&t.includes('dashboard'))return `<div class="demo-label">DEMO RESPONSE</div><strong>Quick Answer</strong><p>Use an existing Salesforce report as the source for dashboard components, then configure the dashboard folder, filters, and visibility for the intended audience.</p><h3>Step-by-Step Fix / Guide</h3><ol><li>Open Dashboards and create a new dashboard.</li><li>Select an appropriate folder.</li><li>Add components from validated reports.</li><li>Configure filters and visibility.</li><li>Save and test with the intended user context.</li></ol><h3>Verify</h3><p>Confirm the dashboard displays expected records and that the intended users can access it.</p>`; 
  if(t.includes('jira')&&t.includes('automation'))x=data.find(v=>v.slug==='jira-automation-not-triggering');
  if(t.includes('teams')&&t.includes('microphone'))x=data.find(v=>v.slug==='teams-microphone-not-working');
  if(t.includes('snowflake')&&t.includes('power bi'))return `<div class="demo-label">DEMO RESPONSE</div><strong>Quick Answer</strong><p>Use the Snowflake connector in Power BI Desktop, authenticate with the approved enterprise method, and validate access to a small dataset before building the model.</p><h3>Step-by-Step Fix / Guide</h3><ol><li>Confirm Snowflake server, warehouse, database, and schema details.</li><li>Choose the Snowflake connector in Power BI.</li><li>Authenticate using the organization's approved method.</li><li>Select a small test dataset and validate the connection.</li><li>Proceed to modeling after the connection is stable.</li></ol>`;
  if(!x)return `<div class="demo-label">DEMO RESPONSE</div><strong>Quick Answer</strong><p>I do not have a sufficiently close entry in the local demo knowledge base for that question.</p><h3>What to do next</h3><ol><li>Name the exact software.</li><li>Paste the exact error text without secrets.</li><li>Describe what you were doing immediately before the problem.</li><li>Include the environment, such as browser, desktop, cloud, API, or database.</li></ol><h3>Related Tutorials</h3><p>Try the Software Directory, Tutorials, or Error Codes pages for a closer match.</p>`;
  return `<div class="demo-label">DEMO RESPONSE</div><strong>Quick Answer</strong><p>${escapeHtml(x.quickFix.join(' '))}</p><h3>Most Likely Cause</h3><ul>${x.causes.map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ul><h3>Step-by-Step Fix</h3><ol>${x.detailedFix.map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ol><h3>Verify the Fix</h3><p>Repeat the original operation in an approved test context and confirm the expected result without exposing credentials or sensitive data.</p><h3>If It Still Doesn't Work</h3><p>${escapeHtml(x.diagnostics.join(' '))}</p><h3>Common Mistakes</h3><p>Do not grant broad administrator access simply to bypass an error. Verify the minimum permission, configuration, and environment needed.</p>`;
 }
 function send(q){if(!q.trim())return;add('user',escapeHtml(q));setTimeout(()=>add('assistant',answer(q)),250);input.value=''}
 form.addEventListener('submit',e=>{e.preventDefault();send(input.value)});
 document.querySelectorAll('[data-suggest]').forEach(b=>b.addEventListener('click',()=>send(b.dataset.suggest)));
 document.getElementById('clear-chat').addEventListener('click',()=>messages.innerHTML='');
 document.getElementById('new-chat').addEventListener('click',()=>messages.innerHTML='<div class="message assistant"><div class="demo-label">DEMO MODE</div><strong>New conversation</strong><p>Describe an enterprise software task or error and I will match it against the local demo knowledge base.</p></div>');
 const q=new URLSearchParams(location.search).get('query'); if(q){input.value=q;send(q)} else add('assistant','<div class="demo-label">DEMO MODE</div><strong>Welcome.</strong><p>Tell me what you are trying to do, which software you are using, and what went wrong.</p>');
})();
