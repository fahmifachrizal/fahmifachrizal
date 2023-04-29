import * as Scroll from 'react-scroll'
const ScrollLink = Scroll.Link


const Navbar = function() {
  return (
    <div className="w-full h-20 flex items-end px-36 ">
      <div className='pb-2 px-4 flex flex-row justify-between w-full border-b-[1px] border-gray-200'>
        <span className='text-white text-xl font-raleway'>
          Fahmi Fachrizal
        </span>
        <div className='flex flex-row gap-12'>
          <ScrollLink to='home' spy smooth duration={500} className='text-white text-xl font-raleway cursor-pointer'>
            Home
          </ScrollLink>
          <ScrollLink to='projects' spy smooth duration={500} className='text-white text-xl font-raleway cursor-pointer'>
            Projects
          </ScrollLink>
          <ScrollLink to='blogs' spy smooth duration={500} className='text-white text-xl font-raleway cursor-pointer'>
            Blog
          </ScrollLink>
          <ScrollLink to='contact' spy smooth duration={500} className='text-white text-xl font-raleway cursor-pointer'>
            Contact
          </ScrollLink>
        </div>
      </div>

    </div>
  )
}

export default Navbar
