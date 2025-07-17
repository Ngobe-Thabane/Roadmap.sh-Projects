import { GitHubAccount } from "./GithubAccount.js";

document.getElementById('s-btn').addEventListener('click', ()=> getAccount())
document.getElementById('username').addEventListener('keypress', (event) =>{

  if(event.key === 'Enter')  getAccount();
})


function getAccount(){

  const username = document.getElementById('username');

  if( username.value !== ''){
    displayAccount(username.value);
    username.value = '';
  }
}

async function displayAccount(username){

  try{
    fetch(`https://api.github.com/users/${username}`)
    .then((results) =>results.json())
    .then(userData => {
      userData.status === undefined ? createUser(userData) : usernameDoesNotExist();
    })

  }
  catch(err){
    usernameDoesNotExist();
  }
}

function createUser(account){
  
  const userAccount = new GitHubAccount(account);
  const userContainer = document.querySelector('.user-container');
  const userDataContainer = createElement('div', 'user-data');
  const userAvatarDiv = createElement('div', 'user-avatar-div');
  const userAvatar = createElement('img', 'avator', undefined, userAccount.getAvatar());
  userContainer.innerHTML = "";
  userContainer.style.display ='flex';
  userAvatarDiv.appendChild(userAvatar);
  userContainer.appendChild(userAvatarDiv);
  userDataContainer.appendChild(addGitProfile(userAccount));
  userDataContainer.appendChild(addGitStat(userAccount));
  userDataContainer.appendChild(getSocials(userAccount));
  userContainer.appendChild(userDataContainer);
}

function addGitProfile(account){

  const profileDiv = createElement('div', 'profile-div');
  const introDiv = createElement('div', 'intro-div');
  const username = createElement('p', 'username', account.getUserName());
  const joinDate = createElement('p', 'join-date', 'Joined    ' + account.getJoinDate());
  const userBio = createElement('p', 'user-bio', account.getBio());

  introDiv.appendChild(username);
  introDiv.appendChild(joinDate);

  profileDiv.appendChild(introDiv);
  profileDiv.appendChild(userBio);

  return profileDiv;
}


function addGitStat(account){

  const statContainer = createElement('div', 'socials-div');

  [
    ['Repos', account.getRepos()],
    ['Followers', account.getFollowers()],
    ['Following', account.getFollowing()]
  ]
  .forEach(statData=>{
    const userStat = createElement('div', 'socials-data');
    userStat.innerHTML = `<span>${statData[0]}</span> <span class='value'>${statData[1]} </span>`;
    statContainer.appendChild(userStat);
  });

  return statContainer;

}

function usernameDoesNotExist(){
  const container = document.querySelector('.user-container');
  container.innerHTML = createElement('h1', 'not-found', 'Username Does not exist').innerText;
}

function getSocials(acount){

  const socialDiv = createElement('div', 'social-div');
  [
    ['assets/icon-company.svg', acount.getCompanyName()], 
    ['assets/icon-location.svg', acount.getLocation()], 
    ['assets/icon-twitter.svg' , acount.getTwiterUsername()], 
    ['assets/icon-website.svg', acount.getBlog()]
  ]
  .forEach(social =>{

    const socialInfo = createElement('div', 'social');
    const icon = createElement('img', 'icon-div', undefined, social[0]);    
    const socialData = createElement('a', 'blog-link', social[1]);

    if(social[0].includes('website') && !social[1].includes('Not Available')) socialData.href = social[1];

    socialInfo.appendChild(icon);
    socialInfo.appendChild(socialData);
    socialDiv.appendChild(socialInfo);

  });

  return socialDiv;

}

function createElement(tagName ,classname, content, pic){

  const element = document.createElement(tagName);
  element.classList.add(classname);

  if(pic === undefined && content !== undefined) element.innerText = content;
  else if(content === undefined && pic !== undefined) element.src = pic;

  return element;

}