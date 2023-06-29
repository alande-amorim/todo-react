import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "~/api/web2";
import { Todo } from "~/types";

type useGetTodoQueryOptions = Omit<
  UseQueryOptions<Todo, unknown, Todo>,
  "queryKey" | "queryFn"
>;

export const getTodoQuery = (id: Todo["id"]) => ({
  queryKey: ["todos", id],
  queryFn: () => api.getTodo(id),
  queryOptions: {},
});

export default function useGetTodoQuery(
  id: Todo["id"],
  options?: useGetTodoQueryOptions
) {
  const query = getTodoQuery(id);
  return useQuery<Todo, unknown, Todo>(query.queryKey, query.queryFn, {
    ...query.queryOptions,
    ...(options as useGetTodoQueryOptions),
  });
}
