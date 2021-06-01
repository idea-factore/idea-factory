import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Carousel from 'react-material-ui-carousel'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'
import { themeOptions } from './index.js'

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    gridGap: '8px',
    maxHeight: 400,
    minWidth: 800,
    backgroundColor: '#616161'
  },
  media: {
    height: '100%'
  },
  body: {
    alignSelf: 'end',
    textAlign: 'center'
  },

  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 400
  },
  box: {
    top: theme.spacing(4),
    position: 'relative',
    minWidth: '100vh'
  },
  carousel: {
    minWidth: '60%',
    minHeight: '50%'
  }
}))

function Banner (props) {
  const classes = useStyles(themeOptions)
  const contentPosition = props.contentPosition ? props.contentPosition : 'left'
  const totalItems = props.length ? props.length : 3
  const mediaLength = totalItems - 1

  const items = []
  const content = (
    <Grid item xs={12 / totalItems} key='content'>
      <CardContent className={classes.body}>
        <img src={props.item.logo} height='100' width='350' />
      </CardContent>
      <CardActions className={classes.actions}>
        <br />
        <Button endIcon={<ArrowForwardIcon />}>
          {props.item.Caption}
        </Button>
      </CardActions>
    </Grid>
  )

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i]

    const media = (
      <Grid item xs={12 / totalItems} key={item.Name}>
        <CardMedia
          className={classes.media}
          image={item.Image}
          title={item.Name}
        >
          <Typography className='MediaCaption'>
            {item.Name}
          </Typography>
        </CardMedia>

      </Grid>
    )

    items.push(media)
  }

  if (contentPosition === 'left') {
    items.unshift(content)
  } else if (contentPosition === 'right') {
    items.push(content)
  } else if (contentPosition === 'middle') {
    items.splice(items.length / 2, 0, content)
  }

  return (
    <Card raised className={classes.card}>
      <Grid container spacing={0} className='BannerGrid'>
        {items}
      </Grid>
    </Card>
  )
}

const items = [
  {
    Name: 'Ideas',
    Caption: 'Explore Ideas',
    contentPosition: 'left',
    logo: '/assets/explore.svg',
    Items: [
      {
        Name: 'Cool Idea #1',
        Image: 'https://source.unsplash.com/featured/?macbook'
      },
      {
        Name: 'Cool Idea #2',
        Image: 'https://source.unsplash.com/featured/?iphone'
      }
    ]
  },
  {
    Name: 'Create',
    Caption: 'Create an Idea',
    logo: '/assets/create.svg',
    contentPosition: 'middle',
    Items: [
      {
        Name: 'Washing Machine WX9102',
        Image: 'https://source.unsplash.com/featured/?washingmachine'
      },
      {
        Name: 'Learus Vacuum Cleaner',
        Image: 'https://source.unsplash.com/featured/?vacuum,cleaner'
      }
    ]
  },
  {
    Name: 'Fund',
    Caption: 'Fund an Idea',
    logo: '/assets/fund.svg',
    contentPosition: 'right',
    Items: [
      {
        Name: 'Living Room Lamp',
        Image: 'https://source.unsplash.com/featured/?lamp'
      },
      {
        Name: 'Floral Vase',
        Image: 'https://source.unsplash.com/featured/?vase'
      }
    ]
  }
]

export default function NavCarousel () {
  const classes = useStyles(themeOptions)
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      margin='auto'
      className={classes.box}
      data-cy='carosel'
    >
      <Carousel interval={10000} navButtonsAlwaysVisible className={classes.carousel}>
        {
                        items.map((item, index) => {
                          return <Banner item={item} key={index} contentPosition={item.contentPosition} />
                        })
                    }
      </Carousel>
    </Box>
  )
}
