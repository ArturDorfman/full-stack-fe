class PostsService {
  createPost (payload: TPostPayload) {
    return useApiClient.post('/api/posts/', payload)
  }

  getPosts () {
    return useApiClient.get('/api/posts/')
  }

  getPostById (postId: TPost['id']) {
    return useApiClient.get('/api/posts/{postId}/', { dynamicKeys: { postId } })
  }

  updatePostById (postId: TPost['id'], payload: TPostPayload) {
    return useApiClient.patch('/api/posts/{postId}/', payload, { dynamicKeys: { postId } })
  }

  deletePostById (postId: TPost['id']) {
    return useApiClient.delete('/api/posts/{postId}/', { dynamicKeys: { postId } })
  }
}

export const postsService = new PostsService()
