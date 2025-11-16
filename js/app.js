// ==============================
// MSQuakeService - Monitoreo sísmico en Lima
// ==============================

// --- Configuración de zonas (centro aproximado + radio en km) ---
// Clave = valor del <select id="distrito">
const ZONAS_CONFIG = {
  // Lima Metropolitana: usamos un mismo centro pero radios distintos opcionales
  "150101": { nombre: "Lima", lat: -12.0464, lon: -77.0428, radioKm: 60 },
  "150102": { nombre: "Ancón", lat: -11.775, lon: -77.155, radioKm: 40 },
  "150103": { nombre: "Ate", lat: -12.030, lon: -76.900, radioKm: 35 },
  "150104": { nombre: "Barranco", lat: -12.137, lon: -77.020, radioKm: 20 },
  "150105": { nombre: "Breña", lat: -12.053, lon: -77.055, radioKm: 20 },
  "150106": { nombre: "Carabayllo", lat: -11.923, lon: -77.016, radioKm: 40 },
  "150107": { nombre: "Chaclacayo", lat: -11.991, lon: -76.771, radioKm: 30 },
  "150108": { nombre: "Chorrillos", lat: -12.168, lon: -77.019, radioKm: 25 },
  "150109": { nombre: "Cieneguilla", lat: -12.060, lon: -76.821, radioKm: 30 },
  "150110": { nombre: "Comas", lat: -11.947, lon: -77.050, radioKm: 30 },
  "150111": { nombre: "El Agustino", lat: -12.055, lon: -77.002, radioKm: 25 },
  "150112": { nombre: "Independencia", lat: -11.982, lon: -77.053, radioKm: 30 },
  "150113": { nombre: "Jesús María", lat: -12.076, lon: -77.049, radioKm: 20 },
  "150114": { nombre: "La Molina", lat: -12.086, lon: -76.923, radioKm: 25 },
  "150115": { nombre: "La Victoria", lat: -12.073, lon: -77.030, radioKm: 20 },
  "150116": { nombre: "Lince", lat: -12.089, lon: -77.033, radioKm: 20 },
  "150117": { nombre: "Los Olivos", lat: -11.961, lon: -77.067, radioKm: 30 },
  "150118": { nombre: "Lurigancho", lat: -11.963, lon: -76.930, radioKm: 35 },
  "150119": { nombre: "Lurín", lat: -12.276, lon: -76.877, radioKm: 35 },
  "150120": { nombre: "Magdalena del Mar", lat: -12.097, lon: -77.069, radioKm: 20 },
  "150121": { nombre: "Pueblo Libre", lat: -12.075, lon: -77.066, radioKm: 20 },
  "150122": { nombre: "Miraflores", lat: -12.122, lon: -77.029, radioKm: 20 },
  "150123": { nombre: "Pachacámac", lat: -12.163, lon: -76.870, radioKm: 40 },
  "150124": { nombre: "Pucusana", lat: -12.476, lon: -76.796, radioKm: 40 },
  "150125": { nombre: "Puente Piedra", lat: -11.867, lon: -77.078, radioKm: 35 },
  "150126": { nombre: "Punta Hermosa", lat: -12.328, lon: -76.813, radioKm: 35 },
  "150127": { nombre: "Punta Negra", lat: -12.360, lon: -76.789, radioKm: 35 },
  "150128": { nombre: "Rímac", lat: -12.026, lon: -77.032, radioKm: 25 },
  "150129": { nombre: "San Bartolo", lat: -12.394, lon: -76.783, radioKm: 40 },
  "150130": { nombre: "San Borja", lat: -12.103, lon: -77.005, radioKm: 25 },
  "150131": { nombre: "San Isidro", lat: -12.099, lon: -77.035, radioKm: 25 },
  "150132": { nombre: "San Juan de Lurigancho", lat: -11.994, lon: -76.999, radioKm: 35 },
  "150133": { nombre: "San Juan de Miraflores", lat: -12.172, lon: -76.971, radioKm: 30 },
  "150134": { nombre: "San Luis", lat: -12.077, lon: -76.997, radioKm: 25 },
  "150135": { nombre: "San Martín de Porres", lat: -11.985, lon: -77.070, radioKm: 30 },
  "150136": { nombre: "San Miguel", lat: -12.093, lon: -77.094, radioKm: 25 },
  "150137": { nombre: "Santa Anita", lat: -12.048, lon: -76.969, radioKm: 25 },
  "150138": { nombre: "Santa María del Mar", lat: -12.399, lon: -76.787, radioKm: 40 },
  "150139": { nombre: "Santa Rosa", lat: -11.822, lon: -77.114, radioKm: 35 },
  "150140": { nombre: "Santiago de Surco", lat: -12.132, lon: -76.987, radioKm: 30 },
  "150141": { nombre: "Surquillo", lat: -12.115, lon: -77.015, radioKm: 25 },
  "150142": { nombre: "Villa El Salvador", lat: -12.206, lon: -76.940, radioKm: 35 },
  "150143": { nombre: "Villa María del Triunfo", lat: -12.164, lon: -76.931, radioKm: 35 },

  // Provincias de Lima (valores tipo "LIMA-PROV-XXXX")
  "LIMA-PROV-BARRANCA":  { nombre: "Provincia de Barranca",  lat: -10.75, lon: -77.76, radioKm: 80 },
  "LIMA-PROV-CAJATAMBO": { nombre: "Provincia de Cajatambo", lat: -10.48, lon: -76.99, radioKm: 80 },
  "LIMA-PROV-CANTA":     { nombre: "Provincia de Canta",     lat: -11.47, lon: -76.62, radioKm: 70 },
  "LIMA-PROV-CAÑETE":    { nombre: "Provincia de Cañete",    lat: -13.07, lon: -76.38, radioKm: 90 },
  "LIMA-PROV-HUARAL":    { nombre: "Provincia de Huaral",    lat: -11.50, lon: -77.20, radioKm: 80 },
  "LIMA-PROV-HUAROCHIRI":{ nombre: "Provincia de Huarochirí",lat: -11.85, lon: -76.38, radioKm: 90 },
  "LIMA-PROV-HUAURA":    { nombre: "Provincia de Huaura",    lat: -11.12, lon: -77.61, radioKm: 80 },
  "LIMA-PROV-OYON":      { nombre: "Provincia de Oyón",      lat: -10.65, lon: -76.78, radioKm: 80 },
  "LIMA-PROV-YAUYOS":    { nombre: "Provincia de Yauyos",    lat: -12.50, lon: -75.90, radioKm: 90 }
};

let zonaSeleccionada = null;

// --- Mapa centrado inicialmente en Lima Metropolitana ---
const map = L.map("map").setView([-12.0464, -77.0428], 8);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "&copy; OpenStreetMap"
}).addTo(map);

let markersLayer = L.layerGroup().addTo(map);
let markersByIndex = [];       // para vincular filas de la tabla con marcadores
let sismosRaw = [];            // Datos crudos (desde IGP, ya solo LIMA)
let sismosFiltrados = [];      // Después de aplicar filtros

// Servicio oficial ArcGIS del IGP (todos los sismos, filtramos en el cliente)
const URL_IGP =
  "https://ide.igp.gob.pe/arcgis/rest/services/monitoreocensis/SismosReportados/MapServer/0/query?where=1%3D1&outFields=fecha,hora,magnitud,prof,lat,lon,ref,departamento&orderByFields=fecha%20DESC&f=geojson";

// Referencias a elementos del DOM
const tablaBody     = document.getElementById("tablaSismos");
const captionTabla  = document.getElementById("captionTabla");
const conteoSismos  = document.getElementById("conteoSismos");
const infoSismos    = document.getElementById("infoSismos");
const valorRiesgo   = document.getElementById("valorRiesgo");
const textoRiesgo   = document.getElementById("textoRiesgo");
const tagRiesgo     = document.getElementById("tagRiesgo");

// ==============================
// Carga inicial + auto-actualización
// ==============================

cargarDatosIGP().then(() => {
  recalcular();            // primera vez
  iniciarAutoActualizacion();
});

document.getElementById("btnCalcular").addEventListener("click", () => {
  recalcular();            // cada vez que haces click en "Calcular riesgo"
});

// ==============================
// Consultar servicio IGP (GeoJSON)
// ==============================

async function cargarDatosIGP() {
  try {
    captionTabla.textContent = "Consultando información sísmica del IGP…";

    const res = await fetch(URL_IGP);
    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const geo = await res.json();

    if (!geo.features || !Array.isArray(geo.features)) {
      throw new Error("Respuesta sin 'features' desde IGP.");
    }

    // GeoJSON -> arreglo de sismos
    let todos = geo.features.map((f) => {
      const p = f.properties || {};
      const g = f.geometry || {};

      let lat = p.lat;
      let lon = p.lon;

      // geometry con coordenadas (forma más confiable)
      if (
        g.type === "Point" &&
        Array.isArray(g.coordinates) &&
        g.coordinates.length >= 2
      ) {
        lon = g.coordinates[0];
        lat = g.coordinates[1];
      }

      // fecha en milisegundos
      let fechaMs = p.fecha;
      let fechaStr = "N/D";
      let horaStr  = "";

      if (typeof fechaMs === "number") {
        const d = new Date(fechaMs);
        fechaStr = d.toLocaleDateString("es-PE");
        horaStr  = d.toLocaleTimeString("es-PE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
      }

      return {
        fechaMs,
        fechaStr,
        horaStr,
        magnitud: Number(p.magnitud || 0),
        profundidad: p.prof,
        latitud: lat,
        longitud: lon,
        referencia: p.ref,
        departamento: (p.departamento || "").toUpperCase()
      };
    });

    // Nos quedamos solo con sismos del departamento LIMA
    sismosRaw = todos.filter((s) =>
      (s.departamento || "").includes("LIMA")
    );

    // Por seguridad, máx. 400 registros recientes
    sismosRaw = sismosRaw.slice(0, 400);

    captionTabla.textContent =
      "Datos reales del IGP cargados (sismos en el departamento de Lima).";
  } catch (err) {
    console.error("Error al consultar IGP:", err);
    captionTabla.textContent =
      "No se pudo obtener datos en tiempo real del IGP. Verifica tu conexión o intenta más tarde.";
    sismosRaw = [];
  }
}

// ==============================
// Auto-actualización cada 60 s
// ==============================

function iniciarAutoActualizacion() {
  setInterval(async () => {
    console.log("🔄 Actualizando datos del IGP (Lima)...");
    captionTabla.textContent = "Actualizando datos del IGP…";

    await cargarDatosIGP();
    recalcular();

    captionTabla.textContent =
      "Datos actualizados automáticamente hace un momento.";
  }, 60000); // 60000 ms = 60 segundos
}

// ==============================
// Recalcular filtros + riesgo
// ==============================

function recalcular() {
  const horasVentana = parseInt(
    document.getElementById("ventana").value,
    10
  );
  const magMin = parseFloat(document.getElementById("magMin").value) || 0;

  const zonaKey = document.getElementById("distrito").value;
  zonaSeleccionada = ZONAS_CONFIG[zonaKey] || null;

  const ahora = new Date();

  // 1) filtramos por magnitud, ventana de horas y zona (geográfica)
  let filtrados = sismosRaw.filter((s) => {
    if (s.magnitud < magMin) return false;

    // filtro por tiempo
    if (s.fechaMs) {
      const fechaEvento = new Date(s.fechaMs);
      const diffHoras = (ahora - fechaEvento) / (1000 * 60 * 60);
      if (!isNaN(diffHoras) && diffHoras > horasVentana) return false;
    }

    // filtro por zona (si tenemos config)
    if (zonaSeleccionada && !estaEnZona(s, zonaSeleccionada)) {
      return false;
    }

    return true;
  });

  // 2) Si no hay resultados, relajamos el filtro de tiempo pero mantenemos zona
  if (filtrados.length === 0) {
    filtrados = sismosRaw.filter((s) => {
      if (s.magnitud < magMin) return false;
      if (zonaSeleccionada && !estaEnZona(s, zonaSeleccionada)) {
        return false;
      }
      return true;
    });

    captionTabla.textContent =
      "No hubo sismos en la ventana de tiempo seleccionada. Mostrando los últimos eventos de la zona seleccionada.";
  }

  sismosFiltrados = filtrados;
  actualizarMapa();
  actualizarTabla();
  actualizarResumen();
}

// ==============================
// Filtro geográfico por zona
// ==============================

function estaEnZona(sismo, zona) {
  const lat = parseFloat(sismo.latitud);
  const lon = parseFloat(sismo.longitud);
  if (isNaN(lat) || isNaN(lon)) return false;

  const distKm = distanciaKm(lat, lon, zona.lat, zona.lon);
  return distKm <= zona.radioKm;
}

// Distancia Haversine en km
function distanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ==============================
// Mapa (con marcadores clicables desde tabla)
// ==============================

function actualizarMapa() {
  markersLayer.clearLayers();
  markersByIndex = [];

  sismosFiltrados.forEach((s, index) => {
    const lat = parseFloat(s.latitud);
    const lon = parseFloat(s.longitud);
    const mag = parseFloat(s.magnitud || 0);

    if (isNaN(lat) || isNaN(lon)) return;

    let color = "#22c55e"; // magnitud baja
    if (mag >= 5) color = "#ef4444";
    else if (mag >= 4) color = "#facc15";

    const marker = L.circleMarker([lat, lon], {
      radius: 6 + Math.max(mag - 3, 0) * 1.5,
      color,
      fillColor: color,
      fillOpacity: 0.8,
      weight: 1
    }).addTo(markersLayer);

    marker.bindPopup(`
      <b>${s.referencia || "Sismo reportado"}</b><br>
      <b>Magnitud:</b> ${mag.toFixed(1)}<br>
      <b>Profundidad:</b> ${(s.profundidad ?? "?")} km<br>
      <b>Fecha:</b> ${s.fechaStr} ${s.horaStr}<br>
      <b>Departamento:</b> ${s.departamento || "LIMA"}<br>
      <b>Fuente:</b> IGP / CENSIS
    `);

    // guardamos el marcador en el índice correspondiente
    markersByIndex[index] = marker;
  });

  if (sismosFiltrados.length > 0) {
    const coords = sismosFiltrados
      .map((s) => [parseFloat(s.latitud), parseFloat(s.longitud)])
      .filter((p) => !isNaN(p[0]) && !isNaN(p[1]));

    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds.pad(0.3));
      return;
    }
  }

  // Si no hay puntos, centrar a la zona o a Lima
  if (zonaSeleccionada) {
    map.setView([zonaSeleccionada.lat, zonaSeleccionada.lon], 9);
  } else {
    map.setView([-12.0464, -77.0428], 8);
  }
}

// ==============================
// Tabla (click en fila -> centrar mapa y abrir popup)
// ==============================

function actualizarTabla() {
  tablaBody.innerHTML = "";

  sismosFiltrados.forEach((s, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${s.fechaStr} ${s.horaStr}</td>
      <td>${s.magnitud.toFixed(1)}</td>
      <td>${s.profundidad ?? "-"}</td>
      <td>${s.latitud ?? "-"}</td>
      <td>${s.longitud ?? "-"}</td>
      <td>${s.referencia ?? "-"}</td>
    `;

    tr.dataset.index = index;

    tr.addEventListener("click", () => {
      const i = parseInt(tr.dataset.index, 10);
      const marker = markersByIndex[i];

      if (marker) {
        const latLng = marker.getLatLng();
        map.setView(latLng, 10); // zoom más cercano
        marker.openPopup();
      }
    });

    tablaBody.appendChild(tr);
  });

  conteoSismos.textContent = sismosFiltrados.length;
  infoSismos.textContent =
    "Eventos dentro de la ventana, magnitud mínima y zona seleccionadas (o últimos eventos de la zona si no hubo en la ventana).";
}

// ==============================
// Resumen de riesgo
// ==============================

function actualizarResumen() {
  if (sismosFiltrados.length === 0) {
    valorRiesgo.textContent = "0.0 / 100";
    textoRiesgo.textContent =
      "No se encontraron eventos para los filtros actuales. Riesgo considerado bajo.";
    tagRiesgo.textContent = "Bajo";
    tagRiesgo.className = "tag tag-good";
    return;
  }

  const magnitudes = sismosFiltrados.map((s) => s.magnitud);
  const promMag =
    magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length || 0;

  let riesgo = promMag * sismosFiltrados.length * 4;
  if (riesgo > 100) riesgo = 100;

  valorRiesgo.textContent = `${riesgo.toFixed(1)} / 100`;

  if (riesgo < 30) {
    textoRiesgo.textContent =
      "Actividad sísmica baja según los parámetros consultados.";
    tagRiesgo.textContent = "Bajo";
    tagRiesgo.className = "tag tag-good";
  } else if (riesgo < 70) {
    textoRiesgo.textContent =
      "Actividad moderada. Se recomienda monitoreo constante.";
    tagRiesgo.textContent = "Medio";
    tagRiesgo.className = "tag";
  } else {
    textoRiesgo.textContent =
      "Alta concentración de eventos con magnitud significativa. Riesgo elevado.";
    tagRiesgo.textContent = "Alto";
    tagRiesgo.className = "tag";
    tagRiesgo.style.background = "#fee2e2";
    tagRiesgo.style.color = "#b91c1c";
  }
}
