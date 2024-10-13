"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const dzialanie = document.querySelector("#dzialanie");
  const wynik = document.querySelector("#wynik");
  const przyciski = document.querySelectorAll(".przycisk");
  const podajWynik = document.querySelector("#przedmiot_wynik");
  let kolejka_wyjsciowa = [];
  let stos_operatorow = [];

  przyciski.forEach((element) => {
    element.addEventListener("click", () => {
      if (dzialanie && dzialanie.textContent === "1+2+3") {
        dzialanie.textContent = element.value;
      } else {
        dzialanie.textContent += element.value;
      }
      if (czyLiczba(element.value)) {
        kolejka_wyjsciowa.push(element.value);
      } else {
        const poprzedni = stos_operatorow.length - 1;
        const obecny = stos_operatorow.length;
        stos_operatorow.push(element.value);

        let znak = element.value;
        if (znak === "-" || znak === "+") {
          if (
            stos_operatorow[poprzedni] === "*" ||
            stos_operatorow[poprzedni] === "/"
          ) {
            znak = stos_operatorow[poprzedni];
            stos_operatorow.splice(poprzedni, 1);
            kolejka_wyjsciowa.push(znak);
          }
        }
        switch (znak) {
          case "/":
            if (stos_operatorow[poprzedni] === "*") {
              znak = stos_operatorow[poprzedni];
              kolejka_wyjsciowa.push(znak);
              stos_operatorow.splice(poprzedni, 1);
            }
            break;
          case "*":
            if (stos_operatorow[poprzedni] === "/") {
              znak = stos_operatorow[poprzedni];
              kolejka_wyjsciowa.push(znak);
              stos_operatorow.splice(poprzedni, 1);
            }
            break;
          case "+":
            if (stos_operatorow[poprzedni] === "-") {
              znak = stos_operatorow[poprzedni];
              stos_operatorow.splice(poprzedni, 1);
              kolejka_wyjsciowa.push(znak);
            }
            break;
          case "-":
            if (stos_operatorow[poprzedni] === "+") {
              znak = stos_operatorow[poprzedni];
              stos_operatorow.splice(poprzedni, 1);
              kolejka_wyjsciowa.push(znak);
            }
            break;
        }
      }
      console.log(`Kolejka: ${kolejka_wyjsciowa}`);
      console.log(`Stos: ${stos_operatorow}`);
    });
  });
  podajWynik.addEventListener("click", () => {
    let wektor = [];
    let rozmiar = stos_operatorow.length;

    for (let i = 0; i < rozmiar; i++) {
      wektor.push(stos_operatorow[i]);
    }

    let i = 0;
    while (i < wektor.length - 1) {
      if (
        (wektor[i] === "+" && wektor[i + 1] === "/") ||
        (wektor[i] === "-" && wektor[i + 1] === "/") ||
        (wektor[i] === "+" && wektor[i + 1] === "*") ||
        (wektor[i] === "-" && wektor[i + 1] === "*")
      ) {
        const temp = wektor[i];
        wektor[i] = wektor[i + 1];
        wektor[i + 1] = temp;
        i = 0; // Zresetuj wartość i do 0
      } else {
        i++; // Przejdź do kolejnego elementu
      }
    }
    console.log(`Wektor: ${wektor}`);
    for (let i = 0; i < rozmiar; i++) {
      kolejka_wyjsciowa.push(wektor[i]);
    }
    wektor = [];
    stos_operatorow = [];
    console.log(`Kolejka gotowa: ${kolejka_wyjsciowa}`);

    let nowy_stos = [];
    let dzialanie = [];
    for (let i = 0; i < kolejka_wyjsciowa.length; i++) {
      let znak = kolejka_wyjsciowa[i];
      console.log(`znak: ${znak}`);
      if (znak >= 0 && znak <= 9) {
        nowy_stos.push(znak);
      }
      if (znak === "+" || znak === "-" || znak === "*" || znak === "/") {
        dzialanie[0] = Number(nowy_stos[nowy_stos.length - 2]);
        dzialanie[1] = Number(nowy_stos[nowy_stos.length - 1]);
        nowy_stos.splice(nowy_stos.length - 2, 2);
        switch (znak) {
          case "+":
            dzialanie[2] = "+";
            nowy_stos.push(dzialanie[0] + dzialanie[1]);
            break;
          case "-":
            dzialanie[2] = "-";
            nowy_stos.push(dzialanie[0] - dzialanie[1]);
            break;
          case "*":
            dzialanie[2] = "*";
            nowy_stos.push(dzialanie[0] * dzialanie[1]);
            break;
          case "/":
            dzialanie[2] = "/";
            nowy_stos.push(dzialanie[0] / dzialanie[1]);
            break;
        }
        console.log(dzialanie);
      }
      console.log(`Nowy stos: ${nowy_stos}`);
    }
    wynik.textContent = nowy_stos;
  });
});

const czyLiczba = (znak) => {
  if (znak >= 0 && znak <= 9) {
    return true;
  }
};
