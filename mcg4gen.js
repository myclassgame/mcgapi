//Cargar ficheros externos
(function (d) { 
var js, id = "genially-embed-js", ref = d.getElementsByTagName("script")[0];
if (d.getElementById(id)) { return; }
var files = [ "sweetalert2.min.js" ]
files.forEach(file =>   {
  js = d.createElement("script"); 
  js.id = id; 
  js.async = true; 
  js.src = "https://myclassgame.github.io/mcgapi/"+file; 
  ref.parentNode.insertBefore(js, ref);
})}
(document));

function loadEvents(page) {
  console.log("loadEvents")

  const mcg4genBtn = document.querySelector("[data-title='mcg4gen']");
  const mcg4genText = mcgAPIBtn.querySelector('.genially-view-text span').textContent;

  if (mcg4genText==="Elements") {
    //Cargar datos y eventos de elementsPage.js
    loadElementsPage()
  }
}

function loadElementsPage(page) {
  console.log("loadElementsPage")
}
