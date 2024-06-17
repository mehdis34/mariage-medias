import {Tab, TabList, Tabs} from "@chakra-ui/react";
import React from "react";
import {useRouter} from "next/router";

interface IFolder {
    title: string;
    path: string;
}

const folders: IFolder[] = [
    {
        title: 'KCP',
        path: 'kcp',
    },
    {
        title: 'Yvan',
        path: 'yvan',
    },
    {
        title: 'Stéphane',
        path: 'stephane',
    },
    {
        title: 'Photoboot',
        path: 'photoboot',
    }
]

export default function SelectList() {
    const router = useRouter();
    return (
        <Tabs>
            <TabList justifyContent={'center'}>
                {folders.map(folder => (
                    <Tab
                        key={`tab-${folder.path}`}
                        onClick={() => router.push(`/?folder=${folder.path}`)}>
                        {folder.title}
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    );
}
