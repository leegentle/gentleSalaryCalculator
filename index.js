import getKR from "./data.js";

const get = (className) => document.querySelector(`.${className}`);

// 돔 접근
const $BEFOREAMOUNT = get("amount_input"); // 연봉
const $KM = get("km"); // 국민연금
const $KK = get("kk"); // 건강보험
const $YY = get("yy"); // 요양보험
const $KY = get("ky"); // 고용보험
const $KR = get("kr"); // 근소소득세
const $JB = get("jb"); // 지방소득세
const $TAXFREE = get("tax_free"); // 비과세
const $DEPENDENTFAMILY = get("dependent_family"); // 부양가족 수
const $UNDER20 = get("under20"); // 20세 이하 자녀 수
const $AFTERMONTHSAL = get("after_month_sal"); // 세후월급
const $BEFOREMONTHSAL = get("before_month_sal"); // 세전월급
const $TOTALTAX = get("total_tax"); // 합계

// 값
let _BEFOREAMOUNT = 0;
let _TAXFREE = 0;
let _DEPENDENTFAMILY = 1;
let _UNDER20 = 0;

// 숫자 입력 확인
const checkNumber = (num, $el) => {
  const check = num > -1;
  if (!check) $el.value = num.substr(0, num.length - 1);
  return check;
};

// 연봉 입력
const yearInput = (e) => {
  const val = e.target.value;
  const check = checkNumber(val, $BEFOREAMOUNT);
  if (!check) return;

  _BEFOREAMOUNT = val * 10000;
  calculating();
};

// 비과세 입력
const taxFreeInput = (e) => {
  const val = e.target.value;
  const check = checkNumber(val, $TAXFREE);
  if (!check) return;
  _TAXFREE = val;
  calculating();
};

// 부양가족 수 입력
const depInput = (e) => {
  const val = e.target.value;
  const check = checkNumber(val, $DEPENDENTFAMILY);
  if (!check) return;
  _DEPENDENTFAMILY = val;
  calculating();
};
// 20세이하 자녀 수 입력
const under20Input = (e) => {
  const val = e.target.value;
  const check = checkNumber(val, $UNDER20);
  if (!check) return;
  _UNDER20 = val;
  calculating();
};
// 1의자리수 버리고 컴마찍기
const floor = (number) => {
  return Math.floor(number / 10) * 10; // 1의자리수 버리기
};

const comma = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 컴마찍기
};

// 세금 계산
const calculating = () => {
  const month_amount = floor(_BEFOREAMOUNT / 12);
  if (month_amount === 0) return;

  const realMonthAmount = month_amount - _TAXFREE;
  const KMBoundery = (sal) => {
    if (sal < 350000) {
      return 350000;
    } else if (sal > 5530000) {
      return 5530000;
    } else {
      return sal;
    }
  };
  const _KM = floor(KMBoundery(realMonthAmount) * 0.045);
  const _KK = floor(realMonthAmount * 0.03495);
  const _YY = floor(_KK * 0.1227);
  const _KY = floor(realMonthAmount * 0.009);
  const _KR = floor(getKR(realMonthAmount, _DEPENDENTFAMILY, _UNDER20));
  const _JB = floor(_KR * 0.1);
  const TOTALTAX = floor(_KM + _KK + _YY + _KY + _KR + _JB);
  const AFTERMONTHSAL = floor(month_amount - TOTALTAX);

  $KM.innerHTML = comma(_KM);
  $KK.innerHTML = comma(_KK);
  $YY.innerHTML = comma(_YY);
  $KY.innerHTML = comma(_KY);
  $KR.innerHTML = comma(_KR);
  $JB.innerHTML = comma(_JB);
  $TOTALTAX.innerHTML = comma(TOTALTAX);
  $AFTERMONTHSAL.innerHTML = comma(AFTERMONTHSAL);
  $BEFOREMONTHSAL.innerHTML = comma(month_amount);
};

// 이벤트 추가
$BEFOREAMOUNT.addEventListener("input", (e) => yearInput(e));
$TAXFREE.addEventListener("input", (e) => taxFreeInput(e));
$DEPENDENTFAMILY.addEventListener("input", (e) => depInput(e));
$UNDER20.addEventListener("input", (e) => under20Input(e));
