export const styles = theme => ({
    root: {
        width: '100%',
        minHeight: '93vh',
        marginTop: '48px',
        overflowX: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginTop: '64px',
          },
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            minWidth: 700,
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
  });