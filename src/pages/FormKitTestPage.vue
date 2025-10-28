<template>
  <q-page class="formkit-test-page">
    <div class="page-container">
      <h2 class="page-title">FormKit Test</h2>
      
      <div class="form-container">
        <FormKit type="form" :actions="false" @submit="handleSubmit">
          <FormKitSchema :schema="formSchema" :data="formData" />
          
          <div class="submit-section">
            <q-btn 
              type="submit" 
              color="primary" 
              label="Submit Form"
              class="submit-button"
            />
          </div>
        </FormKit>

        <div v-if="submittedData" class="result-container">
          <q-card class="result-card">
            <q-card-section>
              <div class="card-title">Submitted Data</div>
            </q-card-section>
            <q-card-section>
              <pre class="json-display">{{ formattedData }}</pre>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FormKit, FormKitSchema } from '@formkit/vue';

const formData = ref({});
const submittedData = ref(null);

const formSchema = [
  {
    name: 'locations',
    useFieldsetStatus: true,
    id: 'form-input-qualification-locations',
    $formkit: 'group',
    title: 'Do you want to include or exclude any locations from this offer?',
    children: [
      {
        name: 'locations',
        formPath: 'qualification.locations.locations',
        $formkit: 'list',
        class: 'q-pa-sm',
        dynamic: true,
        addLabel: 'Add',
        children: [
          {
            $formkit: 'group',
            value: {
              redemptionPartner: '',
              includedLocations: '',
              excludedLocations: '',
              includedLocationTags: '',
              excludedLocationTags: '',
            },
            children: [
              {
                type: 'text',
                name: 'redemptionPartner',
                class: 'q-pa-sm el-redemptionPartner',
                $formkit: 'text',
                label: 'Redemption Partner',
              },
              {
                type: 'text',
                name: 'includedLocations',
                class: 'q-pa-sm el-includedLocations',
                $formkit: 'text',
                label: 'Included Locations',
              },
              {
                type: 'text',
                name: 'excludedLocations',
                class: 'q-pa-sm el-excludedLocations',
                $formkit: 'text',
                label: 'Excluded Locations',
              },
              {
                type: 'text',
                name: 'includedLocationTags',
                class: 'q-pa-sm el-includedLocationTags',
                $formkit: 'text',
                label: 'Included Location Tags',
              },
              {
                type: 'text',
                name: 'excludedLocationTags',
                class: 'q-pa-sm el-excludedLocationTags',
                $formkit: 'text',
                label: 'Excluded Location Tags',
              },
              {
                type: 'button',
                name: 'add',
                $formkit: 'button',
                label: 'Add',
              },
            ],
          },
        ],
      },
    ],
  },
];

const formattedData = computed(() => {
  return submittedData.value ? JSON.stringify(submittedData.value, null, 2) : '';
});

const handleSubmit = (data: unknown) => {
  submittedData.value = data;
  console.log('Form submitted:', data);
};
</script>

<style scoped>
.formkit-test-page {
  padding: 20px;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  color: var(--q-primary);
  margin-bottom: 20px;
  text-align: center;
}

.form-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-section {
  margin-top: 20px;
  text-align: center;
}

.submit-button {
  min-width: 200px;
}

.result-container {
  margin-top: 30px;
}

.result-card {
  background-color: var(--q-surface);
  border-radius: 8px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--q-primary);
}

.json-display {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #333;
}
</style>
