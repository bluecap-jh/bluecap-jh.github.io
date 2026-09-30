const slides=[...document.querySelectorAll('.slide')];
const viewer=document.getElementById('viewer');
const dots=document.getElementById('dots');
const counter=document.getElementById('counter');
const playIcon=document.getElementById('playIcon');
const playLabel=document.getElementById('playLabel');
let index=0,playing=true,timer,idleTimer,startX=0,startY=0;

slides.forEach((_,i)=>{
  const dot=document.createElement('button');
  dot.type='button';dot.className='dot';dot.setAttribute('role','tab');
  dot.setAttribute('aria-label',`${i+1}번 화면`);
  dot.addEventListener('click',()=>go(i));
  dots.appendChild(dot);
});
const dotEls=[...dots.children];

function render(previous=index){
  slides.forEach((slide,i)=>{
    slide.classList.toggle('is-active',i===index);
    slide.classList.toggle('is-before',i<index);
  });
  dotEls.forEach((dot,i)=>{dot.classList.toggle('is-active',i===index);dot.setAttribute('aria-selected',i===index)});
  counter.value=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
}
function go(next){const prev=index;index=(next+slides.length)%slides.length;render(prev);restart()}
function restart(){clearInterval(timer);if(playing)timer=setInterval(()=>go(index+1),8000)}
function togglePlay(){playing=!playing;playIcon.textContent=playing?'Ⅱ':'▶';playLabel.textContent=playing?'자동 재생':'재생';restart();wake()}
function wake(){viewer.classList.remove('is-idle');clearTimeout(idleTimer);idleTimer=setTimeout(()=>viewer.classList.add('is-idle'),2800)}

document.getElementById('prev').addEventListener('click',()=>go(index-1));
document.getElementById('next').addEventListener('click',()=>go(index+1));
document.getElementById('play').addEventListener('click',togglePlay);
document.getElementById('fullscreen').addEventListener('click',async()=>{
  if(!document.fullscreenElement)await document.documentElement.requestFullscreen?.();
  else await document.exitFullscreen?.();
  wake();
});
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();go(index+1)}
  if(e.key==='ArrowLeft'){e.preventDefault();go(index-1)}
  if(e.key.toLowerCase()==='f')document.getElementById('fullscreen').click();
});
viewer.addEventListener('pointerdown',e=>{startX=e.clientX;startY=e.clientY;wake()});
viewer.addEventListener('pointerup',e=>{
  const dx=e.clientX-startX,dy=e.clientY-startY;
  if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25)go(index+(dx<0?1:-1));
});
['pointermove','touchstart','click'].forEach(event=>viewer.addEventListener(event,wake,{passive:true}));
window.addEventListener('load',()=>{render();restart();wake();slides.slice(1).forEach(s=>{const img=s.querySelector('img');const preload=new Image();preload.src=img.src})});
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
