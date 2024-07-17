import { Project } from "src/projects/entities/project.entity"

export const manyProjects = (args) => {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Proyecto PDVSA</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1, h2, h3 {
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <h1>PDVSA - Sistema de Gestión de Portafolio de Proyectos</h1>
  <p>Ubicación: Maturin, Monagas</p>
  <h2>Reporte: TituloProyect0</h2>
  <h3>Fase: Entrada</h3>
  <p>Fechas:</p>
  <ul>
    <li>Inicio: XX/XX/xxxx</li>
    <li>Fin: XWXWXXXX</li>
  </ul>
  <p>Descripción:</p>
  <p>Lorem ipsum dolor sit amet cmsectetur elit_ Molestiae consequuntur asperiores vel
  modi eum earum ratjuw eaque aut unam dignissimos quam faque, aspernatur quia</p>
  
  
  <p>Alcance:</p>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit Molestiae consequuntur asperiores vel
  modi eum earum ratione eaque aut provident, ullam quarn taque, quia</p>
  <p>Objetivo:</p>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit Molestiae consequuntur asperiores vel
  modi eum earum ratione aut provident, ullam quam taque. aspernatur quia</p>
  <h3>Tareas</h3>
  <table>
    <tr>
      <th>Título</th>
      <th>Estado</th>
      <th>Porcentaje de Cumplimiento</th>
      <th>Área</th>
      <th>Fecha de Inicio</th>
      <th>Fecha de Entrada</th>
    </tr>
    <tr>
      <td>Tarea # I</td>
      <td>Estado Id</td>
      <td>Porcentaje de cumplimiento</td>
      <td>Área Id</td>
      <td>xxyxwxxxx</td>
      <td>xx,rxxxxxx</td>
    </tr>
    <tr>
      <td>Tarea #2</td>
      <td>Estado Id</td>
      <td>Porcentaje de cumplimiento</td>
      <td>Área Id</td>
      <td>xx»wxxxx</td>
      <td>xx,rxwxxxx</td>
    </tr>
    <tr>
      <td>Tarea</td>
      <td>Estado Id</td>
      <td>Porcentaje de cumplimiento</td>
      <td>Área Id</td>
      <td>xwxwxxxx</td>
      <td>xwx.wxxxx</td>
    </tr>
    <tr>
      <td>Tarea #4</td>
      <td>Estado Id</td>
      <td>Porcentaje de cumplimiento</td>
      <td>Área Id</td>
      <td>xwx.wxxxx</td>
      <td>xwx.wxxxx</td>
    </tr>
  </table>
</body>
</html>
`
}

export const singleProject = (data: Project) => {

  const tasks = data.i003f_i013t_tareas
  const trackings = tasks.map(t => t.i013f_i014t_seguimiento).flat(1)
  let start: Date, end: Date
  if (trackings) {
    const start_dates = []
    const end_dates = []
    trackings.forEach(s => {
      if (s != null) {
        start_dates.push(s.fe_plan_inicio)
        end_dates.push(s.fe_real_fin)
      }
    })
    console.log(trackings)
    start = start_dates.reduce(function (a, b) { return a < b ? a : b; });
    end = end_dates.reduce(function (a, b) { return a > b ? a : b; });
  }

  let task_rows = ''
  tasks.forEach(t => {
    if (t != null) {
      const completed = t.i013f_i014t_seguimiento?.nu_completado
      task_rows += `<tr>
        <td>${t.i013i_tarea}</td>
        <td>${t.i013f_i014t_seguimiento?.i014f_i015t_estado_tarea.in_titulo || 'SIN SEGUIMIENTO'}</td>
        <td>${completed ? completed + '%' : 'SIN SEGUIMIENTO'}</td>
        <td>${t.i013f_i014t_seguimiento?.fe_plan_inicio || 'SIN SEGUIMIENTO'}</td>
        <td>${t.i013f_i014t_seguimiento?.fe_plan_fin || 'SIN SEGUIMIENTO'}</td>
      </tr>`
    }
  })
  return `<!DOCTYPE html>
<html>
<head>
  <title>Proyecto PDVSA</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1, h2, h3 {
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      border: 1px solid black;
    }
    th {
      background-color: #2e184a;
      color: white
    }
    .info {
      display: flex;
      justify-content: space-between
    }
    .margin-text {
    	margin-left: 45px;
    	text-align: justify;
    	
    }
    .text-center {
    	text-align: center;
    }
    .make-bold {
      font-weight: 400;
    }
  </style>
</head>
<body>

  <img src="${ /*Subir la imagen de pdvsa*/ true}./PDVSA-logo.png">
  <h2>PDVSA - Sistema de Gestión de Portafolio de Proyectos</h2>
  <p>Ubicación: Maturin, Monagas</p>

  <h2 class='text-center'>Reporte: ${data.in_titulo}</h2>
  <div class='info'>
    <div>
  <p>Fase: ${data.i003f_i005t_fase_entrada.in_nombre}</p>
  <p>Entrada: ${data.i003f_i006t_estado_entrada.in_nombre_estado}</p>
    </div>
    <div class="make-bold">
     <p>Fechas:</p>
    <li>Inicio: ${start}</li>
    <li>Fin: ${end}</li>
    </div>
  </div>

 
  <h3>Descripción:</h3>
  <p class="margin-text">${data.tx_descripcion}</p>
  
  <h3>Alcance:</h3>
  <p class="margin-text">${data.tx_alcance}</p>
  <h3>Objetivo:</h3>
  <p class="margin-text">${data.tx_objetivo}</p>

  <h3 class='text-center'>Tareas</h3>
  <table>
  <thead>
  <tr>
      <th>Título</th>
      <th>Estado</th>
      <th>Porcentaje de Cumplimiento</th>
      <th>Fecha de Inicio</th>
      <th>Fecha de Entrada</th>
  </tr>
  </thead>
  <tbody>
  ${task_rows}
  </tbody>
    </table>
</body>
</html>
`
}