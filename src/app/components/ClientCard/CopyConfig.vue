<template>
  <button
    type="button"
    class="inline-block rounded bg-gray-100 p-2 align-middle transition hover:bg-red-800 hover:text-white disabled:opacity-50 dark:bg-neutral-600 dark:text-neutral-300 dark:hover:bg-red-800 dark:hover:text-white"
    :title="$t('client.copyConfig')"
    :aria-label="$t('client.copyConfig')"
    :disabled="busy"
    @click="copyConfig"
  >
    <IconsCopy class="w-5" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  client: LocalClient;
}>();

const toast = useToast();
const busy = ref(false);

async function copyConfig() {
  busy.value = true;
  try {
    const config = await $fetch<string>(
      `/api/client/${props.client.id}/configuration`,
      { responseType: 'text' }
    );
    const ok = await copyText(config);
    toast.showToast({
      type: ok ? 'success' : 'error',
      message: ok ? $t('copy.copied') : $t('copy.failed'),
    });
  } catch {
    toast.showToast({ type: 'error', message: $t('copy.failed') });
  } finally {
    busy.value = false;
  }
}
</script>
