import React from 'react';


interface Props {
    // Define props here
}

const Table: React.FC<Props> = (props) => {
    // Define component logic here
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
                    <tr className="odd:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            John Doe
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                    </tr>

                    <tr className="odd:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Jane Doe
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Designer</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
                    </tr>

                    <tr className="odd:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Gary Barlow
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
