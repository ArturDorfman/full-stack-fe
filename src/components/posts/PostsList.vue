<template>
  <div v-loading="loading" class="flex flex-col items-center h-full w-full">
    <div class="p-4 w-full container mx-auto grow overflow-y-auto">
      <div class="flex flex-col gap-4 mb-6">
        <div class="flex justify-between items-center">
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

        <div class="w-full">
          <el-input
            v-model="searchQuery"
            placeholder="Search posts..."
            class="w-full"
            clearable
            @clear="handleClearSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <template v-if="postsStore.posts.length > 0">
          <PostCard
            v-for="post in postsStore.posts"
            :key="post.id"
            :post="post"
          />
        </template>

        <template v-else>
          <div class="text-center py-8">
            <el-empty
              v-if="searchQuery"
              description="No posts found matching your search"
            >
              <el-button @click="handleClearSearch">Clear search</el-button>
            </el-empty>

            <el-empty v-else description="No posts found" />
          </div>
        </template>
      </div>
    </div>

    <el-pagination
      class="my-4"
      background
      layout="prev, pager, next"
      hideOnSinglePage
      :total="postsStore.meta.total"
      :pageSize="postsStore.meta.limit"
      :currentPage="postsStore.meta.page"
      @currentChange="fetchPosts"
    />
  </div>
</template>

<script lang="ts" setup>
import { Plus, Search } from '@element-plus/icons-vue'
import { watchDebounced } from '@vueuse/core'

const { openModal } = useModals()
const postsStore = usePostsStore()

const POSTS_LIMIT = 4
const loading = ref(false)
const searchQuery = ref('')

watchDebounced(searchQuery, () => {
  fetchPosts()
}, { debounce: 500 })

onMounted(fetchPosts)

function createPost (post: TPostPayload) {
  try {
    postsStore.createPost(post)
  } catch (error) {
    console.log(error)
  }
}

function handleClearSearch () {
  searchQuery.value = ''
  fetchPosts()
}

function fetchPosts (page = 1) {
  loading.value = true

  try {
    postsStore.getPosts({
      limit: POSTS_LIMIT,
      offset: (page - 1) * POSTS_LIMIT,
      search: searchQuery.value
    })
  } finally {
    loading.value = false
  }
}
</script>
