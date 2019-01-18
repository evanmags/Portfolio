const lastScrollTop = window.pageYOffset || document.documentElement.scrollTop
const section2 = document.querySelector('#section2');
const section3 = document.querySelector('#section3');
const section4 = document.querySelector('#section4');
let scrollTally = 0;

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

window.addEventListener('mousewheel', (e)=>{
    if((scrollTally + e.deltaY) >= -((window.innerHeight + 50 ) * 6.5) && (scrollTally + e.deltaY) <= ((window.innerHeight + 50 ) * 1.5)){
        scrollTally += e.deltaY;
    }
    let sec2pos = (window.innerHeight + 50 + (scrollTally * .5)).clamp(0, window.innerHeight + 50);
    let sec3pos = (((window.innerHeight + 50 ) * 2) + (scrollTally * .5)).clamp(0, ((window.innerHeight + 50 ) * 2));
    let sec4pos = (((window.innerHeight + 50 ) * 3) + (scrollTally * .5)).clamp(0, ((window.innerHeight + 50 ) * 3));
    
    section2.style.setProperty('transform', `translateY(${sec2pos}px)`);
    section3.style.setProperty('transform', `translateY(${sec3pos}px)`);
    section4.style.setProperty('transform', `translateY(${sec4pos}px)`);
})

window.addEventListener('resize', (e)=>{
    if((scrollTally + e.deltaY) >= -((window.innerHeight + 50 ) * 6.5) && (scrollTally + e.deltaY) <= ((window.innerHeight + 50 ) * 1.5)){
        scrollTally += e.deltaY;
    }
    let sec2pos = (window.innerHeight + 50 + (scrollTally * .5)).clamp(0, window.innerHeight + 50);
    let sec3pos = (((window.innerHeight + 50 ) * 2) + (scrollTally * .5)).clamp(0, ((window.innerHeight + 50 ) * 2));
    let sec4pos = (((window.innerHeight + 50 ) * 3) + (scrollTally * .5)).clamp(0, ((window.innerHeight + 50 ) * 3));
    
    section2.style.setProperty('transform', `translateY(${sec2pos}px)`);
    section3.style.setProperty('transform', `translateY(${sec3pos}px)`);
    section4.style.setProperty('transform', `translateY(${sec4pos}px)`);
})