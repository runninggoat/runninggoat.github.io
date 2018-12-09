const Component = React.Component
const {
  Grid,
  Button,
  CssBaseline,
  Typography,
  Paper,
} = window['material-ui']
const tags = ['ThreeJS', 'ReactJS', '其它', 'ReactJS1', '其它1', 'ReactJS2', '其它2']

class Index extends Component {
  initTags () {
    return tags.map((tag, idx) => {
      return (
        <Grid item key={tag} style={{ padding: '10px' }}>
          <Typography
            variant='h6'
            align='center'
          >{tag}</Typography>
        </Grid>
      )
    })
  }

  initBlogs () {
    function initParagraphs (paragraphs) {
      return paragraphs.map((paragraph, idx) => {
        let element = null
        switch (paragraph.type) {
          case 'text':
            element = (
              <Typography
                key={idx}
                variant='body2'
                align='left'
                style={{ margin: '5px 0' }}
              >{ paragraph.content }</Typography>
            )
            break;
          case 'image':
            element = (
              <div
                key={idx}
                style={{ textAlign: 'center' }}
              >
                <img src={paragraph.content} />
              </div>
            )
          default:
            break;
        }
        return element
      })
    }
    return blogs.map((blog, idx) => {
      let content = initParagraphs(blog.paragraphs)
      return (
        <Grid
          key={ blog.uid }
          container
          justify='center'
          style={{ margin: '10px 0' }}
        >
          <Grid
            item
            sm={6}
          >
            <Paper style={{
              padding: '10px 30px',
            }}>
              <Grid
                container
                justify='center'
              >
                <Grid item sm={12}>
                  <Typography
                    variant='h6'
                    align='left'
                  >{ blog.title }</Typography>
                  { content }
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )
    })
  }

  render () {
    let tagsGrids = this.initTags()
    let blogsGrids = this.initBlogs()
    return (
      <div>
        <CssBaseline />
        <Grid
          container
          justify='center'
        >
          <Grid
            item
            sm={10}
            style={{ padding: '20px', borderBottom: '1px solid #545454' }}
          >
            <Typography
              variant='h4'
              align='center'
            >以将图南</Typography>
          </Grid>
          <Grid
            item
            sm={10}
          >
            <Grid
              container
              justify='space-around'
            >
              { tagsGrids }
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify='center'
          style={{ margin: '20px 0' }}
        >
          <Grid
            item
            sm={10}
          >
            <Paper
              style={{ height: '300px', backgroundColor: '#000' }}
            ></Paper>
          </Grid>
        </Grid>
        { blogsGrids }
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
