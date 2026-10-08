/* RythuMitra V10 Final Dashboard + module helpers. */
const V10_KEY='rythumitra_v10';
function v10readStorage(key){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):null}catch(e){console.warn('RythuMitra V10 storage read failed',e);return null}}
let v10=v10readStorage(V10_KEY)||{cropProblems:[],priceNotes:[],aiHistory:[]};
v10.cropProblems=v10.cropProblems||[];v10.priceNotes=v10.priceNotes||[];v10.aiHistory=v10.aiHistory||[];
function v10save(){try{localStorage.setItem(V10_KEY,JSON.stringify(v10))}catch(e){console.error('RythuMitra V10 save failed',e);v10toast(v10t('Data could not be saved. Check device storage.','డేటా సేవ్ కాలేదు. నిల్వ స్థలాన్ని తనిఖీ చేయండి.'))}}
function v10esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function v10t(en,te){return (typeof lang!=='undefined'&&lang==='te')?te:en;}
function v10toast(msg){if(typeof v9toast==='function')v9toast(msg);else alert(msg);}
function v10go(screen){if(typeof showScreen==='function')showScreen(screen);}
function v10dashboard(){v10go('v10dashboard');renderV10Dashboard();}
function renderV10Dashboard(){
 const u=typeof v9!=='undefined'?v9.user:null;
 const name=u?.name||v10t('Farmer','రైతు');
 const cropCount=typeof data!=='undefined'&&Array.isArray(data.crops)?data.crops.length:0;
 const cards=[
  ['👨‍🌾','Farmer Profile','రైతు ప్రొఫైల్','account','Account, farm and village details','ఖాతా, పొలం మరియు గ్రామ వివరాలు'],
  ['🌦️','Weather','వాతావరణం','weather','Live weather, forecast and crop advisory','ప్రస్తుత వాతావరణం, సూచనలు మరియు పంట సలహా'],
  ['🌱','My Crops','నా పంటలు','crops','Crop management and crop-stage records','పంట నిర్వహణ మరియు పంట దశ వివరాలు'],
  ['📊','Farm Reports','వ్యవసాయ నివేదికలు','reports','Income, expenses, profit and performance','ఆదాయం, ఖర్చులు, లాభం మరియు పనితీరు'],
  ['💰','Income & Expenses','ఆదాయం & ఖర్చులు','expenses','Farm finance and budget tracking','పొలం ఆర్థికాలు మరియు బడ్జెట్ ట్రాకింగ్'],
  ['🛒','Marketplace','మార్కెట్‌ప్లేస్','marketplace','Buy/sell crops and buyer enquiries','పంటల కొనుగోలు/అమ్మకం మరియు కొనుగోలుదారు విచారణలు'],
  ['🏛️','Government Schemes','ప్రభుత్వ పథకాలు','schemes','Subsidies, insurance, loans and eligibility','సబ్సిడీలు, బీమా, రుణాలు మరియు అర్హత'],
  ['🐛','Crop Health','పంట ఆరోగ్యం','v10crophealth','Pest, disease and crop problem records','పురుగులు, వ్యాధులు మరియు పంట సమస్యల రికార్డులు'],
  ['🤖','AI Farmer Assistant','AI రైతు సహాయకుడు','v10ai','Farming questions and record guidance','వ్యవసాయ ప్రశ్నలు మరియు రికార్డు సహాయం'],
  ['📍','Agriculture Map','వ్యవసాయ మ్యాప్','weather','Weather and agriculture locations','వాతావరణం మరియు వ్యవసాయ ప్రదేశాలు'],
  ['🔔','Notifications','నోటిఫికేషన్లు','v9notifications','Weather, buyers, schemes and reminders','వాతావరణం, కొనుగోలుదారులు, పథకాలు మరియు రిమైండర్లు'],
  ['⚙️','Settings','సెట్టింగ్స్','account','Profile, language, backup and account settings','ప్రొఫైల్, భాష, బ్యాకప్ మరియు ఖాతా సెట్టింగ్స్']
 ];
 const el=document.getElementById('v10DashboardContent'); if(!el)return;
 el.innerHTML=`<div class="v10-welcome"><div class="v10-brand">🌾 RYTHUMITHRA</div><h1>👨‍🌾 ${v10esc(name)}</h1><p>${v10t('Your complete digital farming dashboard','మీ పూర్తి డిజిటల్ వ్యవసాయ డ్యాష్‌బోర్డ్')}</p><div class="v10-mini">🌱 ${cropCount} ${v10t('crops recorded','పంటలు నమోదు')}</div></div><div class="v10-vertical-menu">${cards.map(c=>`<button class="v10-menu-card" type="button" onclick="v10go('${c[3]}')" aria-label="${v10esc(v10t(c[1],c[2]))}"><span class="v10-icon" aria-hidden="true">${c[0]}</span><span class="v10-card-text"><strong>${v10t(c[1],c[2])}</strong><small>${v10t(c[4],c[5])}</small></span><span class="v10-arrow" aria-hidden="true">›</span></button>`).join('')}</div>`;
}

function v10recordProblem(){const crop=(document.getElementById('v10ProblemCrop')?.value||'').trim(),problem=(document.getElementById('v10Problem')?.value||'').trim(),stage=document.getElementById('v10ProblemStage')?.value||'';if(!crop||!problem){v10toast(v10t('Enter crop and problem.','పంట మరియు సమస్య నమోదు చేయండి.'));return}v10.cropProblems.unshift({id:Date.now(),crop,stage,problem,date:new Date().toISOString()});v10save();renderV10CropHealth();v10toast(v10t('Crop problem saved.','పంట సమస్య సేవ్ అయింది.'));}
function renderV10CropHealth(){const el=document.getElementById('v10ProblemList');if(!el)return;el.innerHTML=v10.cropProblems.length?v10.cropProblems.map(x=>`<div class="v10-record"><b>🌱 ${v10esc(x.crop)}</b><span>${v10esc(x.stage)}</span><p>${v10esc(x.problem)}</p><small>${new Date(x.date).toLocaleDateString('en-IN')}</small></div>`).join(''):`<p class="muted">${v10t('No crop problems recorded yet.','ఇంకా పంట సమస్యలు నమోదు కాలేదు.')}</p>`;}
function v10addPrice(){const crop=(document.getElementById('v10PriceCrop')?.value||'').trim(),market=(document.getElementById('v10PriceMarket')?.value||'').trim(),price=(document.getElementById('v10PriceValue')?.value||'').trim();if(!crop||!price){v10toast(v10t('Enter crop and price.','పంట మరియు ధర నమోదు చేయండి.'));return}v10.priceNotes.unshift({crop,market,price,date:new Date().toISOString()});v10save();renderV10Prices();}
function renderV10Prices(){const el=document.getElementById('v10PriceList');if(!el)return;el.innerHTML=v10.priceNotes.map(x=>`<div class="v10-record"><b>🌾 ${v10esc(x.crop)}</b><span>${v10esc(x.market||'Market')}</span><strong>₹${v10esc(x.price)}/kg</strong></div>`).join('')||'<p class="muted">No saved price notes.</p>';}
function v10askAI(){const q=(document.getElementById('v10AIQuestion')?.value||'').trim();if(!q)return;const low=q.toLowerCase();let a=v10t('I can help with crop records, irrigation, weather alerts, government schemes and farm finances. For pesticide or disease treatment, verify the recommendation with a qualified agriculture officer before applying it.','పంట రికార్డులు, నీటిపారుదల, వాతావరణ హెచ్చరికలు, ప్రభుత్వ పథకాలు మరియు వ్యవసాయ ఆర్థిక విషయాల్లో నేను సహాయం చేయగలను. పురుగుమందు లేదా వ్యాధి చికిత్సకు ముందు అర్హత కలిగిన వ్యవసాయ అధికారితో సూచనను నిర్ధారించండి.');if(low.includes('weather')||low.includes('rain'))a=v10t('Open Weather for the forecast, rain probability and crop-weather advisory.','వాతావరణం విభాగాన్ని తెరిచి ఫోర్‌కాస్ట్, వర్షం అవకాశాలు మరియు పంట-వాతావరణ సూచనలు చూడండి.');else if(low.includes('scheme')||low.includes('subsid'))a=v10t('Open Government Schemes and use Scheme Finder. Always verify eligibility on the official government portal.','ప్రభుత్వ పథకాల విభాగంలో Scheme Finder ఉపయోగించండి. అర్హతను అధికారిక ప్రభుత్వ పోర్టల్‌లో తప్పనిసరిగా నిర్ధారించండి.');else if(low.includes('profit')||low.includes('expense')||low.includes('income'))a=v10t('Open Farm Reports or Income & Expenses to review crop-wise profitability.','పంటల వారీ లాభదాయకత కోసం Farm Reports లేదా Income & Expenses తెరవండి.');v10.aiHistory.unshift({q,a,date:new Date().toISOString()});v10.aiHistory=v10.aiHistory.slice(0,30);v10save();renderV10AI();}
function renderV10AI(){const el=document.getElementById('v10AIHistory');if(!el)return;el.innerHTML=v10.aiHistory.map(x=>`<div class="v10-ai-item"><b>🧑‍🌾 ${v10esc(x.q)}</b><p>🤖 ${v10esc(x.a)}</p></div>`).join('')||'<p class="muted">Ask your first farming question.</p>';}
function renderV10All(){renderV10Dashboard();renderV10CropHealth();renderV10Prices();renderV10AI();}
window.addEventListener('load',()=>{renderV10All();setTimeout(()=>v10dashboard(),80);});
