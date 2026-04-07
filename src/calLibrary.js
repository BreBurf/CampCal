/**
 * Loads all available events from events.json and returns it to a JSON object
 * @returns Promise to a JSON event object
 */
export async function loadEvents() {
    try {
        const response = await fetch('./events.json');
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

/**
 * Loads events JSON object and sorts it based off of time, with soonest event appearing first
 * @param {*} data JSON event object
 * @returns Sorted array of events
 */
export function sortEvents(data) {
    const sortedEvents = data.events.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });

    return sortedEvents;
}

/**
 * Will render up to {num} events on screen, in the pre-defined "event-card" format
 * @param {*} events Array of all events
 * @param {int} num How many events to display
 */
export function renderEvents(events, num) {
    const container = document.getElementsByClassName('event-list')[0];

    const limitEvents = events.slice(0, num);

    limitEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';

        card.innerHTML = `
        <div class="event-header">
            <span>${event.title}</span>
            <span>${formatDisplayDate(event.date, event.time)}</span>
        </div>
        <p>${event.description}</p>
        `;

        container.appendChild(card);
    });
}

function formatDisplayDate(date, time) {
    const dateObj = new Date(`${date}T${time}`);

    return dateObj.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}