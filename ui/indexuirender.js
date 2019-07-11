export default class IndexUIRender {
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
            <a class="btn btn-primary" href="./view_post.html?id=${post.id}">Check Post</a>
            <a class="btn btn-success" href="./post.html?id=${post.id}">Edit Post</a>          
          </div>
        </div>`;

      newCard = new DOMParser().parseFromString(newCard, "text/html");

      const deleteIcon = document.createElement("a"); 
      deleteIcon.dataset.id = post.id;
      deleteIcon.classList.add("btn", "btn-danger");
      deleteIcon.innerText = "delete post";
      deleteIcon.addEventListener("click", e=>{
        deleteFunction(e.target.dataset.id);
      });

      newCard.querySelector(".card-body").appendChild(deleteIcon);

      const newDiv = document.createElement("div");
      newDiv.classList.add("col-sm-4");
      newDiv.appendChild(newCard.documentElement);
      this.featurePostContainer.appendChild(newDiv);
    });
  }

  renderOtherPost(posts, deleteFunction) {
    posts.forEach(post => {
      let divConfirmationId = `post-${post.id}`;
      let newCard = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.subTitle}</p>
            <a class="btn btn-primary" href="./view_post.html?id=${post.id}">Check Post</a>
            <a class="btn btn-success" href="./post.html?id=${post.id}">Edit Post</a>            
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
        let postId = e.target.dataset.id; 
        document.getElementById(divConfirmationId).classList.add("show");
      });
      
      newCard.querySelector(".card-body").appendChild(deleteIcon);

      this.createDeleteConfirmation( newCard.querySelector(".card-body"), divConfirmationId,deleteFunction,post.id );
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

  /*creates a div inside the div containing the post info*/
  createDeleteConfirmation(postDiv, divId, deleteFunction, postId){
    const newDiv = document.createElement("div");
    newDiv.id = divId;
    newDiv.classList.add("col-sm-12","confirmation-message");

    let message = `<div>Are you sure you want to delete this post?</div>`;
    message = new DOMParser().parseFromString(message, "text/html");

    let deleteButton = document.createElement("button");
    deleteButton.dataset.id = postId;
    deleteButton.classList.add("btn","btn-danger");
    deleteButton.innerText = "delete post";
    deleteButton.addEventListener("click",e=>{
        deleteFunction(e.target.dataset.id);
        window.location.reload();
    });

    let cancelButton= document.createElement("button");
    cancelButton.classList.add("btn","btn-secondary");
    cancelButton.innerText = "cancel";
    cancelButton.addEventListener("click", e=>{
      document.getElementById(divId).classList.remove("show");
    });


    newDiv.appendChild(message.documentElement);
    newDiv.appendChild(cancelButton);
    newDiv.appendChild(deleteButton);

    postDiv.appendChild(newDiv);
  }


}
