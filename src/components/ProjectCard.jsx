import { useDispatch } from "react-redux"

const ProjectCard = function({project}) {
  const dispatcher = useDispatch()

  const handleClick = () => {
    dispatcher({type:'ux/toogleModal', payload:{id:project.id, toogleModal:true}})
  }

  return (
    <div className="first:ml-56 group last:mr-56 hover:scale-110 duration-75 p-4 rounded-xl relative" onClick={handleClick}>
      <div className="w-[640px]">
        <div className='h-[420px] w-full cursor-pointer overflow-clip'>
          <img src={project.image} alt={project.name} className="object-cover" />
        </div>
        <div className="flex justify-between py-2">
          <h1 className="text-lg font-semibold text-white">{project.name}</h1>
          <div>
            <div className="bg-zinc-700 rounded-xl"><span className="text-white px-2 tracking-wider text-sm font-semibold">React</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard