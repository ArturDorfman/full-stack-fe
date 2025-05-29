import { commentsService } from '@/services/comments.service'

export const useCommentsStore = defineStore('commentsStore', () => {
  const comments = ref(new Map<TPost['id'], TComment[]>())

  async function createComment (postId: TPost['id'], payload: TCommentPayload) {
    const comment = await commentsService.createComment(postId, payload)
    comments.value.set(postId, [...comments.value.get(postId) || [], comment])
  }

  async function getComments (postId: TPost['id']) {
    const data = await commentsService.getComments(postId)
    comments.value.set(postId, data)
  }

  async function updateCommentById (postId: TPost['id'], commentId: TComment['id'], text: string) {
    const data = await commentsService.updateComment(postId, commentId, { text })

    comments.value.set(postId, comments.value.get(postId)?.map(comment => {
      if (comment.id === commentId) {
        return data
      }
      return comment
    }) || [])
  }

  async function deleteCommentById (postId: TPost['id'], commentId: TComment['id']) {
    // await commentsService.deleteComment(postId, commentId)
    comments.value.set(postId, comments.value.get(postId)?.filter(comment => comment.id !== commentId) || [])
    console.log('deleteCommentById', postId, commentId)
  }

  return {
    comments,
    createComment,
    getComments,
    updateCommentById,
    deleteCommentById
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommentsStore, import.meta.hot))
}
