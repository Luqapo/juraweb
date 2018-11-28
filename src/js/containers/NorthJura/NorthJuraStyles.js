export const styles = theme => ({
    myJura: {
    position: 'relative',
    width: '100%',
    minHeight: '93vh',
    marginTop: '48px',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
        marginTop: '64px',
      },
    },
    buttonCenter: {
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0',
    }
  });