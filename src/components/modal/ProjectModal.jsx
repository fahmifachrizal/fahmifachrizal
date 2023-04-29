import { useEffect } from 'react';
import { BiXCircle } from 'react-icons/bi';
import { BsGithub, BsGlobe2 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

function ProjectModal({ project }) {
  const dispatcher = useDispatch();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  const handleClick = () => {
    dispatcher({type:'ux/toogleModal', payload:{id:null, toogleModal:false}})
  }

  return (
    <div className='items-center justify-center w-full h-full relative font-raleway'>
      <div className='absolute w-full h-full bg-black opacity-80 z-10'></div>
      <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col gap-y-2'>
        <div className='flex justify-end'>
          <BiXCircle className='text-4xl text-white cursor-pointer' onClick={handleClick}/>
        </div>
        <div className='bg-[#272727] flex gap-x-4 p-4'>
          <div className='w-[960px]'>
            <img src={project.image} alt={`porto-${project.id}`} className='object-cover h-full'/>
          </div>
          <div className='w-96 flex flex-col gap-y-4 text-gray-200'>
            <h1 className='text-4xl font-semibold'>{project.name}</h1>
            <div>
              <p className='flex items-center gap-x-2'><BsGlobe2 />:
                {project.link?<a href={project.link} target="_blank" className='text-sm italic underline'>{project.link}</a>:<p className='text-sm italic '>Not available at the moment</p>}
              </p>
              <p className='flex items-center gap-x-2'><BsGithub />:
                {project.github?<a href={project.github} target="_blank" className='text-sm italic underline'>{(project.name).toLowerCase().split(' ').join('-')}</a>:<p className='text-sm italic '>Not available at the moment</p>}
              </p>
            </div>
            <p className='flex-1 pt-4'>{project.description}</p>
            <p className='text-sm italic'>Tech Stack : {(project.techStack).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal