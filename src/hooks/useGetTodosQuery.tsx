import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import api from "~/api/web2";
import { Todo } from "~/types";

type useGetTodosQueryOptions = Omit<
  UseQueryOptions<Todo[], unknown, Todo[]>,
  "queryKey" | "queryFn"
>;

export const getTodosQuery = () => ({
  queryKey: ["todos"],
  queryFn: () => api.getTodos(),
  queryOptions: {},
});

export default function useGetTodosQuery(options?: useGetTodosQueryOptions) {
  const query = getTodosQuery();
  return useQuery<Todo[], unknown, Todo[]>(query.queryKey, query.queryFn, {
    ...query.queryOptions,
    ...(options as useGetTodosQueryOptions),
  });
}
