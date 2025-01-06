import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useRef } from "react";
import SelectBox from "@/Components/SelectBox";
import roles from "@/data/roles.json";

export default function SubmitAttendance({ auth }) {
    const [statusAttendance, setStatusAttendance] = useState(false);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
           status: "attend",
           description:""
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("users.store"), {
            preserveScroll: true,
            onSuccess: () => {
                alert("success");
            },
            onError: () => {
                console.log("error");
            },
        });
    };

    useEffect(() => {
        if (data.status !== "attend") {
            setStatusAttendance(true);
        } else {
            setStatusAttendance(false);
        }
    }, [data.status]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="info" value="Silahkan lakukan absensi" />

                <SelectBox
                    onChange={(e) => setData("status", e.target.value)}
                    options={[
                        { value: "attend", label: "attend" },
                        { value: "sick", label: "sick" },
                        { value: "leave", label: "leave" },
                        { value: "permit", label: "permit" },
                        { value: "business_trip", label: "Perjalanan Dinas" },
                        { value: "remote", label: "WFA" },
                    ]}
                />

                <InputError className="mt-2" message={errors.status} />
            </div>

            <Transition
                show={statusAttendance}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div>
                    <InputLabel htmlFor="Description" value="Penjelasan" />

                    <TextInput
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>
            </Transition>

            <div className="flex items-center justify-between gap-4">
                <PrimaryButton disabled={processing}>Absensi</PrimaryButton>

                {/* 
                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-gray-600">
                                                Saved.
                                            </p>
                                        </Transition> */}
            </div>
        </form>
    );
}
