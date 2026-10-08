(function () {
  'use strict';
  function doc() { return document.scrollingElement || document.documentElement || document.body; }
  function maxScroll() { var d=doc(); return Math.max(0, d.scrollHeight - window.innerHeight); }
  function scrollPage(dir) {
    var amount=Math.max(220, Math.floor(window.innerHeight * 0.72));
    window.scrollBy({top: dir*amount, left:0, behavior:'smooth'});
  }
  function sync() {
    var max=maxScroll(), box=document.getElementById('rmManualScroll'), p=document.getElementById('rmProgress');
    if(!box) return;
    box.style.display = max > 8 ? 'flex' : 'none';
    if(p) p.textContent = max>0 ? Math.round((doc().scrollTop/max)*100)+'%' : '0%';
  }
  function setup() {
    if(document.getElementById('rmManualScroll')) return;
    var box=document.createElement('div'); box.id='rmManualScroll';
    box.innerHTML='<button type="button" id="rmUp" aria-label="Scroll up">▲</button><div class="rm-progress" id="rmProgress">0%</div><button type="button" id="rmDown" aria-label="Scroll down">▼</button>';
    document.body.appendChild(box);
    document.getElementById('rmUp').addEventListener('click',function(){scrollPage(-1);});
    document.getElementById('rmDown').addEventListener('click',function(){scrollPage(1);});
    window.addEventListener('scroll',sync,{passive:true});
    window.addEventListener('resize',sync);
    new MutationObserver(function(){setTimeout(sync,100);}).observe(document.body,{childList:true,subtree:true});
    setTimeout(sync,300); setTimeout(sync,1200);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup); else setup();
})();
