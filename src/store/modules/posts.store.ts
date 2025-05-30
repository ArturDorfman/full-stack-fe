import { postsService } from '@/services/posts.service'

export const usePostsStore = defineStore('postsStore', () => {
  const posts = ref<TPost[]>([])
  const meta = ref<TPostsMeta>({
    total: 0,
    limit: 0,
    offset: 0,
    page: 0,
    sortBy: 'createdAt',
    sortDirection: 'desc'
  })

  async function getPosts (params: TGetPostsQuery) {
    const data = await postsService.getPosts(params)
    posts.value = data.posts
    meta.value = data.meta
  }

  async function createPost (payload: TPostPayload) {
    const data = await postsService.createPost(payload)
    posts.value.push(data)
  }

  async function updatePostById (postId: TPost['id'], payload: TPostPayload) {
    const data = await postsService.updatePostById(postId, payload)

    posts.value = posts.value.map(post => {
      if (post.id === postId) {
        return { ...post, ...data }
      }

      return post
    })
  }

  async function deletePostById (postId: TPost['id']) {
    // await postsService.deletePostById(postId)
    posts.value = posts.value.filter(post => post.id !== postId)
    console.log('deletePostById', postId)
  }

  return {
    posts,
    meta,
    getPosts,
    createPost,
    updatePostById,
    deletePostById
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
}
