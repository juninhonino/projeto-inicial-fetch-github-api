import { baseUrl, itensQuantity } from "../variables.js";

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}${userName}/events?per_page=${itensQuantity}`)
    const events = await response.json()
    const filteredEvents = events.filter(event =>
        event.type === 'CreateEvent' || event.type === 'PushEvent'
    )
    return filteredEvents
}


export { getEvents }
