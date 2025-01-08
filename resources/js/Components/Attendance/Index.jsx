import { usePage } from "@inertiajs/react";
import React from "react";
import SubmitAttendance from "./Submit";
import Submitted from "./Submitted";

export default function Index() {
    const { submitted } = usePage().props; // mengambil dari static func
    if (submitted) {
        return <Submitted />; //informasi sudah absen
    } else {
        return <SubmitAttendance />; //form absen
    }
}
