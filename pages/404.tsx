import * as Grid from "components/Grid";
import { Heading } from "components/Heading";
import { Spacer } from "components/Spacer";
import { Text } from "components/Text";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const FourOhFour: NextPage = () => {
  return (
    <>
      <NextSeo title="404" />

      <Grid.Container>
        <Grid.Column
          colStart={{ xs: "1", md: "2" }}
          colEnd={{ xs: "-1", md: "4" }}
        >
          <Heading fontSize="xxl">404</Heading>
          <Spacer height="sm" />
          <Text fontSize="lg" color="foregroundNeutral">
            Page not found
          </Text>
        </Grid.Column>
      </Grid.Container>
    </>
  );
};

export default FourOhFour;
