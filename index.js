const get = (className) => document.querySelector(`.${className}`);

// 돔 접근
const beforAmount = get("amount_input"); // 연봉
const KM = get("km"); // 국민연금
const KK = get("kk"); // 건강보험
const YY = get("yy"); // 요양보험
const KY = get("ky"); // 고용보험
const KR = get("kr"); // 근소소득세
const JB = get("jb"); // 지방소득세
console.log(beforAmount);

// 세금들
let year_amount = 0;
let _KM = 0;
let _KK = 0;
let _YY = 0;
let _KY = 0;
let _KR = 0;
let _JB = 0;

// 이벤트 생성
const YearCalculating = (e) => {
  year_amount = e.target.value / 12;
  console.log(year_amount);
  _KM = year_amount * 0.045;
  _KK = year_amount * 0.03495;
  _YY = _KK * 0.1227;
  _KY = year_amount * 0.009;
  _KR = 0;
  _JB = 0;

  console.log(_KM);
  console.log(_KK);
  console.log(_YY);
  console.log(_KY);
  console.log("====================");
};
const calculating = (e) => {
  YearCalculating(e);
};

// 이벤트 추가
beforAmount.addEventListener("input", (e) => calculating(e));
