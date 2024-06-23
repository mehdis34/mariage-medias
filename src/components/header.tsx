import React from "react";
import Image from "next/image";
import {Box, Flex} from "@chakra-ui/react";
import UploadMedia from "@/components/upload-media";

export default function Header() {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            position="relative"
        >
            <Box position="absolute" top="40%" left="50%" transform="translate(-50%, -50%)">
                <UploadMedia/>
            </Box>
            <Image
                src={"/head.webp"}
                alt={`media`}
                width={1200}
                height={675}
                style={{
                    cursor: "pointer",
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "auto",
                    maxHeight: 400,
                    borderRadius: "0 0 25px 25px"
                }}
            />
        </Flex>
    );
}
