import HtmlRender from "../ui/htmlrender.js";

export default class Request{
    
    constructor(){
        this.BASE_URL = "http://localhost:3000/";
    }

    async performRequest(url){
        let response = await fetch(url);
        let info = await response.json();
        return info;
    }

    //devolverun array con los datos
    getLast3Posts(){
        return this.performRequest(`${this.BASE_URL}posts?_sort=id&_order=desc&_limit=3`);
    }

  /*  getPosts(){
        return this.performRequest(`${this.BASE_URL}posts?_sort=id&_order=desc`);
    }*/

    getPosts(lowerLimit, higestLimit){
        return this.performRequest(`${this.BASE_URL}posts?_start=${lowerLimit}&_end=${higestLimit}`);
    }

    getTags(){
        return this.performRequest(`${this.BASE_URL}tags`);
    }
} 