import { Project } from "src/projects/entities/project.entity"

export const manyProjects = (data: Project[]) => {

  let project_rows = ''
  data.forEach(project => {
    const tasks = project.i003f_i013t_tareas
    const trackings = tasks.map(t => t.i013f_i014t_seguimiento).flat(1)
    let start: Date, end: Date
    if (trackings) {
      const start_dates = []
      const end_dates = []
      trackings.forEach(s => {
        if (s != null) {
          start_dates.push(s.fe_plan_inicio)
          end_dates.push(s.fe_plan_fin)
        }
      })
      if (start_dates.length) {
        start = start_dates.reduce(function (a, b) { return a < b ? a : b; }, 0);
        end = end_dates.reduce(function (a, b) { return a > b ? a : b; }, 0);
      }
    }
      if (project != null) {
      
        project_rows += `<tr>
          <td>${project.in_titulo}</td>
          <td>${project.i003f_i006t_estado_entrada.in_nombre_estado}</td>
          <td>${project.i003f_i010t_area_tecnica.in_nombre}</td>
          <td>${project.i003f_i011_tipo_proyecto.i011i_tipo_proyecto}</td>
          <td>${start || 'SIN FECHA' }</td>
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
      background-color: #201642;
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
      font-weight: 600;
    }
    .logo-simulate {
    width: 300px;
    height: 80px;
    background-color: red;
    }
    .header-text {
    font-size: 16px;
    }
  </style>
</head>
<body>

<div class="info">
<img src="http://34.225.211.222:3000/public/PDVSA-logo.png">
  <div>
  <p class="header-text">${(new Date().toLocaleDateString())}</p>
    <p class="header-text">Ubicación: Maturin, Monagas</p>
  </div>
  </div>
  
  <p class="header-text">SGPP - Sistema de Gestión <br> de Protafolio de Proyectos</p>


  <h2 class='text-center'>Reporte General de Gestion</h2>

  <h3>Proyectos: </h3>
  <table>
  <thead>
  <tr>
      <th>Título</th>
      <th>Estado</th>
      <th>Area Técnica</th>
      <th>Tipo de Proyecto</th>
      <th>Fecha de Entrada</th>
  </tr>
  </thead>
  <tbody>
  ${project_rows}
  </tbody>
    </table>
</body>
</html>
`
}

export const singleProject = (data: Project) => {

  const tasks = data.i003f_i013t_tareas
  let start: Date, end: Date
  if (tasks.length) {
    const trackings = tasks.map(t => t.i013f_i014t_seguimiento).flat(1)
  if (trackings.length) {
    const start_dates = []
    const end_dates = []
    trackings.forEach(s => {
      if (s != null) {
        start_dates.push(s.fe_plan_inicio)
        end_dates.push(s.fe_plan_fin)
      }
    })
    start = start_dates.reduce(function (a, b) { return a < b ? a : b; }, 0);
    end = end_dates.reduce(function (a, b) { return a > b ? a : b; }, 0);
  }
}

  let task_rows = ''
  tasks.forEach(t => {
    if (t != null) {
      const completed = t.i013f_i014t_seguimiento?.nu_completado_real
      task_rows += `<tr>
        <td>${t.i013i_tarea}</td>
        <td>${t.in_nombre}</td>
        <td>${t.i013f_i014t_seguimiento?.i014f_i015t_estado_tarea?.in_titulo || 'SIN SEGUIMIENTO'}</td>
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
      background-color: #201642;
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
      font-weight: 600;
    }
    .logo-simulate {
    width: 300px;
    height: 80px;
    background-color: red;
    }
    .header-text {
    font-size: 16px;
    }
  </style>
</head>
<body>

<div class="info">
<img src="http://34.225.211.222:3000/public/PDVSA-logo.png">

  <div>
  <p class="header-text">${(new Date().toLocaleDateString())}</p>
    <p class="header-text">Ubicación: Maturin, Monagas</p>
  </div>
  </div>
  
  <p class="header-text">SGPP - Sistema de Gestión <br> de Protafolio de Proyectos</p>


  <h2 class='text-center'>Reporte: ${data.in_titulo}</h2>
  <div class='info'>
    <div>
  <p>Fase: ${data.i003f_i005t_fase_entrada.in_nombre_fase}</p>
  <p>Entrada: ${data.i003f_i006t_estado_entrada.in_nombre_estado}</p>
    </div>
    <div class="make-bold">
     <p>Fechas:</p>
    <li>Inicio: ${start || 'No asignado'}</li>
    <li>Fin: ${end || 'No asignado'}</li>
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
      <th>#</th>
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