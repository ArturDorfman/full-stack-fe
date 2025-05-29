<template>
  <div v-loading="loading" class="p-4 w-full container mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Posts</h2>

      <el-button
        type="primary"
        @click="openModal('PostModal', {
          modalTitle: 'Add post',
          onSave: createPost
        })"
      >
        <el-icon class="mr-2"><Plus /></el-icon>
        Add post
      </el-button>
    </div>

    <div class="flex flex-col gap-4">
      <PostCard
        v-for="post in postsStore.posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'

const { openModal } = useModals()
const postsStore = usePostsStore()

const loading = ref(false)

function createPost (post: TPostPayload) {
  try {
    postsStore.createPost(post)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  loading.value = true
  try {
    postsStore.getPosts()
  } finally {
    loading.value = false
  }
})
</script>
