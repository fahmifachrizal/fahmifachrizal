import { Element } from 'react-scroll'
import BlogCard from '../components/BlogCard'

const BlogSection = function() {
  const blogs = [1, 2, 3, 4, 5, 6]

  return (
    <Element id='blogs' name='blogs'>
      <div className="my-20 w-full px-56">
        <h1 className='text-white text-4xl font-bold mb-10'>Blog</h1>
        <div className='w-full flex flex-wrap gap-10'>
          { blogs.map((blog, index) => {
              return (
                <BlogCard key={`blog${index}`}/>
              )
            })
          }
        </div>
      </div>
    </Element>
  )
}

export default BlogSection