'use strict';

///////////////////////////////////////

// Synchronous;
// const p = document.querySelector('.p');
// p.textContent = 'My name is Sammy!';
// alert('Text set!');
// p.style.color = 'red';

// Asynchronous;
// const p = document.querySelector('p');
// setTimeout(function () {
//   p.textContent = 'My name is Sammy!';
// }, 5000);
// p.style.color = 'red';

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// 1번째 국가 데이터와 인접 국가 데이터를 '모두' 가져온 후에야 함수가 발동하도록 하기 위해서
// 밑에 있던 html 변수를 따로 빼어와서 변수 renderCountry로 선언.
// 인접국가는 작게 표현하기 위해, 인접국가는 호출 시 className 인자를 하나 더 넘김.
// 그래야 country neighbour CSS를 쓸 수 있기 때문.
const renderCountry = function (data, className = '') {
  // 서버에서 가져온 데이터를 HTML에서 짠 구조에 맞춰 넣기
  // 데이터 객체의 속성값을 활용
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${
        // 문자열인 data.population을 +로 숫자열로 만들고, 1000000으로 나눔. toFixed(1)로 소수점 1자리까지만.
        (+data.population / 1000000).toFixed(1)
      }${' mil'}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
  // 위에서 작성한 html 텍스트를 (원래 계획한 형태에 맞춰서) 페이지에 삽입
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // CSS에 작성했던 스타일 적용
  //   countriesContainer.style.opacity = 1;
};

// // fetch 에러에 대한 함수
// // insertAdjacentHTML과 문법은 같은데, HTML 대신 text를 ‘문자 그대로’ 삽입
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   //   countriesContainer.style.opacity = 1;
// };

// // // 포르투갈 외에 다른 국가들 정보도 편하게 가져올 함수 작성
// // const getCountryDataAndNeighbour = function (country) {
// //   // AJAX call country 1
// //   const request = new XMLHttpRequest(); // request라는 XML 객체 생성
// //   // 편하게 다른 국가 이름만 집어넣어도 작동하도록, ${국가명}으로 수정. ` ` 주의할 것!
// //   request.open('GET', `https://restcountries.com/v2/name/${country}`); //restcountries라는 서버를 가져오고, 초기화
// //   request.send(); // 서버로 요청 전송

// //   // XML 객체에 로딩 이벤트 생성
// //   request.addEventListener('load', function () {
// //     // 로딩 완료 후, 서버에서 받아온 텍스트 형식의 데이터를 JSON식으로 변환
// //     // []로 감싸서 반환된 객체를 디스트럭처링
// //     const [data] = JSON.parse(this.responseText);
// //     console.log(data);

// //     // Render country 1
// //     renderCountry(data);

// //     // neighbor은 country1가 실행되어야만 실행된다.
// //     // country 1 data에서 border(인접국가) 속성을 찾고, 이를 neighbor 함수로 선언
// //     const [neighbour] = data.borders;

// //     // 인접국가가 없다면, 바로 리턴
// //     if (!neighbour) return;

// //     // AJAX call country 2
// //     // 위에서 return된 neighbour 변수로 인접국가 데이터 XML 객체 생성 및 JSON 변환
// //     const request2 = new XMLHttpRequest();
// //     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
// //     request2.send();
// //     request2.addEventListener('load', function () {
// //       const data2 = JSON.parse(this.responseText);
// //       console.log(data2);
// //       renderCountry(data2, 'neighbour');
// //     });
// //   });
// // };

// // // 원하는 국가정보 불러오는 함수 호출
// // getCountryDataAndNeighbour('usa');

// const getCountryData = function (country) {
//   // Country 1
//   // fetch로 서버에 네트워크 요청을 보내고, 승낙 시 실행될 promise를 반환
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     // (승낙 시), 받아온 데이터를 json 양식으로 반환하고,
//     .then(respond => respond.json())
//     // 반환된 값을 인자로 renderCountry 함수를 호출
//     .then(data => {
//       renderCountry(data[0]);
//       // 인접국가 변수 선언
//       const neighbour = data[0].borders?.[0];
//       // 인접국가 없으면 그대로 Country 1 반환
//       if (!neighbour) return;

//       // Country 2
//       // (인접국가 있으면) 인접국가 요청 보내고, promise 반환
//       // 반드시 return 먼저 할 것
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     // (승낙 시), 받아온 데이터를 json 양식으로 반환하고,
//     .then(response => response.json())
//     // 반환된 값을 인자로 renderCountry 함수를 호출
//     .then(data => renderCountry(data, 'neighbour'))
//     // fetch 실패 시, 에러에 대한 함수
//     .catch(err => {
//       // 에러메세지를 콘솔창에 띄우고
//       console.error(`${err} ⚠️⚠️⚠️`);
//       // renderError를 호출하며, 문자열을 인자로 전달
//       renderError(`Something went wrong 🥲🥲 ${err.message}. Try again!`);
//     })
//     // fetch가 승인되든 실패되든 상관없이 실행되는 함수
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('123ㅇㄹㅍㅁㄴㅇㄹㅊ');

// // Async
// const whereAmI = async function (country) {
//   // fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
//   //   console.log(res)
//   // );

//   const res = await fetch(`https://restcountries.com/v2/name/${country}`);
//   const data = await res.json();
//   // renderCountry(data[0]);
// };

// whereAmI('portugal');
// console.log('First');

// let json = '{ "age": 30 }'; // 불완전한 데이터

// try {
//   let user = JSON.parse(json); // <-- 에러 없음

//   if (!user.name) {
//     throw new SyntaxError('불완전한 데이터: 이름 없음'); // (*)
//   }

//   alert(user.name);
// } catch (e) {
//   alert('JSON Error: ' + e.message); // JSON Error: 불완전한 데이터: 이름 없음
// }

function timer(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}
// console.log('start');
// timer(1000)
//   .then(function (time) {
//     console.log('time' + time);
//     return timer(time + 1000);
//   })
//   .then(function (time) {
//     console.log('time' + time);
//     return timer(time + 1000);
//   })
//   .then(function (time) {
//     console.log('time' + time);
//     console.log('end');
//   });

const run = async function () {
  console.log('start');
  let time = await timer(1000);
  console.log('time:' + time);
  time = await timer(time + 1000);
  console.log('time:' + time);
  time = await timer(time + 1000);
  console.log('time:' + time);
  console.log('end');
};

run();
