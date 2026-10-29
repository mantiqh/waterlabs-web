export const ManifestoSection = () => {
  return (
    <section className="relative m-0 w-full overflow-hidden bg-[#9A84E3] p-0">
      {/* 
        White Card with Top-Right curve:
        - Desktop: rounded-tr-[60px], py-[80px] px-[60px]
        - Mobile: rounded-tr-[30px], py-[40px] px-[20px]
        - The top-right curve reveals the exact matching bottom gradient color (#9A84E3) 
          from the Hero Banner above seamlessly with zero split lines.
      */}
      <div className="w-full overflow-hidden rounded-tr-[30px] bg-white px-[20px] py-[40px] md:px-[40px] lg:rounded-tr-[60px] lg:px-[60px] lg:pt-[80px] lg:pb-[40px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col justify-center">
          {/* Main Statement Text */}
          <h2 className="type-h3">
            <span className="text-[#2A2A2A]">
              Most AI vendors fumble this conversation. Here&apos;s our version:{' '}
            </span>
            <span className="text-[#A9B2BC]">
              your patient data stays in your environment, is never copied to us, and is never
              stored by us. Our agents do the work in the moment, and then the trace is gone. We
              keep the lesson, not the patient.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
