import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.bootstrap5.css';

// Initialize all Tom Select instances
export function initializeMultiselect() {
    // Basic select
    new TomSelect('#select-basic', {
        create: false,
        sortField: {
            field: 'text',
            direction: 'asc'
        }
    });

    // Multiple select
    new TomSelect('#select-multiple', {
        maxItems: null,
        plugins: ['remove_button']
    });

    // Select with groups
    new TomSelect('#select-groups', {
        create: false,
        sortField: {
            field: 'text',
            direction: 'asc'
        }
    });

    // Select with disabled options
    new TomSelect('#select-disabled', {
        plugins: ['remove_button']
    });

    // Tags input
    new TomSelect('#select-tags', {
        persist: false,
        createOnBlur: true,
        create: true,
        plugins: ['remove_button']
    });

    // Tags with predefined options
    new TomSelect('#select-tags-predefined', {
        plugins: ['remove_button'],
        create: true,
        createFilter: function(input) {
            return input.length >= 2;
        }
    });

    // Select with search
    new TomSelect('#select-search', {
        create: false
    });

    // Select with clear button
    new TomSelect('#select-clear', {
        plugins: ['remove_button', 'clear_button']
    });

    // Select with limit
    new TomSelect('#select-limit', {
        maxItems: 3,
        plugins: ['remove_button']
    });

    // Select with remove button
    new TomSelect('#select-remove', {
        plugins: ['remove_button']
    });

    // Email input
    new TomSelect('#select-emails', {
        persist: false,
        createOnBlur: true,
        create: function(input) {
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(input)) {
                return {
                    value: input,
                    text: input
                };
            }
            return false;
        },
        plugins: ['remove_button']
    });

    // User selection with custom rendering
    new TomSelect('#select-users', {
        plugins: ['remove_button'],
        render: {
            option: function(data, escape) {
                return '<div>' +
                    '<span class="name">' + escape(data.text) + '</span>' +
                    '<span class="email text-muted ms-2">' + escape(data.email) + '</span>' +
                '</div>';
            },
            item: function(data, escape) {
                return '<div>' + escape(data.text) + '</div>';
            }
        }
    });

    // Custom skills selection
    new TomSelect('#select-custom', {
        plugins: ['remove_button', 'optgroup_columns'],
        render: {
            optgroup_header: function(data, escape) {
                return '<div class="optgroup-header fw-bold text-primary">' + escape(data.label) + '</div>';
            }
        }
    });

    // Color selection with custom rendering
    new TomSelect('#select-color', {
        plugins: ['remove_button'],
        valueField: 'value',
        labelField: 'text',
        searchField: ['text'],
        options: [
            {value: 'red', text: 'Red', color: '#dc3545'},
            {value: 'blue', text: 'Blue', color: '#0d6efd'},
            {value: 'green', text: 'Green', color: '#198754'},
            {value: 'yellow', text: 'Yellow', color: '#ffc107'},
            {value: 'purple', text: 'Purple', color: '#6f42c1'},
            {value: 'orange', text: 'Orange', color: '#fd7e14'},
            {value: 'pink', text: 'Pink', color: '#d63384'},
            {value: 'teal', text: 'Teal', color: '#20c997'},
            {value: 'indigo', text: 'Indigo', color: '#6610f2'},
            {value: 'cyan', text: 'Cyan', color: '#0dcaf0'}
        ],
        render: {
            option: function(data, escape) {
                return '<div class="d-flex align-items-center">' +
                    '<span class="color-box me-2" style="background-color: ' + data.color + '; width: 20px; height: 20px; display: inline-block; border-radius: 3px;"></span>' +
                    '<span>' + escape(data.text) + '</span>' +
                '</div>';
            },
            item: function(data, escape) {
                return '<div class="d-flex align-items-center">' +
                    '<span class="color-box me-2" style="background-color: ' + data.color + '; width: 16px; height: 16px; display: inline-block; border-radius: 2px;"></span>' +
                    '<span>' + escape(data.text) + '</span>' +
                '</div>';
            }
        }
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMultiselect);
} else {
    initializeMultiselect();
}