(function(){
  'use strict';
  function host(){return document.querySelector('main.container') || document.scrollingElement || document.documentElement;}
  function sync(){
    const h=host(), rail=document.getElementById('rmScrollRail'), thumb=document.getElementById('rmScrollThumb');
    if(!h||!rail||!thumb)return;
    const max=Math.max(0,h.scrollHeight-h.clientHeight);
    if(max<=2){rail.classList.add('hidden');return;}
    rail.classList.remove('hidden');
    const track=rail.clientHeight-76;
    const ratio=h.clientHeight/h.scrollHeight;
    const th=Math.max(42,Math.min(track,track*ratio));
    thumb.style.height=th+'px';
    const y=max?((h.scrollTop/max)*(track-th)):0;
    thumb.style.transform='translateY('+y+'px)';
  }
  function scrollByPage(dir){
    const h=host(); if(!h)return;
    h.scrollBy({top:dir*Math.max(180,h.clientHeight*0.72),behavior:'smooth'});
  }
  function setup(){
    if(document.getElementById('rmScrollRail'))return;
    const rail=document.createElement('div');
    rail.id='rmScrollRail'; rail.className='rm-scroll-rail hidden';
    rail.innerHTML='<button class="rm-scroll-btn rm-up" aria-label="Scroll up">▲</button><div class="rm-scroll-track"><div id="rmScrollThumb" class="rm-scroll-thumb"></div></div><button class="rm-scroll-btn rm-down" aria-label="Scroll down">▼</button>';
    document.body.appendChild(rail);
    rail.querySelector('.rm-up').addEventListener('click',()=>scrollByPage(-1));
    rail.querySelector('.rm-down').addEventListener('click',()=>scrollByPage(1));
    const track=rail.querySelector('.rm-scroll-track');
    track.addEventListener('click',e=>{if(e.target.id==='rmScrollThumb')return;const r=track.getBoundingClientRect();const h=host();const max=Math.max(0,h.scrollHeight-h.clientHeight);h.scrollTo({top:Math.max(0,Math.min(max,((e.clientY-r.top)/r.height)*max)),behavior:'smooth'});});
    let dragging=false,startY=0,startScroll=0;
    const thumb=rail.querySelector('#rmScrollThumb');
    const down=e=>{dragging=true;startY=e.clientY;startScroll=host().scrollTop;thumb.setPointerCapture?.(e.pointerId);e.preventDefault();};
    const move=e=>{if(!dragging)return;const h=host();const trackH=track.clientHeight;const thumbH=thumb.offsetHeight;const max=Math.max(0,h.scrollHeight-h.clientHeight);const travel=Math.max(1,trackH-thumbH);h.scrollTop=startScroll+(e.clientY-startY)*max/travel;e.preventDefault();};
    const up=()=>{dragging=false;};
    thumb.addEventListener('pointerdown',down); thumb.addEventListener('pointermove',move); thumb.addEventListener('pointerup',up); thumb.addEventListener('pointercancel',up);
    const h=host(); h.addEventListener('scroll',sync,{passive:true});
    window.addEventListener('resize',sync); window.addEventListener('orientationchange',()=>setTimeout(sync,150));
    new MutationObserver(()=>setTimeout(sync,50)).observe(h,{subtree:true,childList:true,attributes:true});
    setTimeout(sync,250); setTimeout(sync,800);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
