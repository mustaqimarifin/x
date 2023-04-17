import * as Grid from "components/Grid";
import { Heading } from "components/Heading";
import * as List from "components/List";
import { Spacer } from "components/Spacer";
import { Text } from "components/Text";
import type { Job } from "contentlayer/generated";
import { allJobs } from "contentlayer/generated";
import { formatDate, formatTags } from "lib/utils";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

export async function getStaticPaths() {
  return {
    paths: allJobs.map((job) => ({ params: { slug: job.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const job = allJobs.find((job) => job.slug === params.slug);
  return {
    props: {
      job,
    },
  };
}

const ExperiencePage: NextPage<{ job: Job }> = ({ job }) => {
  return (
    <>
      <NextSeo title={job.company} />

      <Grid.Container>
        <Grid.Column
          colStart={{ xs: "1", md: "2" }}
          colEnd={{ xs: "-1", md: "4" }}
        >
          <Heading fontSize="xxl">{job.company}</Heading>

          {job.description ? (
            <>
              <Spacer height="sm" />
              <Text fontSize="lg" color="foregroundNeutral">
                {job.description}
              </Text>
            </>
          ) : null}
          {job.currently ? (
            <>
              <Spacer height="sm" />
              <Text fontSize="lg" color="foregroundNeutral">
                {job.currently}
              </Text>
            </>
          ) : null}
          {job.tags ? (
            <>
              <Spacer height="lg" />
              <Text color="foregroundNeutral" fontSize="sm">
                {formatTags(job.tags)}
              </Text>
            </>
          ) : null}
        </Grid.Column>
      </Grid.Container>

      {job.timeline ? (
        <>
          <Spacer height="xxxl" />

          <Grid.Container>
            <Grid.Column
              colStart={{ xs: "1", md: "2" }}
              colEnd={{ xs: "-1", md: "4" }}
            >
              <Heading fontSize="lg">Timeline &not;</Heading>
            </Grid.Column>
          </Grid.Container>

          <Spacer height="xl" />

          <List.Container>
            {job.timeline?.map((event) => {
              return (
                <List.Item key={event._id}>
                  <Grid.Container rowGap="md">
                    <Grid.Column
                      colStart={{ xs: "1" }}
                      colEnd={{ xs: "-1", md: "1" }}
                    >
                      <Text
                        color="foregroundNeutral"
                        fontSize="sm"
                        as="time"
                        dateTime={event.date}
                      >
                        {formatDate(event.date)}
                      </Text>
                    </Grid.Column>
                    <Grid.Column
                      colStart={{ xs: "1", md: "2" }}
                      colEnd={{ xs: "-1", md: "4" }}
                    >
                      <Heading as="h3">{event.heading}</Heading>
                      {event.description ? (
                        <>
                          <Spacer height="sm" />
                          <Text color="foregroundNeutral">
                            {event.description}
                          </Text>
                        </>
                      ) : null}
                    </Grid.Column>
                    <Grid.Column
                      colStart={{ xs: "1", md: "4" }}
                      colEnd={{ xs: "-1", md: "4" }}
                    >
                      {event.link ? (
                        <Text color="foregroundNeutral" fontSize="sm">
                          <a href={event.link}>View ↗</a>
                        </Text>
                      ) : null}
                    </Grid.Column>
                  </Grid.Container>
                </List.Item>
              );
            })}
          </List.Container>
        </>
      ) : null}
    </>
  );
};

export default ExperiencePage;
