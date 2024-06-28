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
const years = [];
headers.forEach((th, index) => {
  if (index > 1) {
    const year = th.textContent.trim();
    if (year) {
      years.push(year);
      yearData[year] = [];
    }
  }
});

// Extraire les données des pays et des années
rows.forEach((row, index) => {
  if (index <= 0) return; // Ignorer la première ligne (en-tête)
  const cells = row.querySelectorAll('td');
  if (cells.length > 1) {
    const country = cells[0].textContent.trim(); // Utiliser cells[0] pour le pays
    if (country) {
      countries.push(country);
      years.forEach((year, yearIndex) => {
        const value = parseFloat(cells[yearIndex + 1]?.textContent.replace(',', '.')) || 0; // yearIndex + 1 pour les données
        yearData[year].push(value);
      });
    }
  }
});

// Calculer le min et max des données
let minValue = Infinity;
let maxValue = -Infinity;

Object.values(yearData).forEach(yearValues => {
  yearValues.forEach(value => {
    if (value < minValue) minValue = value;
    if (value > maxValue) maxValue = value;
  });
});

// Arrondir le max à la centaine supérieure
maxValue = Math.ceil(maxValue / 100) * 100;
minValue = Math.floor(minValue / 100) * 100;

// Calculer un intervalle approprié
const interval = Math.ceil(maxValue / 5 / 100) * 100;

const el = document.getElementById('graph1');
  const data = {
    categories: years, // Utiliser les années comme catégories
    series: countries.map((country, index) => ({
      name: country,
      data: years.map(year => yearData[year][index])
    }))
  };

const options = {
  chart: { width: 800, height: 700},
  xAxis: {
    title: 'Années'
  },
  yAxis: {
    title: 'Valeur',
    tick: {
      interval: interval,
    },
    min: minValue,
    max: maxValue
  },
  legend: {
    align: 'bottom',  // Placer la légende en bas
    visible: true,
    item: {
      width: 100,  // Largeur de chaque élément de la légende
      margin: 5  // Marge entre les éléments de la légende
    }
  }
};

const chart = Chart.columnChart({ el, data, options });
});