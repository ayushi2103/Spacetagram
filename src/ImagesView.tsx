import React from 'react'
import { Grid } from '@material-ui/core'
import { IRoverPhoto } from './ImageGallery'
import { ImageView } from './ImageView'

interface IImagesViewProps {
    images: IRoverPhoto[]
}

const shuffle = (a: IRoverPhoto[]) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


export const ImagesView = (props: IImagesViewProps) => {
    const images = props.images
    const shuffledImages = shuffle(images)
    return (
        <Grid 
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
        >
        {shuffledImages.map((image) => {
            return <ImageView image={image} key={image.id}/>
        })}
        </Grid>
    )
}