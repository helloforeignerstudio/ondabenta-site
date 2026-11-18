/* Onda Benta - Google Analytics 4 with consent (Consent Mode v2, denied by default). */
(function () {
  var GA_ID = 'G-SF8QQDS5PP';
  var KEY = 'ob_cookie_consent';
  var L = {
    en: ['We use cookies to understand how the site is used and improve it. You can accept or decline.', 'Accept', 'Decline'],
    es: ['Usamos cookies para entender cómo se usa la web y mejorarla. Puedes aceptar o rechazar.', 'Aceptar', 'Rechazar'],
    pt: ['Usamos cookies para entender como o site é usado e melhorá-lo. Você pode aceitar ou recusar.', 'Aceitar', 'Recusar'],
    fr: ['Nous utilisons des cookies pour comprendre l’usage du site et l’améliorer. Vous pouvez accepter ou refuser.', 'Accepter', 'Refuser'],
    de: ['Wir verwenden Cookies, um die Nutzung der Website zu verstehen und sie zu verbessern. Sie können zustimmen oder ablehnen.', 'Akzeptieren', 'Ablehnen'],
    nl: ['We gebruiken cookies om te begrijpen hoe de site wordt gebruikt en om hem te verbeteren. U kunt accepteren of weigeren.', 'Accepteren', 'Weigeren'],
    zh: ['我们使用 Cookie 来了解网站的使用情况并加以改进。您可以接受或拒绝。', '接受', '拒绝']
  };

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });

  var loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function grant() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    load();
  }

  function banner() {
    var lang = (document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
    var t = L[lang] || L.en;
    var d = document.createElement('div');
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Cookies');
    d.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;max-width:560px;margin:0 auto;background:#fff;color:#222;border:1px solid #ddd;border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.18);padding:14px 16px;font:14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif';
    var p = document.createElement('p');
    p.style.cssText = 'margin:0 0 10px';
    p.textContent = t[0];
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;justify-content:flex-end';
    function btn(label, primary, fn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = 'cursor:pointer;border-radius:8px;padding:8px 14px;font:inherit;border:1px solid #222;' + (primary ? 'background:#222;color:#fff' : 'background:#fff;color:#222');
      b.onclick = function () { fn(); d.remove(); };
      return b;
    }
    row.appendChild(btn(t[2], false, function () { save('denied'); }));
    row.appendChild(btn(t[1], true, function () { save('granted'); grant(); }));
    d.appendChild(p);
    d.appendChild(row);
    document.body.appendChild(d);
  }

  var s = saved();
  if (s === 'granted') grant();
  else if (s !== 'denied') {
    if (document.body) banner(); else document.addEventListener('DOMContentLoaded', banner);
  }
})();
