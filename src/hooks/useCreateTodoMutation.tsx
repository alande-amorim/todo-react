import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import api from "~/api/web2";
import { Todo } from "~/types";

type MutateData = Parameters<typeof api.createTodo>[0];

type useCreateTodoMutationOptions = Omit<
  UseMutationOptions<Todo, unknown, MutateData, unknown>,
  "mutationFn"
>;

export const createTodoMutation = () => ({
  mutationFn: (data: MutateData) => api.createTodo.call(api, data),
});

function useCreateTodoMutation(options?: useCreateTodoMutationOptions) {
  const { mutationFn } = createTodoMutation();
  const mutation = useMutation<Todo, unknown, MutateData, unknown>(mutationFn, {
    ...options,
  });

  return mutation;
}

export default useCreateTodoMutation;
