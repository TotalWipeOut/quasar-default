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
const submittedData = ref<unknown>(null as unknown);

const formSchema = [
  {
    $el: 'h3',
    children: 'Do you want to include or exclude any locations from this offer?',
    attrs: {
      class: 'form-section-title',
    },
  },
  {
    $formkit: 'list',
    name: 'locations',
    id: 'form-input-qualification-locations',
    dynamic: true,
    children: [
      {
        $formkit: 'text',
        name: 'redemptionPartner',
        label: 'Redemption Partner',
        outerClass: 'q-pa-sm el-redemptionPartner',
      },
      {
        $formkit: 'text',
        name: 'includedLocations',
        label: 'Included Locations',
        outerClass: 'q-pa-sm el-includedLocations',
      },
      {
        $formkit: 'text',
        name: 'excludedLocations',
        label: 'Excluded Locations',
        outerClass: 'q-pa-sm el-excludedLocations',
      },
      {
        $formkit: 'text',
        name: 'includedLocationTags',
        label: 'Included Location Tags',
        outerClass: 'q-pa-sm el-includedLocationTags',
      },
      {
        $formkit: 'text',
        name: 'excludedLocationTags',
        label: 'Excluded Location Tags',
        outerClass: 'q-pa-sm el-excludedLocationTags',
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
