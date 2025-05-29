type TCommentPayload = TRequestBody<'/api/posts/{postId}/comments/', 'post'>
type TComment = TResponse<'/api/posts/{postId}/comments/', 'get'>[number]
