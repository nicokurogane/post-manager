import Request from "./io/request.js";
import HtmlRender from "./ui/htmlrender.js";
import PostList from "./ui/postlist.js";

let requestHandler = new Request();
let htmlrenderHandler = new HtmlRender();
let postList = new PostList();

/**
 * TO-DO: ASK GERARDO ABOUT SIMPLIFYING THIS MESS WITH THE QUERY TO THE ENDPOINT... 
*/
requestHandler.getLast3Posts().then(array => {
    let lowestId = 0;
    array.forEach(element => {
        if (lowestId === 0 || element.id < lowestId) lowestId = element.id;
    });
    lowestId--;//quitamos uno por la manera de contar de la API para los limites del request
    htmlrenderHandler.renderFeaturePosts(array);
    return lowestId;
}).then(id => {
    requestHandler.getPosts(0, id).then(array => {
        array = array.reverse();
        postList.posts = array; //refactor this to a method if possible
        htmlrenderHandler.renderOtherPost(array);
    });
});

//tag loading
requestHandler.getTags().then(tags => {
    htmlrenderHandler.renderTagsList(tags);
});


document.getElementById("btn-filter-by-tag").addEventListener("click", e=>{
    let filteredPost = postList.filterPostsByTags( htmlrenderHandler.getFiltersTags() );
    htmlrenderHandler.resetPostList();
    htmlrenderHandler.renderOtherPost(filteredPost);
});