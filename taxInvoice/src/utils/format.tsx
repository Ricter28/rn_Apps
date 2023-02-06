import moment from "moment";

const md5 = require("md5");
const key = "76f4ac2d-f221-4927-bcad-c4de8dd16075";
const checkPhone = (phone: string) => {
  let checkPhone = /(0[3|5|7|8|9])([0-9]{8})\b/g;
  let regex = phone.match(checkPhone); //  các đầu số của các nhà mạng di dộng của Việt Nam
  if (regex) return true;
  return false;
};
const isNumeric = /^\d+$/;
const formatMoney = (
  money: number | string,
  defaultValue?: number | string
) => {
  if (money !== 0 && !money) return defaultValue ?? "0";
  return `${money}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
const formatPhone = (phone: string) => {
  if (!phone) return "";
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
};
function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function checkUriImage(uri: string) {
  if (uri && uri.includes("http")) return uri;
  return "";
}
function change_alias(alias: string) {
  var str = alias || "";
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str;
}
function detectAccumulatePoints(item: {
  accumlatePointType: string;
  valueAccumulatePoints: number;
  paymentCash: number;
  percentAccumlatePoints: number;
}) {
  switch (item.accumlatePointType) {
    case "value":
      return formatMoney(item.valueAccumulatePoints);
    case "percent":
      return formatMoney(item.percentAccumlatePoints * item.paymentCash * 0.01);
    default:
      return "";
  }
}
function detectPriceVoucher(voucherInfo: {
  payment: any;
  paymentPoint: any;
  paymentCash: any;
}) {
  switch (voucherInfo.payment) {
    case "both":
      return formatMoney(voucherInfo.paymentPoint) + " mPoint | VNĐ";
    case "free":
      return "Miễn Phí";
    case "point":
      return formatMoney(voucherInfo.paymentPoint) + " Điểm";
    case "online":
      return formatMoney(voucherInfo.paymentCash) + " VNĐ";
    case "cash":
      return formatMoney(voucherInfo.paymentCash) + ` mPoint | VNĐ`;
    default:
      null;
  }
}
function calculatePercent(current: number, origin: number) {
  if (current === origin) return "-0%";
  let persent = ((origin - current) / origin) * 100;
  let fix = Math.round(persent);
  // return `( -${fix}% )`;
  return `-${fix}%`;
}
function hash(phone: string) {
  return md5(phone + moment().format("DD-MM-YYYY") + key);
}
export {
  checkPhone,
  formatMoney,
  formatPhone,
  validateEmail,
  checkUriImage,
  isNumeric,
  change_alias,
  detectAccumulatePoints,
  detectPriceVoucher,
  calculatePercent,
  hash,
};
