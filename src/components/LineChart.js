import React from 'react'
import { Chart as ChartJS, CategoryScale,   LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend } from 'chart.js';
import { Chart, Line } from 'react-chartjs-2'

export default function LineChart({rawData}) {
  const coinPrice = rawData
  const coinTimestamp = [];
  
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const calTimeStamp = (rawData, coinTimestamp) => {
    const numberOfTimestamps = rawData.length;
    const timeInterval = 7 * 24 * 60 * 60 * 1000 / numberOfTimestamps;
    const currentTime = Date.now();

    for (let i = 0; i < numberOfTimestamps; i++) {
      const timestamp = currentTime - i * timeInterval;
      const date = new Date(timestamp)
      coinTimestamp.push(date.toLocaleDateString());
    }
    coinTimestamp.reverse();
  }
  calTimeStamp(rawData, coinTimestamp)
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };
  const options = {
    maintainAspectRatio : false,
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
  return (
    <div className='md:max-w-[1040px] h-[32vh] m-auto'>
        <Line data={data} options={options} />
    </div>
  )
}
