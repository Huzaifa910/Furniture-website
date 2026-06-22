import HeroSection from '../components/home/HeroSection'
import Categories from '../components/home/Categories'
import Features from '../components/home/Features'
import BestSellers from '../components/home/BestSellers'
import Testimonials from '../components/home/Testimonials'
import Newsletter from '../components/home/Newsletter'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <Features />
      <BestSellers />
      <Testimonials />
      <Newsletter />
    </div>
  )
}

export default Home 