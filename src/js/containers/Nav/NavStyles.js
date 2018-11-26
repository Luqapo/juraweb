import { fade } from '@material-ui/core/styles/colorManipulator';

export const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    upBar: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        width: '100%',
        alignItems: 'baseline',
      },
      },
      upBarItem: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
          width: '33%',
        },
      },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
            },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing.unit * 5,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 5,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '100%',
          '&:focus': {
            width: 200,
          },
        },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        width: '100%',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  });