import {EyeIcon} from './icons'

export default function ViewCounter({views}) {
  const number = views || 0
  return (
    <div className="flex items-stretch space-x-1">
      <span className="flex items-center justify-center">
       {number} 
      </span>
      <span className="flex-1 mr-2 ">{<EyeIcon className="dark:text-gray-200" />}</span>{' '}
    </div>
  )
}
