import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ExampleComponent from './demo/ExampleComponent.vue';

describe('example Component', () => {
  it('should mount component with todos', async () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: 'Hello',
        meta: {
          totalCount: 4,
        },
        todos: [
          { id: 1, content: 'Hallo' },
          { id: 2, content: 'Hoi' },
        ],
      },
    });

    // Check initial state
    expect(wrapper.vm.clickCount).toBe(0);

    // Check that items are rendered
    const items = wrapper.findAll('.q-item');
    expect(items).toHaveLength(2);

    // Click the first item and expect count to increment
    await items[0].trigger('click');
    expect(wrapper.vm.clickCount).toBeGreaterThan(0);

    // Click a second item to ensure it increments further
    const previousCount = wrapper.vm.clickCount;
    await items[1].trigger('click');
    expect(wrapper.vm.clickCount).toBe(previousCount + 1);
  });

  it('should mount component without todos', () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: 'Hello',
        meta: {
          totalCount: 4,
        },
      },
    });
    expect(wrapper.findAll('.q-item')).toHaveLength(0);
  });
});
