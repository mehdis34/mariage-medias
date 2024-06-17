import React from "react";
import {Box, Container} from "@chakra-ui/react";
import MediasList from "@/components/medias-list";
import SelectList from "@/components/select-list";
import Image from "next/image";

export default function Page() {
    return (
        <>
            <Image
                src={'/head.webp'}
                alt={`media`}
                width={1200}
                height={675}
                style={{
                    cursor: 'pointer',
                    objectFit: 'cover',
                    objectPosition: 'center 70%',
                    width: '100%',
                    height: 'auto',
                    maxHeight: 400
                }}
            />
            <Container
                maxW={'6xl'}
                px={{base: 5, md: 30}}
                my={5}>
                <SelectList/>
                <Box mt={5}>
                    <MediasList/>
                </Box>
            </Container>
        </>
    );
}
