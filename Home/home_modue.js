let navbar = document.querySelector('#navbarNav'); 
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active'); 
    cartItem.classList.remove('active'); 
    User.classList.remove('active'); 
};


let cartItem = document.querySelector('.cart-items-container'); 
document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active'); 
    navbar.classList.remove('active'); 
    User.classList.remove('active'); 
};


let User = document.querySelector('.user-menu'); 
document.querySelector('#user-btn').onclick = () => {
    User.classList.toggle('active'); 
    navbar.classList.remove('active'); 
    cartItem.classList.remove('active'); 
};
const searchBtn = document.getElementById('search-btn');
const searchForm = document.querySelector('.search-form');
searchBtn.onclick = function () {
        if (window.innerWidth < 992) {
            if (searchForm.style.display === 'none') {
                searchForm.style.display = 'flex';
            } else {
                searchForm.style.display = 'none';
            }
        }
};
window.onresize = function () {
        if (window.innerWidth >= 992) {
            searchForm.style.display = 'flex';
        } else {
            searchForm.style.display = 'none';
        }
};

window.onscroll = () => {
    navbar.classList.remove('active');  
    cartItem.classList.remove('active'); 
    User.classList.remove('active'); 
}
function toggleAll() {
    const collapses = document.querySelectorAll('.collapse');
    let allOpen = Array.from(collapses).every(collapse => collapse.classList.contains('show'));

    collapses.forEach(collapse => {
        let bsCollapse = new bootstrap.Collapse(collapse, { toggle: false });
        allOpen ? bsCollapse.hide() : bsCollapse.show();
    });
}
function toggleSection(sectionId) {
    const collapse = document.getElementById(sectionId);
    let bsCollapse = new bootstrap.Collapse(collapse, { toggle: false });  
    if (collapse.classList.contains('show')) {
        bsCollapse.hide(); 
    } else {
        bsCollapse.show(); 
    }
}
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    const navbar = document.querySelector(".navbar-thumuc");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        navbar.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
        navbar.classList.remove("scrolled");
    }
});
