import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { FC } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
      text: 'Chart.js Line Chart',
    },
  },
}

const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 56, 55],
      fill: true,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.1,
    },
  ],
}

// -------------------------------------------------------------------
type AreaBarProps = {
  w: number
}
// -------------------------------------------------------------------

const AreaBar: FC<AreaBarProps> = ({ w }) => {
  console.log(`w-[${w}px]`)
  return (
    <div style={{ width: `${w}px` }}>
      <Line options={options} data={data} />
    </div>
  )
}

export default AreaBar