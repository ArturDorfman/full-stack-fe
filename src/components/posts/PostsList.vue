<template>
  <div v-loading="loading" class="flex flex-col items-center h-full w-full">
    <div class="p-4 w-full container mx-auto grow overflow-y-auto">
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

    <el-pagination
      class="my-4"
      background
      layout="prev, pager, next"
      :total="postsStore.meta.total"
      :pageSize="postsStore.meta.limit"
      :currentPage="postsStore.meta.page"
      @currentChange="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'

const { openModal } = useModals()
const postsStore = usePostsStore()

const POSTS_LIMIT = 4
const loading = ref(false)

function createPost (post: TPostPayload) {
  try {
    postsStore.createPost(post)
  } catch (error) {
    console.log(error)
  }
}

function handlePageChange (page: number) {
  postsStore.getPosts({ limit: POSTS_LIMIT, offset: (page - 1) * POSTS_LIMIT })
}

onMounted(() => {
  loading.value = true
  try {
    postsStore.getPosts({ limit: POSTS_LIMIT, offset: 0 })
  } finally {
    loading.value = false
  }
})
</script>
