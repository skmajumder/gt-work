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
      <h1 className="mb-2 text-2xl font-medium text-black">
        Kabir Steel Limited
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="my-6 flex flex-row gap-4">
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
            <div className="mb-2">
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

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default WorkForm;
