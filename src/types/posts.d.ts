type TPostPayload = TRequestBody<'/api/posts/', 'post'>
type TPostResp = TResponse<'/api/posts/', 'get'>
type TPost = TPostResp['posts'][number]
type TPostsMeta = TPostResp['meta']
