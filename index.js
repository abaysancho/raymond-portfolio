 // set year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting) e.target.classList.add('visible');
      });
    },{threshold:0.12});
    reveals.forEach(r => obs.observe(r));

    // Add visible state styles
    const style = document.createElement('style');
    style.innerHTML = '.reveal.visible{opacity:1;transform:none;animation:none}';
    document.head.appendChild(style);

    // Skills progress animation
    const progresses = document.querySelectorAll('.progress');
    progresses.forEach((p, idx) => {
      const value = parseInt(p.getAttribute('data-value')||0,10);
      const bar = p.querySelector('i');
      setTimeout(()=>{
        bar.style.width = value + '%';
        bar.style.transition = 'width 1.2s cubic-bezier(.2,.9,.3,1)';
      }, 350 + idx*120);
    });

    // Parallax subtle move on mouse
    const parallax = document.querySelector('.parallax');
    window.addEventListener('mousemove', (e)=>{
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      parallax.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (ev)=>{
        const href = a.getAttribute('href');
        if(href.startsWith('#')){
          ev.preventDefault();
          const el = document.querySelector(href);
          if(el) el.scrollIntoView({behavior:'smooth', block:'center'});
        }
      });
    });

    // Simple parallax on scroll for profile photo
    window.addEventListener('scroll', ()=>{
      const photo = document.getElementById('profilePhoto');
      if(!photo) return;
      const rect = photo.getBoundingClientRect();
      const offset = Math.min(Math.max((window.innerHeight - rect.top)/10, -10), 10);
      photo.style.transform = `translateY(${offset}px)`;
    });

    // Contact form handler (placeholder)
    function handleForm(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation
      if(!name||!email||!message){
        alert('Please complete the form.');
        return;
      }

      // Example: open mail client with prefilled subject — replace with your backend endpoint or Formspree
      const mailto = `mailto:you@example.com?subject=${encodeURIComponent(subject||'Contact from portfolio')}&body=${encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+message)}`;
      window.location.href = mailto;
    }

    // Small accessibility: focus visible trap for keyboard users
    document.addEventListener('keydown', (e)=>{
      if(e.key==='Tab') document.documentElement.style.scrollBehavior='smooth';
    });