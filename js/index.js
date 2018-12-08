const Component = React.Component
const {
  Button,
  colors,
  createMuiTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  MuiThemeProvider,
  Typography,
  withStyles,
  classes,
} = window['material-ui']

class Index extends Component {
  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <Button
          variant='contained'
          color='default'
        >Click me!</Button>
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
