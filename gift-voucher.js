(function(){
var T=GV.t,root=document.getElementById('gv-app'),API=GV.api;
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function fm(n){n=Math.round(n*100)/100;return n%1?n.toFixed(2):String(n)}
function fill(s,o){return String(s).replace(/\{(\w+)\}/g,function(m,k){return o[k]==null?m:o[k]})}
function pad(n){return n<10?'0'+n:''+n}
function today(){var d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function dmy(i){var p=String(i).slice(0,10).split('-');return p[2]+'/'+p[1]+'/'+p[0]}
var S={cfg:null,sid:null,people:null,mode:'direct',busy:false,err:'',f:{lang:GV.lang,sendOn:today()}};
function sess(){return S.cfg.sessions.filter(function(x){return x.id===S.sid})[0]}
function val(s,n){return s.perPerson?Math.round(s.price*(n||1)*121)/100:s.total}
function nm(s){return GV.names[s.id]||s.name}
function readF(){['name','email','rName','rEmail','message','sender','taxName','taxId','taxAddr'].forEach(function(k){var e=root.querySelector('#f-'+k);if(e)S.f[k]=e.value});var d=root.querySelector('#f-sendOn');if(d)S.f.sendOn=d.value;var v=root.querySelector('#f-lang');if(v)S.f.lang=v.value;var c=root.querySelector('#f-inv');if(c)S.f.inv=c.checked;var k=root.querySelector('#f-consent');if(k)S.f.consent=k.checked}
function paint(){
 var s=sess(),h='';
 h+='<div class="gv-card"><h2>'+esc(T.s1)+'</h2>';
 S.cfg.sessions.slice().sort(function(a,b){return (b.perPerson?1:0)-(a.perPerson?1:0)}).forEach(function(x){var pr=x.perPerson?('<s class="gv-was">€'+x.regular+'</s> €'+x.price+' '+esc(T.pp_vat)):('€'+x.price+' '+esc(T.vat));var ppl=x.people.length>1?fill(T.up_to,{n:x.people[x.people.length-1]}):(x.people[0]>1?fill(T.people_n,{n:x.people[0]}):T.person);h+='<button type="button" class="gv-opt" data-s="'+x.id+'" aria-pressed="'+(S.sid===x.id)+'"><b><span>'+esc(nm(x))+(x.perPerson?' <i class="gv-badge">'+esc(T.xmas_deal)+'</i>':'')+'</span><span>'+pr+'</span></b><small>'+(x.minutes===60?'1 h':x.minutes+' min')+' · '+esc(ppl)+(x.perPerson?' · '+esc(T.xmas_season):'')+'</small></button>'});
 if(s&&s.people.length>1){h+='<label>'+esc(T.people)+'</label><div class="gv-chips">';s.people.forEach(function(p){h+='<button type="button" class="gv-chip" data-p="'+p+'" aria-pressed="'+(S.people===p)+'">'+p+'</button>'});h+='</div>'}
 h+='<p class="gv-note">'+esc(T.note_any)+'</p></div>';
 h+='<div class="gv-card"><h2>'+esc(T.s2)+'</h2>';
 h+='<button type="button" class="gv-opt" data-m="direct" aria-pressed="'+(S.mode==='direct')+'"><b>'+esc(T.direct)+'</b><small>'+esc(T.directd)+'</small></button>';
 h+='<button type="button" class="gv-opt" data-m="self" aria-pressed="'+(S.mode==='self')+'"><b>'+esc(T.self)+'</b><small>'+esc(T.selfd)+'</small></button>';
 if(S.mode==='direct'){h+='<label for="f-rName">'+esc(T.rname)+'</label><input type="text" id="f-rName" autocomplete="off" value="'+esc(S.f.rName)+'"><label for="f-rEmail">'+esc(T.remail)+'</label><input type="email" id="f-rEmail" autocomplete="off" value="'+esc(S.f.rEmail)+'"><label for="f-sendOn">'+esc(T.senddate)+'</label><input type="date" id="f-sendOn" min="'+today()+'" value="'+esc(S.f.sendOn)+'">'}
 h+='<label for="f-message">'+esc(T.message)+'</label><textarea id="f-message" maxlength="600" placeholder="'+esc(T.msgph)+'">'+esc(S.f.message)+'</textarea><p class="gv-note">'+esc(T.msgn)+'</p>';
 h+='<label for="f-sender">'+esc(T.sender)+'</label><input type="text" id="f-sender" maxlength="60" value="'+esc(S.f.sender)+'">';
 h+='<label for="f-lang">'+esc(T.vlang)+'</label><select id="f-lang">';Object.keys(GV.langs).forEach(function(k){h+='<option value="'+k+'"'+(S.f.lang===k?' selected':'')+'>'+esc(GV.langs[k])+'</option>'});h+='</select></div>';
 h+='<div class="gv-card"><h2>'+esc(T.s3)+'</h2><label for="f-name">'+esc(T.name)+'</label><input type="text" id="f-name" autocomplete="name" value="'+esc(S.f.name)+'"><label for="f-email">'+esc(T.email)+'</label><input type="email" id="f-email" autocomplete="email" value="'+esc(S.f.email)+'">';
 h+='<label class="gv-chk"><input type="checkbox" id="f-inv"'+(S.f.inv?' checked':'')+'><span>'+esc(T.inv)+'</span></label>';
 if(S.f.inv){h+='<label for="f-taxName">'+esc(T.taxName)+'</label><input type="text" id="f-taxName" value="'+esc(S.f.taxName)+'"><label for="f-taxId">'+esc(T.taxId)+'</label><input type="text" id="f-taxId" value="'+esc(S.f.taxId)+'"><label for="f-taxAddr">'+esc(T.taxAddr)+'</label><input type="text" id="f-taxAddr" value="'+esc(S.f.taxAddr)+'">'}
 h+='<p class="gv-note">'+esc(T.invn)+'</p><label class="gv-chk"><input type="checkbox" id="f-consent"'+(S.f.consent?' checked':'')+'><span>'+esc(T.consent)+'</span></label></div>';
 var tot=s?val(s,S.people||s.people[0]):0;
 if(S.err)h+='<div class="gv-err" role="alert">'+esc(S.err)+'</div>';
 h+='<div class="gv-row" style="margin-top:20px"><div><span class="gv-note" style="margin:0">'+esc(T.total)+'</span><div class="gv-tot">€'+fm(tot)+'</div></div><button type="button" class="gv-btn" id="gv-pay"'+((S.busy||!s)?' disabled':'')+'>'+esc(S.busy?T.wait:T.pay+' €'+fm(tot))+'</button></div>';
 root.innerHTML=h;bind();
}
function bind(){
 [].forEach.call(root.querySelectorAll('[data-s]'),function(b){b.onclick=function(){readF();S.sid=this.getAttribute('data-s');var s=sess();S.people=s.people.length===1?s.people[0]:(s.perPerson?s.people[0]:s.people[s.people.length-1]);paint()}});
 [].forEach.call(root.querySelectorAll('[data-p]'),function(b){b.onclick=function(){readF();S.people=+this.getAttribute('data-p');paint()}});
 [].forEach.call(root.querySelectorAll('[data-m]'),function(b){b.onclick=function(){readF();S.mode=this.getAttribute('data-m');paint()}});
 var c=root.querySelector('#f-inv');if(c)c.onchange=function(){readF();paint()};
 var p=root.querySelector('#gv-pay');if(p)p.onclick=pay;
}
function pay(){
 readF();if(S.busy)return;S.err='';
 var f=S.f,s=sess();
 if(!s||!f.name||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email||'')||!f.consent||(S.mode==='direct'&&(!f.rName||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.rEmail||'')))||(f.inv&&(!f.taxName||!f.taxId||!f.taxAddr))){S.err=T.err;paint();return}
 S.busy=true;paint();
 var body={action:'voucher',sessionId:s.id,people:S.people||s.people[0],name:f.name,email:f.email,consent:true,mode:S.mode,rName:f.rName||'',rEmail:f.rEmail||'',sendOn:f.sendOn||today(),message:f.message||'',sender:f.sender||f.name,vlang:f.lang,lang:GV.lang,invoice:!!f.inv,taxName:f.taxName||'',taxId:f.taxId||'',taxAddr:f.taxAddr||''};
 fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)}).then(function(r){return r.text()}).then(function(x){
  var r=null;try{r=JSON.parse(x)}catch(e){}
  if(r&&r.ok&&r.checkoutUrl){location.href=r.checkoutUrl;return}
  S.busy=false;S.err=/too_many/.test(x)?T.errb:T.err;paint();
 }).catch(function(){S.busy=false;S.err=T.errc;paint()});
}
function done(code){
 root.innerHTML='<div class="gv-card"><p>'+esc(T.wait)+'</p></div>';
 var n=0;
 (function go(){
  fetch(API+'?action=vconfirm&code='+encodeURIComponent(code)).then(function(r){return r.json()}).then(function(r){
   if(!r.ok){root.innerHTML='<div class="gv-card"><p>'+esc(T.d_nf)+'</p><a class="gv-btn" href="'+GV.pre+'/gift-voucher/">'+esc(T.back)+'</a></div>';return}
   if(r.status==='PENDING'){root.innerHTML='<div class="gv-card"><p>'+esc(T.d_pend)+'</p></div>';if(++n<20)setTimeout(go,3000);return}
   var h='<div class="gv-card"><h2>'+esc(fill(T.dh,{n:r.firstName||''}))+'</h2>';
   if(r.mode==='self')h+='<p>'+esc(T.d_ok_self)+'</p><div class="gv-code">'+esc(r.voucherCode||code)+'</div><p class="gv-note">'+esc(r.session)+' · €'+fm(r.value)+' · '+esc(fill(T.d_valid,{d:dmy(r.expires)}))+'</p>';
   else{var now=String(r.sendOn).slice(0,10)<=today();h+='<p>'+esc(fill(now?T.d_ok_direct_now:T.d_ok_direct_later,{r:r.recipient,d:dmy(r.sendOn)}))+'</p><p class="gv-note">'+esc(r.session)+' · €'+fm(r.value)+' · '+esc(fill(T.d_valid,{d:dmy(r.expires)}))+'</p>'}
   h+='<p style="margin-top:20px"><a class="gv-btn" href="'+GV.pre+'/book-valencia-photoshoot/">'+esc(T.book)+'</a></p></div>';
   root.innerHTML=h;var t=document.getElementById('gv-terms');if(t)t.style.display='none';var hw=document.getElementById('gv-how');if(hw)hw.style.display='none';
  }).catch(function(){root.innerHTML='<div class="gv-card"><p>'+esc(T.errc)+'</p></div>'});
 })();
}
var q=new URLSearchParams(location.search),dn=q.get('done');
if(dn&&/^OBG-[A-Z0-9-]+$/i.test(dn)){done(dn.toUpperCase());return}
function init(c){S.cfg=c;if(!S.sid){var pick=c.sessions.filter(function(x){return x.id==='couple'})[0]||c.sessions[0];S.sid=pick.id;S.people=pick.people.length===1?pick.people[0]:(pick.perPerson?pick.people[0]:pick.people[pick.people.length-1])}paint()}
var K='obcfg4',cached=null;try{cached=JSON.parse(sessionStorage.getItem(K)||'null')}catch(e){}
if(cached)init(cached);
fetch(API+'?action=config').then(function(r){return r.json()}).then(function(c){if(!c||!c.sessions)throw 0;try{sessionStorage.setItem(K,JSON.stringify(c))}catch(e){}if(!cached)init(c)}).catch(function(){if(!cached)root.innerHTML='<div class="gv-card"><p>'+esc(T.errc)+'</p></div>'});
})();
