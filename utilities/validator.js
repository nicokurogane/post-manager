export default  class Validator {
    static isStringEmpty(stringToCheck) {
      return stringToCheck === "";
    }
  
    static isStringAboveLengthLimit(length, stringToCheck) {
      return stringToCheck.length > length;
    }

    static isTagsArraysEmpty(array){
        return array.length === 0; 
    }
  
  }
  