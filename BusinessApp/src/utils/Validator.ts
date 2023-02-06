const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;

export const isEmail = (email: string) => {
  return emailRegex.test(email);
};

export const isPhoneNumber = (phoneNumber: string) => {
  return phoneRegex.test(phoneNumber);
};
