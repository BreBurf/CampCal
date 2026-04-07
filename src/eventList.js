import {loadEvents, sortEvents, renderEvents} from "./calLibrary.js";

async function init() {
    const events = await loadEvents();
    const sorted = sortEvents(events);
    renderEvents(sorted, 3);
}

init();