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
        //   this.titleInput = document.getElementById("tags"); // TO-DO: ASK LATER FOR THE TAGS
    }

    //devuelve un objeto Post a partir de los datos ingresados por el usuario
    getPostFromInput() {
        let newPost =new Post(0, this.titleInput.value, this.subtitleInput.value, this.imageInput.value,
            this.bodyInput.value, this.authorInput.value, [2, 3]);
        newPost.formatPostDate();
        return newPost;    
    }

    getPostFromInputEdit() {
        let newPost =new Post(this.idInput.value, this.titleInput.value, this.subtitleInput.value, this.imageInput.value,
            this.bodyInput.value, this.authorInput.value, this.tagsInput.value.split(","));
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

}