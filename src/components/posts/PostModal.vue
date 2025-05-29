<template>
  <el-dialog
    v-model="modalVisible"
    :title="modalTitle"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
    >
      <el-form-item
        label="Title"
        prop="title"
      >
        <el-input v-model="formData.title" />
      </el-form-item>

      <el-form-item
        label="Description"
        prop="description"
      >
        <el-input v-model="formData.description" type="textarea" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="modalVisible = false">Cancel</el-button>

      <el-button type="primary" @click="submitForm">Submit</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modalTitle?: string
  title?: TPost['title']
  description?: TPost['description']
}>()

const emit = defineEmits<{
  close: []
  save: [data: TPostPayload]
}>()

const modalVisible = defineModel<boolean>()

const formRef = useElFormRef()
const formData = useElFormModel<TPostPayload>({
  title: props.title || '',
  description: props.description || ''
})

const rules = useElFormRules({
  title: [useRequiredRule(), useMinLenRule(5)],
  description: [useRequiredRule(), useMinLenRule(10)]
})

function submitForm () {
  formRef.value?.validate((valid) => {
    if (valid) {
      emit('save', formData)
      modalVisible.value = false
    }
  })
}
</script>
