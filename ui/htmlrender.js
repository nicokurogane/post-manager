export default class HtmlRender {
  constructor() {
    this.featurePostContainer = document.getElementById("feature-post-container");
    this.postContainer = document.getElementById("post-container");
    this.tagsContainer = document.getElementById("tags-container");
    this.filterTagList = [];
  }

  renderFeaturePosts(posts, deleteFunction) {
    posts.forEach(post => {
      let newCard = `
        <div class="card">
          <img class="card-img-top" src="${post.image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.subTitle}</p>
            <a class="btn btn-success" href="./post.html?id=${post.id}">Edit Post</a>
          </div>
        </div>`;

      const newDiv = document.createElement("div");
      newDiv.classList.add("col-sm-4");
      newCard = new DOMParser().parseFromString(newCard, "text/html");

      const deleteIcon = document.createElement("a"); 
      deleteIcon.dataset.id = post.id;
      deleteIcon.classList.add("btn", "btn-danger");
      deleteIcon.innerText = "delete post";
      deleteIcon.addEventListener("click", e=>{
        deleteFunction(e.target.dataset.id);
      });

      newCard.querySelector(".card-body").appendChild(deleteIcon);
      newDiv.appendChild(newCard.documentElement);
      this.featurePostContainer.appendChild(newDiv);
    });
  }

  renderOtherPost(posts, deleteFunction) {
    posts.forEach(post => {
      let newCard = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.subTitle}</p>
            <a class="btn btn-success" href="./post.html?id=${
              post.id
            }">Edit Post</a>
          </div>
        </div>`;
      const newDiv = document.createElement("div");
      newDiv.classList.add("col-sm-12");
     
      newCard = new DOMParser().parseFromString(newCard, "text/html");
   

      const deleteIcon = document.createElement("a"); 
      deleteIcon.dataset.id = post.id;
      deleteIcon.classList.add("btn", "btn-danger");
      deleteIcon.innerText = "delete post";
      deleteIcon.addEventListener("click", e=>{
        deleteFunction(e.target.dataset.id);
      });
      
      newCard.querySelector(".card-body").appendChild(deleteIcon);
      newDiv.appendChild(newCard.documentElement);
      this.postContainer.appendChild(newDiv);
    });
  }

  resetPostList() {
    while (this.postContainer.firstChild) {
      this.postContainer.removeChild(this.postContainer.firstChild);
    }
  }

  renderTagsList(tags) {
    tags.forEach(tag => {
      const newTag = document.createElement("span");
      newTag.classList.add("tag");
      newTag.dataset.id = tag.id;
      newTag.innerText = tag.name;

      newTag.addEventListener("click", e => {
        if (e.target.classList.contains("selected")) {
          e.target.classList.remove("selected");
          let indexOfElement = this.filterTagList.indexOf(e.target.dataset.id);
          if (indexOfElement !== -1)
            this.filterTagList.splice(indexOfElement, 1);
        } else {
          e.target.classList.add("selected");
          this.filterTagList.push(e.target.dataset.id);
        }
      });

      this.tagsContainer.appendChild(newTag);
    });
  }

  /*
    Debido a que se extraen como Strings del html, se pasa map para transformar los id de nuevo a numeros
  */
  getFiltersTags() {
    return this.filterTagList.map(tag => Number(tag));
  }
}
