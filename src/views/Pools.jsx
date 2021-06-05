import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { parseBytes32String, formatBytes32String } from '@ethersproject/strings'
import Image from 'material-ui-image'
import SearchBar from 'material-ui-search-bar'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import { themeOptions } from '../components/Theme'
import { TextField } from 'mui-rff'
import { Popup, DashboardCard } from '../components'
/**
 * TODO:
 * Move form into component
 * Monitor events with effector
 */
const useStyles = makeStyles((theme) => ({
  root: {
    justifyItems: 'center',
    minHeight: '100%',
    minWidth: '100%'
  },
  content: {
    position: 'relative',
    minHeight: '100vh',
    top: theme.spacing(2)
  },
  media: {
    height: 140,
    width: 300
  },
  search: {
    backgroundColor: theme.palette.primary.dark
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark
    },
    '&:active': {
      color: '#616161'
    }
  }
}))

export default function Pools ({ purpose, events, address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts, poolCoordinator }) {
  const [pools, setPools] = useState(null)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [event, setEvent] = useState({})
  const classes = useStyles(themeOptions)

  const listener = (event) => {
    setEvent(event)
    console.log(loading)
  }
  poolCoordinator.contract.on('createdPool', listener)
  const getPools = () => {
    try {
      poolCoordinator.contract.getPools().then(res => {
        console.log('Tried to get pools')
        console.log(res)
        const data = res.map(pool => {
          return poolCoordinator.contract.getPoolData(pool.pool).then(data => { return { ...data } })
        })
        Promise.allSettled(data).then((result) => {
          console.log('Got result ', result)
          setPools(result)
        })
      })
    } catch (e) {
      console.log(e)
      console.log('No web3 :(')
    }
  }
  const poolCallback = useCallback(() => {
    getPools()
    setLoading(false)
  })
  useEffect(() => {
    poolCallback()
  }, [event, poolCallback])
  const createPool = (values) => {
    console.log('Received values of form: ', values)
    setVisible(false)
    try {
      poolCoordinator.contract.connect(userProvider.getSigner()).createPool(formatBytes32String(values.name), formatBytes32String(values.description))
    } catch (e) {
      console.log('oh noes! something broke :(')
    }
  }
  async function validate (values) {
    if (!values.name) {
      return { name: 'Name is required to create pool.' }
    }
  }

  return (

    <Container data-cy='pools-page' className={classes.root}>
      <Popup
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        title='Create a new Pool'
        onCreate={createPool}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <TextField label='Name' name='name' required />
            <TextField label='Description' name='description' required={false} />
            <Button
              data-cy='cancel'
              autoFocus onClick={() => {
                setVisible(false)
              }} color='primary'
            >
              Cancel
            </Button>
            <Button data-cy='submit' type='submit' color='primary'>
              Create
            </Button>
          </form>
        )}
        validate={validate}
      />
      {
                  (pools && pools.length >= 1) &&
                    <Grid
                      container className={classes.content}
                      direction='column'
                      justify='flex-start'
                      alignItems='stretch'
                    >
                      <Grid
                        item
                        container
                        direction='column'
                        justify='flex-end'
                        alignItems='stretch'
                      >
                        <Grid item>
                          <Breadcrumbs aria-label='breadcrumb'>
                            <Link className={classes.link} to='/'>
                              Home
                            </Link>
                            <Typography color='textPrimary'>Pools</Typography>
                          </Breadcrumbs>
                        </Grid>
                        <Grid item>
                          <SearchBar
                            data-cy='searchbar'
                            className={classes.search}
                            onChange={() => console.log('onChange')}
                            onRequestSearch={() => console.log('onRequestSearch')}
                            style={{
                              margin: '0 auto',
                              minWidth: '100%'
                            }}
                          />
                        </Grid>
                      </Grid>
                      {/**
                     * Use DashboardCard component?
                     */}
                      <Grid item data-cy='search-result'>
                        <DashboardCard
                          header={false}
                          data={pools.map(item => {
                            return {
                              name: parseBytes32String(item.value.name),
                              description: parseBytes32String(item.value.description),
                              actions:
  <span>
    <Button component={Link} size='small' color='secondary' to={`/childpools/${item.value.pool}`}>
      View Child Pools
    </Button>
    <Button component={Link} size='small' color='secondary' to='/pools'>
      Learn More
    </Button>
  </span>
                            }
                          })}
                          type='list'
                        />
                      </Grid>
                    </Grid>
                }
      {
                   (pools && pools.length === 0) &&
                     <Grid
                       container
                       direction='row'
                       justify='center'
                       alignItems='center'
                       className={classes.content}
                     >
                       <Grid
                         item
                         container
                         direction='column'
                         justify='flex-end'
                         alignItems='stretch'
                       >
                         <Grid item>
                           <Breadcrumbs aria-label='breadcrumb'>
                             <Link className={classes.link} to='/'>
                               Home
                             </Link>
                             <Typography color='textPrimary'>Pools</Typography>
                           </Breadcrumbs>
                         </Grid>
                         <Grid item>
                           <SearchBar
                             className={classes.search}
                             onChange={() => console.log('onChange')}
                             onRequestSearch={() => console.log('onRequestSearch')}
                             style={{
                               margin: '0 auto',
                               minWidth: '100%'
                             }}
                           />
                         </Grid>
                       </Grid>
                       <Grid item>
                         <Image src='assets/empty.svg' className={classes.media} />
                         <p>Oh noes :( No pools found</p>
                         <p>Add a pool with the button below</p>
                       </Grid>
                     </Grid>
                }
      {/**
                 * Add tooltip
                 */}
      <Fab data-cy='add-pool' color='primary' aria-label='add' className={classes.fab} onClick={() => { setVisible(true) }}>
        <AddIcon />
      </Fab>
    </Container>

  )
}
