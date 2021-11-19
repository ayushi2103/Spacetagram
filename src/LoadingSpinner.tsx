import React from 'react'
import { CircularProgress, Grid, Typography } from '@material-ui/core'

export const LoadingSpinner = () => {
    return (
        <div>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
            <CircularProgress />
            <Typography variant={'body2'}>Loading...</Typography>
            </Grid>
        </div>
    )
}