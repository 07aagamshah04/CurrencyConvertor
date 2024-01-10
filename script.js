const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };

// It is base url to fetch current exchange rate from API
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

//Accesing select box of both From and To type
const dropDown1 = document.querySelector(".select1");
const dropDown2 = document.querySelector(".select2");

const btn = document.querySelector("form button");

const msg = document.querySelector(".msg");

//Firstly adding all items to dropdown list
for(options in countryList){
    let newOption1 = document.createElement("option");
    let newOption2 = document.createElement("option");

    newOption1.innerText = options;
    newOption1.value = options;
    newOption2.innerText = options;
    newOption2.value = options;

    if(newOption1.innerText === "USD"){
        newOption1.selected = "selected";
    }
    if(newOption2.innerText === "INR"){
        newOption2.selected = "selected";
    }

    dropDown1.append(newOption1);
    dropDown2.append(newOption2);
}

function updateFlag(ele) {
    let currencyCode = ele.value;

    let countryCode = countryList[currencyCode];

    let newSrcLink = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = ele.parentElement.querySelector("img");

    img.src = newSrcLink;
}

// Async baanyu kemke andar fetch karva await karvu pdee soo..
async function updateExchangeRate() {
    let input_type = document.querySelector(".amount input");

    let value = input_type.value;

    if(value === "" || value < 1){
        alert("Please dont't leave space empty or don't enter negative value");
        input_type.value = "1";
        value = 1;
    }    

    let currency1 = dropDown1.value.toLowerCase();
    let currency2 = dropDown2.value.toLowerCase();

    const URL = `${BASE_URL}/${currency1}/${currency2}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[currency2];
    
    let finalAmt = (rate*value);

    msg.innerText = `${value} ${dropDown1.value} = ${finalAmt} ${dropDown2.value}`;
}

dropDown1.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});

dropDown2.addEventListener("change", (evt) => {
    // evt.preventDefault();
    updateFlag(evt.target);
});


btn.addEventListener("click" , (evt) => {
    //jyarey koi pn form submit thay to pachi ee reload thay and e bdhu thay so e rokva niche valli line lkhi che
    evt.preventDefault();

    updateExchangeRate();

});

//Page load thay evu tarta update thse
window.addEventListener("load", () => {
    updateExchangeRate();
});