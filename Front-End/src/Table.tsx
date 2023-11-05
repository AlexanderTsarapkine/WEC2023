import React from 'react';
import { Arsenal } from './interfaces/types';


interface Props {
    data: Arsenal[] | null;
}

const Table: React.FC<Props> = ({data}) => {
        return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            ObjectName
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Weight
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Survival Usefulness
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Combat Usefulness
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {data && data.map((arsenal, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'odd:bg-gray-50' : ''}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {arsenal.ObjectName}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {arsenal.Weight}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {arsenal.SurvivalUsefulness}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {arsenal.CombatUsefulness}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
