
export class GitHubAccount{

  #userData;

  constructor(account){
    this.#userData = account;
  }

  getUserName(){
    return this.#userData.name === null ? this.#userData.login : this.#userData.name;
  }

  getAvatar(){
    return this.#userData.avatar_url;
  }

  getBio(){
    return this.#userData.bio === null ? 'This profile has no bio' : this.#userData.bio;
  }

  getFollowers(){
    return this.#userData.followers;
  }

  getFollowing(){
    return this.#userData.following;
  }

  getRepos(){
    return this.#userData.public_repos;
  }

  getJoinDate(){
    return (new Date(this.#userData.created_at).toDateString());
  }

  getLocation(){
    return this.#userData.location === null ? "Not Available" : this.#userData.location;
  }

  getTwiterUsername(){
    return this.#userData.twitter_username === null ? "Not Available" : this.#userData.twitter_username;
  }

  getCompanyName(){
    return (this.#userData.company) === null ? "Not Available" : this.#userData.company;
  }

  getBlog(){
    return this.#userData.blog === "" ? "Not Available" : this.#userData.blog;
  }
}