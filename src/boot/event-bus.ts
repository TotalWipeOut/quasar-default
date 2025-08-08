import { defineBoot } from '#q-app/wrappers';
import { EventBus } from 'quasar';

export default defineBoot(({ app }) => {
  const bus = new EventBus()
  // for Composition API
  app.provide<EventBus>('bus', bus);
})
