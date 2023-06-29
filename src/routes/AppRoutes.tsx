import { createBrowserRouter } from "react-router-dom";
import Layout from "~/components/Layout";
import Todo from "~/components/Todo";
import Todos from "~/components/Todos";
import queryClient from "~/config/queryClient";
import api from "~/api/web2";
import { getTodosQuery } from "~/hooks/useGetTodosQuery";
import { getTodoQuery } from "~/hooks/useGetTodoQuery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout pageTitle={"TODO Lists"} />,
    children: [
      {
        path: "/todo",
        element: <Todos />,
        loader: async () => {
          const query = getTodosQuery();
          // queryClient.prefetchQuery("todos", () => api.getTodos());
          // const data = await api.getTodos();
          return (
            queryClient.getQueryData(query.queryKey) ??
            (await queryClient.fetchQuery(query.queryKey, query.queryFn))
          );
        },
      },
      {
        path: "/todo/:id",
        element: <Todo />,
        loader: async ({ params }) => {
          const query = getTodoQuery(params.id as string);

          return (
            queryClient.getQueryData(query.queryKey) ??
            (await queryClient.fetchQuery(query.queryKey, query.queryFn))
          );
        },
      },
    ],
    // ErrorBoundary: () => <div>error</div>,
  },
]);

export default router;

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route element={<Layout pageTitle={"TODO Lists"} />}>
//         <Route
//           path="/todo"
//           element={<Todos />}
//           loader={async ({ request, params }) => {
//             console.log(request, params);
//             const data = await api.getTodos();
//             return data;
//           }}
//         />
//         <Route path="/todo/:taskId" element={<Todo />} />
//       </Route>
//     </Routes>
//   );
// }
