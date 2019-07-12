export default class Request {
  constructor() {
    this.BASE_URL = "http://localhost:3000/";
  }

  async performRequest(url, options = {}) {
    let response = await fetch(url, options);
    let info = await response.json();
    return info;
  }

  getLast3Posts() {
    return this.performRequest(
      `${this.BASE_URL}posts?_sort=id&_order=desc&_limit=3`
    );
  }

  getPosts(lowerLimit, higestLimit) {
    return this.performRequest(
      `${this.BASE_URL}posts?_start=${lowerLimit}&_end=${higestLimit}`
    );
  }

  getTags() {
    return this.performRequest(`${this.BASE_URL}tags`);
  }

  getPostById(id) {
    return this.performRequest(`${this.BASE_URL}posts/${id}`);
  }

  getFilteredPost(filter, endPostId) {
    return this.performRequest(
      `${this.BASE_URL}posts?_start=0&_end=${endPostId}&title_like=${filter}`
    );
  }

  createPost(newPostData) {
    let options = {
      method: "POST",
      body: JSON.stringify(newPostData),
      headers: {
        "Content-Type": "application/json"
      }
    };

    return this.performRequest(`${this.BASE_URL}posts`, options);
  }

  editPost(editPostData) {
    let options = {
      method: "PUT",
      body: JSON.stringify(editPostData),
      headers: {
        "Content-Type": "application/json"
      }
    };
    return this.performRequest(
      `${this.BASE_URL}posts/${editPostData.id}`,
      options
    );
  }

  deletePostById(postIdToDelete) {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    return this.performRequest(
      `${this.BASE_URL}posts/${postIdToDelete}`,
      options
    );
  }

  getAuthors() {
    return this.performRequest(`${this.BASE_URL}authors`);
  }

  getAuthorById(authorId) {
    return this.performRequest(`${this.BASE_URL}authors/${authorId}`);
  }

  getCommentsByPostId(postId) {
    return this.performRequest(`${this.BASE_URL}comments?postId=${postId}`);
  }

  getAuthorsByIds(authorsIds) {
    let urlString = "?";
    authorsIds.forEach(element => {
      urlString += `id=${element}&`;
    });
    urlString = urlString.substring(0, urlString.length - 1);
    return this.performRequest(`${this.BASE_URL}authors/${urlString}`);
  }

  getUsersByIds(usersIds) {
    let urlString = "?";
    usersIds.forEach(element => {
      urlString += `id=${element}&`;
    });
    urlString = urlString.substring(0, urlString.length - 1);
    return this.performRequest(`${this.BASE_URL}users/${urlString}`);
  }
}
