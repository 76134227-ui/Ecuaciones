// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
  // Activar cambio de pestañas
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const content = document.getElementById(tab.dataset.tab);
      content.classList.add('active');

      // Redibujar gráficos si se abren esas pestañas
      if (tab.dataset.tab === 'solution') {
        drawSolutionGraph();
      } else if (tab.dataset.tab === 'simulation') {
        drawPhaseDiagram();
      }
    });
  });
});

// --- Gráfico de Solución ---
function drawSolutionGraph() {
  const solutionGraph = document.getElementById('solutionGraph');
  const existingCanvas = document.querySelector('#solutionGraph canvas');
  if (existingCanvas) existingCanvas.remove(); // elimina gráficos anteriores

  const solutionCanvas = document.createElement('canvas');
  solutionCanvas.width = solutionGraph.clientWidth || 600;
  solutionCanvas.height = solutionGraph.clientHeight || 300;
  solutionGraph.appendChild(solutionCanvas);
  
  const ctx = solutionCanvas.getContext('2d');
  
  // Dibujar eje X e Y
  ctx.beginPath();
  ctx.moveTo(40, 10);
  ctx.lineTo(40, 260);
  ctx.lineTo(580, 260);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Dibujar curva ejemplo (puedes cambiar por tu ecuación)
  ctx.beginPath();
  for (let x = 0; x <= 540; x++) {
    const y = 120 + 80 * Math.sin(x * 0.02);
    if (x === 0) ctx.moveTo(40 + x, y);
    else ctx.lineTo(40 + x, y);
  }
  ctx.strokeStyle = "#4ade80"; // verde
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Etiquetas
  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText("Tiempo (t)", 500, 280);
  ctx.fillText("y(t)", 10, 20);
}

// --- Diagrama de Fase ---
function drawPhaseDiagram() {
  const phaseDiagram = document.getElementById('phaseDiagram');
  const existingCanvas = document.querySelector('#phaseDiagram canvas');
  if (existingCanvas) existingCanvas.remove(); // elimina gráficos anteriores

  const phaseCanvas = document.createElement('canvas');
  phaseCanvas.width = phaseDiagram.clientWidth || 600;
  phaseCanvas.height = phaseDiagram.clientHeight || 250;
  phaseDiagram.appendChild(phaseCanvas);
  
  const ctx = phaseCanvas.getContext('2d');
  
  // Ejes
  ctx.beginPath();
  ctx.moveTo(40, 10);
  ctx.lineTo(40, 220);
  ctx.lineTo(580, 220);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Trayectoria ejemplo
  ctx.beginPath();
  for (let t = 0; t <= 360; t++) {
    const x = 100 + 200 * Math.cos(t * Math.PI / 180);
    const y = 120 + 80 * Math.sin(t * Math.PI / 180);
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#60a5fa"; // azul
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Etiquetas
  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText("x", 570, 240);
  ctx.fillText("y", 10, 20);
}
