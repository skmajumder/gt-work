import { useForm } from "react-hook-form";

const WorkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <section className="container px-10">
      <h1 className="my-5 mb-2 text-center text-3xl font-medium text-black">
        Kabir Steel Limited
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="flex flex-row gap-4 border-2 border-black">
          <div className="basis-4/6 border-r-2 border-black p-3">
            <p className="text-center text-xl font-medium text-black">
              Cold work permit with / without working at height and / or
              electrical works as applicable
            </p>
          </div>
          <div className="basis-2/6 p-3">
            <p>Form No: IMS / F / 05-06</p>
            <p>Rev. No. 3, Date: {new Date().toDateString()}</p>
          </div>
        </div>

        <div className="flex flex-row gap-4 p-2">
          <div className="basis-4/6">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              {...register("location", { required: true })}
              className={`ml-2 rounded-sm border border-slate-700 ${
                errors.location ? "border-red-500" : ""
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
                {...register("permitNo", { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 ${
                  errors.permitNo ? "border-red-500" : ""
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
                  {...register("loto", { required: true })}
                  className="mr-1"
                />
                Yes
              </label>
              <label className="inline-block">
                <input
                  type="radio"
                  value="No"
                  {...register("loto", { required: true })}
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
          <p className="mb-2 basis-full text-xl font-semibold">
            Permit Request by
          </p>
          <div className="flex flex-row items-center justify-start gap-2">
            <div>
              <label htmlFor="name-designation">Name & Designation:</label>
              <input
                type="text"
                id="name-designation"
                {...register("nameDesignation", { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 ${
                  errors.nameDesignation ? "border-red-500" : ""
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
                {...register("signature", { required: true })}
                className={`ml-2 ${errors.signature ? "border-red-500" : ""}`}
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
                {...register("date", { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 p-1 ${
                  errors.date ? "border-red-500" : ""
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
                {...register("time", { required: true })}
                className={`ml-2 rounded-sm border border-slate-700 p-1 ${
                  errors.time ? "border-red-500" : "border-slate-700"
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
              {...register("workDescription", { required: true })}
              rows="4"
              className={`mt-1 w-full rounded-sm border border-black p-2 ${
                errors.workDescription ? "border-red-500" : ""
              }`}
            ></textarea>
            {errors.workDescription && (
              <p className="mt-1 text-red-500">Work Description is required</p>
            )}
          </div>
        </div>

        <div className="space-y-3 border-2 border-black p-2">
          <p>
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
                  {...register("safetyRequester", { required: true })}
                  className="mr-1"
                />
                Yes
              </label>

              <label className="inline-block">
                <input
                  type="radio"
                  value="No"
                  {...register("safetyRequester", { required: true })}
                  className="mr-1"
                />
                No
              </label>

              <label className="inline-block">
                <input
                  type="radio"
                  value="NA"
                  {...register("safetyRequester", { required: true })}
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

        <button type="submit" className="btn btn-active">
          Submit
        </button>
      </form>
    </section>
  );
};

export default WorkForm;
