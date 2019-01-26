const   body        = document.querySelector('body'),
        hidden      = document.querySelectorAll('.hidden'),
        sections    = document.querySelectorAll('.section'),
        navTitle    = document.querySelector('.navTitle'),
        animation   = document.querySelector('.animation'),
        content     = Array.from(document.querySelectorAll('.content')),
        cards       = document.querySelectorAll('.card'),
        images      = document.querySelectorAll('.image'),
        cardcontent = document.querySelectorAll('.cardcontent'),
        menuButton  = document.querySelector('#menu');
        

let ele1Height = parseInt(window.getComputedStyle(sections[0]).getPropertyValue('height')),
    ele2Height = parseInt(window.getComputedStyle(sections[1]).getPropertyValue('height')),
    ele2offset = ele1Height + 200;
    ele3Height = parseInt(window.getComputedStyle(sections[2]).getPropertyValue('height')),
    ele3offset = 300 + ele1Height + ele2Height;
    ele4Height = parseInt(window.getComputedStyle(sections[3]).getPropertyValue('height'));
    ele4offset = 400 + ele1Height + ele2Height + ele3Height,
    menu = false;


Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

function debounce(func, wait = 10, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }



function menuOff(){
    section2.style.setProperty('transform', `translateY(0px) rotateX(0deg) `);
    section3.style.setProperty('transform', `translateY(0px) rotateX(0deg)`);
    section4.style.setProperty('transform', `translateY(0px) rotateX(0deg)`);
    sections.forEach(section => {
        section.classList.remove('menu')
    })
    menu = false;
}

function initTop(){
    //set sections initial 'top' (in order 2, 3, 4)
    document.documentElement.style.setProperty('--sec2top', `${ele2offset}px`)
    document.documentElement.style.setProperty('--sec3top', `${ele3offset}px`)
    document.documentElement.style.setProperty('--sec4top', `${ele4offset}px`)
}

function addFix(section, offset){
    let position = (window.scrollY).clamp(-50, (offset - window.innerHeight))
    section.style.top = `${-position}px`;
    section.classList.add('fixed',);
}

function removeFix(section, offset){
    section.style.top = `${offset}px`;
    section.classList.remove('fixed')
}

function sectionFix(){
    window.scrollY > 200 ? navTitle.classList.remove('hidden') : navTitle.classList.add('hidden') ;
    //section 1
    (window.scrollY >= ele1Height - window.innerHeight + 50) ? addFix(sections[0], ele1Height) : removeFix(sections[0], 50);
    //section 2
    (window.scrollY >= ele3offset - window.innerHeight - 100) ? addFix(sections[1], ele2Height) : removeFix(sections[1], ele2offset);
    //section 3
    (window.scrollY >= ele4offset - window.innerHeight - 100) ? addFix(sections[2], ele3Height) : removeFix(sections[2], ele3offset);

    menuOff()
}

window.addEventListener('DOMContentLoaded', ()=>{
    //set starting positions of elements, allows for changes in height on different screen sizes while also allowing the scroll effect
    setTimeout(function(){
        // loading animation and fade in
        hidden.forEach(function(element){
            element.classList.remove('hidden')
        })
        navTitle.classList.add('hidden')
        animation.classList.add('hidden')
    }, 2000)
})

window.addEventListener('resize', ()=>{
    ele1Height = parseInt(window.getComputedStyle(sections[0]).getPropertyValue('height')),
    ele2Height = parseInt(window.getComputedStyle(sections[1]).getPropertyValue('height')),
    ele3Height = parseInt(window.getComputedStyle(sections[2]).getPropertyValue('height')),
    ele4Height = parseInt(window.getComputedStyle(sections[3]).getPropertyValue('height'));

    ele2offset = ele1Height + 200;
    ele3offset = 300 + ele1Height + ele2Height;
    ele4offset = 400 + ele1Height + ele2Height + ele3Height,

    initTop()
})

menuButton.addEventListener('click', ()=>{
    sections.forEach(section=>{
        section.classList.toggle('menu')
    })    
    
    if(menu){
        return menuOff()
    }

    section2.style.setProperty('transform', `translateY(${-(ele2offset - window.scrollY - (window.innerHeight * .25)).clamp(-(window.innerHeight * .25)+50, ele2offset)}px)`),
    section3.style.setProperty('transform', `translateY(${-(ele3offset - window.scrollY - (window.innerHeight * .5)).clamp(-(window.innerHeight * .5)+50, ele3offset)}px)`),
    section4.style.setProperty('transform', `translateY(${-(ele4offset - window.scrollY - (window.innerHeight * .75)).clamp(-(window.innerHeight * .75)+50, ele4offset)}px)`);
    
    return menu = !menu;
})

sections.forEach(section => {
    section.addEventListener('click', (e) => {
        if(menu){
            setTimeout(()=>{
                if(e.target == sections[0]) window.scrollTo({ top: 0});
                if(e.target == sections[1]) window.scrollTo({ top: ele2offset});
                if(e.target == sections[2]) window.scrollTo({ top: ele3offset});
                if(e.target == sections[3]) window.scrollTo({ top: ele4offset});
                sectionFix()
            }, 350)
            menuOff()
        }
    })
})

window.addEventListener('scroll', debounce(sectionFix))

cards.forEach(c => 
  c.addEventListener('click', () =>{ 
   cards.forEach(card => { 
     card.classList.toggle('opening');
     card.classList.toggle('closing');
   })
   cards.forEach(card => { card  === c ? c.classList.toggle('displaying') : card.classList.toggle('hidden'); }) 
 })  
);

initTop()