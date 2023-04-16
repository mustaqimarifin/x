import * as React from "react"
import type { NextPage } from "next"
import type { Job, Recommendation } from "contentlayer/generated"
import NextLink from "next/link"
import Image from "next/image"
import { NextSeo } from "next-seo"
import { formatTags, partition } from "lib/utils"
import { useToggle } from "lib/hooks"
import { buttonStyles } from "styles/button.css"
import * as Grid from "components/Grid"
import * as List from "components/List"
import { Heading } from "components/Heading"
import { Spacer } from "components/Spacer"
import { Text } from "components/Text"
import { VisuallyHidden } from "components/VisuallyHidden"
import { allJobs, allRecommendations } from "contentlayer/generated"
import { Link } from "components/Link"

const Home: NextPage<{
  jobs: Job[]
  recommendations: Recommendation[]
}> = ({ jobs, recommendations }) => {
  return (
    <>
      <NextSeo title="Product Operations" />

      <header>
        <VisuallyHidden as="h1">Index</VisuallyHidden>

        <Grid.Container rowGap="lg">
          <Grid.Column
            rowStart="1"
            colStart={ { xs: "1", md: "2", lg: "4" } }
            colEnd={ { xs: "-1", lg: "-1" } }
          >
            <Image
              src="/me.png"
              width="100"
              height="100"
              alt="Headshot"
              style={ {
                //filter: "grayscale(0.2)",
                //opacity: 0.65,
                borderRadius: 8,
              } }
            />
          </Grid.Column>

          <Grid.Column
            colStart={ { xs: "1", md: "2" } }
            colEnd={ { xs: "-1", lg: "4" } }
          >
            <Text fontSize="xl" gradient={ true }>
              A detail oriented user interface 
              Over a decade at the intersection of  marketing, product and creative helping bring to market some of the largest endurance and lifestyle events around SouthEastAsia. Currently Senior Marketing Manager at Musegroup.

              I’ve also been making music since my teens through a myriad of iterations, eventually culminating in a debut album in 2014 and several production & engineering credits for various artists
            </Text>

            <Spacer height="xl" />

            <a
              href="https://read.cv/alexcarpenter"
              className={ buttonStyles({ type: "highContrast" }) }
            >
              Read CV
            </a>
          </Grid.Column>
        </Grid.Container>
      </header>

      <Spacer height="xxxl" />

      <section>
        <Grid.Container>
          <Grid.Column
            colStart={ { xs: "1", md: "2" } }
            colEnd={ { xs: "-1", md: "4" } }
          >
            <Heading fontSize="lg">Experience &not;</Heading>
          </Grid.Column>
        </Grid.Container>

        <Spacer height="xl" />

        <List.Container>
          { jobs.map((job) => {
            return (
              <List.Item key={ job._id }>
                <Grid.Container rowGap="md" alignItems="baseline">
                  <Grid.Column
                    colStart={ { xs: "1" } }
                    colEnd={ { xs: "-1", md: "1" } }
                  >
                    <Heading as="h3">{ job.company }</Heading>
                  </Grid.Column>

                  <Grid.Column
                    colStart={ { xs: "1", md: "2" } }
                    colEnd={ { xs: "-1", md: "4" } }
                  >
                    <Text>
                      { job.description }
                      { job.slug === "hashicorp" ? (
                        <>
                          { " " }
                          <Link underlined={ true }>
                            <NextLink href={ `/experience/${job.slug}` }>
                              Read more
                            </NextLink>
                          </Link>
                        </>
                      ) : null }
                    </Text>
                    { job.tags ? (
                      <>
                        <Spacer height="sm" />
                        <Text fontSize="sm" color="foregroundNeutral">
                          <VisuallyHidden>Tools used:</VisuallyHidden>
                          { formatTags(job.tags) }
                        </Text>
                      </>
                    ) : null }
                  </Grid.Column>

                  <Grid.Column
                    colStart={ { xs: "1", md: "4" } }
                    colEnd={ { xs: "-1", md: "4" } }
                  >
                    <Text color="foregroundNeutral" fontSize="sm">
                      <VisuallyHidden>Duration</VisuallyHidden>
                      { new Date(job.startDate).getFullYear() } &mdash;{ " " }
                      { job.endDate
                        ? new Date(job.endDate).getFullYear()
                        : "Now" }
                    </Text>
                  </Grid.Column>
                </Grid.Container>
              </List.Item>
            )
          }) }
        </List.Container>
      </section>

      <Spacer height="xxxl" />

      <Recommendations recommendations={ recommendations } />
    </>
  )
}

function Recommendations ({
  recommendations,
}: {
  recommendations: Recommendation[]
}) {
  const [viewAll, toggleViewAll] = useToggle()
  const [groupOne, groupTwo] = partition(
    (r) => recommendations.indexOf(r) < 4,
    recommendations
  )
  return (
    <section>
      <Grid.Container>
        <Grid.Column
          colStart={ { xs: "1", md: "2" } }
          colEnd={ { xs: "-1", md: "4" } }
        >
          <Heading fontSize="lg">Recommendations &not;</Heading>
        </Grid.Column>
      </Grid.Container>

      <Spacer height="xl" />

      <List.Container>
        { groupOne.map((recommendation) => {
          return (
            <List.Item key={ recommendation._id }>
              <Grid.Container rowGap="md" alignItems="baseline">
                <Grid.Column
                  colStart={ { xs: "1" } }
                  colEnd={ { xs: "-1", md: "1" } }
                >
                  <Heading as="h3">{ recommendation.name }</Heading>
                </Grid.Column>

                <Grid.Column
                  colStart={ { xs: "1", md: "2" } }
                  colEnd={ { xs: "-1", md: "4" } }
                >
                  <Text>&ldquo;{ recommendation.text }&rdquo;</Text>
                </Grid.Column>

                <Grid.Column
                  colStart={ { xs: "1", md: "4" } }
                  colEnd={ { xs: "-1", md: "4" } }
                >
                  <Text color="foregroundNeutral" fontSize="sm">
                    { recommendation.title }
                  </Text>
                  <Text color="foregroundNeutral" fontSize="sm">
                    { recommendation.company }
                  </Text>
                </Grid.Column>
              </Grid.Container>
            </List.Item>
          )
        }) }

        { groupTwo.map((recommendation) => {
          return (
            <List.Item
              key={ recommendation._id }
              id={ recommendation._id }
              hidden={ viewAll ? false : true }
            >
              <Grid.Container rowGap="md">
                <Grid.Column
                  colStart={ { xs: "1" } }
                  colEnd={ { xs: "-1", md: "1" } }
                >
                  <Heading as="h3">{ recommendation.name }</Heading>
                </Grid.Column>

                <Grid.Column
                  colStart={ { xs: "1", md: "2" } }
                  colEnd={ { xs: "-1", md: "4" } }
                >
                  <Text>&ldquo;{ recommendation.text }&rdquo;</Text>
                </Grid.Column>

                <Grid.Column
                  colStart={ { xs: "1", md: "4" } }
                  colEnd={ { xs: "-1", md: "4" } }
                >
                  <Text color="foregroundNeutral" fontSize="sm">
                    { recommendation.title }
                  </Text>
                  <Text color="foregroundNeutral" fontSize="sm">
                    { recommendation.company }
                  </Text>
                </Grid.Column>
              </Grid.Container>
            </List.Item>
          )
        }) }
      </List.Container>

      <Spacer height="md" />

      <Grid.Container>
        <Grid.Column
          colStart={ { xs: "1", md: "2" } }
          colEnd={ { xs: "-1", md: "4" } }
        >
          <button
            type="button"
            className={ buttonStyles({ type: "text" }) }
            onClick={ toggleViewAll }
            aria-expanded={ viewAll ? "true" : "false" }
            aria-controls={ groupTwo.map((r) => r._id).toString() }
          >
            View{ " " }
            { viewAll ? "less" : `(${groupTwo.length}) more recommendations` }
          </button>
        </Grid.Column>
      </Grid.Container>
    </section>
  )
}

export default Home

export async function getStaticProps () {
  const jobs = allJobs.sort((a, b) => {
    return Number(new Date(b.startDate)) - Number(new Date(a.startDate))
  })

  const recommendations = allRecommendations.sort((a, b) => {
    return Number(new Date(b.date)) - Number(new Date(a.date))
  })

  return {
    props: {
      jobs,
      recommendations,
    },
  }
}
