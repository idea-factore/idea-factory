import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { parseBytes32String } from "@ethersproject/strings";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Image from 'material-ui-image';
import SearchBar from 'material-ui-search-bar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { themeOptions  } from '../components/Theme';
import { TextField } from 'mui-rff';
import { Popup, DashboardCard } from "../components";

const useStyles = makeStyles((theme)=> ({
  root: {
    justifyItems: "center",
    minHeight: "100%",
    minWidth: "100%"
  },
  content: {
      position: "relative",
      minHeight: "100vh",
      top: theme.spacing(2)

  },
  media: {
      height: 140,
      width: 300
    },
  search: {
    backgroundColor: theme.palette.primary.dark,
  },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
  },
  link: {
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.dark
  },
  '&:active': {
      color: '#616161',
  }
}
}
));

//TODO: Change contract calls to effector effects or events
export default function ChildPools({purpose, events, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts, poolCoordinator, ideaFactory }) {
    const { address } = useParams();
    const [visible, setVisible] = useState(false);
    const [visibleIdea, setVisibleIdea] = useState(false);
    const [childPools, setChildPool] = useState([]);
    const [category, setCategory] = useState(null);
    const [event, setEvent]=useState({});
    const [currentPool, setCurrentPool] = useState()
    const classes = useStyles(themeOptions);


    const listener= (event) => {
      console.log("Event happened: ", event)
      setEvent(event);
    }
    poolCoordinator.contract.on("createdChildPool", listener);
    poolCoordinator.contract.on("addedIdeaToChild", listener);
    useEffect(() => {
      const data = poolCoordinator.contract.getPoolData(address).then(data =>{ return {...data}});
      Promise.resolve(data).then(result => {
        console.log("Got data ", result)
        setCategory(result);
      })
    }, [])
    useEffect(() => {
        poolCoordinator.contract.getChildPools(address).then(res => {
          const data = res.map(pool => {
            return poolCoordinator.contract.getChildPoolData(pool.child).then(data =>{ return {...data}});
          });
          Promise.allSettled(data).then((result) => {
            console.log("Got result ", result);
            setChildPool(result);
        });
        })
      }, [event]);
    const createChildPool = (values) => {
        poolCoordinator.contract.connect(userProvider.getSigner()).createChildPool(values.name, values.description, address); 
        setVisible(false);
    }

    const createdIdea = (values) => {
      console.log("Created idea with ", values);
      const result = ideaFactory.connect(userProvider.getSigner()).mintIdea(values.name, values.description, values.stake).then(res => {
        res.wait(1).then(res2 => {
          ideaFactory.queryFilter("mintedIdea", res2.blockHash).then(idea => {
            console.log("Got idea ", idea[0].args.id.toNumber());
            poolCoordinator.contract.connect(userProvider.getSigner()).addIdeaToChild(currentPool, idea[0].args.id.toNumber());
          })
        })
      });
      //call PoolCoordinator to mint idea and pass in the amount of vote tokens
      //this will deposit vote tokens to pool coordinator from the current user
      //this will mint a new idea, and add that amount of votes to the idea
      //this will set the inital value of an idea. For now, we will just pretend that 1 VOTE==1 dollar
      setVisibleIdea(false);
    }

    async function validate(values) {
      if (!values.name) {
        return { name: 'Name is required to create a child pool.' };
      }
      return;
    }
    //todo Change popover to dropdown and add notifications on success or failure
    //implement idea view page and idea add
    return (
      <Container className={classes.root}>
            <Popup 
              visible={visible}
              onCancel={() => {
              setVisible(false);
              }}
              title={"Add a new Child Pool"}
              onCreate={createChildPool}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <TextField label="Name" name="name" required={true} />
                  <TextField label="Description" name="description" required={false} />
                    <Button autoFocus onClick={() => {
                      setVisible(false);
                    }} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Create
                    </Button>
                </form>
              )}
              validate={validate}
            />
                {
                  (childPools && childPools.length >= 1) &&
                  <Grid container className={classes.content}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                  >
                    <Grid 
                    item 
                    container
                    direction="column"
                    justify="flex-end"
                    alignItems="stretch"
                  >
                    { category &&
                      <Grid item>
                      <Breadcrumbs aria-label="breadcrumb">
                      <Link className={classes.link} to={"/"}>
                          Home
                        </Link>
                        <Link className={classes.link} to={"/pools"}>
                          Pools
                        </Link>
                        <Typography color="textPrimary">{parseBytes32String(category.name)}</Typography>
                      </Breadcrumbs>
                      </Grid>
                    }
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
                    {/**
                     * Use DashboardCard component? 
                     */}
                    <Grid item>
                      <DashboardCard 
                        header={false}
                        data={childPools.map(item => {
                          return {
                            name: parseBytes32String(item.value.name),
                            description: parseBytes32String(item.value.description),
                            actions:
                              <span>
                                <Button component={Link} size="small" color="secondary">
                                  Learn More
                                </Button>
                              </span>
                          }
                        })}
                        type={"list"}
                      />
                    </Grid>
                  </Grid>
                }
                {
                   (childPools && childPools.length == 0 ) &&
                   <Grid 
                      container 
                      direction="column"
                      justify="flex-start"
                      alignItems="center"
                      className={classes.content}
                      spacing={3}
                  >
                  <Grid 
                    item 
                    container
                    direction="column"
                    justify="flex-end"
                    alignItems="stretch"
                  >
                    { category &&
                      <Grid item>
                      <Breadcrumbs aria-label="breadcrumb">
                      <Link className={classes.link} to={"/"}>
                          Home
                        </Link>
                        <Link className={classes.link} to={"/pools"}>
                          Pools
                        </Link>
                        <Typography color="textPrimary">{parseBytes32String(category.name)}</Typography>
                      </Breadcrumbs>
                      </Grid>
                    }
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
                    <Image src={"/assets/empty.svg"} className={classes.media}/>
                    <p>Oh noes :( No Child Pools found</p>
                    <p>Add a child Pool with the button below</p>
                  </Grid>
                  </Grid>
                }
                {/**
                 * Add tooltip
                 */}
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => {setVisible(true)}}>
                  <AddIcon />
                </Fab>
      </Container>
    )
}