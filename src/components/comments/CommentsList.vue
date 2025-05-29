<template>
  <div class="mt-3 space-y-4">
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="p-3 bg-gray-50 rounded-lg mb-3 hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-x-2">
          <h5 class="text-sm font-semibold">Author</h5>

          <span class="text-sm text-gray-400">
            {{ dayjs(
              comment.updatedAt !== comment.createdAt ? comment.updatedAt : comment.createdAt
            ).format('YYYY-MM-DD') }}
          </span>
        </div>

        <div class="flex gap-x-2">
          <el-button
            type="primary"
            size="small"
            circle
            @click="editComment(comment)"
          >
            <el-icon><Edit /></el-icon>
          </el-button>

          <el-button
            type="danger"
            size="small"
            circle
            @click="deleteComment(comment.id)"
          >
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
      </div>

      <div v-if="editingCommentId === comment.id" class="mb-2">
        <el-input
          v-model="editedCommentText"
          type="textarea"
          :rows="2"
          class="mb-2"
        />

        <div class="flex gap-x-2">
          <el-button
            type="primary"
            size="small"
            @click="saveEditedComment(comment.id)"
          >
            Save
          </el-button>

          <el-button
            size="small"
            @click="cancelEdit"
          >
            Cancel
          </el-button>
        </div>
      </div>

      <p v-else>{{ comment.text }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { Edit, Delete } from '@element-plus/icons-vue'

const props = defineProps<{
  post: TPost
}>()

const emit = defineEmits<{
  delete: []
}>()

const commentsStore = useCommentsStore()

const editingCommentId = ref<string | null>(null)
const editedCommentText = ref('')

const comments = computed(() => commentsStore.comments.get(props.post.id) || [])

function editComment (comment: TComment) {
  editingCommentId.value = comment.id
  editedCommentText.value = comment.text
}

function saveEditedComment (commentId: string) {
  if (!editedCommentText.value.trim()) return

  try {
    commentsStore.updateCommentById(props.post.id, commentId, editedCommentText.value)
  } catch (error) {
    console.log(error)
  } finally {
    cancelEdit()
  }
}

function cancelEdit () {
  editingCommentId.value = null
  editedCommentText.value = ''
}

function deleteComment (commentId: string) {
  try {
    commentsStore.deleteCommentById(props.post.id, commentId)
    emit('delete')
  } catch (error) {
    console.log(error)
  }
}
</script>
