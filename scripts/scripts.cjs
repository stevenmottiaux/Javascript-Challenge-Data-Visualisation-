document.addEventListener('DOMContentLoaded', function() {
// Le Chart est maintenant disponible globalement via toastui.Chart
const { Chart } = toastui;

// Créer un nouveau div pour le graphique
var graphDiv = document.createElement('div');
graphDiv.id = 'graph1';

// Insérer le div juste au-dessus de la table avec l'id 'table1'
var table1 = document.getElementById('table1');
table1.parentNode.insertBefore(graphDiv, table1);

// Récupérer les données du tableau
const rows = Array.from(table1.querySelectorAll('tr'));
const countries = [];
const yearData = {};

// Extraire les années des en-têtes
const headers = rows[1].querySelectorAll('th');
headers.forEach((th, index) => {
  if (index > 1) {
    const year = th.textContent.trim();
    if (year) {
      yearData[year] = [];
    }
  }
});

// Extraire les données des pays et des années
rows.forEach((row, index) => {
  if (index <= 1) return; // Ignorer les deux premières lignes (en-têtes)
  const cells = row.querySelectorAll('td');
  if (cells.length > 1) {
    const country = cells[1].textContent.trim();
    if (country) {
      countries.push(country);
      Object.keys(yearData).forEach((year, yearIndex) => {
        const value = parseFloat(cells[yearIndex + 2]?.textContent) || 0;
        yearData[year].push(value);
      });
    }
  }
});

const el = document.getElementById('chart');
const data = {
  categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      name: 'Budget',
      data: [5000, 3000, 5000, 7000, 6000, 4000, 1000],
    },
    {
      name: 'Income',
      data: [8000, 4000, 7000, 2000, 6000, 3000, 5000],
    },
  ],
};
const options = {
  chart: { width: 700, height: 400 },
};

const chart = Chart.barChart({ el, data, options });
});