import React, { useState } from 'react';

interface Tab {
    label: string;
    content: React.ReactNode;
}

interface Props {
    tabs: Tab[];
}

const Output: React.FC<Props> = ({ tabs }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabClick = (index: number) => {
        setSelectedTab(index);
    };

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="Tab" className="sr-only">Tab</label>
                <select id="Tab" className="w-full rounded-md border-gray-200">
                    {tabs.map((tab, index) => (
                        <option key={index}>{tab.label}</option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex gap-6">
                        {tabs.map((tab, index) => (
                            <a
                                href="#"
                                key={index}
                                className={`shrink-0 border border-transparent p-3 text-sm font-medium ${selectedTab === index
                                        ? 'text-sky-600 border-b-white'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => handleTabClick(index)}
                            >
                                {tab.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            <div>{tabs[selectedTab].content}</div>
        </div>
    );
};

export default Output;
