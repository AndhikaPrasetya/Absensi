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
import { Loader } from "@googlemaps/js-api-loader";

export default function SubmitAttendance() {
    const [statusAttendance, setStatusAttendance] = useState(false);

    const { data, setData, transform, post, errors, processing } = useForm({
        status: "attend",
        description: "",
        latitude: "",
        longitude: "",
        address: "",
        prepareData: {},
    });

    const getLatLing = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(
            function (position) {
                createGeocoder(position.coords);
            },
            function (error) {
                alert("tidak mendapatkan lokasi");
            }
        );
    };

    // mencari titik daerah melalui lat ling
    function createGeocoder(coordinates) {
        axios
            .get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}`
            )
            .then((response) => {
                if (!response) {
                    alert("tidak mendapatkan lokasi");
                }
                console.log("Address:", response);
                //set prepareData
                let objLocation = {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    address: response.data.display_name,
                };
                setData("prepareData", objLocation);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

//sebelum submit transform data
    useEffect(() => {
        if (data.prepareData.hasOwnProperty("address")) {
            transform((data) => ({
                ...data.prepareData,
                status: data.status,
                description: data.description,
            }));

            post(route("attendance.submit"), {
                preserveScroll: true,
                onSuccess: () => {
                    alert("absensi berhasil disubmit");
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        }
    }, [data.prepareData]);

    useEffect(() => {
        if (data.status !== "attend") {
            setStatusAttendance(true);
        } else {
            setStatusAttendance(false);
        }
    }, [data.status]);

    return (
        <form onSubmit={getLatLing} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="info" value="Silahkan lakukan absensi" />

                <SelectBox
                    onChange={(e) => setData("status", e.target.value)}
                    options={[
                        { value: "attend", label: "Hadir" },
                        { value: "sick", label: "Sakit" },
                        { value: "leave", label: "leave" },
                        { value: "permit", label: "Izin" },
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
            </div>
        </form>
    );
}
