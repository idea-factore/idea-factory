import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import Button from '@material-ui/core/Button'
import CardHeader from '@material-ui/core/CardHeader'
import { CircularProgressWithLabel } from './index'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyItems: 'center',
    flexGrow: 1
  },
  card: {
    maxWidth: 450,
    backgroundColor: '#E5E5E5'
  },
  media: {
    height: 140
  },
  paper: {
    background: '#616161'
  }
}))

const DashboardCard = ({ title, type, data, header = true, actions }) => {
  const classes = useStyles()
  /**
     * TODO:
     * How to handle different data views?
     * etc
     * add default value for header
     */
  return (
    <Card data-cy={title} raised={false}>
      {header &&
        <CardHeader
          title={title}
        />}
      <CardContent>
        <Grid
          container
          item
          direction='row'
          justify='space-between'
          alignItems='stretch'
        >
          {type === 'list' &&
                    data.map((item, index) => {
                      return (
                        <Grid item key={item.name}>
                          <Card className={classes.card}>
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                image='/assets/explore.svg'
                                title={item.name}
                              />
                              <CardContent>
                                <Typography gutterBottom variant='h5' component='h2' color='secondary'>
                                  {item.name}
                                </Typography>
                                <Typography variant='body2' color='secondary' component='p'>
                                  {item.description}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              {
                                    item.actions
                                 }
                              {
                                     !item.actions &&
                                       <span>
                                         <Button size='small' color='secondary'>
                                           Share
                                         </Button>
                                         <Button size='small' color='secondary'>
                                           Learn More
                                         </Button>
                                       </span>
                                 }
                            </CardActions>
                          </Card>
                        </Grid>
                      )
                    })}
          {
                    type === 'list-vote' &&
                        data.map((item, index) => {
                          return (
                            <Card className={classes.card} key={index}>
                              <CardActionArea>
                                <CardMedia
                                  className={classes.media}
                                  image='/assets/explore.svg'
                                  title={item.name}
                                />
                                <Grid
                                  container
                                  direction='column'
                                  justify='space-evenly'
                                  alignItems='stretch'
                                >
                                  <Grid item>
                                    <CardContent>
                                      <CircularProgressWithLabel value={75} size={60} />
                                    </CardContent>
                                  </Grid>
                                  <Grid item>
                                    <CardContent>
                                      <Typography gutterBottom variant='h5' component='h2' color='secondary'>
                                        {item.name}
                                      </Typography>
                                      <Typography variant='body2' color='secondary' component='p'>
                                        {item.description}
                                      </Typography>
                                    </CardContent>
                                  </Grid>
                                </Grid>
                              </CardActionArea>
                              <CardActions>
                                {
                                    item.actions
                                 }
                                {
                                     !item.actions &&
                                       <span>
                                         <Button size='small' color='secondary'>
                                           Share
                                         </Button>
                                         <Button size='small' color='secondary'>
                                           Learn More
                                         </Button>
                                       </span>
                                 }
                              </CardActions>
                            </Card>
                          )
                        })
                }
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DashboardCard
