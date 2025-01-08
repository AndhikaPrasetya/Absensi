import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { Link } from "@inertiajs/react";
import SubmitAttendance from "@/Components/Attendance/Submit";

export default function AttendanceIndex({ auth, attendances }) {
    console.log(attendances);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Attendances
                </h2>
            }
        >
            <Head title="Attendances" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between mb-4 items-center">
                        Total :{attendances.total}
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className=" w-full mb-10">
                                <thead>
                                    <tr className="border-b-2">
                                        <th scope="col" className="py-5">
                                            Tanggal
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Alamat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendances.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b-2"
                                        >
                                            <td className="py-4 px-4 text-center">
                                                {user.created_at}
                                            </td>
                                            <td className=" py-4 px-4 text-center">
                                                {user.name}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {user.status}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {user.address}
                                            </td>
                                           
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={attendances.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
