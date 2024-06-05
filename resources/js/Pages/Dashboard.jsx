import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  totalPendingTasks,
  myPendingTasks,
  totalProgressTasks,
  myProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-amber-500 text-2xl font-semibold">
                Pending Tasks
              </h3>
              <p className="text-large">
                {myPendingTasks} / {totalPendingTasks}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-blue-500 text-2xl font-sembold">
                In Progress Tasks
              </h3>
              <p className="text-large">
                {myProgressTasks} / {totalProgressTasks}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-green-500 text-2xl font-sembold">
                Completed Tasks
              </h3>
              <p className="text-large">
                {myCompletedTasks} / {totalCompletedTasks}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-gray-200 text-xl font-semibold">
                My Active Tasks
              </h3>

              <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="border-b dark:bg-gray-800 dark:border-gray-700 dark:bg-gray-700">
                    <th className="px-3 py-3 dark:bg-gray-700">ID</th>
                    <th className="px-3 py-3 dark:bg-gray-700">Project</th>
                    <th className="px-3 py-3 dark:bg-gray-700">Task</th>
                    <th className="px-3 py-3 dark:bg-gray-700">status</th>
                    <th className="px-3 py-3 dark:bg-gray-700">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.data.map((task) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={task.id}
                    >
                      <td className="px-3 py-2 ">{task.id}</td>
                      <td className="px-3 py-2 ">
                        <Link
                          className=" text-white-50 text-bold hover:underline"
                          href={route("project.show", task.project.id)}
                        >
                          {task.project.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 ">
                        <Link
                          className=" text-white-50 text-bold hover:underline"
                          href={route("task.show", task.id)}
                        >
                          {task.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 ">
                        <span
                          className={
                            "block px-2 py-1 rounded text-white w-full text-center " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2 ">{task.due_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
