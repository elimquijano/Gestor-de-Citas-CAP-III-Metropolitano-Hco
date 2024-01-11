import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'
import { FC } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Estado General de Citas',
    },
  },
}

const data = {
  labels: ['Citas Pendientes', 'Citas Aceptadas', 'Citas Rechazadas'],
  datasets: [
    {
      label: 'Visualización de Citas',
      data: [1, 3, 2],
      backgroundColor: [
        'rgba(53, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 206, 86, 0.5)',
      ],
    },
  ],
}

// -------------------------------------------------------------------
type VerticalBarProps = {
  w: number
}
// -------------------------------------------------------------------

const VerticalBar: FC<VerticalBarProps> = ({ w }) => {
  return (
    <div style={{ width: `${w}px` }}>
      <Bar options={options} data={data} />
    </div>
  )
}

export default VerticalBar