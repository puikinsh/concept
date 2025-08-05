// Chart.js Component - Unified chart library for all chart types
import Chart from 'chart.js/auto';

// Chart color palette
const colors = {
  primary: '#5969ff',
  secondary: '#6c757d',
  success: '#28a745',
  info: '#17a2b8',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#23272b',
  // Additional colors
  purple: '#7b1fa2',
  pink: '#ff407b',
  orange: '#fd7e14',
  teal: '#20c997',
  cyan: '#17a2b8',
  gray: '#6c757d',
  grayDark: '#343a40'
};

// Default chart options
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      cornerRadius: 4,
      titleFont: {
        size: 14
      },
      bodyFont: {
        size: 13
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12
        }
      }
    },
    y: {
      grid: {
        borderDash: [3, 3],
        color: 'rgba(0, 0, 0, 0.08)'
      },
      ticks: {
        font: {
          size: 12
        }
      }
    }
  }
};

/**
 * Create a sparkline chart (small inline chart)
 * @param {string|HTMLElement} selector - Canvas selector or element
 * @param {Array} data - Chart data values
 * @param {Object} options - Additional options
 * @returns {Chart} Chart instance
 */
export function createSparkline(selector, data, options = {}) {
  const canvas = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
    
  if (!canvas) {
    console.error('Canvas element not found:', selector);
    return null;
  }
  
  const sparklineOptions = {
    type: 'line',
    data: {
      labels: new Array(data.length).fill(''),
      datasets: [{
        data: data,
        borderColor: options.color || colors.primary,
        backgroundColor: `${options.color || colors.primary}08`,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        filler: {
          propagate: false
        }
      },
      interaction: {
        intersect: false
      },
      scales: {
        x: { 
          display: false,
          grid: { display: false }
        },
        y: { 
          display: false,
          grid: { display: false },
          beginAtZero: false,
          min: Math.min(...data) * 0.8,  // Slightly more room at bottom
          max: Math.max(...data) * 1.1   // Less padding at top
        }
      },
      elements: {
        point: { radius: 0 },
        line: { 
          borderWidth: options.lineWidth || 2,
          tension: options.tension || 0.4
        }
      },
      layout: {
        padding: {
          top: 5,      // Add small padding to prevent clipping
          right: 2,
          bottom: 2,
          left: 2
        }
      }
    }
  };
  
  return new Chart(canvas, sparklineOptions);
}

/**
 * Create a line chart
 * @param {string|HTMLElement} selector - Canvas selector or element
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 * @returns {Chart} Chart instance
 */
export function createLineChart(selector, data, options = {}) {
  const canvas = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
    
  if (!canvas) {
    console.error('Canvas element not found:', selector);
    return null;
  }
  
  const chartConfig = {
    type: 'line',
    data: data,
    options: {
      ...defaultOptions,
      ...options,
      elements: {
        line: {
          tension: 0.4
        }
      }
    }
  };
  
  return new Chart(canvas, chartConfig);
}

/**
 * Create a bar chart
 * @param {string|HTMLElement} selector - Canvas selector or element
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 * @returns {Chart} Chart instance
 */
export function createBarChart(selector, data, options = {}) {
  const canvas = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
    
  if (!canvas) {
    console.error('Canvas element not found:', selector);
    return null;
  }
  
  const chartConfig = {
    type: 'bar',
    data: data,
    options: {
      ...defaultOptions,
      ...options,
      elements: {
        bar: {
          borderRadius: 4,
          borderSkipped: 'bottom'
        }
      }
    }
  };
  
  return new Chart(canvas, chartConfig);
}

/**
 * Create a doughnut chart
 * @param {string|HTMLElement} selector - Canvas selector or element
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 * @returns {Chart} Chart instance
 */
export function createDoughnutChart(selector, data, options = {}) {
  const canvas = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
    
  if (!canvas) {
    console.error('Canvas element not found:', selector);
    return null;
  }
  
  const chartConfig = {
    type: 'doughnut',
    data: data,
    options: {
      ...defaultOptions,
      ...options,
      cutout: '70%',
      plugins: {
        ...defaultOptions.plugins,
        legend: {
          ...defaultOptions.plugins.legend,
          position: options.legendPosition || 'bottom'
        }
      }
    }
  };
  
  // Remove scales for doughnut charts
  delete chartConfig.options.scales;
  
  return new Chart(canvas, chartConfig);
}

/**
 * Create a pie chart
 * @param {string|HTMLElement} selector - Canvas selector or element
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 * @returns {Chart} Chart instance
 */
export function createPieChart(selector, data, options = {}) {
  const canvas = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
    
  if (!canvas) {
    console.error('Canvas element not found:', selector);
    return null;
  }
  
  const chartConfig = {
    type: 'pie',
    data: data,
    options: {
      ...defaultOptions,
      ...options,
      plugins: {
        ...defaultOptions.plugins,
        legend: {
          ...defaultOptions.plugins.legend,
          position: options.legendPosition || 'bottom'
        }
      }
    }
  };
  
  // Remove scales for pie charts
  delete chartConfig.options.scales;
  
  return new Chart(canvas, chartConfig);
}

/**
 * Create an area chart (filled line chart)
 * @param {string|HTMLElement} selector - Canvas selector or element
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 * @returns {Chart} Chart instance
 */
export function createAreaChart(selector, data, options = {}) {
  const canvas = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
    
  if (!canvas) {
    console.error('Canvas element not found:', selector);
    return null;
  }
  
  // Ensure datasets have fill property
  data.datasets = data.datasets.map(dataset => ({
    ...dataset,
    fill: dataset.fill !== undefined ? dataset.fill : 'origin'
  }));
  
  const chartConfig = {
    type: 'line',
    data: data,
    options: {
      ...defaultOptions,
      ...options,
      elements: {
        line: {
          tension: 0.4
        }
      }
    }
  };
  
  return new Chart(canvas, chartConfig);
}

/**
 * Create a mixed chart (bar + line)
 * @param {string|HTMLElement} selector - Canvas selector or element
 * @param {Object} data - Chart data with type specified per dataset
 * @param {Object} options - Chart options
 * @returns {Chart} Chart instance
 */
export function createMixedChart(selector, data, options = {}) {
  const canvas = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
    
  if (!canvas) {
    console.error('Canvas element not found:', selector);
    return null;
  }
  
  const chartConfig = {
    type: 'bar', // Default type
    data: data,
    options: {
      ...defaultOptions,
      ...options
    }
  };
  
  return new Chart(canvas, chartConfig);
}

/**
 * Update chart data
 * @param {Chart} chart - Chart instance
 * @param {Object} newData - New data object
 */
export function updateChartData(chart, newData) {
  if (!chart) return;
  
  chart.data = newData;
  chart.update();
}

/**
 * Destroy chart instance
 * @param {Chart} chart - Chart instance
 */
export function destroyChart(chart) {
  if (chart) {
    chart.destroy();
  }
}

/**
 * Initialize all charts with data-chart attribute
 */
export function initAllCharts() {
  const charts = document.querySelectorAll('[data-chart]');
  const instances = [];
  
  charts.forEach(canvas => {
    const chartType = canvas.dataset.chart;
    const chartData = canvas.dataset.chartData;
    
    if (chartData) {
      try {
        const data = JSON.parse(chartData);
        let instance;
        
        switch (chartType) {
          case 'sparkline':
            instance = createSparkline(canvas, data);
            break;
          case 'line':
            instance = createLineChart(canvas, data);
            break;
          case 'bar':
            instance = createBarChart(canvas, data);
            break;
          case 'doughnut':
            instance = createDoughnutChart(canvas, data);
            break;
          case 'pie':
            instance = createPieChart(canvas, data);
            break;
          case 'area':
            instance = createAreaChart(canvas, data);
            break;
          case 'mixed':
            instance = createMixedChart(canvas, data);
            break;
          default:
            console.warn('Unknown chart type:', chartType);
        }
        
        if (instance) {
          instances.push({ element: canvas, instance });
        }
      } catch (e) {
        console.error('Error parsing chart data:', e);
      }
    }
  });
  
  return instances;
}

// Export Chart.js and colors for advanced usage
export { Chart, colors };