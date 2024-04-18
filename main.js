// MENU BURGER
const burgerMenuButton = document.querySelector('.burger-menu-button');
const burgerMenuButtonIcon = document.querySelector('.burger-menu-button i');
const burgerMenu = document.querySelector('.burger-menu');

burgerMenuButton.addEventListener('click', ()=>{
    burgerMenu.classList.toggle('open');
    const isOpen = burgerMenu.classList.contains('open');
    burgerMenuButtonIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}) 
    
// script parallax section1 et 2
document.addEventListener('DOMContentLoaded', function() {
    // section 1
    let logo = document.querySelector('.logo');

    // section 2
    let scrollingText = document.getElementById('text');
    let image = document.querySelector('image');

    window.addEventListener('scroll', function() {
        // la position du scroll
        let yOffset = window.scrollY;

        // on deplace le logo verticalement lors du scroll
        let speed = 0.35;
        let logoTranslateY = yOffset * speed;
        logo.style.transform = 'translate(-50%, -50%) translateY(' + logoTranslateY + 'px) rotate(' + (yOffset / 5) + 'deg)';

        // le texte suit le scroll par rapport au viewport
        scrollingText.style.transform = 'translateY(' + yOffset * 0.1 + 'px)';

        // nous fixons l'image lors du scroll jusqu'a la fin de la section
        let sectionTop = document.querySelector('.parallax-section2').offsetTop;
        // Calcul de la position verticale de l'image par rapport à la viewport
        let translateY = Math.max(1, yOffset - sectionTop);
        image.style.top = translateY + 'px';
    });
});


// SCRIPT PARALLAX
// calcul la position de l'élément par rapport au haut de la page
function offsetTop(element, acc = 0){
    if(!element.offsetParent){
        return offsetTop(element.offsetParent, acc + element.offsetTop);
    }

    return acc + element.offsetTop;
}

class Parallax {
    constructor(element) {
        this.element = element;
        this.speed = parseFloat(element.dataset.parallax);
        this.onScroll = this.onScroll.bind(this);
        this.onIntersection = this.onIntersection.bind(this);
        this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
        const observer = new IntersectionObserver(this.onIntersection);
        observer.observe(element);
        this.onScroll();
        
    }

    onIntersection(entries){
        for(const entry of entries){
            if(entry.isIntersecting){
                document.addEventListener("scroll", this.onScroll);
                this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;

            }else{
                document.removeEventListener("scroll", this.onScroll);

            }
        }
    }

    onScroll(){
        window.requestAnimationFrame(() => {
            // calcul la position en y
            const screenY = window.scrollY + window.innerHeight / 2;
            const diffY = this.elementY - screenY;

            this.element.style.setProperty(
                "transform", 
                `translate(${diffY * -1 * this.speed}px)`);
        })
    }

    static bind() {
        return Array.from(document.querySelectorAll("[data-parallax]")).map(
            (element) => {
                return new Parallax(element);
            }
        )
    }
}

Parallax.bind();
