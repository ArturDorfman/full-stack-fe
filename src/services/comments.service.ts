class CommentsService {
  createComment (postId: TPost['id'], payload: TCommentPayload) {
    return useApiClient.post('/api/posts/{postId}/comments/', payload, { dynamicKeys: { postId } })
  }

  getComments (postId: TPost['id']) {
    return useApiClient.get('/api/posts/{postId}/comments/', { dynamicKeys: { postId } })
  }

  updateComment (postId: TPost['id'], commentId: TComment['id'], payload: TCommentPayload) {
    return useApiClient.patch('/api/posts/{postId}/comments/{commentId}/', payload, { dynamicKeys: { postId, commentId } })
  }

  deleteComment (postId: TPost['id'], commentId: TComment['id']) {
    return useApiClient.delete('/api/posts/{postId}/comments/{commentId}/', { dynamicKeys: { postId, commentId } })
  }
}

export const commentsService = new CommentsService()
