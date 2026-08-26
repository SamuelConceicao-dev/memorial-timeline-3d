import * as THREE from 'three';

// Funções de Inicialização

export function criarCamera(){
    const browserWidth = window.innerWidth;
    const browserHeight = window.innerHeight;
    // Cria camera (FOV, proporção, corteProximo, corteDistante)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.lookAt(10, 10, 0);

    if (browserWidth < 768){
        camera.position.set(0, 0.4, 10);
    }
    else{
        camera.position.set(0, 0.4, 8);
    }
    return camera;
}

export function criarCena(){
    // Cria cena
    const scene = new THREE.Scene();
    // Muda a cor do fundo
    scene.background = new THREE.Color('#1a1e2b');
    return scene;
}

export function criarRenderer(canvas){
    // Cria o renderer
    const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});

    // Define um tamanho
    /*renderer.setSize(canvas.innerWidth, canvas.innerHeight, false);*/

    // Ativa as sombras
    renderer.shadowMap.enabled = true;
    
    renderer.shadowMap.type = THREE.PCFShadowMap;
    // Linka no html
    //document.body.appendChild(renderer.domElement);
    return renderer;
}

export function atualizarRenderer(camera, renderer, container) {
    /*console.log("Renderer atualizado")*/

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(width, height, false);

    camera.aspect = width / height;

    camera.updateProjectionMatrix();
}

export function comodosCoord(){
    const comodos = {
        jardim: {
            dtx: 0,
            dtz: 4,
            mbx: 0,
            mbz: 4
        },
        escritorio: {
            dtx: -0.5,
            dtz: 3,
            mbx: -0.5,
            mbz: 3
        },
        sala: {
            dtx: 0,
            dtz: 1.5,
            mbx: 0,
            mbz: 1.5
        },
        quartos:{
            dtx: -0.5,
            dtz: 0.5,
            mbx: -0.5,
            mbz: 0.5
        },
        MP: {
            dtx: -0.5,
            dtz: -1.5,
            mbx: -0.5,
            mbz: -1.5
        },
        cozinha: {
            dtx: 1,
            dtz: -1,
            mbx: 1,
            mbz: -1
        },
        quintal: {
            dtx: 1,
            dtz: -3,
            mbx: 1,
            mbz: -3
        }
    };
    
    return comodos
}