import React from 'react';
import { Arsenal } from './interfaces/types';
import { useState } from 'react';

interface Props {
    data: Arsenal[][] | null;
}

const Table: React.FC<Props> = ({ data }) => {
    const [count, setCount] = useState(0);

    const handleClick = (value: number) => {
      setCount(value);
    };
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                    <th
                        className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                        onClick={() => handleClick(0)} // Set state to 1 when ObjectName header is clicked
                    >
                        ObjectName
                    </th>
                    <th
                        className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer`"
                        onClick={() => handleClick(1)} // Set state to 2 when Weight header is clicked
                    >
                        Weight
                    </th>
                    <th
                        className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer"
                        onClick={() => handleClick(2)} // Set state to 3 when Survival Usefulness header is clicked
                    >
                        Survival Usefulness
                    </th>
                    <th
                        className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer"
                        onClick={() => handleClick(3)} // Set state to 4 when Combat Usefulness header is clicked
                    >
                        Combat Usefulness
                    </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                 {data && data[count] && data[count].map((sortedArsenal, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'odd:bg-gray-50' : ''}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {sortedArsenal.ObjectName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700" >
                        {sortedArsenal.Weight}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {sortedArsenal.SurvivalUsefulness}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {sortedArsenal.CombatUsefulness}
                    </td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
};

export default Table;
