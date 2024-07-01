document.addEventListener("DOMContentLoaded", function () {
  const { Chart } = toastui;

  // Créer un nouveau div pour les graphique
  var graphDiv = document.createElement("div");
  graphDiv.id = "graph1";

  var graphDiv2 = document.createElement("div");
  graphDiv2.id = "graph2";

  var graphDiv3 = document.createElement("div");
  graphDiv3.id = "graph3";

  // Insérer le div juste au-dessus de la table avec l'id 'table1'
  var table1 = document.getElementById("table1");
  table1.parentNode.insertBefore(graphDiv, table1);

  var table2 = document.getElementById("table2");
  table2.parentNode.insertBefore(graphDiv2, table2);

  // Utiliser insertAdjacentElement pour insérer graphDiv3 après heading1
  var h1 = document.getElementById("firstHeading");
  h1.insertAdjacentElement("afterend", graphDiv3);

  // Graphique 1 ***********

  // Récupérer les données du tableau
  const rows = Array.from(table1.querySelectorAll("tr"));
  const countries = [];
  const yearData = {};

  // Extraire les années des en-têtes
  const headers = rows[1].querySelectorAll("th");
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
    const cells = row.querySelectorAll("td");
    if (cells.length > 1) {
      const country = cells[0].textContent.trim(); // Utiliser cells[0] pour le pays
      if (country) {
        countries.push(country);
        years.forEach((year, yearIndex) => {
          const value =
            parseFloat(cells[yearIndex + 1]?.textContent.replace(",", ".")) ||
            0; // yearIndex + 1 pour les données
          yearData[year].push(value);
        });
      }
    }
  });

  // Calculer le min et max des données. l'utilisation de "Infinity" permet de comparer toutes les valeurs qui seront rentrer dans les variables et qui seront toujours inférieur ou supérieur à ces variables.
  let minValue = Infinity;
  let maxValue = -Infinity;

  Object.values(yearData).forEach((yearValues) => {
    yearValues.forEach((value) => {
      if (value < minValue) minValue = value;
      if (value > maxValue) maxValue = value;
    });
  });

  // Arrondir le max à la centaine supérieure
  maxValue = Math.ceil(maxValue / 100) * 100;
  minValue = Math.floor(minValue / 100) * 100;

  // Calculer un intervalle approprié
  const interval = Math.ceil(maxValue / 5 / 100) * 100;

  const el = document.getElementById("graph1");
  const data = {
    categories: years, // Utiliser les années comme catégories
    series: countries.map((country, index) => ({
      name: country,
      data: years.map((year) => yearData[year][index]),
    })),
  };

  const options = {
    chart: { width: 800, height: 700 },
    xAxis: {
      title: "Années",
    },
    yAxis: {
      title: "Valeur",
      tick: {
        interval: interval,
      },
      min: minValue,
      max: maxValue,
    },
    legend: {
      align: "bottom", // Placer la légende en bas
      visible: true,
      item: {
        width: 100, // Largeur de chaque élément de la légende
        margin: 5, // Marge entre les éléments de la légende
      },
    },
  };

  Chart.columnChart({ el, data, options });

  // Graphique 2 ***********

  const rowsTable2 = Array.from(table2.querySelectorAll("tr"));
  const countriesTable2 = [];
  const yearDataTable2 = {};

  // Récupérer les années du tableau 2

  const headersTable2 = rowsTable2[0].querySelectorAll("th");
  const yearsTable2 = [];

  headersTable2.forEach((th, index) => {
    if (index > 1) {
      const year = th.textContent.trim();
      if (year) {
        yearsTable2.push(year);
        yearDataTable2[year] = [];
      }
    }
  });

  // Récupérer les données liés aux pays du tableau 2

  rowsTable2.forEach((row, index) => {
    if (index <= 0) return; //Ignorer la premières ligne du tableau

    const cells = row.querySelectorAll("td");
    if (cells.length > 1) {
      const country = cells[0].textContent.trim();
      if (country) {
        countriesTable2.push(country);
        yearsTable2.forEach((year, yearIndex) => {
          const value =
            parseFloat(cells[yearIndex + 1]?.textContent.replace(",", ".")) ||
            0;
          yearDataTable2[year].push(value);
        });
      }
    }
  });

  // Calculer la plus petite et grande valeur

  let minValueTable2 = Infinity;
  let maxValueTable2 = -Infinity;

  Object.values(yearDataTable2).forEach((yearValues) => {
    yearValues.forEach((value) => {
      if (value < minValueTable2) minValueTable2 = value;
      if (value > maxValueTable2) maxValueTable2 = value;
    });
  });

  // Calculer l'intervalle pour l'axe Y

  const intervalTable2 = Math.ceil(maxValueTable2 / 5 / 100) * 100;

  // Créer le graphique

  const el2 = document.getElementById("graph2");
  const dataGraph2 = {
    categories: yearsTable2,
    series: countriesTable2.map((country, index) => ({
      name: country,
      data: yearsTable2.map((year) => yearDataTable2[year][index]),
    })),
  };

  const optionsGraph2 = {
    chart: { width: 800, height: 700 },
    xAxis: {
      title: "Années",
    },
    yAxis: {
      title: "Valeur",
      tick: {
        interval: intervalTable2,
      },
      min: minValueTable2,
      max: maxValueTable2,
    },
    legend: {
      align: "bottom", // Placer la légende en bas
      visible: true,
      item: {
        width: 100, // Largeur de chaque élément de la légende
        margin: 5, // Marge entre les éléments de la légende
      },
    },
  };

  Chart.columnChart({ el: el2, data: dataGraph2, options: optionsGraph2 });

  // Graphique 3 ***********
  let data3 = [];
  let minValue3 = Infinity;
  let maxValue3 = -Infinity;

  $.getJSON("https://canvasjs.com/services/data/datapoints.php", function(data) {
    data3 = data.map(value => ({
      x: value[0],
      y: parseInt(value[1])
    }));

    data3.forEach((point) => {
      if (point.y < minValue3) minValue3 = point.y;
      if (point.y > maxValue3) maxValue3 = point.y;
    });

    console.log(maxValue3);
    console.log(minValue3);

    let interval3 = Math.ceil((maxValue3 - minValue3) / 5);
    console.log(interval3);

    const el3 = document.getElementById("graph3");
    const dataGraph3 = {
      categories: data3.map(point => point.x),
      series: [{
        name: "Série 1",
        data: data3.map(point => point.y)
      }]
    };

    const optionsGraph3 = {
      chart: { width: 800, height: 600 },
      yAxis: {
        title: "Y",
        tick: {
          interval: interval3,
        },
        min: minValue3,
        max: maxValue3,
      },
      xAxis: {
        title: "X",
      },
    };

    Chart.lineChart({ el: el3, data: dataGraph3, options: optionsGraph3 });
  });
});
