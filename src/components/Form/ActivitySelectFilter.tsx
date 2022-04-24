import { Dispatch, SetStateAction } from 'react';

interface ActivitySelectFilterProps {
    list: selectData[];
    setHook: Dispatch<SetStateAction<string>>;
}

interface selectData {
    value: number | string;
    label: string;
}

export default function ActivitySelectFilter({ list, setHook }: ActivitySelectFilterProps) {
    return (
        <select
            onChange={(e) => {
                const orderBySelected: string = e.target.value;
                setHook(orderBySelected);
            }}
            required
        >
            {list.map((item) => (
                <option value={item.value}>{item.label}</option>
            ))}
        </select>
    );
}
