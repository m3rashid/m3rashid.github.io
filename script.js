// import './style.css'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'



// import * as THREE from "https://threejs.org/build/three.js";

// Production Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas.webgl"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


// Center Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x0f8faf });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lights Setup
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);





function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z);
    scene.add(star)
}
Array(200).fill().forEach(addStar)




// Background
const spaceTexture = new THREE.TextureLoader().load("images/space.jpg");
scene.background = spaceTexture;

// Display Picture (My photo)
const rashidTexture = new THREE.TextureLoader().load("images/rashid.jpg");
const rashid = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({ map: rashidTexture })
);
scene.add(rashid);





// Moon
const moonTexture = new THREE.TextureLoader().load("images/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("images/normal.jpg");
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
    })
);
scene.add(moon);




moon.position.z = 20;
moon.position.setX(-5);

rashid.rotation.y = -5;
rashid.position.x = 2;
rashid.position.y = 1;
rashid.position.z = -5;






// Action on scrolling the page
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    rashid.rotation.y += 0.01;
    rashid.rotation.z += 0.01;

    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
    camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    moon.rotation.x += 0.005;
    // controls.update();

    renderer.render(scene, camera);
}

animate()