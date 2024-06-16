import React from "react";
import {Box, Container} from "@chakra-ui/react";
import SelectList from "@/components/select-list";
import MediasList from "@/components/medias-list";

export default function Page() {
    return (
        <Container bg={'#333'} maxW={'6xl'} px={50} py={30} my={50} rounded={10}>
            <SelectList/>
            <Box mt={5}>
                <MediasList/>
            </Box>
        </Container>
    );
}
