import { CURIECODE_PAGE_DATA } from '@/data/curiecode';

import { ProductVideo } from './product-video';

const data = CURIECODE_PAGE_DATA.fragmentation;

export default function CodingFragmentationSection() {
  return (
    <section className="to-midnight-blue overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-gradient-to-b from-black py-10 text-white lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-20">
      <div className="layout-container flex flex-col items-center text-center">
        <h2 className="type-h2 max-w-[800px] tracking-[-0.01em] max-md:text-[32px] max-md:leading-10">
          {data.title}
        </h2>
        <p className="type-body-xxs text-light-gray mt-5 max-w-[800px] tracking-[0.01em] max-md:text-sm max-md:leading-5">
          {data.description}
        </p>
        <div className="mt-10 w-full max-w-[640px] overflow-hidden rounded-[20px]">
          <ProductVideo
            id="scavenger-hunt"
            label="Coding information scattered across multiple sources"
          />
        </div>
      </div>
    </section>
  );
}
