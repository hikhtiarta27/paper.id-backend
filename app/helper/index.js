const bcrypt = require('bcrypt')
/**
 * 
 * @param {String} date 
 * @returns 
 */
function dateToString(date){
  let x = new Date(date)    
  return x.toLocaleString()
}

/**
 * 
 * @param {String} email 
 * @returns 
 */
function isEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 * 
 * @param {String} password 
 * @returns 
 */
function hashPassword(password){  
  return bcrypt.hash(password, 10);
}

/**
 * 
 * @param {String} password 
 * @param {String} hashPassword 
 * @returns 
 */
function comparePassword(password, hashPassword){
  return bcrypt.compare(password, hashPassword)
}

/**
 * 
 * @param {String} phoneNumber 
 * @returns 
 */
function stringToPhoneNumber(phoneNumber){     
  return phoneNumber.replace(/\D+/g, '').replace(/(\d{4})(\d{4})(\d{2,})/, "$1-$2-$3");
}

/**
 * 
 * @param {Integer} amount 
 * @returns 
 */
function currencyFormatter(x){
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}


module.exports = {
  dateToString,
  isEmail,
  hashPassword,
  comparePassword,
  stringToPhoneNumber,
  currencyFormatter
}