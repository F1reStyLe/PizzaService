<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
        <slot v-bind:props="props" name="activator" />
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar color="indigo" :title="title" density="compact" />
        <v-container>
          <slot :isActive="isActive" />
          <v-row>
            <v-spacer />
            <v-btn
              class="mr-1"
              text="Сохранить"
              color="indigo"
              variant="flat"
              @click="$emit('submit', isActive)"
            />
            <v-btn
              text="Отмена"
              color="error"
              variant="flat"
              @click="isActive.value = false"
            />
          </v-row>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    // @ts-ignore
    emits: ['submit'],
  },
};
</script>
