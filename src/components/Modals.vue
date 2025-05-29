<template>
  <component
    v-bind="modal.props"
    :is="modal.component"
    v-for="[name, modal] in modals.entries()"
    :key="name"
    v-model="modal.isOpen"
    appendToBody
  />
</template>

<script setup lang="ts">
const { modals } = useModals()
</script>
