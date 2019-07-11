import Post from "../models/post.js";

/*
this class handles all the elements for the form which yuo can create o edit post
*/
export default class FormUI {
    constructor() {
        this.idInput = document.getElementById("postId");
        this.titleInput = document.getElementById("title");
        this.subtitleInput = document.getElementById("subtitle");
        this.imageInput = document.getElementById("image");
        this.authorInput = document.getElementById("author");
        this.bodyInput = document.getElementById("body");
        this.tagsInput = document.getElementById("tags");//test only change later
        this.tagsContainer =document.getElementById("tags-container");
        this.selectedTagsContainer = document.getElementById("selected-tags");
        this.filterTagList=[];
    }

    initFields(requestHandler){
        requestHandler.getAuthors().then(authors =>{
            authors.forEach(author => {
                let newOption = document.createElement("option");
                newOption.value = author.id;
                newOption.innerHTML = `${author.name} ${author.lastName}`;
                this.authorInput.appendChild(newOption);
            });
        });

        requestHandler.getTags().then(tags =>{
            this.renderTagsList(tags);
        });
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

              let elementToDelete = this.filterTagList.find(tag =>{
                  if(tag.id == e.target.dataset.id)
                  return tag;
              });
               if (elementToDelete!== 'undefined')
                 this.filterTagList.splice(elementToDelete, 1);
                 console.log(this.filterTagList);
                
            } else {
              e.target.classList.add("selected");
              this.filterTagList.push(tag);
            }
            console.log(this.filterTagList);
            this.showSelectedTags();
          });
    
          this.tagsContainer.appendChild(newTag);
        });
      }


    //devuelve un objeto Post a partir de los datos ingresados por el usuario
    getPostFromInput() {
        let selectedTags = this.filterTagList.map(tag =>{ return tag.id});
        let selectedAuthorId = this.authorInput.value;
        let newPost =new Post(0, this.titleInput.value, this.subtitleInput.value, this.imageInput.value,
            this.bodyInput.value, selectedAuthorId, selectedTags);
        newPost.formatPostDate();
        return newPost;    
    }

    setPostDataToEdit(post){
        this.idInput.value = post.id;
        this.tagsInput.value = post.tags;
        this.titleInput.value = post.title;
        this.subtitleInput.value = post.subTitle;
        this.imageInput.value = post.image;
        this.bodyInput.value = post.body;
        this.authorInput.value = post.author; 
        console.log(this.tagsInput.value.split(","));
    }

    showSelectedTags(){
        let tagNames = [];
        this.selectedTagsContainer.innerHTML="";
        this.filterTagList.forEach(tagObject =>{
            tagNames.push( tagObject.name);
        });
        if(tagNames.length === 0){
            this.selectedTagsContainer.innerHTML ="";
        }else{
        this.selectedTagsContainer.innerHTML = tagNames.toString();
        }
    }

}