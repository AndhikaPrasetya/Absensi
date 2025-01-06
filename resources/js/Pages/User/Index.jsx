import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { Link } from "@inertiajs/react";
import SubmitAttendance from "@/Components/Attendance/Submit";

export default function UserIndex({ auth, user }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between mb-4 items-center">
                        Total Data :{user.total}
                        <Link
                            href={route("users.create")}
                            className="bg-blue-500 py-2 px-4 rounded text-white"
                            label="Create Users"
                        >
                            Create Users
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className=" w-full mb-10">
                                <thead>
                                    <tr className="border-b-2">
                                        <th scope="col" className="py-5">
                                            Id
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b-2"
                                        >
                                            <td className="py-4 px-4 text-center">
                                                {user.id}
                                            </td>
                                            <td className=" py-4 px-4 text-center">
                                                {user.name}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {user.email}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {user.role}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <Link
                                                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                                    href={route(
                                                        "users.edit",
                                                        user.id
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={user.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
