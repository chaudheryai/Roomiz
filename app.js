(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const KEY = "roomiz-demo-v1";
  let state; try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { state = {}; }
  state.requests ||= []; state.interests ||= [];
  let pendingPackage = "";
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  const toast = (message) => { const el = $("#toast"); el.textContent=message; el.classList.add("visible"); clearTimeout(window.roomizToastTimer); window.roomizToastTimer=setTimeout(()=>el.classList.remove("visible"),3500); };
  const icon = (name) => '<svg class="icon"><use href="#i-'+name+'"></use></svg>';
  const safe = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const tabs = $$(".demo-tab");
  function show(view) {
    tabs.forEach(b => {const active = b.dataset.view===view; b.classList.toggle("active", active);b.setAttribute("aria-selected",String(active));});
    $$(".demo-panel").forEach(p=>p.classList.toggle("hidden",p.id!=="panel-"+view));
    if(view==="admin") renderAdmin();
  }
  tabs.forEach(b=>b.addEventListener("click",()=>show(b.dataset.view)));
  $("#go-profile")?.addEventListener("click",()=>show("profile"));
  $("#profile-form").addEventListener("change",e=>{
    if(e.target.name==="housing") $("#budget-field").classList.toggle("hidden",e.target.value!=="apartment");
    if(e.target.name==="priority" && $$('input[name="priority"]:checked').length>3) {e.target.checked=false;$("#form-note").textContent="Choose up to three priorities."; } else {$("#form-note").textContent="";}
  });
  $("#budget-field").classList.add("hidden");
  function rank(candidate,profile) {
    let score=0,max=0;
    const weights={sleep:3,clean:3,noise:3,study:2,guests:2};
    for(const field of Object.keys(weights)){
      const w=weights[field]*(profile.priority.includes(field)?2:1);
      let similarity;
      if(field==="clean"||field==="noise")similarity=Math.max(0,1-Math.abs(Number(profile[field])-Number(candidate[field]))/4);
      else similarity=profile[field]===candidate[field]?1:0.45;
      score+=similarity*w;max+=w;
    }
    return Math.round(65+35*(score/max));
  }
  $("#profile-form").addEventListener("submit", e=>{
    e.preventDefault();
    const form=new FormData(e.currentTarget);
    const profile=Object.fromEntries([...form.entries()].filter(([k])=>k!=="priority"));
    profile.priority=form.getAll("priority");
    state.profile=profile;save();renderMatches();show("matches");
    $("#matches-subtitle").textContent="Sample candidates ranked by your selected preferences. All names are fictional.";
    toast("Demo shortlist generated. These are fictional candidates.");
  });
  function renderMatches(){
    const p=state.profile; if(!p)return;
    const results=(window.ROOMIZ_CANDIDATES||[]).filter(c=>c.housing===p.housing && (p.housing!=="apartment"||c.budget<=Number(p.budget))).map(c=>({...c,score:rank(c,p)})).sort((a,b)=>b.score-a.score).slice(0,5);
    $("#matches-area").innerHTML=results.length ? '<div class="matches-grid">'+results.map(c=>'<article class="candidate-card"><div class="candidate-heading"><span class="avatar">'+safe(c.name[0])+'</span><div><strong>'+safe(c.name)+'</strong><p>Fictional UCR demo candidate</p></div><span class="match-pill">'+c.score+'%*</span></div><p>'+safe(c.bio)+'</p><div class="candidate-facts"><span>Sleep: '+safe(c.sleep)+'</span><span>Cleanliness: '+c.clean+'/5</span><span>Noise: '+c.noise+'/5</span></div><button class="btn btn-outline request-intro" data-id="'+safe(c.id)+'">Request intro '+icon("arrow")+'</button></article>').join("")+'</div><p class="fine-print">*Scores are illustrative comparisons, not scientific probabilities. No real introductions occur.</p>' : '<p>No sample candidates meet these criteria. Adjust your preferences to try again.</p>';
    $$(".request-intro").forEach(btn=>btn.addEventListener("click",()=>{
      const c=(window.ROOMIZ_CANDIDATES||[]).find(x=>x.id===btn.dataset.id);
      if(!c)return;
      if(state.requests.some(x=>x.id===c.id)){toast("Already requested in this demo.");return;}
      state.requests.push({id:c.id,name:c.name,status:"Pending (demo)",when:new Date().toLocaleString()});save();toast("Mock introduction requested for "+c.name+".");
      btn.textContent="Requested (demo)";btn.disabled=true;
    }));
    $$(".request-intro").forEach(btn=>{if(state.requests.some(x=>x.id===btn.dataset.id)){btn.textContent="Requested (demo)";btn.disabled=true;}});
  }
  function renderAdmin(){
    $("#request-count").textContent=state.requests.length;
    $("#interest-count").textContent=state.interests.length;
    const entries=[...state.requests.map((r,i)=>({kind:"Request",label:r.name,status:r.status,index:i})),...state.interests.map(r=>({kind:"Package interest",label:r.name,status:"Recorded (demo)"}))];
    $("#admin-list").innerHTML=entries.length ? entries.map(e=>'<div class="admin-entry"><div><strong>'+safe(e.kind)+': '+safe(e.label)+'</strong><p>'+safe(e.status)+'</p></div>'+(e.kind==="Request"?'<button class="btn btn-outline status-button" data-index="'+e.index+'">Mark reviewed</button>':"")+'</div>').join("") : '<p class="empty-admin">No demo activity yet. Complete the questionnaire and click Request Intro or preview a package.</p>';
    $$(".status-button").forEach(btn=>btn.addEventListener("click",()=>{state.requests[Number(btn.dataset.index)].status="Reviewed (demo)";save();renderAdmin();}));
  }
  $$(".package-interest").forEach(btn=>btn.addEventListener("click",()=>{
    pendingPackage=btn.dataset.package;$("#dialog-description").textContent="Preview an interest request for "+pendingPackage+". No purchase or payment will take place.";
    $("#package-dialog").showModal();
  }));
  $("#dialog-close").addEventListener("click",()=>$("#package-dialog").close());
  $("#dialog-cancel").addEventListener("click",()=>$("#package-dialog").close());
  $("#dialog-confirm").addEventListener("click",()=>{
    state.interests.push({name:pendingPackage,when:new Date().toLocaleString()});save();$("#package-dialog").close();toast("Mock package interest saved. View it in Demo Admin.");
  });
  $("#reset-demo").addEventListener("click",()=>{if(confirm("Reset sample demo requests and package interest on this browser?")){state={requests:[],interests:[]};save();renderAdmin();renderMatches();toast("Demo data cleared.");}});
  if(state.profile)renderMatches();
})();