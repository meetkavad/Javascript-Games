cardArray = [
    {
        name : 'paris',
        img :" memoryImg/paris.png"
    },
    {
        name : 'dubai',
        img :" memoryImg/dubai.png"
    },
    {
        name : 'india',
        img :" memoryImg/india.png"
    },
    {
        name : 'rome',
        img :" memoryImg/rome.png"
    },
    {
        name : 'sol',
        img :" memoryImg/sol.png"
    },
    {
        name : 'stadium',
        img :" memoryImg/stadium.png"
    },
    {
        name : 'paris',
        img :" memoryImg/paris.png"
    },
    {
        name : 'dubai',
        img :" memoryImg/dubai.png"
    },
    {
        name : 'india',
        img :" memoryImg/india.png"
    },
    {
        name : 'rome',
        img :" memoryImg/rome.png"
    },
    {
        name : 'sol',
        img :" memoryImg/sol.png"
    },
    {
        name : 'stadium',
        img :" memoryImg/stadium.png"
    }
]

cardArray.sort(()=> 0.5 - Math.random());

let cardchosen = [];
let cardchosenId = [];
let cardwon = [];
const gridDisplay = document.getElementById('grid');
let results = document.getElementById('score');

createboard();

function createboard()
{
    for(let i = 0; i<12;i++)
    {
     const card =  document.createElement('img');
     card.setAttribute('src', 'memoryImg/blank.png');
     card.setAttribute('data-id', i);
     gridDisplay.appendChild(card);
     card.addEventListener('click',flipcard);
    }
}

function flipcard()
{
    const cardId = this.getAttribute('data-Id');
    cardchosen.push(cardArray[cardId].name);
    cardchosenId.push(cardId);  
    this.setAttribute('src', cardArray[cardId].img);
    if(cardchosen.length === 2)
    {
        setTimeout(checkmatch,500);
    }
    
}

function checkmatch()
{

    const cards = document.querySelectorAll('img');

  if(cardchosenId[0] == cardchosenId[1])
  {
  alert('you clicked the same card!!');
  cards[cardchosenId[0]].setAttribute('src', 'memoryImg/blank.png');
//   cards[cardchosenId[1]].setAttribute('src', 'memoryImg/blank.png');//since both are just same

  }

 else if(cardchosen[0] == cardchosen[1]){
    cards[cardchosenId[0]].setAttribute('src', 'memoryImg/correct.png');
    cards[cardchosenId[1]].setAttribute('src', 'memoryImg/correct.png');
    cards[cardchosenId[0]].removeEventListener('click', flipcard);
    cards[cardchosenId[1]].removeEventListener('click', flipcard);
    cardwon.push(cardchosen);
  }
  else{
    cards[cardchosenId[0]].setAttribute('src', 'memoryImg/blank.png');
    cards[cardchosenId[1]].setAttribute('src', 'memoryImg/blank.png');
  }

  results.innerHTML = cardwon.length;


  cardchosen = [];
  cardchosenId = [];

   if(cardwon.length == cardArray.length/2)
    {
        results.innerHTML = 'Congratulations you found them all !!';

    }

}