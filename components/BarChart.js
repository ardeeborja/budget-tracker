import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import moment from 'moment';

export default function BarChart(props) {
  // console.log(props)
  // states for processed data to be plotted
  const [months, setMonths] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  //run useEffect to gell all the avail months or the months that has a sale
  useEffect(() => {
    if (props.rawData.length > 0) {
      let tempMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      // console.log(tempMonths)
      setMonths(tempMonths);
    }
  }, [props.rawData]);

  // console.log(months)

  const data = {
    labels: months, //x-axis
    datasets: [
      {
        label: props.label,
        backgroundColor: props.color,
        borderColor: 'white',
        borderWidth: 1,
        hoverBackgroundColor: 'lightblue',
        hoverBorderColor: 'black',
        data: props.rawData, //determinant for bars
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={data} options={options} />;
}
