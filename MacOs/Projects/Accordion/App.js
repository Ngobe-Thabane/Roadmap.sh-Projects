
const questions =[ 
  {
    question :"What is roadmap.sh?",
    answer:"roadmap.sh is a community effort to create learning paths, guides, project ideas and other similar content to help developers grow in the careers"
  },
  {
    question :"What are the plans for roadmap.sh?",
    answer:"roadmap.sh is a community effort to create learning paths, guides, project ideas and other similar content to help developers grow in the careers"
  },

  {
    question :"How is roadmap.sh built?",
    answer:"roadmap.sh is a community effort to create learning paths, guides, project ideas and other similar content to help developers grow in the careers"
  },

  {
    question :"Can I use roadmap.sh in my team?",
    answer:"roadmap.sh is a community effort to create learning paths, guides, project ideas and other similar content to help developers grow in the careers"
  },

  {
    question :"How can I create custom roadmaos?",
    answer:"roadmap.sh is a community effort to create learning paths, guides, project ideas and other similar content to help developers grow in the careers"
  },

  {
    question :"Is roadmap.sh realy 7th most starred project on GitHub?",
    answer:"roadmap.sh is a community effort to create learning paths, guides, project ideas and other similar content to help developers grow in the careers"
 }

]
const quetionsContainer = document.querySelector('.questions-container');

questions.forEach(question =>{

  const article = createElement('article', 'questionss-container');
  const questionDiv = createElement('div', 'question-div');
  const questionInfo = createElement('p', 'question', question.question);
  const answerDiv = createElement('div', 'answer-div');
  const answer = createElement('p', 'answer', question.answer);
  const arrow= createElement('button', 'arrow');
  const arrowIcon = createElement('img', 'iconPic');
  arrowIcon.src = './icons8-down-arrow-32.png';

  arrow.appendChild(arrowIcon);
  arrow.addEventListener('click', handleEvent);

  questionDiv.appendChild(questionInfo);
  questionDiv.appendChild(arrow);
  article.appendChild(questionDiv);
  answerDiv.appendChild(answer);
  article.appendChild(answerDiv);

  quetionsContainer.appendChild(article);

})


function createElement(tag, classname, content){

  const element = document.createElement(tag);
  element.className = classname;

  if( content !== undefined) element.innerHTML = content;

  return element;
}

function handleEvent(event){

  const divContainer = event.target.closest('.questionss-container');
  const questionDiv = divContainer.querySelector('.question-div');
  const answerDiv = divContainer.querySelector('.answer-div');
  const iconPic = divContainer.querySelector('.iconPic');

  if(questionDiv.classList.contains('question-viewd')){
    questionDiv.classList.remove('question-viewd');
    iconPic.src = './icons8-down-arrow-32.png';
    answerDiv.style.display = 'none';
  }else{
  }
}

function toggle(fn, className, display, src){
  fn(className);
  iconPic.src = src;
  answerDiv.style.display = display;
}