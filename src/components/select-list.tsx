import {Box, Select, Tab, TabList, Tabs, useBreakpointValue} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {providers} from "../../utils/providers";

interface IFolder {
    title: string;
    path: string;
}

const folders: IFolder[] = providers;

export default function SelectList() {
    const router = useRouter();
    const [selectedValue, setSelectedValue] = useState<string>('kcp');
    const isMobile = useBreakpointValue({base: true, md: false});

    useEffect(() => {
        if (router.query.folder && isValidFolder(router.query.folder as string)) {
            setSelectedValue(router.query.folder as string);
        } else {
            setSelectedValue('kcp');
        }
    }, [router.query.folder]);

    const isValidFolder = (folderPath: string): boolean => {
        return folders.some(folder => folder.path === folderPath);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPath = event.target.value;
        router.push(`/?folder=${selectedPath}`);
    };

    if (isMobile) {
        return (
            <Box>
                <Select
                    borderWidth={2}
                    rounded={'full'}
                    value={selectedValue}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>
                        Sélectionner un dossier
                    </option>
                    {folders.map((folder) => (
                        <option key={folder.path} value={folder.path}>
                            {folder.title}
                        </option>
                    ))}
                </Select>
            </Box>
        );
    }

    return (
        <Tabs defaultIndex={providers.findIndex(x => x.path === selectedValue)}>
            <TabList justifyContent="center">
                {folders.map(folder => (
                    <Tab
                        key={`tab-${folder.path}`}
                        onClick={() => router.push(`/?folder=${folder.path}`)}
                    >
                        {folder.title}
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    );
}
