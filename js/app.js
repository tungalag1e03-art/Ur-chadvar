(function(){
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const store={get(k,d){try{const v=localStorage.getItem('thl_'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('thl_'+k,JSON.stringify(v))}catch(e){}}};

/* ---------- Tabs ---------- */
const TABS=[['yavts','Явц'],['angilah','Ангилах'],['uzuulelt','Үзүүлэлт'],['sugalaa','Сугалаа'],['haritsuulah','Харьцуулах'],['test','Тест']];
const tabs=$('#tabs');
TABS.forEach(([id,l],i)=>{const b=document.createElement('button');b.setAttribute('role','tab');b.id='t-'+id;b.innerHTML=`<span class="n">0${i+1}</span>${l}`;b.onclick=()=>show(id);tabs.appendChild(b)});
function show(id){TABS.forEach(([t])=>{$('#p-'+t).hidden=t!==id;$('#t-'+t).setAttribute('aria-selected',t===id)});store.set('tab',id)}
const hashTab=(location.hash||'').slice(1);
show(TABS.some(t=>t[0]===hashTab)?hashTab:store.get('tab','yavts'));

/* ---------- Явц / Timer ---------- */
const STAGES=[
 ['00–05','Сэдэлжүүлэлт',5,'«Өмнөх хичээлээр юу үзсэн бэ?» Техник хангамжийг нэрлүүлж, үүргийг хэлүүлээд оруулах, гаргах, санах гэж ангилна (Ангилах таб).'],
 ['05–07','Асуудал дэвшүүлэх',2,'«Компьютер худалдаж авах бол юуг нь харж авах вэ?»'],
 ['07–13','Үзүүлэлт харах аргууд',6,'Settings → About, Task Manager → Performance, Display → Advanced display. Үзүүлэлт таб дээр нэгжүүдийг тайлбарлана.'],
 ['13–21','Сугалаа ба AI',8,'Сугалаа табаас кэйс авч, Gemini-д промпт оруулна. Харьцуулах таб дээр өөрсдийн компьютертэй тулгана.'],
 ['21–27','Постер бүтээх',6,'Canva загвар дээр постер хийж moes чатад илгээнэ.'],
 ['27–32','5 тест зохиох',5,'Google Forms-ийн Quiz горимд 5 тест зохиож, Gemini-ээр шалгуулна.'],
 ['32–37','Харилцан сорих',5,'Өөрсдийн, дараа нь бусад хосын тестийг бөглөнө. Хамгийн их алдсан асуултыг хэлэлцэнэ.'],
 ['37–40','Дүгнэлт ба үнэлгээ',3,'Хэрэглэгчээс хамаарч сайн үзүүлэлт өөр. AI-г: Асуу · Шалга · Шийд.']];
let cur=0,left=STAGES[0][2]*60,tick=null;
const ul=$('#stages');
STAGES.forEach((s,i)=>{const li=document.createElement('li');li.innerHTML=`<button><span class="t">${s[0]}</span><span>${i+1}. ${s[1]}</span><span class="d">${s[2]} мин</span></button>`;li.firstChild.onclick=()=>{setStage(i);start()};ul.appendChild(li)});
function fmt(s){const m=Math.floor(s/60),x=s%60;return String(m).padStart(2,'0')+':'+String(x).padStart(2,'0')}
function render(){const tot=STAGES[cur][2]*60;$('#clock').textContent=fmt(left);$('#clock').classList.toggle('warn',left<=30);$('#clockBar').style.width=((tot-left)/tot*100)+'%';$('#stName').textContent=(cur+1)+'. '+STAGES[cur][1];$('#stDesc').textContent=STAGES[cur][3];
 $$('#stages button').forEach((b,i)=>{b.classList.toggle('on',i===cur);b.classList.toggle('done',i<cur)});$('#tStart').textContent=tick?'Түр зогсоох':'Эхлүүлэх'}
function setStage(i){stop();cur=i;left=STAGES[i][2]*60;render()}
function start(){if(tick)return;tick=setInterval(()=>{if(left>0){left--;render()}else{stop()}},1000);render()}
function stop(){clearInterval(tick);tick=null;render()}
$('#tStart').onclick=()=>tick?stop():start();
$('#tReset').onclick=()=>setStage(cur);
$('#tNext').onclick=()=>{if(cur<STAGES.length-1){setStage(cur+1)}};
render();

/* ---------- Ангилах ---------- */
const IC={
 kb:'<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
 mouse:'<rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v4"/>',
 mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>',
 cam:'<circle cx="12" cy="10" r="6"/><circle cx="12" cy="10" r="2"/><path d="M8 21h8"/>',
 scan:'<rect x="3" y="8" width="18" height="10" rx="1"/><path d="M3 12h18"/>',
 mon:'<rect x="2" y="4" width="20" height="13" rx="1"/><path d="M8 21h8M12 17v4"/>',
 print:'<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="1"/><path d="M7 14h10v7H7z"/>',
 spk:'<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="6" r="1"/>',
 hp:'<path d="M3 15v-3a9 9 0 0 1 18 0v3"/><rect x="2" y="14" width="5" height="7" rx="1"/><rect x="17" y="14" width="5" height="7" rx="1"/>',
 proj:'<rect x="2" y="8" width="20" height="9" rx="2"/><circle cx="16" cy="12.5" r="2.5"/>',
 ssd:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h6M7 13h10"/>',
 hdd:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="11" r="4"/><path d="M12 11l5 6"/>',
 usb:'<rect x="7" y="8" width="10" height="14" rx="2"/><path d="M9 8V3h6v5"/>',
 ram:'<rect x="2" y="7" width="20" height="9" rx="1"/><path d="M6 16v3M10 16v3M14 16v3M18 16v3M6 10h3v3H6zM11 10h3v3h-3zM16 10h3v3h-3z"/>',
 sd:'<path d="M6 2h9l4 4v16H6z"/><path d="M10 6v3M13 6v3"/>'};
const DEV=[['Гар','in','kb'],['Хулгана','in','mouse'],['Микрофон','in','mic'],['Вэбкам','in','cam'],['Сканнер','in','scan'],
 ['Дэлгэц','out','mon'],['Принтер','out','print'],['Чанга яригч','out','spk'],['Чихэвч','out','hp'],['Проектор','out','proj'],
 ['SSD','mem','ssd'],['HDD','mem','hdd'],['Флаш санах ой','mem','usb'],['RAM','mem','ram'],['Санах ойн карт','mem','sd']];
const BINS=[['in','Оруулах','Компьютерт мэдээлэл оруулна'],['out','Гаргах','Үр дүнг хүнд харуулна, сонсгоно'],['mem','Санах','Мэдээллийг хадгална']];
const binsEl=$('#bins');
BINS.forEach(([k,n,d])=>{const b=document.createElement('div');b.className='bin '+k;b.dataset.k=k;b.tabIndex=0;b.setAttribute('role','button');b.setAttribute('aria-label',n+' хайрцаг');
 b.innerHTML=`<div class="head"><b>${n}</b><span class="mono muted" data-c>0</span></div><p class="muted" style="font-size:14px">${d}</p><div class="items"></div>`;
 b.onclick=e=>{if(e.target.closest('.dev'))return;placeSel(k)};b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();placeSel(k)}};
 b.ondragover=e=>{e.preventDefault();b.classList.add('over')};b.ondragleave=()=>b.classList.remove('over');
 b.ondrop=e=>{e.preventDefault();b.classList.remove('over');const el=document.getElementById(e.dataTransfer.getData('text'));if(el){move(el,k)}};
 binsEl.appendChild(b)});
const pool=$('#pool');
pool.ondragover=e=>e.preventDefault();pool.ondrop=e=>{e.preventDefault();const el=document.getElementById(e.dataTransfer.getData('text'));if(el)move(el,null)};
let sel=null;
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function buildSort(){pool.innerHTML='';$$('.bin .items').forEach(x=>x.innerHTML='');$('#sortRes').textContent='';sel=null;
 shuffle(DEV).forEach(([n,k,ic],i)=>{const d=document.createElement('button');d.className='dev';d.id='dev'+n.replace(/\s/g,'');d.dataset.k=k;d.draggable=true;
  d.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC[ic]}</svg>${n}`;
  d.onclick=()=>{if(sel===d){d.classList.remove('sel');sel=null;return}$$('.dev.sel').forEach(x=>x.classList.remove('sel'));sel=d;d.classList.add('sel')};
  d.ondragstart=e=>e.dataTransfer.setData('text',d.id);pool.appendChild(d)});counts()}
function placeSel(k){if(sel){move(sel,k);sel.classList.remove('sel');sel=null}}
function move(el,k){el.classList.remove('right','wrong');(k?binsEl.querySelector(`.bin.${k} .items`):pool).appendChild(el);$('#sortRes').textContent='';counts()}
function counts(){$$('.bin').forEach(b=>b.querySelector('[data-c]').textContent=b.querySelectorAll('.dev').length)}
$('#chk').onclick=()=>{let ok=0,placed=0;$$('.bin').forEach(b=>b.querySelectorAll('.dev').forEach(d=>{placed++;const r=d.dataset.k===b.dataset.k;d.classList.toggle('right',r);d.classList.toggle('wrong',!r);if(r)ok++}));
 const rest=DEV.length-placed;$('#sortRes').textContent=`${ok} / ${DEV.length} зөв`+(rest?` · ${rest} төхөөрөмж үлдсэн`:ok===DEV.length?' · Гайхалтай!':' · Улаан байгааг засаарай')};
$('#rst').onclick=buildSort;buildSort();

/* ---------- Үзүүлэлт ---------- */
const SPECS=[
 ['in','Оруулах',[['DPI','DPI','Хулганыг 1 инч хөдөлгөхөд курсор хэдэн цэг шилжихийг заана.','800 · 1600 · 3200 DPI'],['Polling rate','Hz','Хулгана компьютерт секундэд хэдэн удаа мэдээлэл илгээхийг заана.','125 · 500 · 1000 Hz'],['Даралтын түвшин','түвшин','Зургийн планшет үзгийн даралтыг хэдэн шатлалаар мэдрэхийг заана.','4096 · 8192']]],
 ['out','Гаргах',[['Resolution','пиксел','Дэлгэц хэдэн пикселээс бүрдэхийг заана. Их байх тусам тод.','1920×1080 · 3840×2160'],['Refresh rate','Hz','Дэлгэц секундэд хэдэн удаа зургаа шинэчлэхийг заана.','60 · 144 · 240 Hz'],['Response time','ms','Пиксел өнгөө солиход зарцуулах хугацаа. Бага байх тусам сайн.','1 ms · 5 ms']]],
 ['mem','Санах',[['Багтаамж','GB / TB','Хэр их мэдээлэл хадгалахыг заана. 1 TB ≈ 1000 GB.','512 GB · 1 TB · 2 TB'],['Унших/бичих хурд','MB/s','Секундэд хэдэн MB мэдээлэл унших, бичихийг заана.','HDD 150 · NVMe 3500'],['RAM','GB','Түр санах ой. Компьютер унтрахад мэдээлэл нь устна.','8 · 16 · 32 GB']]]];
const specs=$('#specs');
SPECS.forEach(([k,n,list])=>{const g=document.createElement('div');g.className='group';
 g.innerHTML=`<h3><span class="dot" style="background:var(--${k})"></span>${n}</h3>`+list.map(([a,u,d,e])=>`<div class="spec"><div class="row1"><b>${a}</b><span class="unit" style="color:var(--${k})">${u}</span></div><p style="font-size:15px">${d}</p><span class="ex">${e}</span></div>`).join('');specs.appendChild(g)});
const DRV=[['USB 2.0 флаш',30],['HDD',150],['SATA SSD',550],['NVMe SSD',3500]];
const lanes=$('#lanes');
DRV.forEach(([n,s],i)=>{const l=document.createElement('div');l.className='lane';l.innerHTML=`<span><b>${n}</b><br><span class="mono muted" style="font-size:12px">${s} MB/s</span></span><div class="track"><i id="tr${i}"></i></div><span class="tm" id="tm${i}">—</span>`;lanes.appendChild(l)});
function hum(sec){if(sec<60)return Math.round(sec)+' сек';const m=Math.floor(sec/60),s=Math.round(sec%60);if(m<60)return m+' мин '+s+' с';return Math.floor(m/60)+' ц '+(m%60)+' мин'}
function times(){const gb=+$('#gb').value;$('#gbv').textContent=gb;return DRV.map(([,s])=>gb*1000/s)}
function showTimes(){times().forEach((t,i)=>$('#tm'+i).textContent=hum(t))}
$('#gb').oninput=()=>{showTimes();DRV.forEach((_,i)=>{const t=$('#tr'+i);t.style.transition='none';t.style.width='0'})};
$('#go').onclick=()=>{const ts=times(),max=Math.max(...ts),DUR=8;showTimes();
 ts.forEach((t,i)=>{const el=$('#tr'+i);el.style.transition='none';el.style.width='0';void el.offsetWidth;const d=Math.max(.3,DUR*t/max);el.style.transition=`width ${d}s linear`;el.style.width='100%'})};
showTimes();
const RES=[['HD',1280,720],['Full HD',1920,1080],['2K',2560,1440],['4K',3840,2160]];
const svg=$('#resSvg');let sv='';
RES.slice().reverse().forEach(([n,w,h],i)=>{const op=[.18,.32,.5,.75][i];sv+=`<rect x="10" y="${2170-h}" width="${w}" height="${h}" fill="var(--out)" fill-opacity="${op}" stroke="var(--out)" stroke-width="8"/><text x="${w-30}" y="${2170-h+130}" text-anchor="end" font-size="110" font-family="JetBrains Mono, monospace" font-weight="600" fill="var(--ink)">${n}</text>`});
svg.innerHTML=sv;
$('#resLeg').innerHTML=RES.map(([n,w,h])=>`<span><b>${n} · ${w}×${h}</b><span>${(w*h/1e6).toFixed(1)} сая пиксел</span></span>`).join('');

/* ---------- Сугалаа ---------- */
const P=[
 ['Сараа','Юүтүбэр','4K видео бичиж, өдөр бүр эвлүүлдэг. 1 цагийн бичлэг 50–100 GB эзэлдэг.','3 500 000','NVMe SSD (3000+ MB/s), 2 TB+; 4K (3840×2160) IPS дэлгэц; USB микрофон, 1080p+ вэбкам; 16–32 GB RAM.'],
 ['Номин','График дизайнер','Гараар зурж, хэвлэлийн материал хийдэг. Өнгө зөв харагдах нь маш чухал.','3 000 000','Даралт мэдрэгчтэй планшет (4096–8192 түвшин); 100% sRGB, 2K/4K дэлгэц; 16–32 GB RAM; SSD.'],
 ['Тэмүүлэн','Программист','Өдөрт 8 цаг код бичдэг, олон цонх зэрэг нээдэг.','2 500 000','Ultrawide (3440×1440) эсвэл 2 дэлгэц / Pivot; механик гар; 16–32 GB RAM; 512 GB+ SSD.'],
 ['Анужин','Подкаст хөтлөгч','Долоо хоногт 2 удаа ярилцлага бичиж, дуу засварладаг.','2 000 000','Конденсатор/динамик микрофон; аудио интерфэйс (24-bit / 48 kHz); хаалттай студийн чихэвч (20 Hz–20 kHz); 1 TB SSD.'],
 ['Болд','Архитектор','3D загвар хийдэг, нэг файл нь хэдэн GB.','4 000 000','4K дэлгэц; 3D хулгана (SpaceMouse); 32–64 GB RAM; NVMe SSD. Рендерийн хурд GPU/CPU-ээс, файл ачаалах хурд SSD-ээс хамаарна.'],
 ['Бат','E-sports тоглогч','Өдөрт 3 цаг онлайн тоглож, тэмцээнд оролцохыг хүсдэг.','2 500 000','144–240 Hz, 1 ms дэлгэц (1080p/1440p); 1000 Hz polling хулгана. DPI хамгийн өндөр байх нь заавал сайн биш (400–1600 DPI түгээмэл); 1 TB SSD.']];
const P2=[['Яагаад энэ хүнд {x} хэрэгтэй вэ? Хэрэв бага байвал юу болох вэ?'],['Төсөв 500 000 ₮-өөр буурвал аль үзүүлэлтээс хэмнэх нь хамгийн бага хохиролтой вэ?'],['Чиний санал болгосон үнэ Монголын зах зээлд үнэн үү? Яаж шалгах вэ?']];
let pi=-1;
const plist=$('#plist');
P.forEach((p,i)=>{const b=document.createElement('button');b.innerHTML=`<b>${i+1}. ${p[0]}</b><br><span class="muted">${p[1]}</span>`;b.onclick=()=>pick(i);plist.appendChild(b)});
function promptText(p){return `Чи бол компьютерийн техникийн шинжээч. Манай хос ${p[0]} (${p[1].toLowerCase()})-д зориулж төхөөрөмж сонгох гэж байна. ${p[2]} Төсөв нь ${p[3]} ₮.

1. Энэ хэрэглэгчид хамгийн чухал оруулах, гаргах, санах байгууламжийн техникийн үзүүлэлтийг 8-р ангийн сурагчид ойлгомжтой тайлбарла.

2. Өндөр чанартай болон хэмнэлттэй гэсэн 2 хувилбарыг хүснэгтээр харуул. Үзүүлэлт бүрийг нэгжтэй нь бич. Бид өөрсдөө сонгоно.`}
function pick(i){pi=i;const p=P[i];$('#pWho').textContent=p[0];$('#pRole').textContent=p[1];$('#pNeed').textContent=p[2];$('#pBudget').textContent='Төсөв: '+p[3]+' ₮';
 $('#prompt').textContent=promptText(p);$('#tch').innerHTML=`<b>${p[0]} — хүлээгдэж буй үзүүлэлт:</b><br>${p[4]}`;
 $$('#plist button').forEach((b,j)=>b.classList.toggle('on',j===i));store.set('persona',i)}
$('#drawBtn').onclick=()=>{let n=0;const steps=14;const btn=$('#drawBtn');btn.disabled=true;
 const go=()=>{const r=Math.floor(Math.random()*P.length);$('#pWho').textContent=P[r][0];$('#pRole').textContent=P[r][1];$('#pWho').classList.remove('spin');void $('#pWho').offsetWidth;$('#pWho').classList.add('spin');
  if(++n<steps){setTimeout(go,60+n*12)}else{pick(r);btn.disabled=false}};go()};
$('#p2').innerHTML=P2.map(([t])=>`<li>«${t.replace('{x}','[үзүүлэлт]')}»</li>`).join('');
$('#prompt').textContent='Кэйс сугалсны дараа промпт энд гарна.';
const sp=store.get('persona',-1);if(sp>=0&&sp<P.length)pick(sp);
$('#copyBtn').onclick=async()=>{const t=$('#prompt').textContent;try{await navigator.clipboard.writeText(t);$('#copyBtn').textContent='Хуулагдлаа ✓'}catch(e){const r=document.createRange();r.selectNodeContents($('#prompt'));const s=getSelection();s.removeAllRanges();s.addRange(r);$('#copyBtn').textContent='Сонгогдлоо — Ctrl+C'}setTimeout(()=>$('#copyBtn').textContent='Хуулах',2000)};
$('#tchBtn').onclick=()=>{const h=$('#tch');h.hidden=!h.hidden;$('#tchBtn').setAttribute('aria-expanded',!h.hidden);if(pi<0)h.textContent='Эхлээд кэйс сонгоно уу.'};

/* ---------- Харьцуулах ---------- */
const ROWS=[['in','Хулганы DPI','Device Manager-ээс загварын нэр → үйлдвэрлэгчийн сайт','жишээ: 1600 DPI'],
 ['out','Resolution','Settings → System → Display','жишээ: 1920×1080'],
 ['out','Refresh rate','Display → Advanced display','жишээ: 60 Hz'],
 ['mem','RAM','Settings → System → About','жишээ: 8 GB'],
 ['mem','Дискний төрөл','Task Manager → Performance → Disk','жишээ: SSD'],
 ['mem','Дискний багтаамж','This PC','жишээ: 512 GB']];
const CN={in:'Оруулах',out:'Гаргах',mem:'Санах'};
let cmp=store.get('cmp',{});
const tb=$('#cmpBody');
ROWS.forEach(([k,n,w,ph],i)=>{const tr=document.createElement('tr');const v=cmp[i]||{};
 tr.innerHTML=`<td><span class="cat ${k}">${CN[k]}</span><br><b>${n}</b></td><td class="where">${w}</td>
 <td><input id="my${i}" placeholder="${ph}" value="${(v.my||'').replace(/"/g,'&quot;')}"></td><td><input id="ai${i}" placeholder="AI-аас" value="${(v.ai||'').replace(/"/g,'&quot;')}"></td>
 <td><div class="verdict"><button class="yes" aria-pressed="${v.ok===true}" data-i="${i}" data-v="1">Тийм</button><button class="no" aria-pressed="${v.ok===false}" data-i="${i}" data-v="0">Үгүй</button></div></td>`;tb.appendChild(tr)});
tb.addEventListener('input',e=>{const m=e.target.id.match(/^(my|ai)(\d)$/);if(!m)return;const i=m[2];cmp[i]=cmp[i]||{};cmp[i][m[1]]=e.target.value;store.set('cmp',cmp)});
tb.addEventListener('click',e=>{const b=e.target.closest('.verdict button');if(!b)return;const i=b.dataset.i,val=b.dataset.v==='1';cmp[i]=cmp[i]||{};cmp[i].ok=cmp[i].ok===val?undefined:val;
 b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',cmp[i].ok===(x.dataset.v==='1')));store.set('cmp',cmp);summ()});
function summ(){const vals=ROWS.map((_,i)=>(cmp[i]||{}).ok);const y=vals.filter(v=>v===true).length,n=vals.filter(v=>v===false).length;
 const el=$('#cmpSum');if(!y&&!n){el.textContent='Шийдвэр гаргаагүй байна.';el.style.color='';return}
 const short=ROWS.filter((_,i)=>vals[i]===false).map(r=>r[1]);
 el.style.color=n?'var(--bad)':'var(--ok)';
 el.textContent=`${y} үзүүлэлт тохирч, ${n} үзүүлэлт дутуу.`+(short.length?' Сайжруулах: '+short.join(', ')+'.':(y===ROWS.length?' Манай компьютер энэ хүнд тохирно!':''))}
$('#cmpClear').onclick=()=>{cmp={};store.set('cmp',cmp);ROWS.forEach((_,i)=>{$('#my'+i).value='';$('#ai'+i).value=''});$$('.verdict button').forEach(b=>b.setAttribute('aria-pressed','false'));summ()};
summ();

/* ---------- Тест ---------- */
const Q=[
 ['Аль нь оруулах төхөөрөмж вэ?',['Принтер','Микрофон','Чанга яригч','Проектор'],1,'Микрофон дууг компьютерт оруулдаг. Бусад нь гаргах төхөөрөмж.'],
 ['Дэлгэцийн Refresh rate-ийг ямар нэгжээр хэмждэг вэ?',['ms','DPI','Hz','GB'],2,'Hz — секундэд хэдэн удаа зургаа шинэчлэх. ms бол Response time-ийн нэгж.'],
 ['Хулганы DPI юуг илэрхийлдэг вэ?',['Дэлгэцийн тод байдлыг','Хулгана 1 инч хөдлөхөд курсор хэдэн цэг шилжихийг','Хулганы жинг','Батерейн хугацааг'],1,'DPI бол хулганы мэдрэмж. Дэлгэцийн тод байдлыг Resolution заана.'],
 ['1 TB ойролцоогоор хэдэн GB вэ?',['10 GB','100 GB','1000 GB','1 000 000 GB'],2,'1 TB ≈ 1000 GB (нарийн тооцоогоор 1024 GB).'],
 ['Компьютер унтрахад мэдээлэл нь устдаг санах ой аль вэ?',['SSD','HDD','RAM','Флаш санах ой'],2,'RAM бол түр санах ой. SSD, HDD, флаш нь мэдээллээ хадгалдаг.'],
 ['Аль нь хамгийн хурдан санах төхөөрөмж вэ?',['HDD (~150 MB/s)','SATA SSD (~550 MB/s)','NVMe SSD (~3500 MB/s)','USB 2.0 флаш (~30 MB/s)'],2,'NVMe SSD нь HDD-ээс 20 дахин илүү хурдан.'],
 ['4K дэлгэцийн нягтрал аль нь вэ?',['1280×720','1920×1080','2560×1440','3840×2160'],3,'4K = 3840×2160 ≈ 8.3 сая пиксел, Full HD-ээс 4 дахин их.'],
 ['Response time-ийн нэгж аль нь вэ?',['ms','Hz','MB/s','DPI'],0,'ms (миллисекунд). Бага байх тусам дүрс бүдэгрэхгүй.'],
 ['E-sports тоглогчид дэлгэцийн аль үзүүлэлт хамгийн чухал вэ?',['Өндөр Refresh rate (144–240 Hz)','Олон USB порт','Том дискний багтаамж','Чанга яригчтай байх'],0,'Өндөр Refresh rate хөдөлгөөнийг жигд харуулж, хурдан хариу үйлдэл хийхэд тусална.'],
 ['Аль нь гаргах төхөөрөмж вэ?',['Сканнер','Вэбкам','Проектор','Гар'],2,'Проектор дүрсийг гаргаж харуулдаг. Бусад нь оруулах төхөөрөмж.']];
let qi=0,ans=[];
const qz=$('#quiz');
function qRender(){
 if(qi>=Q.length){const ok=ans.filter(Boolean).length;
  qz.innerHTML=`<span class="eyebrow">Дүн</span><div class="score">${ok} / ${Q.length}</div><p>${ok>=9?'Маш сайн! Одоо хосоороо 5 тест зохиогоорой.':ok>=6?'Сайн байна. Алдсан асуултаа Үзүүлэлт табаас давтаарай.':'Үзүүлэлт таб дээрх нэгжүүдийг дахин үзээд оролдоорой.'}</p>
  <div class="dots">${ans.map(a=>`<i class="${a?'r':'w'}"></i>`).join('')}</div><div class="btns"><button class="btn" id="qAgain">Дахин бөглөх</button></div>`;
  $('#qAgain').onclick=()=>{qi=0;ans=[];qRender()};return}
 const [t,o,c,ex]=Q[qi];
 qz.innerHTML=`<div class="qhead"><span class="eyebrow">Асуулт ${qi+1} / ${Q.length}</span><div class="dots">${Q.map((_,i)=>`<i class="${i<ans.length?(ans[i]?'r':'w'):i===qi?'c':''}"></i>`).join('')}</div></div>
 <div class="qtext">${t}</div><div class="opts">${o.map((x,i)=>`<button class="opt" data-i="${i}"><span class="k">${'ABCD'[i]}</span><span>${x}</span></button>`).join('')}</div><div id="qex" aria-live="polite"></div>`;
 $$('.opt').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,r=i===c;ans.push(r);$$('.opt').forEach(x=>{x.disabled=true;if(+x.dataset.i===c)x.classList.add('right')});if(!r)b.classList.add('wrong');
  $('#qex').innerHTML=`<div class="explain"><b>${r?'Зөв!':'Буруу.'}</b> ${ex}</div><div class="btns" style="margin-top:10px"><button class="btn" id="qNext">${qi<Q.length-1?'Дараагийн асуулт →':'Дүнгээ харах'}</button></div>`;
  $('#qNext').onclick=()=>{qi++;qRender()};$('#qNext').focus()})}
qRender();
})();
