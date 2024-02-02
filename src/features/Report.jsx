import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const Report = () => {
  const [reportData, setReportData] = useState({});
  const [fetchError, setFetchError] = useState(false);

  console.log(reportData);

  useEffect(() => {
    fetchLastInsertedData();
  }, []);

  const fetchLastInsertedData = async () => {
    try {
      const response = await fetch('http://localhost:8081/report');
      if (!response.ok) throw new Error('Error Fetching Report Data');
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      setFetchError(true);
      console.error('Error fetching report data:', error);
    }
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet([reportData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const fileName = `report_${formattedDate}.xlsx`;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  if (fetchError) {
    return (
      <div className="container mb-8 px-10">
        <h1 className="my-5 mb-6 text-center text-3xl font-medium text-black">
          Error fetching report data
        </h1>
        <p className="text-center text-base font-semibold">
          Check Database connection or internet connection to get report data.
        </p>
      </div>
    );
  }

  return (
    <div className="container mb-8 px-10">
      <h1 className="my-5 mb-6 text-center text-3xl font-medium text-black">
        Report
      </h1>

      <button className="btn btn-outline mb-4" onClick={downloadExcel}>
        Download Report as Excel
      </button>

      <div>
        <div className="table table-auto space-y-5 p-2">
          <section>
            <div className="flex items-center justify-around bg-slate-500 p-4 text-white">
              <p>
                <span className="font-semibold">Form No:</span> IMS / F / 05-06
              </p>
              <p>
                <span className="font-semibold">Rev. No.</span> 3
              </p>
              <p>
                <span className="font-semibold">Date:</span>{' '}
                {new Date(reportData.uploadDate).toDateString()}
              </p>
            </div>
          </section>

          <section>
            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-1/3">Location</div>
                <div className="w-1/3">Permit No.</div>
                <div className="w-1/3">Loto</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-1/3">{reportData?.location}</div>
                <div className="w-1/3">{reportData?.permitNo}</div>
                <div className="w-1/3">{reportData?.loto}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">Permit Request by</span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-1/4">Name & Designation</div>
                <div className="w-1/4">Signature</div>
                <div className="w-1/4">Date</div>
                <div className="w-1/4">Time</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-1/4">{reportData?.nameDesignation}</div>
                <div className="w-1/4">{reportData?.signature_filename}</div>
                <div className="w-1/4">
                  {new Date(reportData?.permit_date).toDateString()}
                </div>
                <div className="w-1/4">{reportData?.permit_time}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-full">Work Description</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <p className="w-full">{reportData?.workDescription}</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">Safety and Requester</span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-full">
                  Joint site visit by safety and requester: The job preparation,
                  precaution and conditions are satisfactory and safe. The
                  people who are going to carry job have been explained the
                  hazards involved and precautions to be takery.
                </div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-full">{reportData?.safetyRequester}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">Hazards</span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-full">Associated Hazards</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-full">{reportData?.hazards}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">PPE</span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-full">Required PPE</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-full">{reportData?.ppe}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">Person Issuing Permit</span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-1/4">Name & Designation</div>
                <div className="w-1/4">Signature</div>
                <div className="w-1/4">Permit Validity</div>
                <div className="w-1/4">Date</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-1/4">{reportData?.permitIssuing}</div>
                <div className="w-1/4">
                  {reportData?.permitIssuingSignature_filename}
                </div>
                <div className="w-1/4">{reportData?.permitValidity}</div>
                <div className="w-1/4">
                  {new Date(reportData?.permitIssuingDate).toDateString()}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">Person Accepting Permit</span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-1/4">Name & Designation</div>
                <div className="w-1/4">Signature</div>
                <div className="w-1/4">From</div>
                <div className="w-1/4">To</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-1/4">{reportData?.permitAccepting}</div>
                <div className="w-1/4">
                  {reportData?.permitAcceptingSignature_filename}
                </div>
                <div className="w-1/4">{reportData?.permitTimeStart}</div>
                <div className="w-1/4">{reportData?.permitTimeEnd}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">Extension of permit</span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-1/4">Extended Permit Validity</div>
                <div className="w-1/4">Date</div>
                <div className="w-1/4">From</div>
                <div className="w-1/4">To</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-1/4">
                  {reportData?.extendedPermitValidity}
                </div>
                <div className="w-1/4">{reportData?.extendedPermitDate}</div>
                <div className="w-1/4">
                  {reportData?.extendedPermitTimeStart}
                </div>
                <div className="w-1/4">{reportData?.extendedPermitTimeEnd}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">
                  Person Issue Extension Permit
                </span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-1/2">Name & Designation</div>
                <div className="w-1/2">Signature</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-1/2">
                  {reportData?.extendedPermitIssuing
                    ? reportData?.extendedPermitIssuing
                    : 'N/A'}
                </div>
                <div className="w-1/2">
                  {reportData?.extendedPermitIssuingSignature_filename
                    ? reportData?.extendedPermitIssuingSignature_filename
                    : 'N/A'}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">
                  Person Accept Extension Permit
                </span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-1/2">Name & Designation</div>
                <div className="w-1/2">Signature</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-1/2">
                  {reportData?.extendedPermitAccepting
                    ? reportData?.extendedPermitAccepting
                    : 'N/A'}
                </div>
                <div className="w-1/2">
                  {reportData?.extendedPermitSignature_filename
                    ? reportData?.extendedPermitSignature_filename
                    : 'N/A'}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">
                  Closing of permit: Person Closing Permit
                </span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-1/2">Name & Designation</div>
                <div className="w-1/2">Signature</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-1/2">{reportData?.permitCloserName}</div>
                <div className="w-1/2">
                  {reportData?.permitCloserSignature_filename}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-around bg-slate-200 p-4 text-slate-900">
              <p className="text-lg">
                <span className="font-semibold">
                  Closing of permit: Person Accepting Permit
                </span>
              </p>
            </div>

            <div className="flex flex-col text-white">
              {/* Table Header */}
              <div className="flex items-center justify-between divide-x-2 border-b bg-sky-950 p-4 text-center">
                <div className="w-1/2">Name & Designation</div>
                <div className="w-1/2">Signature</div>
              </div>

              {/* Table Row */}
              <div className="flex items-center justify-between divide-x-2 divide-black bg-slate-100 p-4 text-center text-black">
                <div className="w-1/2">
                  {reportData?.permitClosingAccepting}
                </div>
                <div className="w-1/2">
                  {reportData?.permitClosingAcceptingSignature_filename}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Report;
