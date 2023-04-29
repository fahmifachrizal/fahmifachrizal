import Navbar from './components/Navbar'
import ProjectModal from './components/modal/ProjectModal'
import HeroSection from './layouts/HeroSection'
import BioSection from './layouts/BioSection'
import ProjectSection from './layouts/ProjectSection'
import ArticleSection from './layouts/BlogSection'
import CertificateSection from './layouts/CertificateSection'
import ContactSection from './layouts/ContactSection'
import FooterSection from './layouts/FooterSection'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const { projectModal, projectShowcase } = useSelector((state) => state.uxReducer)

  useEffect(()=>{
    console.log(projectModal, projectShowcase)
  },[projectModal])

  return (
    <div className="h-full w-full relative">
      {
        projectModal &&
        <div className='h-full w-full z-40 absolute'>
          <ProjectModal project={projectShowcase}/>
        </div>
      }
      <Navbar id='home'/>
      <HeroSection />
      <BioSection id='biography'/>
      <ProjectSection id='projects'/>
      <CertificateSection id='certificate'/>
      {/* <ArticleSection id='blog'/> */}
      <ContactSection id='contact'/>
      <FooterSection />


    </div>
  )
}

export default App