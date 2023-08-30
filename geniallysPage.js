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

  //Ocultar mcgContainer
  document.querySelector("[data-title='mcgContainer']").classList.add("hiddenElement");
}

//Cargar geniallys
async function loadGeniallys() {
  //Ocultar lcg
  //document.querySelector("[data-title='lcg']").classList.add("hiddenElement");
  
  //Datos userMCG
  let userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
  let userId=userMCG.userId;
  const classMCG = JSON.parse(localStorage.getItem('classMCG'));
  const classIdMCG = classMCG.classId;
  
  //Visualizar waitingMCG
  document.querySelector("[data-title='waitingMCG']").classList.remove("hiddenElement");
  
  // Realizar la solicitud fetch POST
  fetch('https://genialmcg.glitch.me/students/?classId='+classIdMCG)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); // Manejar la respuesta recibida del servidor
      const newGeniallyBtn = document.querySelector("[data-title='geniallyMCG']");
      
      const postitMCG = document.querySelector("[data-title='mcgContainer']");
      /*postitMCG.style.overflowY="auto";
      postitMCG.style.overflowX="hidden";
      postitMCG.style.pointerEvents="auto";
      
      postitMCG.style.opacity=0;
      postitMCG.style.visibility="hidden";
      postitMCG.style.transition="all 5s ease-in-out";*/
      
      const mcgContainer = document.createElement('div');
      mcgContainer.id = 'mcgContainer';
      mcgContainer.classList.add('mcgContainer');
         
      data.forEach(function(element) {
        // Crea una copia del objeto
        const geniallyBtn = newGeniallyBtn.cloneNode(true);
        geniallyBtn.addEventListener("click", loadGeniallyMCG)
        const spans = geniallyBtn.querySelector('div  span')
        spans.textContent = element.genName;
        geniallyBtn.classList.remove("hiddenElement");
        geniallyBtn.setAttribute("data-title", "classButton"); 
        //Inserta la copia del objeto en el div de destino
        mcgContainer.appendChild(geniallyBtn);
      })

      postitMCG.appendChild(mcgContainer);
      //Visualizar postitMCG
      /*postitMCG.style.opacity=1;
      postitMCG.style.visibility="visible";
      postitMCG.style.transition="all 0s ease-in-out";*/

      //Ocultar studentMCG
      //document.querySelector("[data-title='studentMCG']").classList.add("hiddenElement"); 

       //Visualizar mcgContainer
      document.querySelector("[data-title='mcgContainer']").classList.remove("hiddenElement");
      
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
  console.log(e.currentTarget.id);
  fetch('https://genialmcg.glitch.me/students/?studentId='+e.currentTarget.id)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); // Manejar la respuesta recibida del servidor
      let student = JSON.stringify(data[0])
      localStorage.setItem('studentMCG',student);  
      console.log(localStorage.getItem('studentMCG'))
                                
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");

      document.querySelector("[data-title='myclassMCG']").click();
      document.querySelector("#myclassesMCG").remove();
    })
    .catch(function(error) {
      console.log('Error:', error);
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    });
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
      const genially = {
        genName: document.getElementById('swal-input1').value,
        genURL: document.getElementById('swal-input1').value,
        genSlideId: genSlideId
      }
      return genially
    }
  })
  if (formValues) {
    console.log(formValues)
    // Objeto con los datos del genially
    const genially = formValues;
    const newGeniallytBtn = document.querySelector("[data-title='geniallyMCG']");
    const postitMCG = document.querySelector("#mcgContainer");
    
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
      geniallyBtn.addEventListener("click", loadGeniallyMCG);
      geniallyBtn.querySelector('span span').textContent = genially.genName;
      geniallyBtn.classList.remove("hiddenElement");
      geniallyBtn.setAttribute("data-title", "classButton"); 
      //Inserta la copia del objeto en el div de destino
      postitMCG.appendChild(geniallyBtn);
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
  }
}
