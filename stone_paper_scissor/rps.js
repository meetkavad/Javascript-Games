const userchoice = document.getElementById('userchoicedisplay');
const computerchoice  = document.getElementById('computerchoicedisplay') ;
const result = document.getElementById('resultdisplay');

const possiblechoices = document.querySelectorAll('button');

let cc;
let uc;
let res;

possiblechoices.forEach(button => {
    button.addEventListener('click', (e)=>
    {
       uc = e.target.id;
       userchoice.innerHTML = uc;

       generatecomputerchoice();
    finalresult();
    result.innerHTML = res;
    })

    
});

function generatecomputerchoice()
{
    const number= Math.floor(Math.random()*3);

    if(number == 0)
    cc = 'Rock';
    if(number == 1)
    cc = 'Paper';
     if(number == 2)
    cc = 'Scissor';

    computerchoice.innerHTML = cc;
}

function finalresult()
{
   if(uc === cc)
   res = "It's  a Draw!!";
   else if(uc === 'Rock'  && cc === 'Paper')
      res = "you lost!!";
   else if(uc === 'Rock'  && cc === 'Scissor')
      res = "you Won!!";
   else if(uc === 'Scissor'  && cc === 'Rock')
      res = "you lost!!";
   else if(uc === 'Scissor'  && cc === 'Paper')
      res = "you Won!!";
   else if(uc === 'Paper'  && cc === 'Rock')
      res = "you Won!!";
   else if(uc === 'Paper'  && cc === 'Scissor')
      res = "you lost!!";

}