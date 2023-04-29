import { router, publicProcedure, privateProcedure } from "@/server/trpc"

import {
    addCommentProc,
    addCommentSchema,
} from "@/server/controllers/comment/add"
import {
    getCommentProc,
    getCommentSchema,
} from "@/server/controllers/comment/get"
import {
    deleteCommentProc,
    deleteCommentSchema,
} from "@/server/controllers/comment/delete"
import {
    dislikeCommentProc,
    dislikeCommentSchema,
} from "@/server/controllers/comment/dislike"
import {
    likeCommentProc,
    likeCommentSchema,
} from "@/server/controllers/comment/like"
import {
    editCommentProc,
    editCommentSchema,
} from "@/server/controllers/comment/edit"

export const commentRouter = router({
    add: privateProcedure.input(addCommentSchema).mutation(addCommentProc),
    get: publicProcedure.input(getCommentSchema).query(getCommentProc),
    delete: privateProcedure
        .input(deleteCommentSchema)
        .mutation(deleteCommentProc),
    dislike: privateProcedure
        .input(dislikeCommentSchema)
        .mutation(dislikeCommentProc),
    like: privateProcedure.input(likeCommentSchema).mutation(likeCommentProc),
    edit: privateProcedure.input(editCommentSchema).mutation(editCommentProc),
})
