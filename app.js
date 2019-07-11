import Request from "./io/request.js";
import IndexUIRender from "./ui/indexuirender.js";
import PostList from "./ui/postlist.js";

let requestHandler = new Request();
let uiRenderHandler = new IndexUIRender();
let postList = new PostList();

function deletePost(id) {
  requestHandler.deletePostById(id).then(result => {
      window.location.reload();
    })
    .catch(err => console.log(err));
}

requestHandler.getLast3Posts()
  .then(array => {
    let lowestId = 0;
    array.forEach(element => {
      if (lowestId === 0 || element.id < lowestId) lowestId = element.id;
    });
    lowestId--; //quitamos uno por la manera de contar de la API para los limites del request
    uiRenderHandler.renderFeaturePosts(array, deletePost);
    return lowestId;
  })
  .then(id => {
    requestHandler.getPosts(0, id).then(array => {
      array = array.reverse();
      postList.posts = array;
      uiRenderHandler.renderOtherPost(array, deletePost);
    });
  });

//tag loading
requestHandler.getTags().then(tags => {
  uiRenderHandler.renderTagsList(tags);
});

document.getElementById("btn-filter-by-tag").addEventListener("click", e => {
  let filteredPost = postList.filterPostsByTags( uiRenderHandler.getFiltersTags() );
  uiRenderHandler.resetPostList();
  uiRenderHandler.renderOtherPost(filteredPost);
});

document.getElementById("post-title-search-form").addEventListener("submit", e => {
    e.preventDefault();
    let filter = document.getElementById("title-filter").value;
    requestHandler.getFilteredPost(filter).then(arrayPost => {
      uiRenderHandler.resetPostList();
      uiRenderHandler.renderOtherPost(arrayPost);
    });
});
