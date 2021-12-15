<script>
    import {
        Canvas,
        Scene,
        PerspectiveCamera,
        DirectionalLight,
        AmbientLight,
        BoxBufferGeometry,
        ShaderMaterial,
        Mesh,
        MeshStandardMaterial,
        IcosahedronGeometry,
        WebGLRenderer,
        CubeTexture,
        Clock,
        PlaneBufferGeometry
    } from "svelthree";
    import PongControls from "./PongControls";
    import {onMount} from "svelte";
    //import {SetupNoiseFunctions} from "./shaders/NoiseFunctions";

    //SetupNoiseFunctions();

    import {fragmentShader as playerFragmentShader, vertexShader as playerVertexShader} from "./shaders/PlayerShader";
    import {fragmentShader as ballFragmentShader, vertexShader as ballVertexShader} from "./shaders/BallShader";

    let backgroundTexture = new CubeTexture()
    let planeGeometry = new PlaneBufferGeometry(1000000, 1000000, 1, 1)
    let planeMaterial = new MeshStandardMaterial();

    let cubeGeometry = new BoxBufferGeometry(1, 1, 1);
    let cubeMaterial = new ShaderMaterial(
        {
            vertexShader: playerVertexShader,
            fragmentShader: playerFragmentShader
        }
    );

    let clock = new Clock();
    let uniforms = {
        u_time: {value: 0.0}
    }

    let ballGeometry = new IcosahedronGeometry(1, 2);
    let ballMaterial = new ShaderMaterial(
        {
            vertexShader: ballVertexShader,
            fragmentShader: ballFragmentShader,
            uniforms: uniforms,
            wireframe: true,
        }
    );

    let playerBar;
    let playerMesh;
    let controls = new PongControls();
    let rAF;

    onMount(() => {
        playerMesh = playerBar.getMesh();
        rAF = requestAnimationFrame(applyMovement);

        return () => {
            cancelAnimationFrame(rAF);
        };
    })

    function applyMovement() {
        if((playerMesh.position.y < 3.1 && controls.GetHorizontalMovement() > 0) || (playerMesh.position.y > -3.1 && controls.GetHorizontalMovement() < 0)) {
            playerMesh.position.y += controls.GetHorizontalMovement();
        }
        uniforms.u_time = clock.getDelta();
        rAF = requestAnimationFrame(applyMovement);
    }



</script>

<Canvas let:sti w={1000} h={600}>

    <Scene {sti} let:scene id="scene1" props={{ background: 0xedf2f7 }}>

        <PerspectiveCamera {scene} id="cam1" pos={[0, 0, 10]} lookAt={[0, 0, 0]}/>
        <AmbientLight {scene} intensity={1.25}/>
        <DirectionalLight {scene} pos={[3, 3, 3]}/>

        <Mesh
                {scene}
                bind:this={playerBar}
                geometry={cubeGeometry}
                material={cubeMaterial}
                mat={{ roughness: 0.5, metalness: 0.5, color: 0x5f5f5f }}
                pos={[-6.5, 0, 0]}
                rot={[0, 0, 0]}
                scale={[0.3, 3, 0.3]}/>

        <Mesh
                {scene}
                geometry={ballGeometry}
                material={ballMaterial}
                pos={[0, 0, 0]}
                rot={[0, 0, 0]}
                scale={[0.3, 0.3, 0.3]}/>

        <Mesh
                {scene}
                geometry={planeGeometry}
                material={planeMaterial}
                mat={{ roughness: 0.5, metalness: 0.5, color: 0xedf2f7 }}
                pos={[0, 0, -1000]}
                rot={[0, 0, 0]}
                scale={[1, 1, 2]}
        />

    </Scene>

    <WebGLRenderer
            {sti}
            sceneId="scene1"
            camId="cam1"
            config={{ antialias: true, alpha: true }}/>

</Canvas>
