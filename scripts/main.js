import * as THREE from 'three';
import { OrbitControls } from
'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { criarCamera, criarCena, criarRenderer, comodosCoord } from './initizalizer';
import { capituloIntroducao, capituloUm, capituloDois, ativarCapitulo } from './capitulos';
import { atualizarRenderer } from './initizalizer';
import { criarLuzes } from './luzes';
import { apagarLuzes } from './luzes';

const canvas = document.querySelector('.webgl');
const capa = document.querySelector('.vazio-1');
const capitulo = document.querySelector('#chapter-1');
const capitulo2 = document.querySelector('#chapter-2');
const canvasContainer = document.querySelector(".canvas-container");

const camera = criarCamera();
const scene = criarCena();
const renderer = criarRenderer(canvas);
const luzes = criarLuzes(scene);
const coords = comodosCoord();

let teto = new THREE.Object3D();
let grade = new THREE.Object3D();
let telhado = new THREE.Object3D();


// Cria os controles da camera com mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

const manager = new THREE.LoadingManager();

manager.onLoad = () => {
    console.log("Todos os modelos carregados!");

    /* Remover depois porque não faz sentido atualizar assim que os modelos carregam */
    atualizarRenderer(camera, renderer, canvasContainer);
    
    capituloIntroducao(teto, grade, telhado, camera, capa, renderer, canvasContainer);
    capituloUm(camera, capitulo, renderer, canvasContainer, luzes, sol);
    ativarCapitulo(camera, "#chapter-2", luzes.jardim, luzes.escritorio, 0, 2, coords.escritorio)
    ativarCapitulo(camera, "#chapter-3", luzes.escritorio, luzes.quartoMP, 0, 3, coords.MP)
};

/* Ele observa um objeto e executa uma função sempre que esse objeto muda */
const resizeObserver = new ResizeObserver(() => {

    atualizarRenderer(
        camera,
        renderer,
        canvasContainer
    );

});

resizeObserver.observe(canvasContainer);

atualizarRenderer(
    camera,
    renderer,
    canvasContainer
);

// Cria o Loader
const loader = new GLTFLoader(manager);

loader.load('assets/Casa_Maria_da_Penha.glb', (glb) => {
    //console.log(gltf);
    glb.scene.traverse((child) => {
    if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        /* Mudar a cor da textura */
        child.material = new THREE.MeshStandardMaterial({
                color: 0xffffff
        });
    }
});
    const casa = glb.scene;
    casa.scale.setScalar(0.03);
    casa.rotation.y = THREE.MathUtils.degToRad(-90);
    scene.add(casa);
});

loader.load('assets/Teto_Maria_da_Penha.glb', (glb) => {
    teto = glb.scene;
    teto.rotation.y = THREE.MathUtils.degToRad(-90);
    teto.scale.setScalar(0.03);
    scene.add(teto);
    
});

loader.load('assets/Grade_Maria_da_Penha.glb', (glb) => {
    grade = glb.scene;
    grade.rotation.y = THREE.MathUtils.degToRad(-90);
    grade.scale.setScalar(0.03);
    scene.add(grade);
});

loader.load('assets/Telhado_Maria_da_Penha.glb', (glb) => {
    telhado = glb.scene;
    telhado.rotation.y = THREE.MathUtils.degToRad(-90);
    telhado.scale.setScalar(0.03);
    scene.add(telhado);
});

// Cria o chão
const floorGeometry = new THREE.PlaneGeometry(5, 10);

const floorMaterial = new THREE.MeshStandardMaterial({
    color: '#c1ddd9'
});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);


// Rotaciona 90° no eixo X
floor.rotation.x = -Math.PI / 2;
floor.position.y -= 0.63;
floor.position.z += 0.5;
// O chão recebe sombras
floor.receiveShadow = true;
//scene.add(floor);

///// LUZES /////

// Cria luz (cor do céu, cor do chão e intensidade)
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

// Luz direcional
const sol = new THREE.DirectionalLight(0xffffff, 2);

sol.position.set(5, 10, 3);

sol.castShadow = true;

scene.add(sol);


// Cria o loop de renderização
function animate(){
    requestAnimationFrame(animate);
    //controls.update()

    // Pede pro renderizador renderizar a cena criada com a camera criada
    renderer.render(scene, camera);
    
};

window.addEventListener("resize", () => {

    atualizarRenderer(
        camera,
        renderer,
        canvasContainer
    );
    getSizeRenderer()
});

apagarLuzes(luzes);


function getSizeRenderer(){
    // 1. Create a Vector2 target object
    const sizeVector = new THREE.Vector2();

    // 2. Pass the target vector to the method
    renderer.getSize(sizeVector);

    // 3. Access your width and height
    console.log("Width:", sizeVector.x);
    console.log("Height:", sizeVector.y);
}

getSizeRenderer()
animate();