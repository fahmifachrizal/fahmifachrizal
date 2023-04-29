import { Element } from 'react-scroll'

const HeroSection = function() {

  window.onload = function(){
    const hero = document.getElementById('hero')
    const left = document.getElementById("left-side");
    let lastPosition = null

    hero.onmouseenter = () => {
      const handleMove = e => {
        left.style.width = `${e.clientX / window.innerWidth * 100}%`;
      }
      document.onmousemove = e => {
        left.style.transitionDuration='0s'
        lastPosition=e.clientX
        handleMove(e)
      };
      document.ontouchmove = e => {
        lastPosition=e.clientX
        handleMove(e.touches[0])
      };
    }

    hero.onmouseleave = () => {
      // left.style.width = lastPosition;
      left.style.width = '100%';
      left.style.transitionDuration='0.5s'
      document.onmousemove = null;
      document.ontouchmove = null;
    }
  }

  return (
    <Element id='home' name='home'>
      <div className="h-[400px] w-full relative" id='hero'>
        <div id="left-side" className="side text-8xl h-full place-items-center">
          <h2 className="title w-full justify-center">
            I'm a 
            <span className="fancy font-raleway"> Full Stack Developer</span>      
          </h2>
        </div>
        <div id="right-side" className="side text-8xl h-full">
          <h2 className="title">
            With Background as a 
            <span className="fancy font-raleway"> Data Analyst</span>     
          </h2>
        </div>
      </div>
    </Element>
  )
}

export default HeroSection