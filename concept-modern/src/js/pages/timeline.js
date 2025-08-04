// Timeline functionality
export function initializeTimeline() {
    let visibleActivities = new Set(['user', 'system', 'security', 'transaction', 'milestone']);
    
    // Filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.activity-filters input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateVisibility);
    });
    
    function updateVisibility() {
        visibleActivities.clear();
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                visibleActivities.add(checkbox.value);
            }
        });
        
        // Update timeline items visibility
        document.querySelectorAll('.timeline-item').forEach(item => {
            const type = item.dataset.type;
            if (visibleActivities.has(type)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Apply filters button
    document.getElementById('applyFilters').addEventListener('click', function() {
        const btn = this;
        const originalText = btn.textContent;
        
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Applying...';
        btn.disabled = true;
        
        setTimeout(() => {
            updateVisibility();
            showNotification('Filters applied successfully!', 'success');
            
            btn.textContent = originalText;
            btn.disabled = false;
        }, 500);
    });
    
    // Reset filters
    document.getElementById('resetFilters').addEventListener('click', function() {
        filterCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        document.getElementById('dateFilter').value = 'week';
        document.getElementById('userSearch').value = '';
        updateVisibility();
    });
    
    // Refresh timeline
    document.getElementById('refreshTimeline').addEventListener('click', function() {
        const btn = this;
        const originalHtml = btn.innerHTML;
        
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Refreshing...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Add new activity
            addNewActivity();
            showNotification('Timeline refreshed!', 'info');
            
            btn.innerHTML = originalHtml;
            btn.disabled = false;
        }, 1000);
    });
    
    // Export timeline
    document.getElementById('exportTimeline').addEventListener('click', function() {
        const btn = this;
        const originalHtml = btn.innerHTML;
        
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Exporting...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Generate and download timeline data
            exportTimelineData();
            
            btn.innerHTML = '<i class="fas fa-check me-1"></i>Exported!';
            
            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });
    
    // Load more activities
    document.getElementById('loadMore').addEventListener('click', function() {
        const btn = this;
        const originalHtml = btn.innerHTML;
        
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
        btn.disabled = true;
        
        setTimeout(() => {
            loadMoreActivities();
            
            btn.innerHTML = originalHtml;
            btn.disabled = false;
        }, 1000);
    });
    
    // Like and Reply buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-outline-primary') && e.target.textContent.includes('Like')) {
            const btn = e.target;
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            
            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            }
        }
        
        if (e.target.closest('.btn-outline-secondary') && e.target.textContent.includes('Reply')) {
            // Show reply input
            const timelineBody = e.target.closest('.timeline-body');
            if (!timelineBody.querySelector('.reply-input')) {
                const replyHtml = `
                    <div class="reply-input mt-3">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Write a reply...">
                            <button class="btn btn-primary" type="button">Send</button>
                        </div>
                    </div>
                `;
                timelineBody.insertAdjacentHTML('beforeend', replyHtml);
            }
        }
    });
    
    // Send reply
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'Send' && e.target.closest('.reply-input')) {
            const input = e.target.previousElementSibling;
            const replyText = input.value.trim();
            
            if (replyText) {
                const replyHtml = `
                    <div class="card bg-light mt-2">
                        <div class="card-body py-2">
                            <div class="d-flex align-items-center">
                                <img src="https://ui-avatars.com/api/?name=Current+User&background=667eea&color=fff" alt="Avatar" class="rounded-circle me-2" width="24" height="24">
                                <div class="flex-grow-1">
                                    <small class="fw-bold">You</small>
                                    <p class="mb-0 small">${replyText}</p>
                                </div>
                                <small class="text-muted">Just now</small>
                            </div>
                        </div>
                    </div>
                `;
                
                const replyInput = e.target.closest('.reply-input');
                replyInput.insertAdjacentHTML('beforebegin', replyHtml);
                replyInput.remove();
                
                showNotification('Reply posted!', 'success');
            }
        }
    });
    
    // Block IP button
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'Block IP') {
            const btn = e.target;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Blocking...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check me-2"></i>Blocked';
                btn.classList.remove('btn-danger');
                btn.classList.add('btn-success');
                
                showNotification('IP address has been blocked!', 'success');
            }, 1000);
        }
    });
    
    function addNewActivity() {
        const newActivity = `
            <div class="timeline-item new-item" data-type="user">
                <div class="timeline-marker bg-primary"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <img src="https://ui-avatars.com/api/?name=New+Activity&background=667eea&color=fff" alt="Avatar" class="rounded-circle me-2" width="32" height="32">
                        <div class="flex-grow-1">
                            <h6 class="mb-0">System <small class="text-muted">new user registered</small></h6>
                            <small class="text-muted"><i class="far fa-clock me-1"></i>Just now</small>
                        </div>
                        <span class="badge bg-info">New</span>
                    </div>
                    <div class="timeline-body">
                        <p class="mb-0">A new user has joined the platform.</p>
                    </div>
                </div>
            </div>
        `;
        
        const todaySection = document.querySelector('.timeline-date');
        todaySection.insertAdjacentHTML('afterend', newActivity);
        
        // Animate new item
        setTimeout(() => {
            document.querySelector('.new-item').classList.add('animate-in');
        }, 100);
    }
    
    function loadMoreActivities() {
        const activities = [
            {
                type: 'user',
                title: 'Sarah Wilson',
                action: 'uploaded documents',
                time: '3 days ago',
                body: 'Uploaded 5 new documents to the shared folder.',
                avatar: 'Sarah+Wilson',
                bgColor: '9b59b6'
            },
            {
                type: 'system',
                title: 'System Update',
                action: 'installed successfully',
                time: '4 days ago',
                body: 'Version 2.1.0 has been installed with new features and bug fixes.',
                icon: 'fas fa-download text-info'
            },
            {
                type: 'transaction',
                title: 'Payment Received',
                action: 'from client',
                time: '5 days ago',
                body: 'Invoice #INV-2024-0156 has been paid.',
                amount: '+$1,250.00'
            }
        ];
        
        const loadMoreBtn = document.getElementById('loadMore');
        const timeline = document.getElementById('timeline');
        
        activities.forEach(activity => {
            const activityHtml = createActivityHtml(activity);
            loadMoreBtn.insertAdjacentHTML('beforebegin', activityHtml);
        });
        
        // Add date separator
        const dateSeparator = `
            <div class="timeline-date">
                <h6 class="text-muted">Last Week</h6>
            </div>
        `;
        loadMoreBtn.insertAdjacentHTML('beforebegin', dateSeparator);
    }
    
    function createActivityHtml(activity) {
        let headerContent = '';
        
        if (activity.avatar) {
            headerContent = `<img src="https://ui-avatars.com/api/?name=${activity.avatar}&background=${activity.bgColor || '667eea'}&color=fff" alt="Avatar" class="rounded-circle me-2" width="32" height="32">`;
        } else if (activity.icon) {
            headerContent = `<i class="${activity.icon} me-2"></i>`;
        }
        
        const markerColor = {
            user: 'bg-primary',
            system: 'bg-warning',
            security: 'bg-danger',
            transaction: 'bg-success',
            milestone: 'bg-info'
        }[activity.type] || 'bg-secondary';
        
        return `
            <div class="timeline-item" data-type="${activity.type}">
                <div class="timeline-marker ${markerColor}"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        ${headerContent}
                        <div class="flex-grow-1">
                            <h6 class="mb-0">${activity.title} <small class="text-muted">${activity.action}</small></h6>
                            <small class="text-muted"><i class="far fa-clock me-1"></i>${activity.time}</small>
                        </div>
                        ${activity.amount ? `<span class="fw-bold text-success">${activity.amount}</span>` : ''}
                    </div>
                    <div class="timeline-body">
                        <p class="mb-0">${activity.body}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    function exportTimelineData() {
        const visibleItems = document.querySelectorAll('.timeline-item:not([style*="display: none"])');
        const data = [];
        
        visibleItems.forEach(item => {
            const header = item.querySelector('.timeline-header');
            const body = item.querySelector('.timeline-body');
            const time = header.querySelector('.text-muted').textContent;
            const title = header.querySelector('h6').textContent;
            const content = body.querySelector('p')?.textContent || '';
            
            data.push({
                time: time,
                title: title,
                content: content,
                type: item.dataset.type
            });
        });
        
        // Convert to CSV
        const csv = 'Time,Title,Content,Type\n' + 
            data.map(row => `"${row.time}","${row.title}","${row.content}","${row.type}"`).join('\n');
        
        // Download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'timeline_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
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
        }, 3000);
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTimeline);
} else {
    initializeTimeline();
}