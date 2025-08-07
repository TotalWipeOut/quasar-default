<template>
  <q-page class="session-page">
    <div class="page-container">
      <h2 class="page-title">Session Information</h2>
      
      <div class="controls">
        <q-btn 
          color="primary" 
          @click="fetchSessionInfo"
          :loading="loading"
          label="Fetch Session Info"
          class="fetch-button"
        />
        <q-btn 
          v-if="error" 
          color="secondary" 
          @click="retry"
          :loading="loading"
          label="Retry"
          class="retry-button"
        />
      </div>

      <div v-if="error" class="error-container">
        <q-banner class="error-banner" inline-actions rounded>
          <template v-slot:avatar>
            <q-icon name="error" color="negative" />
          </template>
          <strong>Error:</strong> {{ error }}
          <template v-slot:action>
            <q-btn flat color="negative" label="Retry" @click="retry" />
          </template>
        </q-banner>
      </div>

      <div v-if="sessionData" class="data-container">
        <q-card class="session-card">
          <q-card-section>
            <div class="card-title">Session Data</div>
          </q-card-section>
          <q-card-section>
            <pre class="json-display">{{ formattedSessionData }}</pre>
          </q-card-section>
        </q-card>
      </div>

      <div v-if="loading" class="loading-container">
        <q-spinner-dots size="50px" color="primary" />
        <p class="loading-text">Loading session information...</p>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { api } from 'boot/axios';

interface SessionData {
  [key: string]: unknown;
}

const sessionData = ref<SessionData | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const formattedSessionData = computed(() => {
  return sessionData.value ? JSON.stringify(sessionData.value, null, 2) : '';
});

const fetchSessionInfo = async () => {
  loading.value = true;
  error.value = null;
  sessionData.value = null;

  try {
    const response = await api.get('/api/session/info');
    sessionData.value = response.data;
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as { response: { status: number; data?: { message?: string }; statusText: string } };
      error.value = `HTTP ${axiosError.response.status}: ${axiosError.response.data?.message || axiosError.response.statusText}`;
    } else if (err && typeof err === 'object' && 'request' in err) {
      error.value = 'Network error: Unable to reach the server';
    } else {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      error.value = `Request error: ${errorMessage}`;
    }
  } finally {
    loading.value = false;
  }
};

const retry = () => {
  void fetchSessionInfo();
};

onMounted(() => {
  void fetchSessionInfo();
});
</script>

<style scoped>
.session-page {
  padding: 20px;
}

.page-container {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  color: var(--q-primary);
  margin-bottom: 20px;
  text-align: center;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.fetch-button,
.retry-button {
  min-width: 150px;
}

.error-container {
  margin-bottom: 20px;
}

.error-banner {
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
}

.data-container {
  margin-bottom: 20px;
}

.session-card {
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

.loading-container {
  text-align: center;
  padding: 40px;
}

.loading-text {
  margin-top: 15px;
  color: var(--q-primary);
  font-size: 16px;
}
</style>
