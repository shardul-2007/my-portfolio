// =========================
// Loader
// =========================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    }
});

// =========================
// Typing Effect
// =========================

const text = [
    "Frontend Developer",
    "Web Designer",
    "JavaScript Programmer",
    "Creative Coder"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){

    if(document.getElementById("typing")==null) return;

    if(count===text.length){
        count=0;
    }

    currentText=text[count];

    letter=currentText.slice(0,++index);

    document.getElementById("typing").textContent=letter;

    if(letter.length===currentText.length){

        count++;

        index=0;

        setTimeout(type,1500);

    }else{

        setTimeout(type,120);

    }

})();

// =========================
// Scroll To Top
// =========================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

if(topBtn){

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

}

// =========================
// Smooth Navigation
// =========================

document.querySelectorAll("nav a").forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// =========================
// Cursor Glow
// =========================

const cursor=document.getElementById("cursor");

document.addEventListener("mousemove",(e)=>{

if(cursor){

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

}

});

// =========================
// Reveal Animation
// =========================

const reveals=document.querySelectorAll("section");

function reveal(){

const windowHeight=window.innerHeight;

reveals.forEach(sec=>{

const top=sec.getBoundingClientRect().top;

if(top<windowHeight-100){

sec.style.opacity="1";

sec.style.transform="translateY(0px)";

}

});

}

window.addEventListener("scroll",reveal);

reveal();

// =========================
// Hero Greeting
// =========================

setTimeout(()=>{

console.log("Welcome to Shardul Portfolio");

},1000);

// =========================
// Contact Form
// =========================

const form=document.querySelector("form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank You! Your message has been sent.");

form.reset();

});

}
