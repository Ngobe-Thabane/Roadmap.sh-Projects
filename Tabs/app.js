const tabContent = {
  "first-tab": "Believe you can and you're halfway there.",
  "second-tab": "Push yourself, because no one else is going to do it for you.",
  "third-tab": "Success doesn't just find you. You have to go out and get it.",
  "fourth-tab": "The harder you work for something, the greater you’ll feel when you achieve it."
}


const  tabs = document.querySelectorAll('.tab').
  forEach((tabButton)=>{
    tabButton.addEventListener('click', (e)=>{
      const id = e.currentTarget.id;
      showTabContent(id);
    })
})

function showTabContent(id){
  const contentDiv = document.getElementById('tab-content');
  contentDiv.innerText = tabContent[id];
}