<template>
  <q-page class="formkit-test-page q-pa-xl">
    <div class="formkit-content-container">
      <q-card class="formkit-card">
        <q-card-section class="formkit-card-header">
          <h1 class="formkit-card-title">FormKit Test</h1>
          <p class="formkit-card-subtitle">
            Manage inclusion and exclusion locations. Use the add button to create additional rows for different partners.
          </p>
        </q-card-section>
        <q-separator />
        <q-card-section class="formkit-card-body">
          <div v-if="renderError" class="formkit-error-message">
            {{ renderError }}
          </div>
          <FormKit
            v-else
            type="form"
            v-model="formValues"
            :actions="false"
            class="locations-form"
          >
            <FormKitSchema :schema="formSchema" />
          </FormKit>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import type { FormKitSchemaNode } from '@formkit/core';

type LocationEntry = {
  redemptionPartner: string;
  includedLocations: string;
  excludedLocations: string;
  includedLocationTags: string;
  excludedLocationTags: string;
};

const emptyLocationEntry = (): LocationEntry => ({
  redemptionPartner: '',
  includedLocations: '',
  excludedLocations: '',
  includedLocationTags: '',
  excludedLocationTags: '',
});

const renderError = ref<string | null>(null);

onErrorCaptured((error) => {
  if (error instanceof Error) {
    renderError.value = `${error.message}\n${error.stack ?? ''}`;
  } else {
    renderError.value = String(error);
  }
  return false;
});

const formValues = ref({
  qualification: {
    locations: {
      locations: [
        emptyLocationEntry(),
      ],
    },
  },
});

const formSchema: FormKitSchemaNode[] = [
  {
    $formkit: 'group',
    name: 'qualification',
    children: [
      {
        $formkit: 'group',
        name: 'locations',
        id: 'form-input-qualification-locations',
        label: 'Do you want to include or exclude any locations from this offer?',
        help: 'Add as many partner location configurations as needed.',
        useFieldsetStatus: true,
        classes: {
          outer: 'locations-fieldset-outer',
          inner: 'locations-fieldset-inner',
          label: 'locations-fieldset-label',
          help: 'locations-fieldset-help',
        },
        children: [
          {
            $formkit: 'list',
            name: 'locations',
            dynamic: true,
            addLabel: 'Add location row',
            value: [
              emptyLocationEntry(),
            ],
            classes: {
              outer: 'location-list-outer',
              list: 'location-list',
              item: 'location-list-item',
              add: 'location-list-add',
              remove: 'location-list-remove',
            },
            children: [
              {
                $formkit: 'group',
                name: 'location',
                value: emptyLocationEntry(),
                classes: {
                  outer: 'location-entry-group',
                  inner: 'location-entry-inner',
                },
                children: [
                  {
                    $formkit: 'text',
                    type: 'text',
                    name: 'redemptionPartner',
                    label: 'Redemption Partner',
                    classes: {
                      outer: 'location-field redemption-partner-field q-pa-sm',
                      input: 'location-input',
                      label: 'location-label',
                    },
                  },
                  {
                    $formkit: 'text',
                    type: 'text',
                    name: 'includedLocations',
                    label: 'Included Locations',
                    classes: {
                      outer: 'location-field included-locations-field q-pa-sm',
                      input: 'location-input',
                      label: 'location-label',
                    },
                  },
                  {
                    $formkit: 'text',
                    type: 'text',
                    name: 'excludedLocations',
                    label: 'Excluded Locations',
                    classes: {
                      outer: 'location-field excluded-locations-field q-pa-sm',
                      input: 'location-input',
                      label: 'location-label',
                    },
                  },
                  {
                    $formkit: 'text',
                    type: 'text',
                    name: 'includedLocationTags',
                    label: 'Included Location Tags',
                    classes: {
                      outer: 'location-field included-tags-field q-pa-sm',
                      input: 'location-input',
                      label: 'location-label',
                    },
                  },
                  {
                    $formkit: 'text',
                    type: 'text',
                    name: 'excludedLocationTags',
                    label: 'Excluded Location Tags',
                    classes: {
                      outer: 'location-field excluded-tags-field q-pa-sm',
                      input: 'location-input',
                      label: 'location-label',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style scoped>
.formkit-test-page {
  display: flex;
  justify-content: center;
}

.formkit-content-container {
  width: 100%;
  max-width: 1200px;
}

.formkit-card {
  width: 100%;
}

.formkit-card-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.formkit-card-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.formkit-card-subtitle {
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
}

.formkit-card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.formkit-error-message {
  color: #c10015;
  font-weight: 600;
}

.locations-fieldset-label {
  font-weight: 600;
}

.locations-fieldset-help {
  margin-top: 4px;
  color: rgba(0, 0, 0, 0.6);
}

.location-entry-group {
  padding: 8px 0;
}

.location-entry-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.location-field {
  flex: 1 1 200px;
  min-width: 160px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

.location-label {
  font-weight: 500;
}

.location-input {
  background: transparent;
}

.location-list-add {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.location-list-remove {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

@media (max-width: 768px) {
  .formkit-test-page {
    padding: 24px;
  }

  .location-field {
    flex: 1 1 100%;
  }
}
</style>
