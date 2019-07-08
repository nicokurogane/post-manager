import Request from "./io/request.js";
import HtmlRender from "./ui/htmlrender.js";

let requestHandler = new Request();
let htmlrenderHandler = new HtmlRender();

requestHandler.getLast3Posts().then(array=>htmlrenderHandler.renderFeaturePosts(array) );

requestHandler.getPosts().then(array=>htmlrenderHandler.renderOtherPost(array) );