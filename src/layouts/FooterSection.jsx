import { Element } from 'react-scroll'

const FooterSection = function() {

  return (
    <Element id='footer' name='footer'>
      <div className="w-full px-56 h-20 bg-[#181818] flex justify-center items-center">
        <span className=' text-zinc-600'>Created By Fahmi Fachrizal | {(new Date()).getFullYear()}</span>
      </div>
    </Element>
  )
}

export default FooterSection