import {createEffect, createSignal, type JSX} from 'solid-js'

const ViewsCount = ({slug}: {slug: string}): JSX.Element => {
  const [views, setViews] = createSignal<number>()

  createEffect(() => {
    const fetchViews = async () => {
      const visitsData = await fetch(`/api/page/${slug}`)
      const visits = await visitsData.json()
      console.log(visits)
      setViews(visits)
    }

    fetchViews()
  }, [slug])

  return (
    <div class="flex items-center justify-center space-x-1 ">
      <span class="flex items-center align-middle mr-1  ">{views()}</span>
      <span class="flex-1 mr-6">
        {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      </span>{' '}
    </div>
  )
}

export default ViewsCount
