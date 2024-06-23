import React, {useRef, useState} from "react";
import {Button, useToast} from "@chakra-ui/react";
import {Camera} from "react-feather";
import axios from "axios";
import {useRouter} from "next/router";

export default function UploadMedia() {
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toast = useToast()
    const router = useRouter();

    const handleAddMedia = () => {
        fileInputRef.current?.click();
    }
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles || selectedFiles.length === 0) return;

        setLoading(true);
        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }
        axios
            .post('/api/upload', formData)
            .then((res) => {
                if (router.query.folder === 'guests') {
                    // Forcer le rafraîchissement de la page
                    router.reload();
                } else {
                    // Rediriger vers /?folder=guests
                    router.push(`/?folder=guests`);
                }
                setLoading(false);
                toast({
                    title: `Merci ❤️ `,
                    description: `Tes photos/vidéos ont bien été ajoutées au dossier.`,
                    status: 'success',
                    position: 'top',
                    duration: 5000
                })
            })
            .catch((err) => {
                toast({
                    description: err.message,
                    status: 'error',
                    position: 'top',
                    duration: 2000
                })
            })
            .finally(() => {
                setLoading(false);
            })
    };
    return (
        <>
            <Button
                size='sm'
                shadow={'lg'}
                colorScheme='pink'
                leftIcon={<Camera size={16}/>}
                onClick={handleAddMedia}
                isLoading={loading}>
                Partager mes photos & vidéos
            </Button>
            <input
                type="file"
                multiple
                accept="image/*,video/*"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
            />
        </>
    );
}
