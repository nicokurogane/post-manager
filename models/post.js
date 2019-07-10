export default class Post {
  constructor( id,title,subtitle,image,body,author,tags,createDate = new Date(),likes = 0) {
    this.id = id;
    this.title = title;
    this.subTitle = subtitle;
    this.image = image;
    this.body = body;
    this.author = author;
    this.tags = tags;
    this.createDate = createDate;
    this.likes =likes;
  }

  //this is the format it uses: YYYY/MM/DD
  formatPostDate(){
      const year = this.createDate.getFullYear().toString();
      const month = (this.createDate.getMonth()+1);
      const day = this.createDate.getDate();
      this.createDate = `${year}/${ this.addLeadingZeros(month)}/${this.addLeadingZeros(day)}`;
  }

  addLeadingZeros(numberToFormat){
    return numberToFormat<=9 ?  `0${numberToFormat}`: numberToFormat.toString(); 
  }
}
