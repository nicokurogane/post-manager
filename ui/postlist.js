


export default class PostList {
    constructor() {
        this.posts = [];
    }

    /*
        returns Filtered Posts
    */
    filterPostsByTags(tags) {      
        let filteredPost = [];

        if(tags.lenght === 0)  return this.posts;   

        this.posts.forEach(post => {
            let numberOfMatchingTags = 0;
            tags.forEach(tag => {
                if (post.tags.includes(tag))  numberOfMatchingTags++;                
            });

            if(numberOfMatchingTags > 0) filteredPost.push(post); 
        });

        return filteredPost;
    }

}