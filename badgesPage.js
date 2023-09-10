//Función para cargar los eventos de la página de clases
async function loadBadgesPage(){
  
  //Ocultar waitingMCG
  document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");   
  
  //Ocultar badgeMCG
  document.querySelector("[data-title='badgeMCG']").classList.add("hiddenElement"); 
  
  //Cargar classes
  setTimeout(loadBadgesMCG, 3000)

  //Ocultar containerMCG
  document.querySelector("[data-title='containerMCG']").classList.add("hiddenElement");
    
}

//Cargar insignias
async function loadBadgesMCG() {

  //Datos userMCG
  let studentMCG = JSON.parse(window.localStorage.getItem("studentMCG"));
  
  //Visualizar waitingMCG
  document.querySelector("[data-title='waitingMCG']").classList.remove("hiddenElement");
  
  // Realizar la solicitud fetch POST
  fetch(`https://genialmcg.glitch.me/students/${studentMCG.id}/badges`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); // Manejar la respuesta recibida del servidor
      const badgeMCG = document.querySelector("[data-title='badgeMCG']");
      
      const postitMCG = document.querySelector("[data-title='containerMCG']");
            
      const containerMCG = document.createElement('div');
      containerMCG.id = 'containerMCG';
      containerMCG.classList.add('containerMCG');
         
      data.forEach(function(element) {
        // Crea una copia del objeto
        const badgeBtn = badgeMCG.cloneNode(true);
        badgeBtn.querySelector('span span').textContent = element.className;
        badgeBtn.classList.remove("hiddenElement"); 
        //Inserta la copia del objeto en el div de destino
        containerMCG.appendChild(badgeBtn);
      })

      postitMCG.appendChild(containerMCG);
      
       //Visualizar containerMCG
      document.querySelector("[data-title='containerMCG']").classList.remove("hiddenElement");
      
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    
    })
    .catch(function(error) {
      console.log('Error:', error);
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    });
}
