import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import api from "~/api/web2";
import queryClient from "~/config/queryClient";

type useDeleteTodoMutationOptions = Omit<
  UseMutationOptions<
    Parameters<typeof api.deleteTodo>[0],
    unknown,
    Parameters<typeof api.deleteTodo>[0],
    unknown
  >,
  "mutationFn"
>;

export const deleteTodoMutation = () => ({
  mutationFn: api.deleteTodo.bind(api),
  options: {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  },
});

function useDeleteTodoMutation(options?: useDeleteTodoMutationOptions) {
  const mutation = deleteTodoMutation();
  return useMutation(mutation.mutationFn, { ...mutation.options, ...options });
}

export default useDeleteTodoMutation;
