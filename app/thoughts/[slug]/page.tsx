import ToastWrapper from '@/components/copyLink'
import {Mdx} from 'components/mdx'
import {allThoughts} from 'contentlayer/generated'

import {formatDate} from '@/components/_date'
import IKImage from '@/components/coverpix'
import {thoughtParam} from '@/lib/sortedContent'
import styles from '@/styles/views/thought.module.scss'
import {Views} from '@/app/views'
import {Suspense} from 'react'

export const generateStaticParams = async () => thoughtParam.map((thought) => ({slug: thought.slug}))

export const generateMetadata = ({params: {slug}}) => {
  const thought = allThoughts.find((thought) => thought._raw.flattenedPath === `thoughts/${slug}`)
  return {title: thought?.title}
}

const ThoughtLayout = ({params: {slug}}) => {
  const thought = allThoughts.find((thought) => thought._raw.flattenedPath === `thoughts/${slug}`)

  if (thought) {
    return (
      <>
        <div className={styles.cover}>
          <IKImage src={`/thoughts/${thought.image}`} alt={thought.title} width={1920} height={305} className={styles.image} />
        </div>

        <header className={styles.header}>
          <div className="flex flex-row gap-2">
            <div className="font-quad text-3xl">{thought.title}</div>
            <ToastWrapper />
          </div>
          <time className={styles.date} dateTime={thought.date}>
            {/* {format(parseISO(thought.date), 'eee · LLLL d, yyyy')} */}
            {formatDate(thought.date)}
          </time>{' '}
          <Suspense fallback={<p className="h-5" />}>
            <Views slug={thought.slug} />
          </Suspense>
          {thought.credits && (
            <>
              <p className={styles.credits}>
                Image credits{' '}
                <a
                  className="text-black underline dark:text-white hover:decoration-titan-200 dark:hover:decoration-titan-800"
                  href={thought.credits.url || ''}
                  target="_blank"
                  rel="noreferrer">
                  {thought.credits.name}
                </a>
              </p>
            </>
          )}
        </header>

        <article className={styles.content}>
          <Mdx code={thought.body.code} />
        </article>
      </>
    )
  }
  return <h1>Thought could not be found</h1>
}

export default ThoughtLayout
