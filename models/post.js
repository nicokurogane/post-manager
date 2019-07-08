export default class Post {
  constructor( id,title,subtitle,image,body,author,tags,createDate = new Date(),likes = 0) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.image = image;
    this.body = body;
    this.author = author;
    this.tags = tags;
    this.createDate = createDate;
    this.likes =like;
  }
}
