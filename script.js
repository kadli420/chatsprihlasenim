
function obnovZpravy() {
  let url = "https://nodejs-3260.rostiapp.cz/chat/listMsgs";
  let body = {};
  body.token = token;
  body.chat = "ida8c4761e5eace3cf3b1551b7421870"
  let opt = { method: "POST", body: JSON.stringify(body) };
  fetch(url, opt)
    .then(response => response.json())
    .then(data => {
      let s = "";
      for (let m of data) {
        s += `<span style="font-size:75%; color:#aaaaaa">${m.time} ${m.user}</span><br>${m.msg}<br>`;
      }
      document.getElementById("zpravy").innerHTML = s;
    });
    
}

function odesliZpravu(){

  let url = "https://nodejs-3260.rostiapp.cz/chat/addMsg";
  let body = {};
  body.token = token;
  body.chat = "ida8c4761e5eace3cf3b1551b7421870"
  body.msg = document.getElementById("zprava").value;
  let opt = { method: "POST", body: JSON.stringify(body) };
   fetch(url, opt)
   .then(respone => sresponse.json())
    .then(data => {
    document.getElementById("prezdivka").readOnly = true;
    document.getElementById("zprava").value = "";
    });

}

function ukazChybu(s) {
  document.getElementById("div_chyba").innerHTML = s;
}

function registrovat() {
  const URL_registrace = "https://nodejs-3260.rostiapp.cz/users/registry";
  let prijmeno = document.getElementById("reg_prijmeno").value;
  let heslo = document.getElementById("reg_heslo").value;
  let heslo2 = document.getElementById("reg_heslo2").value;
  let email = document.getElementById("reg_email").value;
  if (!prijmeno) {
    ukazChybu("Není zadáno přihlašovací jméno!");
    return;
  }
  if (heslo.length < 4) {
    ukazChybu("Heslo musí mít alespoň 4 znaky!");
    return;
    }
    if (heslo != heslo2) {
    ukazChybu("Chybně zopakované heslo!");
    return;
    }
    if (!email) {
    ukazChybu("Není zadán e-mail!");
    return;
    }

  let data = {
  "username":prijmeno,
  "password":heslo,
  "password2":heslo2,
  "email":email
  };

  fetch(URL_registrace  , {
    method: "POST", 
    body: JSON.stringify(data)
  }).then(res => res.json())
  .then(console.log);


}
function prihlasit() {
  const URL_prihlaseni = "https://nodejs-3260.rostiapp.cz/users/login";
  let prijmeno = document.getElementById("prijmeno").value;
  let heslo = document.getElementById("heslo").value;
 
  if (prijmeno.length < 0) {
    ukazChybu("Není zadáno přihlašovací jméno!");
    return;
  }
    
let data = {
  "username":prijmeno,
  "password":heslo
  };

  fetch(URL_prihlaseni  , {
    method: "POST", 
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => {
    console.log
    token=data.token
    ukazChat()
  });

}

function odhlasit() {
  const URL_odhlaseni = "https://nodejs-3260.rostiapp.cz/users/logout"
  let data = {}; 
  data.token = token;

  fetch(URL_odhlaseni , {
  method: "POST",
  body: JSON.stringify(data)

}).then(res => res.json())
.then(data => {
chatCasovac = clearInterval
ukazPrihlaseni()
});

}
let username
let token
let chatCasovac;
function ukazPrihlaseni() {
document.getElementById("div_prihlaseni").style.display = "block";
document.getElementById("div_registrace").style.display = "none";
 document.getElementById("div_chat").style.display = "none";
ukazChybu("");

}
function ukazRegistraci() {
  document.getElementById("div_prihlaseni").style.display = "none";  
  document.getElementById("div_registrace").style.display = "block";
  document.getElementById("div_chat").style.display = "none";
   ukazChybu("");
}

function ukazChat() {
  document.getElementById("div_prihlaseni").style.display = "none";
  document.getElementById("div_registrace").style.display = "none";
  document.getElementById("div_chat").style.display = "block";
  ukazChybu("");
  chatCasovac = setInterval(obnovZpravy, 1000);
}


function poNacteni() {
  ukazPrihlaseni();
}