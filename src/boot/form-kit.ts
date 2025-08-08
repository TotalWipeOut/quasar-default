import { defineBoot } from '#q-app/wrappers';
import { defaultConfig, plugin, DefaultConfigOptions } from '@formkit/vue'
import { FormKitNode } from '@formkit/core'
import { ref, watch } from 'vue';

function addHandlers(node: FormKitNode) {
  node.on('created', () => {
    if (node.context) {
      node.context.handlers.onModelUpdate = (value: unknown) => {
        node.input(value);
      }

      node.context.handlers.onChangeName = (value: string) => {
        node.name = value;
      }

      const error = ref(false);
      const errorMessage = ref('');
      watch(node.context, () => {
        let errorFound = false;
        for (const message of Object.entries(node.context?.messages ?? {})) {
          if (typeof message[1].value === 'string') {
            errorMessage.value = message[1].value;
            error.value = true;
            errorFound = true;
            break;
          }
        }

        if (!errorFound) {
          errorMessage.value = '';
          error.value = false;
        }
      });
      node.addProps(['error', 'errorMessage']);
      node.props.error = error;
      node.props.errorMessage = errorMessage;
    }
  })
}

const defaultInputProps = {
  label: '$label',
  modelValue: '$value',
  error: '$error',
  errorMessage: '$errorMessage',
  id: '$id',
  disabled: '$disabled',
  'onUpdate:modelValue': '$handlers.onModelUpdate',
};

const config: DefaultConfigOptions = {
  theme: 'genesis',
  inputs: {
    EInputField: {
      type: 'input',
      schema: [{
        $cmp: 'EInputField',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    EToggle: {
      type: 'input',
      schema: [{
        $cmp: 'EToggle',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    EButtonToggle: {
      type: 'input',
      schema: [{
        $cmp: 'EButtonToggle',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    EHiddenInput: {
      type: 'input',
      schema: [{
        $cmp: 'EHiddenInput',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    EHiddenUnitId: {
      type: 'input',
      schema: [{
        $cmp: 'EHiddenUnitId',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    EHiddenUserId: {
      type: 'input',
      schema: [{
        $cmp: 'EHiddenUserId',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    ESelect: {
      type: 'input',
      schema: [{
        $cmp: 'ESelect',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    EDateRange: {
      type: 'input',
      schema: [{
        $cmp: 'EDateRange',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    EDateTimePicker: {
      type: 'input',
      schema: [{
        $cmp: 'EDateTimePicker',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    ESelectAjax: {
      type: 'input',
      schema: [{
        $cmp: 'ESelectAjax',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
        },
      }],
      features: [addHandlers],
    },
    ECompositeField: {
      type: 'input',
      schema: [{
        $cmp: 'ECompositeField',
        bind: '$attrs',
        props: {
          ...defaultInputProps,
          onChangeName: '$handlers.onChangeName',
        },
      }],
      features: [addHandlers],
    },
    EFieldset: {
      type: 'group',
      schema: [{
        $cmp: 'EFieldset',
        bind: '$attrs',
        props: {
          label: '$label',
          child: '$child',
        },
        children: '$slots.default',
      }],
      props: ['child'],
      features: [addHandlers],
    },
    EFieldsetExpandable: {
      type: 'group',
      schema: [{
        $cmp: 'EFieldsetExpandable',
        bind: '$attrs',
        props: {
          title: '$title',
          switchToggleSide: '$switchToggleSide',
        },
        children: '$slots.default',
      }],
      props: ['title', 'switchToggleSide'],
      features: [addHandlers],
    },
  },
};

export default defineBoot(({ app }) => {
  app.use(
    plugin,
    defaultConfig(config),
  );
});
