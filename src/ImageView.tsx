import React, { useEffect, useState } from 'react'
import { IRoverPhoto } from './ImageGallery'
import { Box, Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { LOCAL_STORAGE_NAME } from './constants';

interface IImageViewProps {
    image: IRoverPhoto
}

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  

export const ImageView = (props: IImageViewProps) => {
    const [isLiked, setIsLiked] = useState(false)
    const styles = useStyles()
    const image = props.image

    useEffect(() => {
        const likedImages = localStorage.getItem(LOCAL_STORAGE_NAME)
        if (likedImages !== null) {
            const imageIds = JSON.parse(likedImages)
            imageIds.forEach((id: number) => {
                if (image.id === id) {
                    setIsLiked(true)
                }
            })
        }
    })

    const handleLikeClick = () => {
        console.log("IN HANDLE LIKE CLICKED")
        setIsLiked(!isLiked)
        !isLiked ? addToLocalStorage(image.id) : removeFromLocalStorage(image.id) 
    }

    const addToLocalStorage = (id: number) => {
        if (localStorage.getItem(LOCAL_STORAGE_NAME) === null) {
            localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify([]))
        }

        const likedImages: number[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)!)
        likedImages.push(id)
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(likedImages))
    }

    const removeFromLocalStorage = (id: number) => {
        const likedImages: number[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)!)
        const idx = likedImages.indexOf(id)
        likedImages.splice(idx, 1)
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(likedImages))
    }

    return (
        <Box m={1.5}>
        <Card className={styles.root} onDoubleClick={() => handleLikeClick()}>
            <CardMedia
                className={styles.media}
                image={image.img_src}
                title={image.camera.full_name}

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {image.camera.full_name}
                </Typography>
                <Typography gutterBottom variant="body1" component="h6">
                    {image.earth_date}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    The {image.camera.full_name} was taken on {image.earth_date} in {image.sol} sols. The {image.rover.name} Rover was launched on {image.rover.launch_date} and landed on {image.rover.landing_date}. The {image.rover.name} is currently {image.rover.status}.
                </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={handleLikeClick}>
            <FavoriteIcon  color={!isLiked ? "action" : "secondary"} />    
            <Typography style={{paddingLeft: 7}}>
                {!isLiked ? "Like" : "Unlike"}
            </Typography>
            </Button>
            </CardActions>
            
        </Card>
        </Box>
    )
}