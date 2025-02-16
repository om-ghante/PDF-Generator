import { useState } from "react";
import { jsPDF } from "jspdf";
import Papa from "papaparse";

const MainApp = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const data = result.data;
        if (data.length > 0) {
          setCsvData(data.slice(1));
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const generatePDF = () => {
    if (!selectedPerson) return;

    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(24);
    doc.text("Certificate of Honor", 60, 30);

    doc.setFontSize(16);
    doc.text(`This certificate is awarded to ${selectedPerson.Name}`, 20, 60);
    doc.text(`Age: ${selectedPerson.Age}`, 20, 80);
    doc.text(`Date of Birth: ${selectedPerson.DOB}`, 20, 100);

    const pdfUrl = doc.output("bloburl");
    setPdfUrl(pdfUrl);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-start justify-start text-black">
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Generate PDF from CSV
        </h1>

        <div className="flex flex-col items-center mb-6">
          <label className="text-lg font-semibold mb-2">Upload CSV File:</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="w-full max-w-xs p-2 border border-gray-600 rounded text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {csvData.length > 0 && (
          <div className="flex flex-col items-center mb-6">
            <label className="text-lg font-semibold mb-2">Select Name:</label>
            <select
              onChange={(e) => setSelectedPerson(csvData[e.target.value])}
              className="w-full max-w-xs p-2 border border-gray-600 rounded text-black focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Choose a Name</option>
              {csvData.map((person, index) => (
                <option key={index} value={index}>
                  {person.Name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={generatePDF}
            className="w-64 bg-black text-white py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-md"
          >
            Generate PDF
          </button>
        </div>

        {pdfUrl && (
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-black">
              PDF Preview
            </h2>
            <iframe
              src={pdfUrl}
              className="w-full max-w-3xl h-80 border rounded shadow-md"
              title="PDF Preview"
            ></iframe>
            <button
              onClick={() => window.open(pdfUrl)}
              className="mt-4 w-64 bg-green-500 text-black py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-md"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainApp;
