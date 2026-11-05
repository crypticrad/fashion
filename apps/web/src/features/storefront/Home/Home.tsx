import { HomeProps as Props } from './Home.interface';
import { Hero } from '../Hero';
import { Category } from '../Category';
import { Listing } from '../Listing';
import { Testimonials } from '../Testimonials';

export const Home = (_props: Props) => {
  return (
    <div className="flex flex-col ">
      <Hero />
      <Listing />
      <Category />
      <Testimonials />
    </div>
  );
};
