// This file will be run before each test file
import { config } from '@vue/test-utils';
import { createApp } from 'vue';
import { vi } from 'vitest';

// Mock Notify module
vi.mock('quasar', () => ({
  Notify: {
    create: vi.fn(),
  },
}));

// Create minimal Quasar setup for testing
const QuasarMock = {
  install(app: any) {
    app.config.globalProperties.$q = {
      notify: vi.fn(),
      loading: {
        show: vi.fn(),
        hide: vi.fn(),
      },
    };

    // Mock Quasar components
    app.component('QBtn', { template: '<button @click="$emit(\'click\')"><slot /></button>' });
    app.component('QList', { template: '<div class="q-list"><slot /></div>' });
    app.component('QItem', { template: '<div class="q-item" @click="$emit(\'click\')"><slot /></div>' });
    app.component('QItemSection', { template: '<div><slot /></div>' });
    app.component('QLayout', { template: '<div><slot /></div>' });
    app.component('QHeader', { template: '<header><slot /></header>' });
    app.component('QFooter', { template: '<footer><slot /></footer>' });
    app.component('QToolbar', { template: '<div><slot /></div>' });
    app.component('QToolbarTitle', { template: '<div><slot /></div>' });
    app.component('QDrawer', { template: '<aside><slot /></aside>' });
    app.component('QPageContainer', { template: '<div><slot /></div>' });
    app.component('QPage', { template: '<main><slot /></main>' });
  },
};

// Configure Vue Test Utils to use our mock Quasar
config.global.plugins = [QuasarMock];
