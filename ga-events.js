/* Lightweight GA4 click tracking for buttons/links */
(function(){
  function closestInteractive(el){
    while(el && el !== document.body){
      if(el.matches('a,button,[role="button"],[data-analytics]')) return el;
      el = el.parentElement;
    }
    return null;
  }

  function getText(el){
    var label = el.getAttribute('data-analytics-label') || el.getAttribute('aria-label') || '';
    if(!label){
      // Prefer visible text; trim and collapse whitespace
      label = (el.textContent || '').replace(/\s+/g,' ').trim();
    }
    if(!label && el.tagName.toLowerCase() === 'img'){
      label = el.getAttribute('alt') || '';
    }
    return label.slice(0, 120);
  }

  function findSectionId(el){
    while(el && el !== document.body){
      var tag = el.tagName ? el.tagName.toLowerCase() : '';
      if((tag === 'section' || tag === 'header' || tag === 'nav' || tag === 'footer') && el.id){
        return el.id;
      }
      el = el.parentElement;
    }
    return '';
  }

  function onClick(e){
    var target = closestInteractive(e.target);
    if(!target || target.hasAttribute('data-analytics-ignore')) return;

    var eventName = target.getAttribute('data-analytics-event') || target.getAttribute('data-event') || 'cta_click';
    // GA4 event names recommended to be lowercase and snake_case
    eventName = eventName.toLowerCase().replace(/[^a-z0-9_]/g,'_');

    var label = getText(target);
    var params = {
      element_type: (target.tagName || '').toLowerCase(),
      element_id: target.getAttribute('data-analytics-id') || target.id || '',
      element_label: label,
      section: findSectionId(target),
      page_path: location.pathname,
      page_title: document.title
    };

    if(target.tagName && target.tagName.toLowerCase() === 'a'){
      params.link_url = target.href || '';
      params.link_text = label;
    }

    if(typeof window.gtag === 'function'){
      window.gtag('event', eventName, params);
    }
  }

  // Capture on the way down so we get clicks even if immediate navigation happens
  document.addEventListener('click', onClick, {capture: true});
})();

