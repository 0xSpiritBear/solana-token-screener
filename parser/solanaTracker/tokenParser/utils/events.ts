export function parseEvents(events: any) {
  if (!events) {
    return { eventMap: null };
  }
  const eventMap = new Map();

  for (const event in events) {
    eventMap.set(event, events[event].priceChangePercentage);
  }

  return { eventMap };
}
