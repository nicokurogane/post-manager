//TODO PUT VALIDATIONS AND PUT MESSAGES WHEN AN ACTION WAS IN ERROR OR SUCCESSFUL
import FormUI from "./ui/formui.js";
import Request from "./io/request.js";

const requestHandler = new Request();
const formHandler = new FormUI();

//de esta manera podemos buscar si se le ha pasado algun parametro a la pagina
let params = new URLSearchParams(location.search);
let idToEdit = params.get("id");


if (!idToEdit) {
  document.getElementById("btnEdit").style.display = "none";
  document.getElementById("screen-title").innerText="Create Post";
  formHandler.initFields(requestHandler);
} else {
  document.getElementById("btnCreate").style.display = "none";
  document.getElementById("screen-title").innerText="Edit Post";
  //extraemos el POST a modificar
  requestHandler.getPostById(idToEdit).then(post => {
    formHandler.initFieldsWithPost(requestHandler, post);
  });
}

document.getElementById("post-form").addEventListener("submit", e => {
  e.preventDefault();
  let postFormInput = formHandler.getPostFromInput();
  if(!formHandler.validateForm()) return;
  
  if (!idToEdit) {
    requestHandler.createPost(postFormInput).then(() => {
      location.replace("./index.html");
    });
  } else {
    requestHandler.editPost(postFormInput).then(() => {
      location.replace("./index.html");
    });
  }
});

