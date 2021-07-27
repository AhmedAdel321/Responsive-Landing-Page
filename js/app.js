/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections =document.querySelectorAll('section');// get sections elements
const list = document.getElementById('navbar__list');// get element that has id:navbar__list
const fragment = document.createDocumentFragment();// create fragment to decrease the reflows


// build the nav

for (const section of sections){ // create for loop on the all sections
    const listItem = document.createElement('li'); // create list element and store it in listItem
    const sectionID = section.getAttribute('id'); // get the value of the id attribute of section and store it in sectionID
    const text = section.getAttribute('data-nav');// get the value of the data-nav attribute of section and store in in text
    //listItem.innerHTML=`<a href="#${sectionID}" class="menu__link">${text}</a>`;// create anchor and append it in listItem
    listItem.innerHTML=`<a class="menu__link">${text}</a>`;
    fragment.appendChild(listItem);// append list item to the fragment

}
list.appendChild(fragment) // append the fragment to the list

list.addEventListener('click',function scrollToSection(event){
    console.log('eee');
    console.log(event);
    
    for (const section of sections){
        console.log(section);
        console.log(event.target.textContent)
        console.log(section.getAttribute('data-nav'))
        if (section.getAttribute('data-nav')==event.target.textContent){
            section.scrollIntoView({behavior: "smooth", block: "start", inline:"start"});
            
        }else{
            console.log('no'); 
        }
    }
});

/////////////////////////
//discriminate the Section and link in Visible Area with the Active Class
const links =document.querySelectorAll('.menu__link');// get link elements

document.addEventListener('scroll',highlightSection)
function highlightSection() {
    const observer = new IntersectionObserver(function (entries,observer){
        entries.forEach(function(entry){ 
            if(entry.isIntersecting){ 
                for(const section of sections){
                    section.classList.remove('your-active-class') // remove active class from all sections at first
                }
                for(const link of links){
                    link.classList.remove('your-active-class2')// remove active class from all links at first
                    if(link.textContent === entry.target.getAttribute('data-nav')){//link text content is identical to section attribute data nav
                        link.classList.add('your-active-class2')// add active class 2 to that link
                    }
                }
                entry.target.classList.add('your-active-class') // if in the view port add the active class
                observer.unobserve(entry.target);//stop observing the specified target element.
            }
        })
    },{rootMargin: "-250px 0px -250px 0px"});//adjust the bounds outward so that the target element is considered 100% visible even if a certain number of pixels worth of width or height is clipped away
    // obseve sections
    for (const section of sections){
        observer.observe(section);//adds section to the set of target elements being watched by the IntersectionObserver
    }
};

////////////////

//Hide fixed navigation bar while not scrolling.
const header = document.querySelector(".page__header");

let scrollTime;
function hideNavigationBar () {
 header.style.display = "block"; 
 clearTimeout(scrollTime);//to clear the timeout you already set before scrolling
 scrollTime=setTimeout(function() {
    header.style.display = "none";
  }, 5000);// hide navigation bar after 5000 milli seconds
};

document.addEventListener('scroll',hideNavigationBar);

//button appears after 1000 pixels the document is currently scrolled vertically.
const goToTop = document.getElementById("go-to-top");

function viewGoToTop () {
if (window.scrollY > 1000){
    goToTop.style.display = "block";
} else{
    goToTop.style.display = "none";
}
};
document.addEventListener('scroll',viewGoToTop);

// Click on the Go To Top button
function scrollToTop () {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });//scroll the document to the top
};

goToTop.addEventListener('click',scrollToTop);


/* // smooth scroll 
// quoted from "https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link"
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); */




