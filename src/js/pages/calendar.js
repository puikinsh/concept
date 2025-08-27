import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

// Category colors
const categoryColors = {
  business: '#0d6efd',
  personal: '#198754',
  holiday: '#dc3545',
  meeting: '#ffc107',
  other: '#0dcaf0'
};

// Sample events
let events = [
  {
    id: '1',
    title: 'Team Meeting',
    start: `${new Date().toISOString().split('T')[0]}T10:00:00`,
    end: `${new Date().toISOString().split('T')[0]}T11:00:00`,
    category: 'meeting',
    description: 'Weekly team sync meeting',
    location: 'Conference Room A'
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    allDay: true,
    category: 'business',
    description: 'Final project submission'
  },
  {
    id: '3',
    title: 'Lunch with Client',
    start: `${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T12:30:00`,
    end: `${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T14:00:00`,
    category: 'business',
    location: 'Downtown Restaurant'
  },
  {
    id: '4',
    title: 'Vacation',
    start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'personal',
    description: 'Summer vacation'
  },
  {
    id: '5',
    title: 'Conference',
    start: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'business',
    location: 'Convention Center'
  }
];

let calendar;
let currentEvent = null;

export function initializeCalendar() {
  const calendarEl = document.getElementById('calendar');

  calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrap5Plugin],
    themeSystem: 'bootstrap5',
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List'
    },
    events: events.map((event) => ({
      ...event,
      color: categoryColors[event.category]
    })),
    editable: true,
    droppable: true,
    dayMaxEvents: true,
    weekends: true,
    eventClick: handleEventClick,
    eventDrop: handleEventDrop,
    eventResize: handleEventResize,
    dateClick: handleDateClick,
    select: handleSelect,
    selectable: true,
    selectMirror: true,
    eventDidMount(info) {
      // Add tooltip
      info.el.setAttribute('title', info.event.extendedProps.description || info.event.title);
    }
  });

  calendar.render();

  // Fix navigation icons after render
  fixNavigationIcons();

  // Initialize mini calendar
  initializeMiniCalendar();

  // Initialize event handlers
  initializeEventHandlers();

  // Update upcoming events
  updateUpcomingEvents();
}

function fixNavigationIcons() {
  // Replace Bootstrap Icons with FontAwesome
  const prevButton = document.querySelector('.fc-prev-button');
  const nextButton = document.querySelector('.fc-next-button');

  if (prevButton) {
    const icon = prevButton.querySelector('span');
    if (icon) {
      icon.className = 'fas fa-chevron-left';
      icon.removeAttribute('role');
    }
  }

  if (nextButton) {
    const icon = nextButton.querySelector('span');
    if (icon) {
      icon.className = 'fas fa-chevron-right';
      icon.removeAttribute('role');
    }
  }
}

function initializeMiniCalendar() {
  const miniCalendarEl = document.getElementById('mini-calendar');

  const miniCalendar = new Calendar(miniCalendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    height: 'auto',
    aspectRatio: 1.35,
    dayMaxEvents: false,
    eventDisplay: 'none', // Hide events in mini calendar
    fixedWeekCount: false, // Don't force 6 weeks
    dateClick(info) {
      calendar.gotoDate(info.date);
      calendar.changeView('timeGridDay');
    }
  });

  miniCalendar.render();

  // Fix mini calendar navigation icons
  setTimeout(() => {
    const miniPrevButton = miniCalendarEl.querySelector('.fc-prev-button');
    const miniNextButton = miniCalendarEl.querySelector('.fc-next-button');

    if (miniPrevButton) {
      const icon = miniPrevButton.querySelector('span');
      if (icon) {
        icon.className = 'fas fa-chevron-left';
        icon.removeAttribute('role');
      }
    }

    if (miniNextButton) {
      const icon = miniNextButton.querySelector('span');
      if (icon) {
        icon.className = 'fas fa-chevron-right';
        icon.removeAttribute('role');
      }
    }
  }, 0);
}

function initializeEventHandlers() {
  // Category filters
  document.querySelectorAll('.event-categories input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', filterEvents);
  });

  // Event form
  const eventForm = document.getElementById('eventForm');
  eventForm.addEventListener('submit', handleEventSubmit);

  // Delete button
  document.getElementById('deleteEventBtn').addEventListener('click', handleEventDelete);

  // All day checkbox
  document.getElementById('eventAllDay').addEventListener('change', (e) => {
    const startInput = document.getElementById('eventStart');
    const endInput = document.getElementById('eventEnd');

    if (e.target.checked) {
      startInput.type = 'date';
      endInput.type = 'date';
    } else {
      startInput.type = 'datetime-local';
      endInput.type = 'datetime-local';
    }
  });

  // Modal events
  const eventModal = document.getElementById('eventModal');
  eventModal.addEventListener('hidden.bs.modal', () => {
    document.getElementById('eventForm').reset();
    document.getElementById('deleteEventBtn').classList.add('d-none');
    document.getElementById('eventModalLabel').textContent = 'Add Event';
    currentEvent = null;
  });
}

function filterEvents() {
  const checkedCategories = Array.from(
    document.querySelectorAll('.event-categories input:checked')
  ).map((checkbox) => checkbox.value);

  calendar.removeAllEvents();
  calendar.addEventSource(
    events
      .filter((event) => checkedCategories.includes(event.category))
      .map((event) => ({
        ...event,
        color: categoryColors[event.category]
      }))
  );
}

function handleEventClick(info) {
  currentEvent = info.event;
  const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));

  // Populate form
  document.getElementById('eventModalLabel').textContent = 'Edit Event';
  document.getElementById('eventTitle').value = currentEvent.title;
  document.getElementById('eventCategory').value = currentEvent.extendedProps.category;
  document.getElementById('eventDescription').value = currentEvent.extendedProps.description || '';
  document.getElementById('eventLocation').value = currentEvent.extendedProps.location || '';
  document.getElementById('eventAllDay').checked = currentEvent.allDay;

  if (currentEvent.allDay) {
    document.getElementById('eventStart').type = 'date';
    document.getElementById('eventEnd').type = 'date';
    document.getElementById('eventStart').value = currentEvent.start.toISOString().split('T')[0];
    if (currentEvent.end) {
      document.getElementById('eventEnd').value = currentEvent.end.toISOString().split('T')[0];
    }
  } else {
    document.getElementById('eventStart').type = 'datetime-local';
    document.getElementById('eventEnd').type = 'datetime-local';
    document.getElementById('eventStart').value = currentEvent.start.toISOString().slice(0, 16);
    if (currentEvent.end) {
      document.getElementById('eventEnd').value = currentEvent.end.toISOString().slice(0, 16);
    }
  }

  document.getElementById('deleteEventBtn').classList.remove('d-none');
  eventModal.show();
}

function handleDateClick(info) {
  const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
  document.getElementById('eventStart').value = info.dateStr;
  eventModal.show();
}

function handleSelect(info) {
  const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
  document.getElementById('eventStart').value = info.startStr;
  document.getElementById('eventEnd').value = info.endStr;
  eventModal.show();
}

function handleEventSubmit(e) {
  e.preventDefault();

  const eventData = {
    title: document.getElementById('eventTitle').value,
    start: document.getElementById('eventStart').value,
    end: document.getElementById('eventEnd').value || document.getElementById('eventStart').value,
    allDay: document.getElementById('eventAllDay').checked,
    category: document.getElementById('eventCategory').value,
    description: document.getElementById('eventDescription').value,
    location: document.getElementById('eventLocation').value
  };

  if (currentEvent) {
    // Update existing event
    currentEvent.setProp('title', eventData.title);
    currentEvent.setStart(eventData.start);
    currentEvent.setEnd(eventData.end);
    currentEvent.setAllDay(eventData.allDay);
    currentEvent.setExtendedProp('category', eventData.category);
    currentEvent.setExtendedProp('description', eventData.description);
    currentEvent.setExtendedProp('location', eventData.location);
    currentEvent.setProp('color', categoryColors[eventData.category]);

    // Update in events array
    const eventIndex = events.findIndex((e) => e.id === currentEvent.id);
    if (eventIndex > -1) {
      events[eventIndex] = {
        id: currentEvent.id,
        ...eventData
      };
    }
  } else {
    // Add new event
    const newEvent = {
      id: Date.now().toString(),
      ...eventData
    };
    events.push(newEvent);
    calendar.addEvent({
      ...newEvent,
      color: categoryColors[eventData.category]
    });
  }

  updateUpcomingEvents();
  bootstrap.Modal.getInstance(document.getElementById('eventModal')).hide();
}

function handleEventDelete() {
  if (currentEvent) {
    currentEvent.remove();
    events = events.filter((e) => e.id !== currentEvent.id);
    updateUpcomingEvents();
    bootstrap.Modal.getInstance(document.getElementById('eventModal')).hide();
  }
}

function handleEventDrop(info) {
  const event = events.find((e) => e.id === info.event.id);
  if (event) {
    event.start = info.event.start.toISOString();
    event.end = info.event.end ? info.event.end.toISOString() : info.event.start.toISOString();
    updateUpcomingEvents();
  }
}

function handleEventResize(info) {
  const event = events.find((e) => e.id === info.event.id);
  if (event) {
    event.start = info.event.start.toISOString();
    event.end = info.event.end.toISOString();
    updateUpcomingEvents();
  }
}

function updateUpcomingEvents() {
  const upcomingEventsEl = document.getElementById('upcoming-events');
  const now = new Date();
  const upcoming = events
    .filter((event) => new Date(event.start) > now)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 5);

  upcomingEventsEl.innerHTML =
    upcoming
      .map((event) => {
        const startDate = new Date(event.start);
        const dateStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const timeStr = event.allDay
          ? 'All day'
          : startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        return `
            <a href="#" class="list-group-item list-group-item-action" onclick="return false;">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${event.title}</h6>
                    <small>${dateStr}</small>
                </div>
                <p class="mb-1">
                    <span class="badge" style="background-color: ${categoryColors[event.category]}">${event.category}</span>
                    <small class="text-muted ms-2">${timeStr}</small>
                </p>
                ${event.location ? `<small class="text-muted"><i class="fas fa-map-marker-alt me-1"></i>${event.location}</small>` : ''}
            </a>
        `;
      })
      .join('') || '<p class="text-muted text-center">No upcoming events</p>';
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCalendar);
} else {
  initializeCalendar();
}
