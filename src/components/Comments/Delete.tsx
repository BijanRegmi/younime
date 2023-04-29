import { trpc } from "../Context/TrpcContext"

interface DeleteCommentProps {
    id: number
    onSuccess: () => void
    onCancel: () => void
}

export const DeleteComment = ({
    id,
    onSuccess,
    onCancel,
}: DeleteCommentProps) => {
    const { mutate } = trpc.comment.delete.useMutation({ onSuccess })
    const ondelete = () => mutate({ id })

    return (
        <div className="text-black bg-accent-900 w-full">
            <div className="my-3 mx-4 text-center sm:text-left">
                <div className="mt-2 flex flex-col">
                    <span className="text-xl">
                        Are you sure you want to delete this comment?
                    </span>
                    <span className="text-sm">
                        This action cannot be undone.
                    </span>
                </div>
            </div>

            <div className="px-4 py-3 flex justify-end items-end gap-4">
                <button
                    className="font-medium text-accent-200 hover:text-accent-50 focus:outline-none"
                    onClick={ondelete}
                >
                    Yes
                </button>

                <button
                    className="font-medium text-accent-200 hover:text-accent-50 focus:outline-none"
                    onClick={onCancel}
                >
                    No
                </button>
            </div>
        </div>
    )
}
