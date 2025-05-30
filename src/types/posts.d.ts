type TPostPayload = TRequestBody<'/api/posts/', 'post'>
type TPostResp = TResponse<'/api/posts/', 'get'>
type TPost = TPostResp['posts'][number]
type TPostsMeta = TPostResp['meta']
type TGetPostsQuery = TRequestQuery<'/api/posts/', 'get'>
type TSortBy = TPostsMeta['sortBy']
type TSortDirection = TPostsMeta['sortDirection']
