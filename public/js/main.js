const   hidden      = document.querySelectorAll('.hidden'),
        sections    = document.querySelectorAll('.section'),
        navTitle    = document.querySelector('.navTitle'),
        animation   = document.querySelector('.animation'),
        content     = Array.from(document.querySelectorAll('.content')),
        cards       = document.querySelectorAll('.card'),
        images      = document.querySelectorAll('.image'),
        cardcontent = document.querySelectorAll('.cardcontent'),
        tags        = document.querySelectorAll('.tag'),
        menuButton  = document.querySelector('#menu'),
        ele1Hight = parseInt(window.getComputedStyle(sections[0]).getPropertyValue('height')),
        ele2Hight = parseInt(window.getComputedStyle(sections[1]).getPropertyValue('height')),
        ele3Hight = parseInt(window.getComputedStyle(sections[2]).getPropertyValue('height')),
        ele4Hight = parseInt(window.getComputedStyle(sections[3]).getPropertyValue('height'));

let scrollTally = 0;


Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};


window.addEventListener('DOMContentLoaded', ()=>{
    //set starting positions of elements, allows for changes in height on different screen sizes while also allowing the scroll effect
    //set section 2 initial 'top'
    document.documentElement.style.setProperty('--sec1height', `${200 + ele1Hight}px`)
    //set section 3 initial 'top'
    document.documentElement.style.setProperty('--sec2height', `${300 + ele1Hight + ele2Hight}px`)
    //set section 4 initial 'top'
    document.documentElement.style.setProperty('--sec3height', `${400 + ele1Hight + ele2Hight + ele3Hight}px`)
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
    let lastY = window.scrollY;
    sections.forEach(section=>{
        section.classList.toggle('menu')
    })
    if(sections[2].classList.contains('menu')){
        section2.style.setProperty('transform', `translateY(-${(200 + ele1Hight) - window.scrollY - (window.innerHeight * .25)}px)`)
        section3.style.setProperty('transform', `translateY(-${(300 + ele1Hight + ele2Hight) - window.scrollY - (window.innerHeight * .5)}px)`)
        section4.style.setProperty('transform', `translateY(-${(400 + ele1Hight + ele2Hight + ele3Hight) - window.scrollY - (window.innerHeight * .75)}px)`)
    }
    else{
        section2.style.setProperty('transform', `translateY(0px)`)
        section3.style.setProperty('transform', `translateY(0px)`)
        section4.style.setProperty('transform', `translateY(0px)`)
    }
})

sections.forEach(section => {
    section.addEventListener('click', (e) => {
        if(sections[2].classList.contains('menu')){
            section.classList.add('menuclick');
            console.log(`added class to ${section}`)
            sections.forEach(section => {
                section.classList.remove('menu')
            })
            setTimeout(()=>{
                section.classList.remove('menuclick');
                console.log(`removed class from ${section}`)
                window.scrollTo({
                    top: 873,
                    left: 0,
                    behavior: 'smooth'
                });
            }, 120)
        }
    })
})

    

window.addEventListener('scroll', (e)=>{
    //section 1
    if(window.scrollY >= ele1Hight - window.innerHeight + 50){
        let position = (window.scrollY).clamp(-50, (ele1Hight - window.innerHeight))
        sections[0].style.top = `${-position}px`;
        sections[0].classList.add('fixed', 'notopanimate');
    }
    if(window.scrollY <= ele1Hight - window.innerHeight + 50){
        setTimeout(()=>{sections[0].classList.remove('notopanimate')}, 10)
        sections[0].style.top = `50px`;
        sections[0].classList.remove('fixed')
    }


    //section 2
    if(window.scrollY >= (ele1Hight + ele2Hight) - window.innerHeight + 200){
        let position = (window.scrollY).clamp(-50, (ele2Hight - window.innerHeight))
        sections[1].style.top = `${-position}px`;
        sections[1].classList.add('fixed', 'notopanimate');
    }
    if(window.scrollY <= (ele1Hight + ele2Hight) - window.innerHeight + 200){
        setTimeout(()=>{sections[1].classList.remove('notopanimate')}, 10)
        sections[1].style.top = `${ele1Hight +200}px`;
        sections[1].classList.remove('fixed')
    }


    //section 3
    if(window.scrollY >= (ele1Hight + ele2Hight + ele3Hight) - window.innerHeight + 300){
        let position = (window.scrollY).clamp(-50, (ele3Hight - window.innerHeight))
        sections[2].style.top = `${-position}px`;
        sections[2].classList.add('fixed', 'notopanimate');
    }
    if(window.scrollY <= (ele1Hight + ele2Hight + ele3Hight) - window.innerHeight + 300){
        setTimeout(()=>{sections[2].classList.remove('notopanimate')}, 10)
        sections[2].style.top = `${ele1Hight + ele2Hight + 300}px`;
        sections[2].classList.remove('fixed')
    }
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