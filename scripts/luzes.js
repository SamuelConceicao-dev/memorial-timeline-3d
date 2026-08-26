import * as THREE from 'three';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


// Função para criar a timeline

export function criarTimeline(trigger){
    /*const canvas = document.querySelector('.canvas');*/

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
    return tl
}

export function criarLuzes(scene){
    const lights = {
        jardim: [],
        sala: [],
        escritorio: [],
        quartos: [],
        quartoMP: [],
        cozinha: [],
        quintal: []
    };

    // JARDIM //
    //Cor, intensidade e raio
    const pointLight1 = new THREE.PointLight(0x5FD32E, 5, 2);
    pointLight1.position.set(0, 0.1, 4);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x5FD32E, 5, 1);
    pointLight2.position.set(1, 0.1, 3.8);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x5FD32E, 5, 1);
    pointLight3.position.set(-1, 0.1, 3.9);
    scene.add(pointLight3);
    
    const pointLight4 = new THREE.PointLight(0x5FD32E, 5, 1);
    pointLight4.position.set(-1, 0.1, 4.3);
    scene.add(pointLight4);
    
    lights.jardim.push(pointLight1, pointLight2, pointLight3, pointLight4);


    // SALA //
    
    const pointLight5 = new THREE.PointLight(0xFF4500, 3, 1);
    pointLight5.position.set(0.2, 0.1, 1.2);
    scene.add(pointLight5);
    
    const pointLight6 = new THREE.PointLight(0xFF4500, 3, 1);
    pointLight6.position.set(0.2, 0.1, 2);
    scene.add(pointLight6);
    
    const pointLight7 = new THREE.PointLight(0xFF4500, 3, 1);
    pointLight7.position.set(-0.6, 0.1, 2);
    scene.add(pointLight7);
    
    lights.sala.push(pointLight5, pointLight6, pointLight7);

    // ESCRITÓRIO //
    
    const pointLight8 = new THREE.PointLight(0x20A4F3, 4, 1);
    pointLight8.position.set(-0.7, 0.1, 3);
    scene.add(pointLight8);
    
    lights.escritorio.push(pointLight8);

    // QUARTO FILHAS //
    
    const pointLight9 = new THREE.PointLight(0x0038A8, 1.2, 1);
    pointLight9.position.set(-0.7, 0.1, 1.2);
    scene.add(pointLight9);
    
    const pointLight10 = new THREE.PointLight(0x9B4F96, 1.2, 1);
    pointLight10.position.set(-0.7, 0.1, -0.4);
    scene.add(pointLight10);
    
    lights.quartos.push(pointLight9, pointLight10);

    // COZINHA //
    
    const pointLight11 = new THREE.PointLight(0xA020F0, 1.2, 1);
    pointLight11.position.set(0.4, 0.1, -2);
    scene.add(pointLight11);
    
    const pointLight12 = new THREE.PointLight(0xA020F0, 1.2, 1);
    pointLight12.position.set(0.4, 0.1, -1);
    scene.add(pointLight12);
    
    const pointLight13 = new THREE.PointLight(0xA020F0, 1.2, 1);
    pointLight13.position.set(0.6, 0.1, -0.2);
    scene.add(pointLight13);
    
    lights.cozinha.push(pointLight11, pointLight12, pointLight13);

    // QUARTO MP //
    
    const pointLight14 = new THREE.PointLight(0xff0000, 1.6, 1);
    pointLight14.position.set(-0.6, 0.1, -1.6);
    pointLight14.castShadow = true;
    scene.add(pointLight14);
    
    lights.quartoMP.push(pointLight14);

    // QUINTAL //
    
    const pointLight15 = new THREE.PointLight(0xFF0000, 1.2, 1);
    pointLight15.position.set(-0.6, 0.1, -3);
    scene.add(pointLight15);
    
    const pointLight16 = new THREE.PointLight(0xFF0000, 1.2, 1);
    pointLight16.position.set(0.3, 0.1, -3);
    scene.add(pointLight16);
    
    const pointLight17 = new THREE.PointLight(0xFF0000, 1.2, 1);
    pointLight17.position.set(0.9, 0.1, -3);
    scene.add(pointLight17);

    lights.quintal.push(pointLight15, pointLight16, pointLight17);

    return lights

}

export function apagarLuzes(luzes){

    luzes.jardim.forEach(luz => {
        luz.intensity = 0;
    });

    luzes.sala.forEach(luz => {
        luz.intensity = 0;
    });

    luzes.escritorio.forEach(luz => {
        luz.intensity = 0;
    });

    luzes.quartos.forEach(luz => {
        luz.intensity = 0;
    });

    luzes.quartoMP.forEach(luz => {
        luz.intensity = 0;
    });

    luzes.cozinha.forEach(luz => {
        luz.intensity = 0;
    });

    luzes.quintal.forEach(luz => {
        luz.intensity = 0;
    });
}

export function interruptor(tl, luzes, intensidade){
    luzes.forEach(luz => {
        tl.to(luz, {
            intensity: intensidade,
            duration: 1
        },"<");
    });
}