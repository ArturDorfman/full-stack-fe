<template>
  <el-card class="post-card mb-4 hover:shadow-lg transition-shadow duration-300">
    <div class="flex justify-between pb-2 border-b">
      <h3 class="text-xl font-bold text-primary">{{ post.title }}</h3>

      <div>
        <el-button
          type="info"
          size="small"
          @click="openModal('PostModal', {
            modalTitle: 'Edit post',
            title: post.title,
            description: post.description,
            onSave: updatePost
          })"
        >
          <el-icon><Edit /></el-icon>
        </el-button>

        <el-button
          type="danger"
          size="small"
          @click="deletePost(post.id)"
        >
          <el-icon><Delete /></el-icon>
        </el-button>
      </div>
    </div>

    <p class="my-4">{{ post.description }}</p>

    <div class="flex justify-between items-center text-sm">
      <span
        class="cursor-pointer hover:underline"
        @click="toggleComments"
      >
        {{ isCommentsVisible ? 'Hide' : 'Show' }} comments ({{ commentCount }})
      </span>

      <span>
        {{ dayjs(post.updatedAt !== post.createdAt ? post.updatedAt : post.createdAt).format('YYYY-MM-DD') }}
      </span>
    </div>

    <div v-if="isCommentsVisible" class="border-t mt-2 pt-2">
      <h4>Comments</h4>

      <el-input
        v-model="newComment"
        type="textarea"
        :rows="3"
        class="my-2"
      />

      <el-button
        type="primary"
        @click="addComment"
      >
        Add comment
      </el-button>

      <CommentsList
        v-if="post.commentsCount > 0"
        :post="post"
        @delete="commentCount--"
      />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { Edit, Delete } from '@element-plus/icons-vue'

const props = defineProps<{
  post: TPost
}>()

const { openModal } = useModals()
const postsStore = usePostsStore()
const commentsStore = useCommentsStore()

const isCommentsVisible = ref(false)
const newComment = ref('')
const commentCount = ref(props.post.commentsCount)

function toggleComments () {
  isCommentsVisible.value = !isCommentsVisible.value

  if (!commentsStore.comments.length) {
    commentsStore.getComments(props.post.id)
  }
}

function addComment () {
  try {
    commentsStore.createComment(props.post.id, { text: newComment.value })
  } catch (error) {
    console.log(error)
  } finally {
    newComment.value = ''
  }
}

function updatePost (post: TPostPayload) {
  try {
    postsStore.updatePostById(props.post.id, post)
  } catch (error) {
    console.log(error)
  }
}

function deletePost (postId: TPost['id']) {
  try {
    postsStore.deletePostById(postId)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.post-card {
  border-radius: 8px;
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
}
</style>
