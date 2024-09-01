import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import axiosInstance from '../axiosInstance';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/bar-data');
        const data = response.data;
      
        const labels = data.labels;
        const values = data.values;
      
        setChartData({
          labels,
          datasets: [
            {
              label: 'Category Count',
              data: values,
              backgroundColor: '#6495ED',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full h-96'>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20, 
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.raw}`;
                }
              }
            }
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default BarChart;
