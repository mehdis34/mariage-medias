import React from "react";
import {Box, Container, Flex, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import MediasList from "@/components/medias-list";
import SelectList from "@/components/select-list";
import Header from "@/components/header";
import {useRouter} from "next/router";
import {providers} from "../../utils/providers";

export default function Page() {
    const router = useRouter();
    return (
        <>
            <Header/>
            <Container
                maxW={'6xl'}
                px={{base: 5, md: 30}}
                my={5}>
                {router.query.folder ? (
                    <>
                        <SelectList/>
                        <Box mt={5}>
                            <MediasList/>
                        </Box>
                    </>
                ) : (
                    <Flex alignItems={'center'} flexDir={'column'} gap={10} mb={10}>
                        <Heading textAlign={'center'} fontSize={'x-large'}>
                            Sélectionnez un dossier pour voir les photos et vidéos associées
                        </Heading>
                        <SimpleGrid columns={[1, 2, 3, 5]} spacing={3}>
                            {providers.map((provider, index) => (
                                <Flex
                                    cursor={'pointer'}
                                    key={index} onClick={() => router.push(`/?folder=${provider.path}`)}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    width={162}
                                    height={240}
                                    backgroundColor={'gray.900'}>
                                    <Text fontWeight={600}>{provider.title}</Text>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </Flex>
                )}
            </Container>
        </>
    );
}
