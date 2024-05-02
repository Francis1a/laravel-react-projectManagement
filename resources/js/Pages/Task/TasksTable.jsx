import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constans";
import { Link, router } from "@inertiajs/react";
import React from "react";

export default function TasksTable({
  tasks,
  queryParams,
  hiddenProjectColumn = true,
  success,
}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (task) => {
    if (!window.confirm("Are you sure you want to delete the task?")) {
      return;
    } else {
      router.delete(route("task.destroy", task.id));
    }
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )}
      <div className="flex justify-end gap-2 py-3">
        <div className="">
          <TextInput
            className="w-full"
            defaultValue={queryParams.name}
            placeholder="Task Name"
            onBlur={(e) => searchFieldChanged("name", e.target.value)}
            onKeyPress={(e) => onKeyPress("name", e)}
          />
        </div>
        <div className="">
          <SelectInput
            className="w-full"
            defaultValue={queryParams.status}
            onChange={(e) => searchFieldChanged("status", e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </SelectInput>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap  ">
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>

              <th className="px-3 py-3">Image</th>

              {hiddenProjectColumn && (
                <TableHeading
                  name="name"
                  sort_field={queryParams.sort_field}
                  sort_direction={queryParams.sort_direction}
                  sortChanged={sortChanged}
                >
                  Porject Name
                </TableHeading>
              )}

              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Task Name
              </TableHeading>
              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Status
              </TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Created Date
              </TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Due Date
              </TableHeading>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map((task) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={task.id}
              >
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2">
                  <img src={task.image_path} alt="" style={{ width: 60 }} />
                </td>
                {hiddenProjectColumn && (
                  <td className="px-3 py-2">{task.project.name}</td>
                )}
                <th className="px-3 py-2">
                  <Link
                    className=" text-white-50 text-bold hover:underline"
                    href={route("task.show", task.id)}
                  >
                    {task.name}
                  </Link>
                </th>
                <td className="px-3 py-2">
                  <span
                    className={
                      "block px-2 py-1 rounded text-white w-full text-center " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-2">{task.created_at}</td>
                <td className="px-3 py-2">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy.name}</td>
                <td className="px-3 py-2 flex">
                  <Link
                    href={route("task.edit", task.id)}
                    className="px-3 py-2 text-blue-600 text-nowrap hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => deleteTask(task)}
                    className=" px-3 py-2 text-red-400 text-nowrap hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  );
}
