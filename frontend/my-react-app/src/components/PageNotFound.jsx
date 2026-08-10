import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
const PageNotFound = () => {
  return (
    <div className="h-screen">
      <div className="h-full flex justify-center items-center">
        <div>
          <h1 className="text-5xl font-bold text-primary text-red-500 font-mono tracking-tighter animate-bounce">
            Page not found
          </h1>
          <Link to={'/'} className="btn btn-primary">
            <ArrowLeft className="size-5" />
            <span>Return back to home page</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
