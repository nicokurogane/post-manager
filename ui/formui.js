import Post from "../models/post.js";


/*
this class handles all the elements for the form which yuo can create o edit post
*/
export default class FormUI {
    constructor() {
        this.titleInput = document.getElementById("title");
        this.subtitleInput = document.getElementById("subtitle");
        this.imageInput = document.getElementById("image");
        this.authorInput = document.getElementById("author");
        this.bodyInput = document.getElementById("body");
        //   this.titleInput = document.getElementById("tags"); // TO-DO: ASK LATER FOR THE TAGS
    }

    //devuelve un objeto Post a partir de los datos ingresados por el usuario
    getPostFromInput() {
        let newPost =new Post(0, this.titleInput.value, this.subtitleInput.value, this.imageInput.value,
            this.bodyInput.value, this.authorInput.value, [2, 3]);
        newPost.formatPostDate();
        return newPost;    
    }


}