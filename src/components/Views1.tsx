import {Suspense, lazy} from 'solid-js'
import {LoadingSpinner} from './Spinner'

const ViewsCount = lazy(() => import('./ViewsCount'))

export const Views1 = ({slug}: {slug: string}) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ViewsCount slug={slug} />
    </Suspense>
  )
}
