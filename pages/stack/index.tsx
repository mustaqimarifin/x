import * as Grid from "components/Grid"
import { Heading } from "components/Heading"
import * as List from "components/List"
import { Prose } from "components/Prose"
import { Spacer } from "components/Spacer"
import { Text } from "components/Text"
import type { NextPage } from "next"
import { NextSeo } from "next-seo"
import * as React from "react"

const inspiration = [
  "https://berkeleygraphics.com/",
  "https://chasem.co/",
  "https://frankchimero.com/",
  "https://hamishsmyth.com/",
  "https://hunterjennings.dev/",
  "https://joebell.co.uk/",
  "https://linusrogge.com/",
  "https://paco.me/",
  "https://rauno.me/",
  "https://sdrn.co/",
  "https://sj.land/",
]

const Stack: NextPage = () => {
  return (
    <>
      <NextSeo title="Stack" />

      <Grid.Container>
        <Grid.Column
          colStart={ { xs: "1", md: "2" } }
          colEnd={ { xs: "-1", md: "4" } }
        >
          <Heading fontSize="xxl" as="h1">
            Stack
          </Heading>
          <Spacer height="xxs" />
          <Text color="foregroundNeutral">
            <a href="https://github.com/alexcarpenter/alexcarpenter-next">
              View source on GitHub ↗
            </a>
          </Text>
        </Grid.Column>
      </Grid.Container>

      <Spacer height="xxxl" />

      <section>
        <Grid.Container>
          <Grid.Column
            colStart={ { xs: "1", md: "2" } }
            colEnd={ { xs: "-1", md: "4" } }
          >
            <Heading fontSize="lg">Tech stack &not;</Heading>
          </Grid.Column>
        </Grid.Container>

        <Spacer height="xl" />

        <List.Container>
          <List.Item>
            <Grid.Container rowGap="md" alignItems="baseline">
              <Grid.Column
                colStart={ { xs: "1" } }
                colEnd={ { xs: "-1", md: "1" } }
              >
                <Heading as="h3">Next.js</Heading>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "2" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text>Framework... WIP</Text>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "4" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text color="foregroundNeutral" fontSize="sm">
                  <a href="https://nextjs.org/">Visit ↗</a>
                </Text>
              </Grid.Column>
            </Grid.Container>
          </List.Item>

          <List.Item>
            <Grid.Container rowGap="md">
              <Grid.Column
                colStart={ { xs: "1" } }
                colEnd={ { xs: "-1", md: "1" } }
              >
                <Heading as="h3">vanilla-extract</Heading>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "2" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text>Styling... WIP</Text>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "4" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text color="foregroundNeutral" fontSize="sm">
                  <a href="https://vanilla-extract.style/">Visit ↗</a>
                </Text>
              </Grid.Column>
            </Grid.Container>
          </List.Item>

          <List.Item>
            <Grid.Container rowGap="md">
              <Grid.Column
                colStart={ { xs: "1" } }
                colEnd={ { xs: "-1", md: "1" } }
              >
                <Heading as="h3">Radix UI</Heading>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "2" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text>Accessibility... WIP</Text>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "4" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text color="foregroundNeutral" fontSize="sm">
                  <a href="https://www.radix-ui.com/">Visit ↗</a>
                </Text>
              </Grid.Column>
            </Grid.Container>
          </List.Item>

          <List.Item>
            <Grid.Container rowGap="md">
              <Grid.Column
                colStart={ { xs: "1" } }
                colEnd={ { xs: "-1", md: "1" } }
              >
                <Heading as="h3">Framer Motion</Heading>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "2" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text>Animation... WIP</Text>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "4" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text color="foregroundNeutral" fontSize="sm">
                  <a href="https://www.framer.com/motion/">Visit ↗</a>
                </Text>
              </Grid.Column>
            </Grid.Container>
          </List.Item>

          <List.Item>
            <Grid.Container rowGap="md">
              <Grid.Column
                colStart={ { xs: "1" } }
                colEnd={ { xs: "-1", md: "1" } }
              >
                <Heading as="h3">Contentlayer</Heading>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "2" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text>Data... WIP</Text>
              </Grid.Column>

              <Grid.Column
                colStart={ { xs: "1", md: "4" } }
                colEnd={ { xs: "-1", md: "4" } }
              >
                <Text color="foregroundNeutral" fontSize="sm">
                  <a href="https://www.contentlayer.dev/">Visit ↗</a>
                </Text>
              </Grid.Column>
            </Grid.Container>
          </List.Item>
        </List.Container>
      </section>

      <Spacer height="xxxl" />

      <section>
        <Grid.Container>
          <Grid.Column
            colStart={ { xs: "1", md: "2" } }
            colEnd={ { xs: "-1", md: "4" } }
          >
            <Heading fontSize="lg">Inspiration &not;</Heading>
          </Grid.Column>
        </Grid.Container>

        <Spacer height="xl" />

        <Grid.Container>
          <Grid.Column
            colStart={ { xs: "1", md: "2" } }
            colEnd={ { xs: "-1", md: "4" } }
          >
            <Prose>
              { inspiration.map((url, index) => {
                return (
                  <React.Fragment key={ url }>
                    <a href={ url }>{ new URL(url).hostname }</a>
                    { index !== inspiration.length - 1 ? (
                      <>
                        &nbsp;
                        <Text as="span" color="foregroundNeutral" role="none">
                          ⁕
                        </Text>{ " " }
                      </>
                    ) : null }
                  </React.Fragment>
                )
              }) }
            </Prose>
          </Grid.Column>
        </Grid.Container>
      </section>
    </>
  )
}

export default Stack
