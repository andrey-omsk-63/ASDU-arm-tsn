import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      // position: 'top' as const,
      position: 'top',
    },
    title: {
      // display: true,
      // text: 'Очковые змеи - это КОБРЫ а не глисты',
    },
  },
};

const labels = [
  'January',
  '',
  '',
  'February',
  '',
  '',
  'March',
  '',
  '',
  'April',
  '',
  '',
  'May',
  'June',
  '',
  '',
  'July',
];

const data = {
  labels,
  datasets: [
    {
      label: 'Канал 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      // backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

const Statistic112 = () => {
  return <Line options={options} data={data} />;
};

export default Statistic112;
