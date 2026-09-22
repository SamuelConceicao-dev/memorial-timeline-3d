import { mostrarConteudo } from "./UI";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { atualizarRenderer } from './initizalizer';
import { interruptor } from './luzes';

gsap.registerPlugin(ScrollTrigger);

// Aqui estão os capitulos da experiência

function mudarConteudo(tl, indice){
    tl.to({},{
    duration:0.01,
    onStart(){
        console.log("Mostrando conteúdo"),
        mostrarConteudo(indice)
    },
    onReverseComplete() {
        if (indice > 0){
            mostrarConteudo(indice - 1);
        }
        
    }
    });

}

export function capituloIntroducao(teto, grade, telhado, camera, trigger, renderer, container){

    const mm = gsap.matchMedia();
    console.log(
    "Orientação:",
    window.matchMedia("(orientation: portrait)").matches
        ? "PORTRAIT"
        : "LANDSCAPE"
    );
    
    // DESKTOP / LANDSCAPE
    mm.add("(min-width: 769px)", () => {

        console.log("Capítulo introdução");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        tl.to(telhado.position, {
            y: 2,
            duration: 1
        });

        tl.to(telhado.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1
        }, "<");

        tl.to("#instrução-inicial", {
            opacity:0,
        }, "<");

        tl.to(grade.position, {
            y: 2,
            duration: 1

        });

        tl.to(grade.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1

        }, "<");

        tl.to(teto.position, {
            y: 2,
            duration: 1
        });

        tl.to(teto.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1
        }, "<");

        /*
        // Escrito desse modo, adiciona o "mostrar" diretamente à TimeLine
        mudarConteudo(tl, 1)
        */
        tl.to(camera.position, {
            y: 7,
            z: 1,

        });

        tl.to(camera.rotation, {
            x: -Math.PI / 2,

        }, "<");
    });

        mm.add("(max-width: 768px)", () => {
        
            console.log("Capítulo introdução - Mobile");
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            tl.to(telhado.position, {
                y: 2,
                duration: 1
            });

            tl.to(telhado.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1
            }, "<");

            tl.to("#instrução-inicial", {
                opacity:0,
            }, "<");

            tl.to(grade.position, {
                y: 2,
                duration: 1

            });

            tl.to(grade.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1

            }, "<");

            tl.to(teto.position, {
                y: 2,
                duration: 1
            });

            tl.to(teto.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1
            }, "<");

            /*
            // Escrito desse modo, adiciona o "mostrar" diretamente à TimeLine
            mudarConteudo(tl, 1)
            */

            tl.to(camera.position, {
                y: 7,
                z: 1,

            });

            tl.to(camera.rotation, {
                x: -Math.PI / 2,

            }, "<");
    });
}

export function capituloUm(camera, trigger, renderer, container, luzes, sol){

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true
            }
        });
        
        gsap.set(".story-book", {
        x: "-100%",
        });

        tl.to('.story-book', {
            x: 0,
        });

        tl.to(camera.position, {
            x: 0,
            y: 3,
            z: 3,
        }, '<');


        tl.to(".canvas-container",{
            width:"65%",
            duration:1.2,
            onUpdate: () => {
                
                atualizarRenderer(
                camera,
                renderer,
                container
            );
            }
        },"<");

        luzes.jardim.forEach(luz => {
            tl.to(luz, {
                intensity: 1.5,
                duration: 1
            },"<");
        });

        tl.to(sol, {
            intensity: 0.5,
        },"<");

    });

    /* Mobile */ 

        mm.add("(max-width: 768px)", () => {
        camera.position.set(0, 0.4, 8);
        atualizarRenderer(
                camera,
                renderer,
                container
        );

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top bottom",
                end: "top 20%",
                scrub: true
            }
        });
        

        tl.to(camera.position, {
            x: 0,
            y: 3,
            z: 4,
        }, '<');


        tl.to(".canvas-container",{
            height:"35dvh",
            duration:1.2,
            onUpdate: () => {
                
                atualizarRenderer(
                camera,
                renderer,
                container
            );
            }
        },"<");

        luzes.jardim.forEach(luz => {
            tl.to(luz, {
                intensity: 1.5,
                duration: 1
            },"<");
        });

        tl.to(sol, {
            intensity: 0.5,
        },"<");
    });
}

export function capituloDois(camera, trigger, luzes_apagar, luzes_acender, intens1, intens2){

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top center",
                end: "top top",
                scrub: true
            }
        });
        
        interruptor(tl, luzes_apagar, intens1);

        tl.to(camera.position, {
            x: -0.5,
            z: 3,
        }, '<');
        
        interruptor(tl, luzes_acender, intens2);
    // Fim da versão desktop
    });

    // Versão mobile

    mm.add("(max-width: 768px)", () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top bottom",
                end: "top center",
                scrub: true
            }
        });
        
        interruptor(tl, luzes_apagar, 0);
        tl.to(camera.position, {
            x: -0.5,
            z: 3,
        }, '<');
        interruptor(tl, luzes_acender, 2);

    // Fim da versão mobile   
    });
}

export function ativarCapitulo(camera, trigger, luzes_apagar, luzes_acender, intens1, intens2, coordenadas){

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top center",
                end: "top top",
                scrub: true
            }
        });
        interruptor(tl, luzes_apagar, intens1);
        
        tl.to(camera.position, {
            x: coordenadas.dtx,
            z: coordenadas.dtz,
        }, '<');
        
        interruptor(tl, luzes_acender, intens2);    
    // Fim da versão desktop
    });

    // Versão mobile

    mm.add("(max-width: 768px)", () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top center",
                end: "top top",
                scrub: true
            }
        });

        interruptor(tl, luzes_apagar, intens1);
        
        tl.to(camera.position, {
            x: coordenadas.mbx,
            z: coordenadas.mbz,
        }, '<');
        
        interruptor(tl, luzes_acender, intens2);

    // Fim da versão mobile   
    });
}