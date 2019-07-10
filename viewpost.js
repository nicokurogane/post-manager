import Request from "./io/request.js";
/*COSAS POR HACER
    0. extraer el id de los datos que se vaya a mostrar -- done
    1.HACER UN REQUEST A UN POST EN ESPECIFICO -- done
    2.PEGAR LOS DATOS PARA DICHO POST
*/

let titleElement = document.getElementById("title");
let subtitleElement = document.getElementById("subtitle");
let authorElement = document.getElementById("author");
let dateElement = document.getElementById("createDate");
let bodyElement = document.getElementById("body");
let tagsElement = document.getElementById("tags");

const requestHandler = new Request();

let params = new URLSearchParams(location.search);
let idToReview = params.get("id");

if (!idToReview) {
  console.log("NO VIENE EL ID.");
} else {
  requestHandler.getPostById(idToReview).then(post => {
    titleElement.innerText = post.title; //;
    subtitleElement.innerText = post.subTitle;
    dateElement.innerText = post.createDate;
    bodyElement.innerText = post.body;
    tagsElement.innerText = post.tags;

    requestHandler.getTags().then(tags => {
      getIncludedTagsNames(post.tags, tags);
    });

    requestHandler.getAuthorById(post.author).then(author =>{
        authorElement.innerText = author.name;
    });
  });
}


function getIncludedTagsNames(tags, poolTag) {
    let includedTags=[];
    tags.forEach(tagIdToCheck => {
        poolTag.forEach(tag =>{
            if(tag.id === tagIdToCheck){
                includedTags.push(tag.name);
            }
        })
    });

    tagsElement.innerText  = includedTags.toString();
}
