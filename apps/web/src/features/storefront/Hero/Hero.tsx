import { Heading } from '@/components/Typography/Heading';
import { HeroProps as Props } from './Hero.interface';
import { Body } from '@/components/Typography/Body';
import { Icon } from '@/components/Icon';

export const Hero = (_props: Props) => {
  return (
    <section className="flex flex-col items-center bg-[#F2F0F1]">
      <div className="relative mx-auto flex min-h-[663px] w-full max-w-[1240px] flex-col overflow-hidden px-4 lg:h-[663px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:px-0">
        <div className="relative z-10 flex max-w-[577px] flex-1 flex-col gap-8 py-12 lg:py-0">
          <Heading
            type="h1"
            size={64}
            weight="bold"
            className="uppercase leading-none"
          >
            Finding Clothes that matches your style
          </Heading>
          <Body type="normal" color="rgba(0,0,0,0.6)">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </Body>
          <button className="body-normal-semi500 h-14 w-[200px] rounded-[62px] bg-black text-white">
            Shop now
          </button>
          <div className="flex divide-x gap-8">
            <div className="pr-8">
              <Body
                type="extralarge"
                size={40}
                weight="bold"
                className="leading-none"
              >
                200+
              </Body>
              <Body type="normal" weight="regular">
                International brands
              </Body>
            </div>
            <div className="pr-8">
              <Body
                type="extralarge"
                size={40}
                weight="bold"
                className="leading-none"
              >
                2,000+
              </Body>
              <Body type="normal" weight="regular">
                High-Quality Products
              </Body>
            </div>
            <div className="pr-8">
              <Body
                type="extralarge"
                size={40}
                weight="bold"
                className="leading-none"
              >
                30,000+
              </Body>
              <Body type="normal" weight="regular">
                Happy Customers
              </Body>
            </div>
          </div>
        </div>
        <div
          role="img"
          aria-label="couple showcase"
          className="h-[500px] w-full shrink-0 self-start bg-cover bg-top bg-no-repeat sm:h-[600px] lg:h-[663px] lg:w-[600px]"
          style={{ backgroundImage: 'url(/images/home/couple.jpg)' }}
        />
        <Icon
          iconType="sparkle"
          height={104}
          width={104}
          className="absolute right-4 top-[390px] lg:right-0 lg:top-[100px]"
        />
        <Icon
          iconType="sparkle"
          height={56}
          width={56}
          className="absolute right-[72%] top-[460px] lg:right-[500px] lg:top-[240px]"
        />
      </div>
      <div className="flex min-h-[122px] w-full flex-wrap items-center justify-center gap-x-[106px] gap-y-8 bg-black px-4 py-8 text-white lg:py-0">
        <Icon iconType="versace" />
        <Icon iconType="zara" />
        <Icon iconType="gucci" />
        <Icon iconType="prada" />
        <Icon iconType="calvin-klein" />
      </div>
    </section>
  );
};
