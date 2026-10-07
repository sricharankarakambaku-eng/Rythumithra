const KEY='rythumitra_v1';
let data=JSON.parse(localStorage.getItem(KEY)||'null')||{farm:{},expenses:[],reminders:[]};

function save(){localStorage.setItem(KEY,JSON.stringify(data));updateUI()}
function money(n){return '₹'+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2})}
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function saveFarm(){
  data.farm={
    farmerName:document.getElementById('farmerName').value.trim(),
    location:document.getElementById('location').value.trim(),
    crop:document.getElementById('crop').value.trim(),
    area:Number(document.getElementById('area').value||0),
    sowingDate:document.getElementById('sowingDate').value
  };
  save();
  document.getElementById('farmSaved').textContent='Farm saved successfully.';
}
function addExpense(){
  const amount=Number(document.getElementById('expenseAmount').value||0);
  if(amount<=0){alert('Please enter a valid amount.');return}
  data.expenses.push({
    id:Date.now(),
    category:document.getElementById('expenseCategory').value,
    amount,
    date:document.getElementById('expenseDate').value||new Date().toISOString().slice(0,10),
    note:document.getElementById('expenseNote').value.trim()
  });
  document.getElementById('expenseAmount').value='';
  document.getElementById('expenseNote').value='';
  save();
}
function addReminder(){
  const text=document.getElementById('reminderText').value.trim();
  const date=document.getElementById('reminderDate').value;
  if(!text||!date){alert('Enter a reminder and date.');return}
  data.reminders.push({id:Date.now(),text,date});
  document.getElementById('reminderText').value='';
  save();
}
function removeExpense(id){data.expenses=data.expenses.filter(x=>x.id!==id);save()}
function removeReminder(id){data.reminders=data.reminders.filter(x=>x.id!==id);save()}
function totalExpenses(){return data.expenses.reduce((s,x)=>s+x.amount,0)}
function calculateProfit(){
  const revenue=Number(document.getElementById('yieldQ').value||0)*Number(document.getElementById('priceQ').value||0);
  const expenses=totalExpenses();
  document.getElementById('revenue').textContent=money(revenue);
  document.getElementById('profitExpenses').textContent=money(expenses);
  document.getElementById('profitValue').textContent=money(revenue-expenses);
}
function updateUI(){
  document.getElementById('dashCrop').textContent=data.farm.crop||'Not added';
  document.getElementById('dashArea').textContent=(data.farm.area||0)+' acres';
  document.getElementById('dashExpenses').textContent=money(totalExpenses());

  const yieldQ=Number(document.getElementById('yieldQ')?.value||0);
  const priceQ=Number(document.getElementById('priceQ')?.value||0);
  document.getElementById('dashProfit').textContent=money(yieldQ*priceQ-totalExpenses());

  const f=data.farm;
  if(document.activeElement?.id!=='farmerName')document.getElementById('farmerName').value=f.farmerName||'';
  document.getElementById('location').value=f.location||'';
  document.getElementById('crop').value=f.crop||'';
  document.getElementById('area').value=f.area||'';
  document.getElementById('sowingDate').value=f.sowingDate||'';

  const list=document.getElementById('expenseList');
  list.innerHTML=data.expenses.length?data.expenses.map(x=>`<div class="expense-row"><div><strong>${escapeHtml(x.category)}</strong><br><small>${escapeHtml(x.date)}${x.note?' · '+escapeHtml(x.note):''}</small></div><div><strong>${money(x.amount)}</strong><br><button onclick="removeExpense(${x.id})">Delete</button></div></div>`).join(''):'<p class="muted">No expenses added yet.</p>';
  document.getElementById('expenseTotal').textContent=money(totalExpenses());

  const rl=document.getElementById('reminderList');
  rl.innerHTML=data.reminders.length?data.reminders.sort((a,b)=>a.date.localeCompare(b.date)).map(x=>`<div class="reminder-row"><div><strong>${escapeHtml(x.text)}</strong><br><small>${escapeHtml(x.date)}</small></div><button onclick="removeReminder(${x.id})">Done</button></div>`).join(''):'<p class="muted">No reminders yet.</p>';
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
document.getElementById('expenseDate').value=new Date().toISOString().slice(0,10);
updateUI();
