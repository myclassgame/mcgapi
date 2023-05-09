function prova(){
  alert("Cómo estás?")
}

function postBadge(e){
  fetch('https://juantoman-json-server.glitch.me/badges', {
    method: 'POST',
    body: JSON.stringify({
      name: "Badge1",
      description: "Badge1",
      "XP": 100
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    alert(e.target.closest(".genially-animated-wrapper").id)
  });
}

function dataElement(e){
  const parser = new DOMParser();
  const h=e.currentTarget.parentNode.getAttribute('data-title')
  const htmlDoc = parser.parseFromString(h, 'text/html');
  const type = htmlDoc.querySelector('.mcgType').innerText;
  const XP = htmlDoc.querySelector('.mcgXP').innerText.substring(3).trim();
  console.log( type + ": " + XP )
  fetch('https://juantoman-json-server.glitch.me/badges', {
    method: 'POST',
    body: JSON.stringify({
      name: "Prueba",
      description: type,
      "XP": XP
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    alert(e.target.closest(".genially-animated-wrapper").id)
  });
}
