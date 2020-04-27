//The Covid-19 data api is from https://covid19api.com

drawChart();
// Create Chart function
async function drawChart() {
  const data = await getData();
  const ctx = document.getElementById("chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "horizontalBar",
    data: {
      labels: data.ys,
      datasets: [
        {
          label: "Covid-19 Reported Cases",
          data: data.xs,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          anchor: "end",
          align: "end",
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

// Get Data from the api with axios
async function getData() {
  const xs = [];
  const ys = [];
  try {
    const response = await axios.get("https://api.covid19api.com/summary");
    const data = await response.data;
    const countries = await data.Countries;
    //Sort the array by TotalConfirmed cases(descending)
    countries.sort((a, b) => {
      if (a.TotalConfirmed < b.TotalConfirmed) return 1;
      else if (b.TotalConfirmed < a.TotalConfirmed) return -1;
      else return 0;
    });
    //Loop through the countries
    countries.forEach((element) => {
      const country = element.Country;
      ys.push(country);
      const cases = element.TotalConfirmed;
      xs.push(cases);
    });
    return { xs, ys };
  } catch {
    (error) => {
      console.error(error);
    };
  }
}
