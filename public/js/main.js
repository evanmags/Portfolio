const lastScrollTop = window.pageYOffset || document.documentElement.scrollTop,
body = document.querySelector('body'),
hidden = document.querySelectorAll('.hidden'),
sections = document.querySelectorAll('.section'),
section2 = document.querySelector('#section2'),
section3 = document.querySelector('#section3'),
section4 = document.querySelector('#section4'),
navTitle = document.querySelector('.navTitle'),
animation = document.querySelector('.animation'),
content = Array.from(document.querySelectorAll('.content')),
menuButton = document.querySelector('#menu');

let scrollTally = 0;

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};



window.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(function(){
        hidden.forEach(function(element){
            element.classList.remove('hidden')
        })
        navTitle.classList.add('hidden')
        animation.classList.add('hidden')
    },100)
})


menuButton.addEventListener('click', (e)=>{
    sections.forEach(section=>{
        section.classList.toggle('menu')
    })
})

sections.forEach(section => {
    section.addEventListener('click', (e) => {
        if(section2.classList.contains('menu')){
            let tallyHolder = scrollTally;
            scrollTally = 0;
            sections.forEach(section => {
                section.classList.remove('menu')
            })
            if(e.target.getAttribute('id') === 'section1'){
            }
            else if(e.target.getAttribute('id') === 'section2'){
                scrollTally -= window.innerHeight * 2;
            }
            else if(e.target.getAttribute('id') === 'section3'){
                scrollTally -= window.innerHeight * 5.2;
            }
            else if(e.target.getAttribute('id') === 'section4'){
                scrollTally -= window.innerHeight * 8.35;
            }
            else{
                scrollTally = tallyHolder;
            }
            moveSections(scrollTally)
        }
    })
})

window.addEventListener('mousewheel', (e)=>{
    console.log(scrollTally, e.deltaY)
    if(!section2.classList.contains('menu')){
        if((scrollTally + e.deltaY) >= -((window.innerHeight + 50 ) * 8) && (scrollTally + e.deltaY) <= ((window.innerHeight + 50 ) *2)){
            scrollTally += e.deltaY;
            moveSections(scrollTally)
        }  
    }
    return scrollTally;
}, {passive: true})

window.addEventListener('resize', (e)=>{
    if((scrollTally + e.deltaY) >= -((window.innerHeight + 50 ) * 8) && (scrollTally + e.deltaY) <= ((window.innerHeight + 50 ) *2)){
        scrollTally += e.deltaY;
    }
    moveSections(scrollTally)
})

function moveSections(x){
    let sec2pos = (window.innerHeight + 50 + (x * .6)).clamp(50, window.innerHeight + 50);
    let sec3pos = (((window.innerHeight + 50 ) * 2.2) + (x * .6)).clamp(50, ((window.innerHeight + 50 ) * 2.5));
    let sec4pos = (((window.innerHeight + 50 ) * 3.8) + (x * .6)).clamp(50, ((window.innerHeight + 50 ) * 4));
    
    if(sec2pos < 100){
        navTitle.classList.remove('hidden')
    }
    if(sec2pos > 100){
        navTitle.classList.add('hidden')
    }

    section2.style.setProperty('top', `${sec2pos}px`);
    section3.style.setProperty('top', `${sec3pos}px`);
    section4.style.setProperty('top', `${sec4pos}px`);
}