const Component = React.Component
const {
  Grid,
  Button,
  CssBaseline,
  Typography,
  Paper,
} = window['material-ui']

class App extends Component {
  render () {
    return(
      <div>
        <CssBaseline />
        <Grid
          container
          justify='center'
          style={{
            height: '50px',
            borderBottom: '1px solid #545454',
          }}
        >
          <Grid
            item
            sm={2}
            xs={3}
          >
            <a href='./index.html'>
              <Typography
                variant='h5'
              >返回首页</Typography>
            </a>
          </Grid>
          <Grid
            item
            sm={8}
            xs={4}
            style={{ textAlign: 'center' }}
          >
            <Typography
              variant='h4'
            >多边形演示</Typography>
          </Grid>
          <Grid
            item
            sm={2}
            xs={3}
          ></Grid>
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
        >
          <Playground />
        </Grid>
      </div>
    )
  }
}

class Playground extends Component {
  constructor (props) {
    super(props)
    this.state = {
      polygonMesh: null,
    }
  }

  componentDidMount () {
    var self = this

    //Init gui.Dat controllers
    var controls = new function () {
      this.clearColor = '#222222'
      this.polygonColor = '#F6831E'
      this.sides = 3
      this.radius = 1
    }
    var gui = new dat.GUI()
    var clearColorController = gui.addColor(controls, 'clearColor').name('背景清除色')
    clearColorController.onChange((value) => {
      renderer.setClearColor(controls.clearColor, 1.0)
    })
    var polygonColorController = gui.addColor(controls, 'polygonColor').name('多边形颜色')
    polygonColorController.onChange((value) => {
      scene.remove(self.state.polygonMesh)
      var polygonMesh = polygonMeshGenerator(controls.sides, controls.radius, value)
      scene.add(polygonMesh)
      self.setState({
        polygonMesh: polygonMesh,
      })
    })
    var sideController = gui.add(controls, 'sides', 3, 20).name('多边形边数').step(1)
    sideController.onChange(value => {
      scene.remove(self.state.polygonMesh)
      var polygonMesh = polygonMeshGenerator(value, controls.radius, controls.polygonColor)
      scene.add(polygonMesh)
      self.setState({
        polygonMesh: polygonMesh,
      })
    })
    var radiusController = gui.add(controls, 'radius', 1, 5).name('多边形半径').step(0.1)
    radiusController.onChange(value => {
      scene.remove(self.state.polygonMesh)
      var polygonMesh = polygonMeshGenerator(controls.sides, value, controls.polygonColor)
      scene.add(polygonMesh)
      self.setState({
        polygonMesh: polygonMesh,
      })
    })
    gui.domElement.style = 'position: absolute; top: 50px; right: 0;'

    //Init ThreeJS
    var playground = document.getElementById('playground')
    let width = playground.clientWidth
    let height = playground.clientHeight
    var renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(controls.clearColor, 1.0)
    playground.appendChild(renderer.domElement)

    //Init camera
    var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1e6)
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)

    //Init scene
    var scene = new THREE.Scene()

    //Init control
    var control = new THREE.OrbitControls( camera, renderer.domElement )

    //Init light
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)
    scene.add(ambientLight)

    //Init objects (polygon with basic material)
    function polygonMeshGenerator (sides, radius, color='#F6831E') {
      if (sides < 3) throw new Error('Polygon must has at least 3 sides.')
      let polygon = new THREE.Geometry()
      let angle, x, y
      for (let pt = 0; pt < sides; pt++) {
        angle = 2 * Math.PI * (pt / sides)
        x = Math.cos(angle) * radius
        y = Math.sin(angle) * radius
        polygon.vertices.push(new THREE.Vector3(x, y, 0))
      }
      for (let pt = 2; pt < sides; pt++) {
        polygon.faces.push(new THREE.Face3(0, pt - 1, pt))
      }
      let orangeBasicMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide })
      polygonMesh = new THREE.Mesh(polygon, orangeBasicMaterial)
      return polygonMesh
    }
    var polygonMesh = polygonMeshGenerator(controls.sides, controls.radius)
    scene.add(polygonMesh)
    self.setState({
      polygonMesh: polygonMesh,
    })

    //Update viewport when window resize happen
    function updateViewPort () {
      let width = playground.clientWidth
      let height = playground.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', updateViewPort)

    function animation() {
      requestAnimationFrame(animation)
      renderer.render(scene, camera)
    }

    animation()
  }

  render () {
    return (
      <div id='playground' style={{ width: '100%', height: '100%' }}></div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
