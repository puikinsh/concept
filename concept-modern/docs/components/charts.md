# Charts

Concept uses Chart.js for creating responsive, animated charts. This guide covers implementation and customization.

## Setup

### Basic Initialization
```javascript
import Chart from 'chart.js/auto';

// Get canvas element
const ctx = document.getElementById('myChart').getContext('2d');

// Create chart
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#5969ff',
      backgroundColor: 'rgba(89, 105, 255, 0.1)'
    }]
  }
});
```

## Chart Types

### Line Chart
```javascript
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'This Week',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: '#5969ff',
      backgroundColor: 'rgba(89, 105, 255, 0.1)',
      tension: 0.4
    }, {
      label: 'Last Week',
      data: [45, 39, 60, 71, 46, 35, 30],
      borderColor: '#ff407b',
      backgroundColor: 'rgba(255, 64, 123, 0.1)',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
```

### Bar Chart
```javascript
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: '2023',
      data: [12000, 19000, 15000, 25000],
      backgroundColor: '#5969ff'
    }, {
      label: '2024',
      data: [15000, 23000, 18000, 29000],
      backgroundColor: '#ff407b'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  }
});
```

### Pie/Doughnut Chart
```javascript
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [{
      data: [55, 30, 15],
      backgroundColor: [
        '#5969ff',
        '#ff407b',
        '#25d5f2'
      ],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    }
  }
});
```

### Area Chart
```javascript
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [10, 25, 20, 30, 45, 40],
      borderColor: '#5969ff',
      backgroundColor: 'rgba(89, 105, 255, 0.2)',
      fill: true,
      tension: 0.4
    }]
  }
});
```

## Dashboard Charts

### Revenue Chart
```javascript
function createRevenueChart(canvasId) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: getLast12Months(),
      datasets: [{
        label: 'Revenue',
        data: [45000, 52000, 48000, 58000, 63000, 72000, 
               78000, 82000, 79000, 85000, 91000, 95000],
        borderColor: '#5969ff',
        backgroundColor: 'rgba(89, 105, 255, 0.05)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#ddd',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return 'Revenue: $' + context.parsed.y.toLocaleString();
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'k';
            }
          }
        }
      }
    }
  });
}
```

### Real-time Chart
```javascript
class RealtimeChart {
  constructor(canvasId) {
    this.chart = new Chart(document.getElementById(canvasId), {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Active Users',
          data: [],
          borderColor: '#5969ff',
          backgroundColor: 'rgba(89, 105, 255, 0.1)',
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              duration: 20000,
              refresh: 1000,
              delay: 2000,
              onRefresh: chart => {
                chart.data.datasets.forEach(dataset => {
                  dataset.data.push({
                    x: Date.now(),
                    y: Math.random() * 100
                  });
                });
              }
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  start() {
    this.chart.options.scales.x.realtime.pause = false;
    this.chart.update('none');
  }
  
  stop() {
    this.chart.options.scales.x.realtime.pause = true;
    this.chart.update('none');
  }
}
```

## Advanced Features

### Mixed Chart Types
```javascript
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      type: 'bar',
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#5969ff'
    }, {
      type: 'line',
      label: 'Profit',
      data: [5, 8, 2, 3, 1, 2],
      borderColor: '#ff407b',
      backgroundColor: 'transparent',
      yAxisID: 'y1'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        position: 'left'
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    }
  }
});
```

### Dynamic Updates
```javascript
// Update chart data
function updateChartData(chart, newData) {
  chart.data.datasets[0].data = newData;
  chart.update();
}

// Add data point
function addDataPoint(chart, label, value) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(value);
  });
  chart.update();
}

// Remove data point
function removeDataPoint(chart) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.shift();
  });
  chart.update();
}
```

### Chart Interactions
```javascript
new Chart(ctx, {
  type: 'bar',
  data: chartData,
  options: {
    onClick: (event, activeElements) => {
      if (activeElements.length > 0) {
        const dataIndex = activeElements[0].index;
        const label = chart.data.labels[dataIndex];
        console.log('Clicked on:', label);
        // Handle click
      }
    },
    onHover: (event, activeElements) => {
      ctx.canvas.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
    }
  }
});
```

## Responsive Charts

### Container-based Sizing
```html
<div class="chart-container" style="position: relative; height:400px;">
  <canvas id="responsiveChart"></canvas>
</div>
```

```javascript
new Chart(document.getElementById('responsiveChart'), {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
```

### Responsive Options
```javascript
new Chart(ctx, {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    aspectRatio: 2,
    resizeDelay: 200,
    plugins: {
      legend: {
        display: window.innerWidth > 768,
        position: window.innerWidth > 768 ? 'right' : 'top'
      }
    }
  }
});
```

## Custom Styling

### Theme Colors
```javascript
// Define theme colors
const chartColors = {
  primary: '#5969ff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8'
};

// Use in charts
new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      backgroundColor: [
        chartColors.primary,
        chartColors.success,
        chartColors.warning,
        chartColors.danger
      ]
    }]
  }
});
```

### Gradient Fills
```javascript
// Create gradient
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(89, 105, 255, 0.5)');
gradient.addColorStop(1, 'rgba(89, 105, 255, 0)');

new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      backgroundColor: gradient,
      fill: true
    }]
  }
});
```

## Chart Utilities

### Export Chart
```javascript
function exportChart(chart, filename = 'chart.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = chart.toBase64Image();
  link.click();
}

// Usage
const exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', () => {
  exportChart(myChart, 'sales-report.png');
});
```

### Chart Loading State
```javascript
function showChartLoading(canvasId) {
  const canvas = document.getElementById(canvasId);
  const parent = canvas.parentElement;
  
  parent.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height: 400px;">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
}

async function loadChartData(url, canvasId) {
  showChartLoading(canvasId);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Recreate canvas
    const parent = document.querySelector(`#${canvasId}`).parentElement;
    parent.innerHTML = `<canvas id="${canvasId}"></canvas>`;
    
    // Create chart
    new Chart(document.getElementById(canvasId), data);
  } catch (error) {
    console.error('Failed to load chart data:', error);
  }
}
```

## Performance Tips

### Data Decimation
```javascript
new Chart(ctx, {
  type: 'line',
  data: largeDataset,
  options: {
    parsing: false,
    normalized: true,
    animation: false,
    plugins: {
      decimation: {
        enabled: true,
        algorithm: 'lttb',
        samples: 500
      }
    }
  }
});
```

### Disable Animations
```javascript
// Globally
Chart.defaults.animation = false;

// Per chart
new Chart(ctx, {
  options: {
    animation: {
      duration: 0
    }
  }
});
```

## Best Practices

### DO:
- Choose appropriate chart types for data
- Keep charts simple and focused
- Use consistent color schemes
- Provide context with labels and legends
- Make charts responsive
- Test on different screen sizes

### DON'T:
- Don't overload charts with data
- Don't use 3D effects unnecessarily
- Don't forget accessibility
- Don't use too many colors
- Don't ignore mobile users