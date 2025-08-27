import $ from 'jquery';
import DataTable from 'datatables.net-bs5';
import { logger } from '../utils/logger.js';
import { confirmDelete } from '../utils/confirm-dialog.js';
import 'datatables.net-responsive';
import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';

// User Management functionality
export function initializeUserManagement() {
  const selectedUsers = new Set();

  // Initialize DataTable
  const table = new DataTable('#userTable', {
    responsive: true,
    pageLength: 10,
    order: [[5, 'desc']], // Sort by joined date
    columnDefs: [
      { orderable: false, targets: [0, 7] }, // Disable sorting for checkbox and actions
      { searchable: false, targets: [0, 7] }
    ],
    language: {
      search: '_INPUT_',
      searchPlaceholder: 'Search users...',
      lengthMenu: '_MENU_ users per page',
      info: 'Showing _START_ to _END_ of _TOTAL_ users',
      paginate: {
        previous: '<i class="fas fa-chevron-left"></i>',
        next: '<i class="fas fa-chevron-right"></i>'
      }
    },
    drawCallback() {
      // Re-initialize tooltips after table redraw
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map((tooltipTriggerEl) => {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  });

  // Hide default search box as we're using custom search
  document.querySelector('.dataTables_filter').style.display = 'none';

  // Custom search functionality
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keyup', function () {
    table.search(this.value).draw();
  });

  // Filter functionality
  const roleFilter = document.getElementById('roleFilter');
  const statusFilter = document.getElementById('statusFilter');

  roleFilter.addEventListener('change', () => {
    filterTable();
  });

  statusFilter.addEventListener('change', () => {
    filterTable();
  });

  function filterTable() {
    const role = roleFilter.value;
    const status = statusFilter.value;

    // Custom filtering logic
    $.fn.dataTable.ext.search.push((settings, data, _dataIndex) => {
      const roleCell = data[3]; // Role column
      const statusCell = data[4]; // Status column

      let roleMatch = true;
      let statusMatch = true;

      if (role && !roleCell.toLowerCase().includes(role.toLowerCase())) {
        roleMatch = false;
      }

      if (status && !statusCell.toLowerCase().includes(status.toLowerCase())) {
        statusMatch = false;
      }

      return roleMatch && statusMatch;
    });

    table.draw();

    // Clear custom filter
    $.fn.dataTable.ext.search.pop();
  }

  // Reset filters
  document.getElementById('resetFilters').addEventListener('click', () => {
    searchInput.value = '';
    roleFilter.value = '';
    statusFilter.value = '';
    table.search('').draw();
  });

  // Select all checkbox
  const selectAllCheckbox = document.getElementById('selectAll');
  selectAllCheckbox.addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('#userTable tbody input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = this.checked;
      const row = checkbox.closest('tr');
      if (this.checked) {
        selectedUsers.add(row);
        row.classList.add('table-active');
      } else {
        selectedUsers.delete(row);
        row.classList.remove('table-active');
      }
    });
    updateBulkActions();
  });

  // Individual checkbox handling
  document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && e.target.closest('#userTable tbody')) {
      const row = e.target.closest('tr');
      if (e.target.checked) {
        selectedUsers.add(row);
        row.classList.add('table-active');
      } else {
        selectedUsers.delete(row);
        row.classList.remove('table-active');
        selectAllCheckbox.checked = false;
      }
      updateBulkActions();
    }
  });

  // Update bulk actions visibility
  function updateBulkActions() {
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');

    if (selectedUsers.size > 0) {
      bulkActions.style.display = 'block';
      selectedCount.textContent = selectedUsers.size;
    } else {
      bulkActions.style.display = 'none';
    }
  }

  // Export functionality
  document.getElementById('exportBtn').addEventListener('click', function () {
    const btn = this;
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Exporting...';
    btn.disabled = true;

    setTimeout(() => {
      // Simulate export
      const csvContent = generateCSV();
      downloadCSV(csvContent, 'users_export.csv');

      btn.innerHTML = '<i class="fas fa-check me-1"></i>Exported!';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 2000);
    }, 1500);
  });

  function generateCSV() {
    const headers = ['Name', 'Email', 'Username', 'Role', 'Status', 'Joined Date'];
    const rows = [];

    // Get visible rows from DataTable
    table.rows({ search: 'applied' }).every(function () {
      const data = this.data();
      const name = $(data[1]).find('h6').text();
      const username = $(data[1]).find('small').text().replace('@', '');
      const email = data[2];
      const role = $(data[3]).text();
      const status = $(data[4]).text();
      const joined = data[5];

      rows.push([name, email, username, role, status, joined]);
    });

    // Create CSV content
    let csv = `${headers.join(',')}\n`;
    rows.forEach((row) => {
      csv += `${row.map((cell) => `"${cell}"`).join(',')}\n`;
    });

    return csv;
  }

  function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Add user form
  const addUserForm = document.getElementById('addUserForm');
  addUserForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Adding...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Get form data
      const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        role: document.getElementById('role').value,
        status: document.getElementById('status').value,
        sendInvite: document.getElementById('sendInvite').checked
      };

      // Add new row to table
      const newRow = createUserRow(formData);
      table.row.add($(newRow)).draw();

      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
      modal.hide();

      // Reset form
      addUserForm.reset();

      // Show success message
      showNotification('User added successfully!', 'success');

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });

  function createUserRow(data) {
    const name = `${data.firstName} ${data.lastName}`;
    // const initials = `${data.firstName[0]}${data.lastName[0]}`; // Currently unused, keeping for future avatar feature
    const bgColor = getRandomColor();
    const roleClass = getRoleBadgeClass(data.role);
    const statusClass = getStatusBadgeClass(data.status);
    const joinedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return `
            <tr>
                <td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox">
                    </div>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=fff" alt="Avatar" class="rounded-circle me-3" width="40" height="40">
                        <div>
                            <h6 class="mb-0">${name}</h6>
                            <small class="text-muted">@${data.username}</small>
                        </div>
                    </div>
                </td>
                <td>${data.email}</td>
                <td><span class="badge bg-${roleClass}">${capitalizeFirst(data.role)}</span></td>
                <td><span class="badge bg-${statusClass}">${capitalizeFirst(data.status)}</span></td>
                <td>${joinedDate}</td>
                <td>Just now</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-light" type="button" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#"><i class="fas fa-eye me-2"></i>View</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-edit me-2"></i>Edit</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#"><i class="fas fa-trash me-2"></i>Delete</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        `;
  }

  function getRandomColor() {
    const colors = ['667eea', '48bb78', 'f39c12', 'e74c3c', '3498db', '9b59b6', '1abc9c'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function getRoleBadgeClass(role) {
    const classes = {
      admin: 'danger',
      manager: 'primary',
      user: 'info',
      guest: 'secondary'
    };
    return classes[role] || 'secondary';
  }

  function getStatusBadgeClass(status) {
    const classes = {
      active: 'success',
      pending: 'warning text-dark',
      inactive: 'secondary',
      suspended: 'danger'
    };
    return classes[status] || 'secondary';
  }

  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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

  // Handle action buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.dropdown-item')) {
      const action = e.target.textContent.trim();
      const row = e.target.closest('tr');
      const userName = row.querySelector('h6').textContent;

      switch (action) {
        case 'View':
          // Show user details
          logger.info('View user:', userName);
          break;
        case 'Edit':
          // Open edit modal
          logger.info('Edit user:', userName);
          break;
        case 'Delete':
          confirmDelete(userName).then((confirmed) => {
            if (confirmed) {
              table.row(row).remove().draw();
              showNotification('User deleted successfully!', 'success');
            }
          });
          break;
      }
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeUserManagement);
} else {
  initializeUserManagement();
}
