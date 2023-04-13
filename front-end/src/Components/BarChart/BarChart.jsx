/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';

export default function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <Bar
        data={ chartData }
        options={ {
          plugins: {
            title: {
              display: true,
              text: '',
            },
            legend: {
              display: false,
            },
          },
        } }
      />
    </div>
  );
}
