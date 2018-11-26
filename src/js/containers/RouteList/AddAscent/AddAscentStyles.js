export const styles = theme => ({
    root: {
      width: "100%",
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            flexWrap: 'nowrap',
          },
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 100,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: '100%',
        },
      },
    sectionMobile: {
        display: 'block',
        width: '100%',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
      column: {
        flexBasis: '33.33%',
      },
      columnDown: {
        // flexBasis: '25%',
      },
  });