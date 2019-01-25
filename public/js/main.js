const   body        = document.querySelector('body'),
        hidden      = document.querySelectorAll('.hidden'),
        sections    = document.querySelectorAll('.section'),
        navTitle    = document.querySelector('.navTitle'),
        animation   = document.querySelector('.animation'),
        content     = Array.from(document.querySelectorAll('.content')),
        cards       = document.querySelectorAll('.card'),
        images      = document.querySelectorAll('.image'),
        cardcontent = document.querySelectorAll('.cardcontent'),
        tags        = document.querySelectorAll('.tag'),
        menuButton  = document.querySelector('#menu');
        

let ele1Height = parseInt(window.getComputedStyle(sections[0]).getPropertyValue('height')),
    ele2Height = parseInt(window.getComputedStyle(sections[1]).getPropertyValue('height')),
    ele2offset = ele1Height + 200;
    ele3Height = parseInt(window.getComputedStyle(sections[2]).getPropertyValue('height')),
    ele3offset = 300 + ele1Height + ele2Height;
    ele4Height = parseInt(window.getComputedStyle(sections[3]).getPropertyValue('height'));
    ele4offset = 400 + ele1Height + ele2Height + ele3Height;


Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

window.addEventListener('resize', ()=>{
    ele1Height = parseInt(window.getComputedStyle(sections[0]).getPropertyValue('height')),
    ele2Height = parseInt(window.getComputedStyle(sections[1]).getPropertyValue('height')),
    ele3Height = parseInt(window.getComputedStyle(sections[2]).getPropertyValue('height')),
    ele4Height = parseInt(window.getComputedStyle(sections[3]).getPropertyValue('height'));

    initTop()
})

function menuOff(){
    section2.style.setProperty('transform', `translateY(0px) rotateX(0deg) `);
    section3.style.setProperty('transform', `translateY(0px) rotateX(0deg)`);
    section4.style.setProperty('transform', `translateY(0px) rotateX(0deg)`);
    sections.forEach(section => {
        section.classList.remove('menu')
    })
}

function initTop(){
    //set section 2 initial 'top'
    document.documentElement.style.setProperty('--sec2top', `${ele2offset}px`)
    //set section 3 initial 'top'
    document.documentElement.style.setProperty('--sec3top', `${ele3offset}px`)
    //set section 4 initial 'top'
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

window.addEventListener('DOMContentLoaded', ()=>{
    //set starting positions of elements, allows for changes in height on different screen sizes while also allowing the scroll effect
    initTop()
    setTimeout(function(){
        // loading animation and fade in
        hidden.forEach(function(element){
            element.classList.remove('hidden')
        })
        navTitle.classList.add('hidden')
        animation.classList.add('hidden')
    }, 2000)
})


menuButton.addEventListener('click', (e)=>{
    sections.forEach(section=>{
        section.classList.toggle('menu')
    })
    if(sections[2].classList.contains('menu')){
        return section2.style.setProperty('transform', `translateY(${-(ele2offset - window.scrollY - (window.innerHeight * .25)).clamp(-(window.innerHeight * .25)+50, ele2offset)}px)`),
        section3.style.setProperty('transform', `translateY(${-(ele3offset - window.scrollY - (window.innerHeight * .5)).clamp(-(window.innerHeight * .5)+50, ele3offset)}px)`),
        section4.style.setProperty('transform', `translateY(${-(ele4offset - window.scrollY - (window.innerHeight * .75)).clamp(-(window.innerHeight * .75)+50, ele4offset)}px)`);
    }
    menuOff()
})

sections.forEach(section => {
    section.addEventListener('click', (e) => {
        const target = e.target;
        if(sections[2].classList.contains('menu')){
            setTimeout(()=>{
                section.classList.remove('menuclick');
                console.log(`removed class from ${section}`)
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 100)
            menuOff()
        }
    })
})

window.addEventListener('scroll', (e)=>{
    menuOff()
    //section 1
    if(window.scrollY >= ele1Height - window.innerHeight + 50)  addFix(sections[0], ele1Height); 
    else removeFix(sections[0], 50);

    //section 2
    if(window.scrollY >= ele3offset - window.innerHeight - 100) addFix(sections[1], ele2Height);
    else removeFix(sections[1], ele2offset);

    //section 3
    if(window.scrollY >= ele4offset - window.innerHeight - 100) addFix(sections[2], ele3Height); 
    else removeFix(sections[2], ele3offset);
})



cards.forEach(c => 
  c.addEventListener('click', () =>{ 
   cards.forEach(card => { 
     card.classList.toggle('opening');
     card.classList.toggle('closing');
   })
   cards.forEach(card => { card  === c ? c.classList.toggle('displaying') : card.classList.toggle('hidden'); }) 
 })  
);