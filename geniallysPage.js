function loadGeniallysPage() {
  console.log("loadGeniallysPage")

  //newGenially
  const newGeniallyBtn = document.querySelector("[data-title='newGenially']");
  newGeniallyBtn.addEventListener("click", newGenially);

  //genSlideId
  console.log(document.querySelector(".genially-view-slide").id)

  //Ocultar geniallyMCG
  document.querySelector("[data-title='geniallyMCG']").classList.add("hiddenElement"); 

  //Cargar estudiantes
  setTimeout(loadGeniallys, 3000)

  //Ocultar containerMCG
  document.querySelector("[data-title='containerMCG']").classList.add("hiddenElement");
}

//Cargar geniallys
async function loadGeniallys() {
  
  //Datos userMCG
  let userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
  let userId=userMCG.userId;
  
  //Visualizar waitingMCG
  document.querySelector("[data-title='waitingMCG']").classList.remove("hiddenElement");

  const genSlideId = document.querySelector(".genially-view-slide").id
  
  // Realizar la solicitud fetch POST
  fetch('https://genialmcg.glitch.me/geniallys/?genSlideId='+genSlideId+'&userId='+userId)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); // Manejar la respuesta recibida del servidor
      const newGeniallyBtn = document.querySelector("[data-title='geniallyMCG']");
      
      const postitMCG = document.querySelector("[data-title='containerMCG']");
      
      const containerMCG = document.createElement('div');
      containerMCG.id = 'containerMCG';
      containerMCG.classList.add('containerMCG');
         
      data.forEach(function(element) {
        // Crea una copia del objeto
        const geniallyBtn = newGeniallyBtn.cloneNode(true);
        //geniallyBtn.addEventListener("click", loadGeniallyMCG)
        const spans = geniallyBtn.querySelector('div  span')
        spans.textContent = element.genName;
        geniallyBtn.querySelector('iframe').src = 'https://view.genial.ly/'+element.genId;
        geniallyBtn.querySelector('a').href = 'https://view.genial.ly/'+element.genId;
        geniallyBtn.classList.remove("hiddenElement");
        geniallyBtn.setAttribute("data-title", "elementButton"); 
        //Inserta la copia del objeto en el div de destino
        containerMCG.appendChild(geniallyBtn);
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

//Cargar Genially
function loadGeniallyMCG(e){
  console.log("loadGeniallyMCG")
  console.log(e.currentTarget.getAttribute("data-gid"));
  window.open('https://view.genial.ly/'+e.currentTarget.getAttribute("data-gid"), '_blank');
}

async function newGenially() {
  const genSlideId = document.querySelector(".genially-view-slide").id
  const { value: formValues } = await Swal.fire({
    title: '<span style="color:yellow;">@</span><span style="color:red;">My</span><span style="color:blue;">Class</span><span style="color:lime;">Game</span>',
    background: '#268bd2',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: '#0f0',
    confirmButtonText: 'Crear',
    cancelButtonColor: '#d33',
    imageUrl: 'https://www.myclassgame.es/images/@mcgnb.png',
    imageWidth: 75,
    imageHeight: 75,
    imageAlt: '@MyClassGame',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nombre Genially">'+
      '<input id="swal-input2" class="swal2-input" placeholder="URL Genially">',
    focusConfirm: false,
    preConfirm: () => {
      let genURL = document.getElementById('swal-input2').value;
      let parts = genURL.split('/');
      let genId = parts[parts.length - 1];
      const genially = {
        genName: document.getElementById('swal-input1').value,
        genId: genId,
        genSlideId: genSlideId
      }
      return genially
    }
  })
  if (formValues) {
    console.log(formValues)
    // Objeto con los datos del genially
    const genially = formValues;
    const newGeniallyBtn = document.querySelector("[data-title='geniallyMCG']");
    const postitMCG = document.querySelector("#containerMCG");
    
    //Datos localStorage
    const userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
    
    //Crear userId
    genially.userId = userMCG.userId

    // Configurar opciones para la solicitud fetch POST
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(genially)
    };

    // Realizar la solicitud fetch POST
    fetch('https://genialmcg.glitch.me/geniallys', options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); // Manejar la respuesta recibida del servidor
      
      // Crea una copia del objeto
      const geniallyBtn = newGeniallyBtn.cloneNode(true);
      //geniallyBtn.addEventListener("click", loadGeniallyMCG);
      geniallyBtn.querySelector('div span').textContent = genially.genName;
      geniallyBtn.querySelector('iframe').src = 'https://view.genial.ly/'+genially.genId;
      geniallyBtn.querySelector('a').href = 'https://view.genial.ly/'+genially.genId;
      geniallyBtn.classList.remove("hiddenElement");
      geniallyBtn.setAttribute("data-title", "elementButton"); 
      //geniallyBtn.setAttribute("data-gid", genially.genId);
      //Inserta la copia del objeto en el div de destino
      postitMCG.appendChild(geniallyBtn);
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
  }
}
