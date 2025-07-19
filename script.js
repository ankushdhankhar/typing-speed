const typingText=document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time=document.querySelector('.time span b')
const mistakes=document.querySelector('.mistakes span')
const wpm=document.querySelector('.wpm span')
const cpm=document.querySelector('.cpm span')
const btn=document.querySelector('button')


// set value

let timer;
let maxTime=60 ;
let timeLeft=maxTime ;
let charIndex=0;
let mistake=0 ;
let isTyping=false;


function loadParagraph(){
    const paragraph=["The best way to get started is to quit talking and begin doing.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Whether you think you can or you think you can’t, you’re right.",
  "Your time is limited, so don’t waste it living someone else’s life.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Dream big and dare to fail.",
  "Opportunities don't happen. You create them.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "It always seems impossible until it's done.",
  "Start where you are. Use what you have. Do what you can.",
  "If you want to lift yourself up, lift up someone else.",
  "Success usually comes to those who are too busy to be looking for it.",
  "The future depends on what you do today.",
  "Believe you can and you're halfway there."];

  const randomIndex=Math.floor(Math.random()*paragraph.length)

  typingText.innerHTML=''
  for(const char of paragraph[randomIndex]){
    typingText.innerHTML+=`<span>${char}</span>`
  }
  typingText.querySelectorAll('span')[0].classList.add('active');

  document.addEventListener('keydown' ,()=>input.focus()) ;
  typingText.addEventListener('click', ()=>input.focus());
} 

// handle user input 
function initTyping(){
    const char=document.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft>0){

        if(!isTyping){
            timer=setInterval(initTime ,1000) ;
            isTyping=true;
        }
        if(char[charIndex].innerText===typedChar){
            char[charIndex].classList.add('correct');
            console.log('correct');
        }
        else{
            mistake++ ;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        charIndex++ ;

        char[charIndex].classList.add('active');

        mistakes.innerText=mistake ; 
        cpm.innerText=charIndex-mistake ;
    }
    else{
        clearInterval(timer);
        input.value='';
    }
}

function initTime(){
    if(timeLeft>0 && charIndex < typingText.querySelectorAll('span').length){

        timeLeft-- ;
        time.innerText=timeLeft ;

        let wpmVal = Math.round(((charIndex-mistake)/5)/(maxTime-timeLeft)*60) ;

        wpm.innerText=wpmVal ;
    }
    else{
        clearInterval(timer);  
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime ;
    time.innerHTML=timeLeft;
    input.value='';
    charIndex=0;
    mistake=0 ;
    isTyping=false;
    mistakes.innerText=0;
    wpm.innerText=0;
    cpm.innerText=0 ;

}
input.addEventListener("input", initTyping);
btn.addEventListener("click", reset ) ;

loadParagraph() ;