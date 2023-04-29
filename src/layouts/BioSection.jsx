import { TbBrandTwitter, TbBrandLinkedin, TbBrandGithub } from 'react-icons/tb';
import profilePicture from '../assets/images/profilepicture.jpg'


const BioSection = function() {

  let index = 0
  let interval = 1000

  const rand = (min, max) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  const animate = star => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  }

  for(const star of document.getElementsByClassName("magic-star")) {
    setTimeout(() => {
      animate(star);
      
      setInterval(() => animate(star), 1000);
    }, index++ * (interval / 3))
  }

  return (
    <div className="px-56 mt-20 w-full flex items-center">
      <div className="flex flex-row gap-x-8 w-full">
        <div className="w-36 h-36">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-green-400 to-blue-400 p-1">
            <img src={profilePicture} alt="profile" className='rounded-full'/>
          </div>
        </div>
        <div className="py-2 flex-1">
          <div className="flex flex-col gap-y-4 w-full">
            <span className="text-2xl font-bold text-white font-raleway">
              Biography
            </span>
            <div className='max-w-2xl'>
              <span id='bio' className="text-gray-400 font-raleway tracking-widest">
                Full Stack Developer with a background in data analysis, seeking to utilize my technical and analytical skills to create innovative software solutions. 
                Exited on 
                <span className='text-transparent font-bold bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600'> React</span>, 
                <span className='text-transparent font-bold bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600'> React Native</span>, 
                <span className='text-transparent font-bold bg-clip-text bg-gradient-to-b from-green-400 to-green-800'> Vue</span> and  

                <span className="magic">
                  <span className="magic-star">
                    <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                    </svg>
                  </span>
                  <span className="magic-star">
                    <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                    </svg>
                  </span>
                  <span className="flex magic-text pl-1 font-bold">UI/UX</span>
                </span>

              </span>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="py-2">
          <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-bold text-white font-raleway">
              Lets connect
            </span>
            <div className='flex flex-row gap-4'>
              <TbBrandTwitter className="text-gray-400 text-4xl hover:text-white duration-100"/>
              <TbBrandLinkedin className="text-gray-400 text-4xl hover:text-white duration-100"/>
              <TbBrandGithub className="text-gray-400 text-4xl hover:text-white duration-100"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BioSection