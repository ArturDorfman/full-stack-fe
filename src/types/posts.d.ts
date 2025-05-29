type TPostPayload = TRequestBody<'/api/posts/', 'post'>
type TPost = TResponse<'/api/posts/', 'get'>[number]
