import { Box, Flex, Text, Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";
import {useMe} from "../lib/hooks";

const Home = ({ artists }) => {
    const {user} = useMe()

  return (
    <GradientLayout
      color="blue"
      roundImage
      image="https://picsum.photos/200"
      description="40 public playlists"
      title="Igor Ribeiro"
      subtitle="profile"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%">
              <Box bg="gray.800" borderRadius="4px" padding="15px" width="100%">
                <Image src="https://picsum.photos/200" borderRadius={'100%'}/>
                <Box>
                    <Text fontSize='large'>{artist.name}</Text>
                    <Text fontSize='x-small'>Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
