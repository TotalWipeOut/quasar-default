import { defineBoot } from '#q-app/wrappers';
import type { App } from 'vue';

// the new method is not working for some weird reason
// import.meta.glob('src/components/**/*.vue', { eager: true });
// Hence the reason why I'm using the deprecated method globEager()
const modules: Record<string, {default: object}> = import.meta.glob('src/components/**/*.vue', { eager: true });
// This should be the below but as Vite was rolled back the above needs to be used
// remove this comment if there are no further issues
// const modules = import.meta.glob('src/components/**/*.vue', { eager: true });

function loadComponents(app: App) {
  const moduleNames: string[] = Object.keys(modules);
  for (const moduleName of moduleNames) {
    const componentName = moduleName.split('/')?.at(-1)?.split('.')[0];
    if (componentName && modules[moduleName] && modules[moduleName].default) {
      app.component(componentName, modules[moduleName].default);
    }
  }
}

export default defineBoot(({ app }) => {
  loadComponents(app);
});
