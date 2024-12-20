import React from "react";

export default function SelectBox({
    className = "",
    options,
    currentValue,
    ...props
}) {
    return (
        <div className="select-box">
            <select
                {...props}
                defaultValue={currentValue}
                className={
                    "rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full" +
                    className
                }
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
