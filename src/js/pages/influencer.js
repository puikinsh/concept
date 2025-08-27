import Chart from 'chart.js/auto';
import { logger } from '../utils/logger.js';
import { confirmDialog } from '../utils/confirm-dialog.js';

// Influencer Dashboard functionality
export function initializeInfluencerDashboard() {
  // Initialize Engagement Chart
  const engagementCtx = document.getElementById('engagementChart');
  if (engagementCtx) {
    new Chart(engagementCtx, {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        datasets: [
          {
            label: 'Instagram',
            data: [3.2, 3.5, 3.8, 4.2, 4.5, 4.8, 5.1, 5.3, 5.2, 5.5, 5.8, 6.1],
            borderColor: '#E1306C',
            backgroundColor: 'rgba(225, 48, 108, 0.1)',
            tension: 0.4
          },
          {
            label: 'TikTok',
            data: [2.8, 3.1, 3.6, 4.0, 4.3, 4.7, 5.0, 5.4, 5.7, 6.0, 6.3, 6.8],
            borderColor: '#000000',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            tension: 0.4
          },
          {
            label: 'YouTube',
            data: [2.5, 2.6, 2.8, 3.0, 3.2, 3.1, 3.3, 3.5, 3.4, 3.6, 3.8, 3.9],
            borderColor: '#FF0000',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            tension: 0.4
          },
          {
            label: 'Twitter',
            data: [1.8, 2.0, 2.1, 2.3, 2.5, 2.7, 2.6, 2.8, 2.9, 3.0, 3.1, 3.2],
            borderColor: '#1DA1F2',
            backgroundColor: 'rgba(29, 161, 242, 0.1)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label(context) {
                return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 8,
            ticks: {
              callback(value) {
                return `${value}%`;
              }
            },
            title: {
              display: true,
              text: 'Engagement Rate'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }

  // Initialize Demographics Chart
  const demographicsCtx = document.getElementById('demographicsChart');
  if (demographicsCtx) {
    new Chart(demographicsCtx, {
      type: 'doughnut',
      data: {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [
          {
            data: [35, 42, 15, 6, 2],
            backgroundColor: ['#667eea', '#48bb78', '#f39c12', '#e74c3c', '#9b59b6'],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              },
              generateLabels(chart) {
                const { data } = chart;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const dataset = data.datasets[0];
                    const value = dataset.data[i];
                    return {
                      text: `${label} (${value}%)`,
                      fillStyle: dataset.backgroundColor[i],
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            callbacks: {
              label(context) {
                return `${context.label}: ${context.parsed}%`;
              }
            }
          }
        },
        cutout: '70%'
      }
    });
  }

  // Animate progress bars on scroll
  const progressBars = document.querySelectorAll('.progress-bar');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const { width } = progressBar.style;
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = width;
          progressBar.style.transition = 'width 1s ease-out';
        }, 100);
        progressObserver.unobserve(progressBar);
      }
    });
  }, observerOptions);

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });

  // Campaign actions
  document.addEventListener('click', (e) => {
    if (e.target.closest('.dropdown-item')) {
      const action = e.target.textContent.trim();
      const row = e.target.closest('tr');
      const campaignName = row.querySelector('h6').textContent;

      switch (action) {
        case 'View Details':
          logger.info('View details for:', campaignName);
          break;
        case 'Analytics':
          logger.info('Show analytics for:', campaignName);
          break;
        case 'Pause':
          confirmDialog({
            title: 'Pause Campaign',
            message: `Are you sure you want to pause the "${campaignName}" campaign?`,
            confirmText: 'Pause',
            confirmClass: 'btn-warning'
          }).then((confirmed) => {
            if (confirmed) {
              const statusBadge = row.querySelector('.badge');
              statusBadge.classList.remove('bg-success');
              statusBadge.classList.add('bg-secondary');
              statusBadge.textContent = 'Paused';
              showNotification(`Campaign "${campaignName}" has been paused.`, 'info');
            }
          });
          break;
        case 'Start': {
          const statusBadge = row.querySelector('.badge');
          statusBadge.classList.remove('bg-warning', 'text-dark');
          statusBadge.classList.add('bg-success');
          statusBadge.textContent = 'Active';
          showNotification(`Campaign "${campaignName}" has been started.`, 'success');
          break;
        }
      }
    }
  });

  // Add new campaign button
  const newCampaignBtn = document.querySelector('.btn-primary.btn-sm');
  if (newCampaignBtn) {
    newCampaignBtn.addEventListener('click', () => {
      logger.info('Open new campaign modal');
      showNotification('New campaign feature coming soon!', 'info');
    });
  }
}

// Notification helper
function showNotification(message, type = 'info') {
  const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" role="alert" style="z-index: 1050;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

  document.body.insertAdjacentHTML('beforeend', alertHtml);

  setTimeout(() => {
    const alert = document.querySelector('.alert');
    if (alert) {
      alert.remove();
    }
  }, 5000);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInfluencerDashboard);
} else {
  initializeInfluencerDashboard();
}
