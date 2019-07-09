import Request from "./io/request.js";
import HtmlRender from "./ui/htmlrender.js";

let requestHandler = new Request();
let htmlrenderHandler = new HtmlRender();

/**
 * TO-DO: ASK GERARDO ABOUT SIMPLIFYING THIS MESS WITH THE QUERY TO THE ENDPOINT... 
*/
requestHandler.getLast3Posts().then(array=>{
    let lowestId = 0;
    array.forEach(element => {
        if(lowestId === 0 || element.id < lowestId) lowestId = element.id;
    });
    lowestId--;
    htmlrenderHandler.renderFeaturePosts(array); 
    return lowestId;
}).then(id => {
    requestHandler.getPosts(0,id).then(array=>{
        array = array.reverse();
        htmlrenderHandler.renderOtherPost(array);
    });
});

