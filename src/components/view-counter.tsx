export function ViewCounter({views}: {views: string | number}) {
  const number = views || 0
  return (
    <div class="flex items-center justify-center space-x-1 ">
      <span class="flex items-center align-middle mr-1  ">{number}</span>
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

export function TViewCounter({
  slug,
  allViews,
}: {
  slug: string
  allViews?: {
    slug: string
    count: number
  }[]
  trackView?: boolean
}) {
  const viewsForSlug = allViews?.find((view) => view.slug === slug)
  const number = viewsForSlug?.count || 0

  return (
    <div class="flex items-center justify-center space-x-1 ">
      <div class="flex items-center align-middle mr-1  ">{number}</div>
      <div class="flex-1  ">
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
            class=" w-4 h-4 -mt-0">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      </div>{' '}
    </div>
  )
}
