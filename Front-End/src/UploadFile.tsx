import { ChangeEvent } from 'react';

function UploadFile({ setSelectedFile }: { setSelectedFile: (file: File) => void }) {

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
        }
    };

    return (
        <>
            <div className="relative outline outline-gray-400 rounded-lg">
                <label htmlFor="UserEmail" className="sr-only"> CSV File </label>
                <input
                    className=""
                    id="file_input"
                    type="file"
                    accept=".csv"
                    max={1}
                    onChange={handleFileSelect}
                />

                <span
                    className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </div>

        </>
    );
}

export default UploadFile;
