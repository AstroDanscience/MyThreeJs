import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

let scene, camera, renderer;

function init(){

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType( 'local' );
    document.body.appendChild( renderer.domElement );

    document.body.appendChild( VRButton.createButton( renderer ) );


    scene  = new THREE.Scene;
    camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 45, 30000);
    camera.position.set(0,0,0);
  //  renderer = new THREE.WebGLRenderer({antialias:true});
  //  renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    let controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 3000;

    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load('Public/Moon/indigo_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load('Public/Moon/indigo_bk.jpg');
    let texture_up = new THREE.TextureLoader().load('Public/Moon/indigo_up.jpg');
    let texture_dn = new THREE.TextureLoader().load('Public/Moon/indigo_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load('Public/Moon/indigo_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load('Public/Moon/indigo_lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({map:texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_lf}));

    for(let i=0;i<6;i++){
        materialArray[i].side = THREE.BackSide;

        let skyboxmoon = new THREE.BoxGeometry(10000,10000,10000);
        let skybox = new THREE.Mesh(skyboxmoon, materialArray);
        scene.add(skybox);
    
        animate();
    

    }


}

function animate(){

    renderer.render(scene,camera);
   // requestAnimationFrame(animate);

}

init();