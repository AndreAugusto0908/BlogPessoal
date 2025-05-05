import { Injectable } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartTypeRegistry
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() {}

  createBarChart(
    canvasId: string,
    labels: string[],
    data: number[],
    title: string
  ): Chart<keyof ChartTypeRegistry, number[], string> {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderRadius: 10
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title,
            color: '#ffffff'
          },
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1f2937'
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#fff'
            }
          },
          y: {
            ticks: {
              color: '#fff'
            }
          }
        }
      }
    });
  }
}
