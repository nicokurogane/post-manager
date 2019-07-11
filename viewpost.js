import Request from "./io/request.js";

let titleElement = document.getElementById("title");
let subtitleElement = document.getElementById("subtitle");
let authorElement = document.getElementById("author");
let dateElement = document.getElementById("createDate");
let bodyElement = document.getElementById("body");
let tagsElement = document.getElementById("tags");
let imageElement = document.getElementById("post-image");
let commentContainer = document.getElementById("comment-container");

const requestHandler = new Request();

let params = new URLSearchParams(location.search);
let idToReview = params.get("id");

if (idToReview) {
  requestHandler.getPostById(idToReview).then(post => {
    titleElement.innerText = post.title;
    subtitleElement.innerText = post.subTitle;
    dateElement.innerText = post.createDate;
    bodyElement.innerText = post.body;
    tagsElement.innerText = post.tags;
    imageElement.src = post.image;

    requestHandler.getTags().then(tags => {
      getIncludedTagsNames(post.tags, tags);
    });

    requestHandler.getAuthorById(post.author).then(author => {
      authorElement.innerText = author.name;
    });
  });

  requestHandler.getCommentsByPostId(idToReview).then(comment => {
    comment.forEach(individualComment => {
      let newDivComment = `
      <span class="author-comment" data-id=${individualComment.id}></span>
      <p>${individualComment.comment}</p>`;
      const newDiv = document.createElement("div");
      newDiv.classList.add("comment");
      newDiv.innerHTML = newDivComment;
      commentContainer.appendChild(newDiv);      
    });

    let usersPlaceholders = Array.from(document.getElementsByClassName("author-comment"));
    let authorsIds = [];
    usersPlaceholders.forEach(placeholder =>{
      authorsIds.push(placeholder.dataset.id);
    });

    requestHandler.getUsersByIds(authorsIds).then(users =>{
      updateUsersPlaceHolders(usersPlaceholders, users);
    });
  });
}

function getIncludedTagsNames(tags, poolTag) {
  let includedTags = [];
  tags.forEach(tagIdToCheck => {
    poolTag.forEach(tag => {
      if (tag.id === tagIdToCheck) {
        includedTags.push(tag.name);
      }
    });
  });

  tagsElement.innerText = includedTags.toString();
}

function updateUsersPlaceHolders(placeholders, authors){
  authors.forEach(author => {
    placeholders.forEach(placeholder=>{
        if(placeholder.dataset.id == author.id){
          placeholder.innerText = author.name;
        }
    }); 
  });
}
