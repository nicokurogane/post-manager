//TODO PUT VALIDATIONS AND PUT MESSAGES WHEN AN ACTION WAS IN ERROR OR SUCCESSFUL
import FormUI from "./ui/formui.js"
import Request from "./io/request.js";


const requestHandler = new Request();
const formHandler = new FormUI();

//create functionality
document.getElementById("post-form").addEventListener("submit", e=>{
    e.preventDefault();
    let postFormInput  = formHandler.getPostFromInput();
    console.log(postFormInput);
    requestHandler.createPost(postFormInput);
    
});




