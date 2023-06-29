import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import api from "~/api/web2";
import queryClient from "~/config/queryClient";
import { Todo } from "~/types";

type MutateData = Parameters<typeof api.updateTodo>;

type useUpdateTodoMutationOptions = Omit<
  UseMutationOptions<Todo, unknown, MutateData, unknown>,
  "mutationFn"
>;

export const createTodoMutation = () => ({
  mutationFn: (params: MutateData) => api.updateTodo(...params),
  defaultOptions: {
    onSuccess: (todo: Todo) => {
      queryClient.invalidateQueries(["todos", todo.id]);
    },
  },
});

function useUpdateTodoMutation(options?: useUpdateTodoMutationOptions) {
  const { mutationFn, defaultOptions } = createTodoMutation();
  return useMutation<Todo, unknown, MutateData, unknown>(mutationFn, {
    ...defaultOptions,
    ...options,
  });
}

export default useUpdateTodoMutation;
