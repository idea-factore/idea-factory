import { createMuiTheme } from '@material-ui/core/styles'
/**
 * TODO:
 *
 * Add light/dark theme toggle
 * Play around with changing some things depending on light/dark
 * etc
 */
export const themeOptions = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#e0e0e0'
    },
    secondary: {
      main: '#616161'
    }
  },
  typography: {
    fontFamily: 'Titillium Web'
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
})
