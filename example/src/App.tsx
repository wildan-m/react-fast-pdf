import React, {CSSProperties, useState} from 'react';
import ReactFastPDF, {PDFPreviewer} from 'react-fast-pdf';
import './index.css';

const pdfPreviewerContainerStyle: CSSProperties = {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#184E3D',
    borderStyle: 'solid',
};

function App() {
    const [file, setFile] = useState<string | null>(null);
    const [dimensions, setDimensions] = useState({ width: '100%', height: '100%' });

    return (
        <main className="container">
            <h1 className="title">Hello, I am {ReactFastPDF.PackageName}!</h1>

            {file ? (
                <div style={{ width: dimensions.width, height: dimensions.height }}>
                    <button
                        className="button button_back"
                        type="button"
                        onClick={() => setFile(null)}
                    >
                        Back
                    </button>

                    <PDFPreviewer
                        file={file}
                        pageMaxWidth={1000}
                        isSmallScreen={false}
                        containerStyle={pdfPreviewerContainerStyle}
                    />
                </div>
            ) : (
                <>
                    <h3>Please choose a file for previewing:</h3>

                    <div className="buttons_container">
                        <button
                            className="button"
                            type="button"
                                onClick={() => {
                                    setDimensions({ width: '100%', height: '100%' })
                                    setFile('example.pdf');
                                }}
                        >
                            example.pdf
                        </button>

                        <button
                            className="button"
                            type="button"
                                onClick={() => {
                                    setDimensions({ width: '100%', height: '100%' })
                                    setFile('example.pdf');

                                    setTimeout(() => {
                                        setDimensions({ width: '0', height: '0' })
                                        setFile(null)
                                    }, 1500)
                                }}
                        >
                            Mount, unmount, hide with dimension
                        </button>

                        <button
                            className="button"
                            type="button"
                            onClick={() => {
                                setDimensions({ width: '100%', height: '100%' })
                                setFile('example_protected.pdf')
                            }}
                        >
                            example_protected.pdf (Password: 123456)
                        </button>

                        <input
                            className="button"
                            type="file"
                            onChange={(event) => {
                                const uploadedFile = event?.target?.files?.[0];

                                if (!uploadedFile) {
                                    return;
                                }

                                setFile(URL.createObjectURL(uploadedFile));
                            }}
                        />
                    </div>
                </>
            )}
        </main>
    );
}

export default App;
