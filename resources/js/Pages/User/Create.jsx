import React from "react";
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
import roles from "@/data/roles.json"

export default function UserCreate({ auth }) {
    const passwordInput = useRef();

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            role:"",
            password: "",
            password_confirmation: "",
            role:"user"
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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <section className="max-w-xl mx-auto">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Create User
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Create a new user
                                    </p>
                                </header>

                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                        />

                                        <TextInput
                                            id="name"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                            isFocused
                                            autoComplete="name"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.name}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
                                        <TextInput
                                            id="email"
                                            className="mt-1 block w-full"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                            isFocused
                                            autoComplete="email"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.email}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="Role"
                                            value="role"
                                        />
                                        <SelectBox
                                            onChange={(e) =>
                                                setData("role", e.target.value)
                                            }
                                            id="role"
                                            currentValue="user"
                                            options={roles}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.email}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />

                                        <TextInput
                                            id="password"
                                            ref={passwordInput}
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            type="password"
                                            className="mt-1 block w-full"
                                            autoComplete="password"
                                        />

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirm Password"
                                        />

                                        <TextInput
                                            id="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            type="password"
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                        />

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Save
                                        </PrimaryButton>
                                        

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
                                        </Transition>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
