export default class HtmlRender {
  constructor() {
    this.featurePostContainer = document.getElementById("feature-post-container");
    this.postContainer = document.getElementById("post-container");
  }

  renderFeaturePosts(posts) {
    posts.forEach(post => {
      let newCard = `<div class="card">
            <img class="card-img-top" src="${post.image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.subTitle}</p>
              <a href="#">Go somewhere</a>
            </div>
          </div>`;
      const newDiv = document.createElement("div");
      newDiv.classList.add("col-sm-4");
      newDiv.innerHTML = newCard;
      this.featurePostContainer.appendChild(newDiv);
    });
  }

  renderOtherPost(posts) {
    posts.forEach(post => {
      let newCard = `<div class="card">
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.subTitle}</p>
            <a href="#">Go somewhere</a>
        </div>
        </div>`;
      const newDiv = document.createElement("div");
      newDiv.classList.add("col-sm-12");
      newDiv.innerHTML = newCard;
      this.postContainer.appendChild(newDiv);
    });
  }
}
