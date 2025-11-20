// place.js
// - sets footer year and last modified
// - inserts static Abuja weather values
// - calculates wind chill only when eligible
// - calculateWindChill must be one-line return

document.addEventListener('DOMContentLoaded', () => {
  // footer year
  const yearEl = document.getElementById('current-year');
  const now = new Date();
  yearEl.textContent = now.getFullYear();

  // last modified
  const lastModEl = document.getElementById('last-modified');
  // document.lastModified returns a string; fallback if empty
  lastModEl.textContent = document.lastModified || (new Date().toLocaleString());

  /* --- Static weather values for Abuja (per your request) --- */
  const temperatureC = 30;   // degrees Celsius (static)
  const windKmh = 10;        // km/h (static)
  const condition = "Partly Cloudy";

  // UI elements
  const tEl = document.getElementById('temp-value');
  const wEl = document.getElementById('wind-value');
  const wcEl = document.getElementById('windchill-value');
  const descEl = document.getElementById('weather-desc');

  // Insert static numbers into page
  tEl.textContent = temperatureC;
  wEl.textContent = windKmh;
  descEl.textContent = `Condition: ${condition}`;

  // One-line wind chill function for metric (°C and km/h)
  // Formula: WCI = 13.12 + 0.6215*T - 11.37*(v^0.16) + 0.3965*T*(v^0.16)
  function calculateWindChill(tC, vKmh) {
    return 13.12 + 0.6215 * tC - 11.37 * Math.pow(vKmh, 0.16) + 0.3965 * tC * Math.pow(vKmh, 0.16);
  }

  // Only compute wind chill if temperature <= 10°C AND wind speed > 4.8 km/h
  if ((temperatureC <= 10) && (windKmh > 4.8)) {
    const wc = calculateWindChill(temperatureC, windKmh);
    wcEl.textContent = `${wc.toFixed(1)} °C`;
  } else {
    wcEl.textContent = 'N/A';
  }
});
