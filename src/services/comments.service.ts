class CommentsService {
  createComment (postId: TPostResp['id'], payload: TCommentPayload) {
    return useApiClient.post('/api/posts/{postId}/comments/', payload, { dynamicKeys: { postId } })
  }

  getComments (postId: TPostResp['id']) {
    return useApiClient.get('/api/posts/{postId}/comments/', { dynamicKeys: { postId } })
  }

  updateComment (postId: TPostResp['id'], commentId: TComment['id'], payload: TCommentPayload) {
    return useApiClient.patch('/api/posts/{postId}/comments/{commentId}/', payload, { dynamicKeys: { postId, commentId } })
  }

  deleteComment (postId: TPostResp['id'], commentId: TComment['id']) {
    return useApiClient.delete('/api/posts/{postId}/comments/{commentId}/', { dynamicKeys: { postId, commentId } })
  }
}

export const commentsService = new CommentsService()
