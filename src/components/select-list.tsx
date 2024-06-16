import {Tab, TabList, Tabs} from "@chakra-ui/react";
import React from "react";
import {useRouter} from "next/router";

interface IFolder {
    title: string;
    path: string;
}

const folders: IFolder[] = [
    {
        title: 'Photoboot',
        path: 'photoboot',
    },
    {
        title: 'Photos prises par Yvan',
        path: 'yvan',
    },
    {
        title: 'Photos prises par KCP',
        path: 'kcp',
    },
    {
        title: 'Photos prises par Stéphane',
        path: 'stephane',
    }
]

export default function SelectList() {
    const router = useRouter();
    return (
        <Tabs>
            <TabList>
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
