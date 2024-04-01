import {
  createSignal,
  createResource,
  Switch,
  Match,
  Show,
  createEffect,
} from "solid-js"

const fetchViews = async (slug: string) => {
  const response = await fetch(`/api/views/${slug}`)
  return response.json()
}

export default function Counter() {
  const [count, setCount] = createSignal(0)
  //@ts-expect-error sdsds
  const [slug] = createResource(count, fetchViews)

  createEffect(() => {
    setCount(1)
  })

  return (
    <div>
      <Show when={count() > 1} fallback={null}>
        <div>Count limit reached</div>
      </Show>
      <Show when={slug.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={slug()}>
          <div>{count() + 1}</div>
        </Match>
      </Switch>
    </div>
  )
}
