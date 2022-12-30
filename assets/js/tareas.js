let Tareas = [];
let indice = 1;
const botonNuevaTarea = document.querySelector("#button-add");
const nuevaTarea = document.querySelector("#nombre-tarea");
const tablaTareas = document.querySelector("#tabla-tareas");
const totalTareas = document.querySelector("#total_tareas");
const totalTareasRealizadas = document.querySelector("#total-realizadas");
const colTarea = document.querySelector("#col-tarea");

const AgregarTarea = () => {
  if (Tareas.length == 0) indice = 1;
  let tarea = {
    numero: indice++,
    nombre: nuevaTarea.value,
    estado: false,
  };
  Tareas.push(tarea);
  //Modificar o agregar elementos al areglo de objetos
  //  Tareas.map(tarea=>{
  //    tarea.estado=!tarea.estado;
  //    return tarea;
  //  });

  // Tareas.filter(tarea=>{
  //   tarea.nombre==1;
  // })
};

const ListarTareas = () => {
  let html = "";
  Tareas.forEach((tarea) => {    
    html += `<tr>
        <th scope="row">${tarea.numero}</th>
        <td>${tarea.nombre}</td>
        <td class="td-check align-middle">
          <input class="form-check-input" type="checkbox" ${
            tarea.estado ? "checked" : ""
          } onclick="SumarTareaRealizada(${tarea.numero})"
          />
        </td>
        <td class="td-check align-middle">
        <a href="#"><i class="fa-solid fa-trash" id="${
          tarea.numero
        }" onclick='BorrarTarea(${tarea.numero})'></i></a>        
        </td>
      </tr>`;
  });
  tablaTareas.innerHTML = html;
  //console.log(Tareas);
  totalTareas.innerHTML = `Total: ${Tareas.length}`;
};

const BorrarTarea = (indice) => {
  //Devuelve -1 si no se encuentra; el indice en caso contrario
  let index = Tareas.findIndex((tarea) => tarea.numero == indice);
  //Devuelve el objeto
  //let index = Tareas.find((tarea) => tarea.numero == indice);
  Tareas.splice(index, 1);
  console.log(Tareas);
  SumarTareaRealizada();
  ListarTareas();    
};

const SumarTareaRealizada = (indice) => {
  let i = 0;
  let index = Tareas.findIndex((tarea) => tarea.numero == indice);
  if(Tareas[index]!=null)
    Tareas[index].estado = !Tareas[index].estado;

  for (let tarea of Tareas) {
    //console.log(`tarea ${tarea.estado}`);
    if (tarea.estado == true) {
      i += 1;
    }
  }
  totalTareasRealizadas.innerHTML = `Realizadas: ${i}`;
  ListarTareas();
};

const ValidarTarea = () => {
  if (nuevaTarea.value == "") {
    alert("Debe ingresar una tarea");
    return false;
  } else return true;
};

const Ordenar = () => {
  //Tareas.sort().reverse();
  listar=[];
  listar=Tareas.sort((a, b) => (a.nombre < b.nombre ? -1 : 1));
  Tareas=listar;
  ListarTareas();
};

const IniciarTarea = () => {
  if (!ValidarTarea()) return;
  AgregarTarea();
  ListarTareas();

  nuevaTarea.value = "";
  nuevaTarea.focus();

  // //Concatenar arreglos
  // const  otro=Tareas.concat(colores);  
};
botonNuevaTarea.addEventListener("click", () => {
  IniciarTarea();
});

colTarea.addEventListener("click", () => {
  Ordenar();
});

nuevaTarea.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "a") {
    IniciarTarea();
  }
});
