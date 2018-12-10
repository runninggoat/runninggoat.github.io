const Component = React.Component
const {
  Grid,
  Button,
  CssBaseline,
  Typography,
  Paper,
} = window['material-ui']
const tags = ['ThreeJS', 'ReactJS', '其它']

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
            break
          case 'image':
            element = (
              <div
                key={idx}
                style={{ textAlign: 'center' }}
              >
                <img src={paragraph.content} style={{ width: '100%' }} />
              </div>
            )
            break
          case 'link':
            element = (
              <div
                key={idx}
                style={{ textAlign: 'center' }}
              >
                <a href={paragraph.href}>
                  <Typography
                    variant='body1'
                    align='center'
                    style={{ margin: '5px 0' }}
                  >{ paragraph.content }</Typography>
                </a>
              </div>
            )
            break
          default:
            break
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
            xs={10}
          >
            <Paper style={{
              padding: '10px 30px',
            }}>
              <Grid
                container
                justify='center'
              >
                <Grid item sm={12} xs={12}>
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
            xs={12}
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
            xs={12}
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
            xs={12}
          >
            <Banner />
          </Grid>
        </Grid>
        { blogsGrids }
      </div>
    )
  }
}

class Banner extends Component {
  constructor (props) {
    super(props)
    this.state = {
      renderer: null,
      banner: null,
      width: null,
      height: null,
      camera: null,
      scene: null,
      control: null,
      typoMesh: null,
    }
  }

  componentDidMount () {
    this.initThree()
  }

  initThree () {
    //Init ThreeJS
    let banner = document.getElementById('banner')
    let width = banner.clientWidth
    let height = banner.clientHeight
    let renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 1.0)
    banner.appendChild(renderer.domElement)

    //Init camera
    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1e6)
    camera.position.set(0, 0, 15)
    camera.lookAt(0, 0, 0)

    //Init scene
    let scene = new THREE.Scene()

    //Init control
    // let control = new THREE.OrbitControls( camera, renderer.domElement )

    //Init light
    let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3)
    scene.add(ambientLight)
    let spotLight = new THREE.SpotLight(0xFFFFFF, 1.0, 1e3, 30 * Math.PI / 180)
    spotLight.position.set(10, 10, 5)
    scene.add(spotLight)

    //Init objects
    let typoMaterial = new THREE.MeshLambertMaterial({ color: 0x2194ce })
    let loader = new THREE.FontLoader()
    loader.load('./font/LiSu_Regular.json', font => {
      var geometry = new THREE.TextGeometry('Tom的作品园地', {
        font: font,
        size: 3,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 3,
      })
      geometry.computeBoundingBox()
      let mesh = new THREE.Mesh(geometry, typoMaterial)
      mesh.position.x = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x )
      mesh.position.y = - 0.3 * ( geometry.boundingBox.max.y - geometry.boundingBox.min.y )
      let typoMesh = new THREE.Object3D()
      typoMesh.add(mesh)
      scene.add(typoMesh)
      this.setState({
        typoMesh: typoMesh,
      })
    })

    function animation () {
      requestAnimationFrame(animation)

      update()
      renderScene()
    }

    let self = this
    function update () {
      if (self.state.typoMesh)
        self.state.typoMesh.rotation.y += (0.4 * Math.PI / 180)
    }

    function renderScene () {
      if (self.state.renderer && self.state.scene && self.state.camera)
        self.state.renderer.render(self.state.scene, self.state.camera)
    }

    function updateCameraViewPort () {
      let width = self.state.banner.clientWidth
      let height = self.state.banner.clientHeight
      self.state.renderer.setSize(width, height)
      self.state.camera.aspect = width / height
      self.state.camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', updateCameraViewPort)

    animation()

    this.setState({
      renderer: renderer,
      banner: banner,
      camera: camera,
      scene: scene,
      // control: control,
    })
  }

  render () {
    return (
      <Paper
        id='banner'
        style={{ height: '300px' }}
      ></Paper>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
