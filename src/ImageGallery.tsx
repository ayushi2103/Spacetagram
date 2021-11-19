import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BASE_URL, API_KEY, API_KEY_QUERY_PARAM, SOL_QUERY_PARAM, SOL_DATE } from './constants';
import { ImagesView } from './ImagesView'
import { Header } from './Header';
import { LoadingSpinner } from './LoadingSpinner'

export interface IRoverPhoto {
    id: number
    sol: number
    camera: ICameraInfo
    img_src: string
    earth_date: string
    rover: IRoverInfo
}

interface ICameraInfo {
    id: number
    name: string
    rover_id: number
    full_name: string
}

interface IRoverInfo {
    id: number
    name: string
    landing_date: string
    launch_date: string
    status: string
}

interface IImageGalleryProps {
    sol: number
}

export const ImageGallery = (props: IImageGalleryProps) => {
    const [photos, setPhotos] = React.useState<IRoverPhoto[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const wait = async (milliseconds = 2000) => {
        await sleep(milliseconds)
        setIsLoading(false)
    }

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await fetch(BASE_URL + SOL_QUERY_PARAM + SOL_DATE + API_KEY_QUERY_PARAM + API_KEY)
            const json = await response.json()
            return json
        }
        // waits for 2 seconds, and then loads the images to simulate loading state
        wait()
        fetchPhotos().then((data) => {
            const photos: IRoverPhoto[] = data['photos']
            setPhotos(photos)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container maxWidth="xl" >
            <Header />
            {!isLoading ? <ImagesView images={photos} /> : <LoadingSpinner />}
        </Container>
    )
}