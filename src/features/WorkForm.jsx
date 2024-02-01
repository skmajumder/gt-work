import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const hazardOptions = [
  'Overhead Work (Dropped Objects)',
  'Flammable materials',
  'Torqueing Operations',
  'Wind, Weather, Sea',
  'Toxic/Corrosive materials',
  'Slippery/Wet surfaces',
  'Electric Shock',
  'Moving parts',
  'Working at heights',
  'Liquid/Gas under pressure',
  'Rotating machinery',
  'Hazardous Material',
  'Spill Potential',
  'Fire hazard',
  'Restricted Movement',
  'Danger of falling overboard',
  'Lifting/Manual handling',
  'Grit blasting',
  'Flying particles',
  'Pressure Washing Activities',
  'HVAC Units',
  'Sharp Edges',
  'Crane Operations',
  'Restricted Access',
  'High/Low temperatures',
  'Working over water',
];

const ppeOptions = [
  'Boiler suit',
  'Safety Helmet',
  'Air-purifying respirator',
  'Asbestos handling PPE set',
  'Safety Shoe',
  'Safety goggles',
  'Face mask',
  'Low-voltage gloves',
  'Gumboot',
  'Gloves',
  'Chemical Suit',
  'Medium voltage gloves',
  'Full body harness',
  'Ear Plug',
  'Ear Muff',
];

const optionsPerColumn = 7;

const WorkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (Array.isArray(data.hazards) && data.hazards.includes('Others')) {
      // * Replace "Others" with the entered value in the hazards array
      const othersIndex = data.hazards.indexOf('Others');
      if (othersIndex !== -1) {
        data.hazards.splice(othersIndex, 1, data.otherReason);
      }
      // * Remove the separate otherReason property
      delete data.otherReason;
    }

    if (Array.isArray(data.ppe) && data.ppe.includes('Others')) {
      // * Replace "Others" with the entered value in the ppe array
      const othersIndex = data.ppe.indexOf('Others');
      if (othersIndex !== -1) {
        data.ppe.splice(othersIndex, 1, data.otherPPE);
      }
      // * Remove the separate otherPPE property
      delete data.otherPPE;
    }

    // * Create an object with the form data
    const formData = {
      uploadDate: data.uploadDate,
      location: data.location,
      permitNo: data.permitNo,
      loto: data.loto,
      nameDesignation: data.nameDesignation,
      signature_filename: data.signature[0]?.name,
      permit_date: data.date,
      permit_time: data.time,
      workDescription: data.workDescription,
      safetyRequester: data.safetyRequester,
      hazards: data.hazards,
      ppe: data.ppe,
      permitIssuing: data.permitIssuing,
      permitIssuingSignature_filename: data.permitIssuingSignature[0]?.name,
      permitValidity: data.permitValidity,
      permitIssuingDate: data.permitIssuingDate,
      permitAccepting: data.permitAccepting,
      permitAcceptingSignature_filename: data.permitAcceptingSignature[0]?.name,
      permitTimeStart: data.permitTimeStart,
      permitTimeEnd: data.permitTimeEnd,
      extendedPermitValidity: data.extendedPermitValidity,
      extendedPermitDate: data.extendedPermitDate,
      extendedPermitTimeStart: data.extendedPermitTimeStart,
      extendedPermitTimeEnd: data.extendedPermitTimeEnd,
      extendedPermitIssuing: data.extendedPermitIssuing,
      extendedPermitIssuingSignature_filename:
        data.extendedPermitIssuingSignature[0]?.name,
      extendedPermitAccepting: data.extendedPermitAccepting,
      extendedPermitSignature_filename: data.extendedPermitSignature[0]?.name,
      permitCloserName: data.permitCloserName,
      permitCloserSignature_filename: data.permitCloserSignature[0]?.name,
      permitClosingAccepting: data.permitClosingAccepting,
      permitClosingAcceptingSignature_filename:
        data.permitClosingAcceptingSignature[0]?.name,
    };

    try {
      const response = await fetch('http://localhost:8081/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.success) {
        console.log(
          'Form data submitted successfully. Insert ID:',
          responseData.insertId,
        );
        Swal.fire({
          title: 'Good job!',
          text: 'You clicked the button!',
          icon: 'success',
        });
        reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error submitting form data!',
        });
        console.error('Error submitting form data:', responseData.error);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error submitting form data!',
      });
      console.error('Error submitting form data:', error.message);
    }
  };

  return (
    <section className="container px-10">
      <h1 className="my-5 mb-2 text-center text-3xl font-medium text-black">
        Kabir Steel Limited
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-10 space-y-10"
        encType="multipart/form-data"
      >
        <div className="flex flex-row gap-4 border-2 border-black">
          <div className="basis-4/6 border-r-2 border-black p-3">
            <p className="text-center text-xl font-medium text-black">
              Cold work permit with / without working at height and / or
              electrical works as applicable
            </p>
          </div>
          <div className="basis-2/6 p-3">
            <p>Form No: IMS / F / 05-06</p>
            <p>
              <label htmlFor="upload-date">Rev. No. 3, Date::</label>
              <input
                type="text"
                id="upload-date"
                {...register('uploadDate', { required: true })}
                value={new Date().toDateString()}
                className={`ml-2 rounded-sm border-none ${
                  errors.uploadDate ? 'border-red-500' : ''
                }`}
              />
              {errors.uploadDate && (
                <p className="mt-1 text-red-500">Date is required</p>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 p-2">
          <div className="basis-4/6">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              {...register('location', { required: true })}
              className={`ml-2 rounded-sm border border-slate-700 ${
                errors.location ? 'border-red-500' : ''
              }`}
            />
            {errors.location && (
              <p className="mt-1 text-red-500">Location is required</p>
            )}
          </div>
          <div className="basis-2/6">
            <div className="mb-3">
              <label htmlFor="permit-no">Permit No:</label>
              <input
                type="text"
                id="permit-no"
                {...register('permitNo', { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 ${
                  errors.permitNo ? 'border-red-500' : ''
                }`}
              />
              {errors.permitNo && (
                <p className="mt-1 text-red-500">Permit No. is required</p>
              )}
            </div>
            <div>
              <label htmlFor="loto" className="mr-2 inline-block">
                Loto:
              </label>
              <label className="mr-2 inline-block">
                <input
                  type="radio"
                  value="Yes"
                  {...register('loto', { required: true })}
                  className="mr-1"
                />
                Yes
              </label>
              <label className="inline-block">
                <input
                  type="radio"
                  value="No"
                  {...register('loto', { required: true })}
                  className="mr-1"
                />
                No
              </label>

              {errors.loto && (
                <p className="mt-1 text-red-500">Loto is required</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-2 border-black p-2">
          <p className="mb-2 basis-full font-semibold">Permit Request by</p>
          <div className="flex flex-row items-center justify-start gap-2">
            <div>
              <label htmlFor="name-designation">Name & Designation:</label>
              <input
                type="text"
                id="name-designation"
                {...register('nameDesignation', { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 ${
                  errors.nameDesignation ? 'border-red-500' : ''
                }`}
              />
              {errors.nameDesignation && (
                <p className="mt-1 text-red-500">
                  Name & Designation is required
                </p>
              )}
            </div>

            <div>
              <label htmlFor="signature">Signature:</label>
              <input
                type="file"
                id="signature"
                accept="image/*"
                {...register('signature', { required: true })}
                className={`ml-2 ${errors.signature ? 'border-red-500' : ''}`}
              />
              {errors.signature && (
                <p className="mt-1 text-red-500">Signature is required</p>
              )}
            </div>

            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                {...register('date', { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 p-1 ${
                  errors.date ? 'border-red-500' : ''
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-red-500">Date is required</p>
              )}
            </div>

            <div>
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                {...register('time', { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 p-1 ${
                  errors.time ? 'border-red-500' : 'border-slate-700'
                }`}
              />
              {errors.time && (
                <p className="mt-1 text-red-500">Time is required</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-2 border-black p-2">
          <div className="mb-4">
            <label htmlFor="workDescription">Work Description:</label>
            <textarea
              id="workDescription"
              {...register('workDescription', { required: true })}
              rows="4"
              className={`mt-1 w-full rounded-sm border border-black p-2 ${
                errors.workDescription ? 'border-red-500' : ''
              }`}
            ></textarea>
            {errors.workDescription && (
              <p className="mt-1 text-red-500">Work Description is required</p>
            )}
          </div>
        </div>

        <div className="border-2 border-black p-2">
          <p className="mb-2">
            <strong>Joint site visit by safety and requester:</strong> The job
            preparation, precaution and conditions are satisfactory and safe.
            The people who are going to carry job have been explained the
            hazards involved and precautions to be takery.
          </p>

          <div>
            <p className="flex items-center justify-around gap-4">
              <label className="mr-2 inline-block">
                <input
                  type="radio"
                  value="Yes"
                  {...register('safetyRequester', { required: true })}
                  className="mr-1"
                />
                Yes
              </label>

              <label className="inline-block">
                <input
                  type="radio"
                  value="No"
                  {...register('safetyRequester', { required: true })}
                  className="mr-1"
                />
                No
              </label>

              <label className="inline-block">
                <input
                  type="radio"
                  value="NA"
                  {...register('safetyRequester', { required: true })}
                  className="mr-1"
                />
                N/A
              </label>
            </p>

            {errors.safetyRequester && (
              <p className="mt-1 text-red-500">
                Safety and requester is required
              </p>
            )}
          </div>
        </div>

        <div className="border-2 border-black p-2">
          <label htmlFor="hazards" className="mb-2 block">
            Associated Hazards: (Tick as appropriate)
          </label>
          <div className="grid grid-cols-3">
            {hazardOptions.map((option, index) => (
              <div
                key={option}
                className={`mb-2 ${index % optionsPerColumn === 0 && 'col-span-1'}`}
              >
                <input
                  type="checkbox"
                  id={option}
                  {...register('hazards')}
                  value={option}
                  className="mr-1"
                />
                <label htmlFor={option} className="mr-4">
                  {option}
                </label>
              </div>
            ))}

            <div key="others" className="col-span-1">
              <input
                type="checkbox"
                id="others"
                {...register('hazards')}
                value="Others"
                className="mr-1"
              />
              <label htmlFor="others">Others:</label>

              {Array.isArray(watch('hazards')) &&
                watch('hazards').includes('Others') && (
                  <>
                    <input
                      type="text"
                      id="otherReason"
                      {...register('otherReason', { required: true })}
                      className={`mt-1 w-full rounded-sm border p-2 ${
                        errors.otherReason
                          ? 'border-red-500'
                          : 'border-slate-700'
                      }`}
                      placeholder="Specify other hazards"
                    />
                    {watch('otherReason') && (
                      <p className="mt-1 text-sm">
                        Entered value: {watch('otherReason')}
                      </p>
                    )}
                  </>
                )}
            </div>
          </div>
          {errors.hazards && (
            <p className="mt-1 text-red-500">
              Please select at least one hazard
            </p>
          )}
        </div>

        <div className="border-2 border-black p-2">
          <label htmlFor="ppe" className="mb-2 block">
            Required PPE: (Tick as required)
          </label>
          <div className="grid grid-cols-3">
            {ppeOptions.map((option, index) => (
              <div
                key={option}
                className={`mb-2 ${index % optionsPerColumn === 0 && 'col-span-1'}`}
              >
                <input
                  type="checkbox"
                  id={option}
                  {...register('ppe')}
                  value={option}
                  className="mr-1"
                />
                <label htmlFor={option} className="mr-4">
                  {option}
                </label>
              </div>
            ))}

            <div key="othersPPE" className="col-span-1">
              <input
                type="checkbox"
                id="othersPPE"
                {...register('ppe')}
                value="Others"
                className="mr-1"
              />
              <label htmlFor="othersPPE">Others:</label>

              {Array.isArray(watch('ppe')) &&
                watch('ppe').includes('Others') && (
                  <>
                    <input
                      type="text"
                      id="otherPPE"
                      {...register('otherPPE', { required: true })}
                      className={`mt-1 w-full rounded-sm border p-2 ${
                        errors.otherPPE ? 'border-red-500' : 'border-slate-700'
                      }`}
                      placeholder="Specify other PPE"
                    />

                    {watch('otherPPE') && (
                      <p className="mt-1 text-sm">
                        Entered value: {watch('otherPPE')}
                      </p>
                    )}
                  </>
                )}
            </div>
          </div>
          {errors.ppe && (
            <p className="mt-1 text-red-500">
              Please select at least one required PPE
            </p>
          )}
        </div>

        <p className="!-mt-0 font-semibold">
          Prior to permitting the person(s) intending to perform cold work,
          management are to verify that the person(s) are adequately trained.
        </p>

        <div className="flex flex-row gap-4 border-2 border-black p-2">
          <div className="basis-1/2 space-y-4">
            <p className="mb-2 basis-full font-semibold">
              Person Issuing Permit
            </p>
            <div>
              <label htmlFor="permit-issuing">Name & Designation:</label>
              <input
                type="text"
                id="permit-issuing"
                {...register('permitIssuing', { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 ${
                  errors.permitIssuing ? 'border-red-500' : ''
                }`}
              />
              {errors.permitIssuing && (
                <p className="mt-1 text-red-500">
                  Name & Designation is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="permit-signature">Signature:</label>
              <input
                type="file"
                id="permit-signature"
                accept="image/*"
                {...register('permitIssuingSignature', { required: true })}
                className={`ml-2 ${errors.signature ? 'border-red-500' : ''}`}
              />
              {errors.permitIssuingSignature && (
                <p className="mt-1 text-red-500">Signature is required</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="permit-validity">Permit Validity:</label>
                <input
                  type="number"
                  id="permit-validity"
                  placeholder="days"
                  {...register('permitValidity', { required: true })}
                  className={`ml-2 rounded-sm border border-slate-700 ${
                    errors.permitValidity ? 'border-red-500' : ''
                  }`}
                />
                {errors.permitValidity && (
                  <p className="mt-1 text-red-500">
                    Permit Validity is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="permit-date">Date:</label>
                <input
                  type="date"
                  id="permit-date"
                  {...register('permitIssuingDate', { required: true })}
                  className={`ml-2 rounded-sm border border-slate-700 p-1 ${
                    errors.permitIssuingDate ? 'border-red-500' : ''
                  }`}
                />
                {errors.permitIssuingDate && (
                  <p className="mt-1 text-red-500">Date is required</p>
                )}
              </div>
            </div>
          </div>
          <div className="basis-1/2 space-y-4">
            <p className="mb-2 basis-full font-semibold">
              Person Accepting Permit
            </p>
            <div>
              <label htmlFor="permit-accepting">Name & Designation:</label>
              <input
                type="text"
                id="permit-accepting"
                {...register('permitAccepting', { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 ${
                  errors.permitAccepting ? 'border-red-500' : ''
                }`}
              />
              {errors.permitAccepting && (
                <p className="mt-1 text-red-500">
                  Name & Designation is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="permit-accepting-signature">Signature:</label>
              <input
                type="file"
                id="permit-accepting-signature"
                accept="image/*"
                {...register('permitAcceptingSignature', { required: true })}
                className={`ml-2 ${errors.permitAcceptingSignature ? 'border-red-500' : ''}`}
              />
              {errors.permitAcceptingSignature && (
                <p className="mt-1 text-red-500">Signature is required</p>
              )}
            </div>
            <div className="flex items-center justify-start gap-10">
              <div>
                <label htmlFor="permit-from">From:</label>
                <input
                  type="time"
                  id="permit-from"
                  {...register('permitTimeStart', { required: true })}
                  className={`ml-2 rounded-sm border border-slate-700 p-1 ${
                    errors.permitTimeStart ? 'border-red-500' : ''
                  }`}
                />
                {errors.permitTimeStart && (
                  <p className="mt-1 text-red-500">Start Time is required</p>
                )}
              </div>
              <div>
                <label htmlFor="permit-to">To:</label>
                <input
                  type="time"
                  id="permit-to"
                  {...register('permitTimeEnd', { required: true })}
                  className={`ml-2 rounded-sm border border-slate-700 p-1 ${
                    errors.permitTimeEnd ? 'border-red-500' : ''
                  }`}
                />
                {errors.permitTimeEnd && (
                  <p className="mt-1 text-red-500">End Time is required</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-2 border-black p-2">
          <p>
            <span className="font-semibold">Extension of permit:</span> After
            verification of working condition, if it is found compliant then the
            validity of the permit could be extended.
          </p>

          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="extended-permit-validity">
                Extended Permit Validity:
              </label>
              <input
                type="number"
                id="extended-permit-validity"
                placeholder="days"
                {...register('extendedPermitValidity')}
                className="ml-2 rounded-sm border border-slate-700"
              />
            </div>
            <div>
              <label htmlFor="extended-permit-date">Date:</label>
              <input
                type="date"
                id="extended-permit-date"
                {...register('extendedPermitDate')}
                className="ml-2 rounded-sm border border-slate-700 p-1"
              />
            </div>
            <div>
              <label htmlFor="extended-permit-from">From:</label>
              <input
                type="time"
                id="extended-permit-from"
                {...register('extendedPermitTimeStart')}
                className="ml-2 rounded-sm border border-slate-700 p-1"
              />
            </div>
            <div>
              <label htmlFor="extended-permit-to">To:</label>
              <input
                type="time"
                id="extended-permit-to"
                {...register('extendedPermitTimeEnd')}
                className="ml-2 rounded-sm border border-slate-700 p-1"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="basis-1/2 space-y-4">
              <p className="mb-2 basis-full font-semibold">
                Person Issuing Permit
              </p>
              <div>
                <label htmlFor="extended-permit-issuing">
                  Name & Designation:
                </label>
                <input
                  type="text"
                  id="extended-permit-issuing"
                  {...register('extendedPermitIssuing')}
                  className="ml-2 rounded-sm border border-slate-700"
                />
              </div>
              <div>
                <label htmlFor="extended-permit-signature">Signature:</label>
                <input
                  type="file"
                  id="extended-permit-signature"
                  accept="image/*"
                  {...register('extendedPermitIssuingSignature')}
                  className="ml-2"
                />
              </div>
            </div>
            <div className="basis-1/2 space-y-4">
              <p className="mb-2 basis-full font-semibold">
                Person Accepting Permit
              </p>
              <div>
                <label htmlFor="extended-permit-accepting">
                  Name & Designation:
                </label>
                <input
                  type="text"
                  id="extended-permit-accepting"
                  {...register('extendedPermitAccepting')}
                  className="ml-2 rounded-sm border border-slate-700"
                />
              </div>
              <div>
                <label htmlFor="extended-permit-signature">Signature:</label>
                <input
                  type="file"
                  id="extended-permit-signature"
                  accept="image/*"
                  {...register('extendedPermitSignature')}
                  className="ml-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-2 border-black p-2">
          <p>
            <span className="font-semibold">Closing of permit:</span> The work
            for which this permit was issued is now completed, all workers have
            been withdrawn, and all processes and equipment affected by the work
            have been left in a safe, clean, orderly, and ready-for-service
            condition.
          </p>

          <div className="flex items-center justify-between">
            <div className="basis-1/2 space-y-4">
              <p className="mb-2 basis-full font-semibold">
                Person Closing Permit
              </p>
              <div>
                <label htmlFor="closing-permit">Name & Designation:</label>
                <input
                  type="text"
                  id="closing-permit"
                  {...register('permitCloserName', { required: true })}
                  className={`ml-2 rounded-sm border border-slate-700 ${
                    errors.permitCloserName ? 'border-red-500' : ''
                  }`}
                />
                {errors.permitCloserName && (
                  <p className="mt-1 text-red-500">
                    Name & Designation is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="closing-permit-signature">Signature:</label>
                <input
                  type="file"
                  id="closing-permit-signature"
                  accept="image/*"
                  {...register('permitCloserSignature', { required: true })}
                  className={`ml-2 ${errors.permitCloserSignature ? 'border-red-500' : ''}`}
                />
                {errors.permitCloserSignature && (
                  <p className="mt-1 text-red-500">Signature is required</p>
                )}
              </div>
            </div>
            <div className="basis-1/2 space-y-4">
              <p className="mb-2 basis-full font-semibold">
                Person Accepting Permit
              </p>
              <div>
                <label htmlFor="closing-permit-accepting">
                  Name & Designation:
                </label>
                <input
                  type="text"
                  id="closing-permit-accepting"
                  {...register('permitClosingAccepting', { required: true })}
                  className={`ml-2 rounded-sm border border-slate-700 ${
                    errors.permitClosingAccepting ? 'border-red-500' : ''
                  }`}
                />
                {errors.permitClosingAccepting && (
                  <p className="mt-1 text-red-500">
                    Name & Designation is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="closing-permit-accepting-signature">
                  Signature:
                </label>
                <input
                  type="file"
                  id="closing-permit-accepting-signature"
                  accept="image/*"
                  {...register('permitClosingAcceptingSignature', {
                    required: true,
                  })}
                  className={`ml-2 ${errors.signature ? 'border-red-500' : ''}`}
                />
                {errors.permitClosingAcceptingSignature && (
                  <p className="mt-1 text-red-500">Signature is required</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="font-semibold">
          The duration/ Validity of this permit will be terminated if there is
          any change of working condition or any emergency occur.
        </p>

        <button type="submit" className="btn btn-active">
          Submit
        </button>
      </form>
    </section>
  );
};

export default WorkForm;
