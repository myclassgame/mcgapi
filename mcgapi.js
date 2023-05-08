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
  console.log(e.target.id)
}
