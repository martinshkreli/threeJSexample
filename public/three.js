import * as THREE from 'three';

function main() {
    const canvas = document.querySelector('#c');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.95;
    const renderer = new THREE.WebGLRenderer({canvas});
    const fov = 75; // degrees
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 3.5;
    camera.position.x = 0;
    const scene = new THREE.Scene();
    const boxOne = {
        width: 1,
        height: 1,
        depth: 1,
        color: 0x44aa88
    }
    const geometry = new THREE.BoxGeometry(boxOne.width, boxOne.height, boxOne.depth);
    const material = new THREE.MeshPhongMaterial({color: boxOne.color});
    
    const boxTwo = {
        width: 1.5,
        height: 1,
        depth: 1.5,
        color: 0x44ff88
    }
    const geometrytwo = new THREE.BoxGeometry(boxTwo.width, boxTwo.height, boxTwo.depth);
    const materialtwo = new THREE.MeshPhongMaterial({color: boxTwo.color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    const monster = new THREE.Mesh(geometrytwo, materialtwo);
    monster.position.x = 1.5; monster.position.y = 1.5;
    scene.add(monster);
    
    //Light settings
    const lightSettings = {
        color: 0xFFFFFF,
        intensity: 2,
        x: -1,
        y: 2,
        z: 4
    }
    
    const light = new THREE.DirectionalLight(lightSettings.color, lightSettings.intensity);
    light.position.set(lightSettings.x, lightSettings.y, lightSettings.z);
    scene.add(light);

    addEventListener('keydown', (event) => {});
    document.querySelector("#c").addEventListener("mousemove", function(event) {myFunction(event);});

    function myFunction(e) {
      if (e.clientX < (canvas.width / 2)) {
        // arbitrary conversion from canvas world to threeJS scene world
        cube.position.x = (0 - ((canvas.width / 2 - e.clientX) * 0.006)) 
      }
      else {
        cube.position.x = (0 + ((e.clientX - canvas.width / 2) * 0.006)) 
      }
      if (e.clientY < (canvas.height / 2)) {
        const distancefrommid = (canvas.height/2 - e.clientY)
        cube.position.y = (0 + distancefrommid * 0.005);
      }
      else {
        const distancefrommid = (e.clientY - canvas.height/2)
        cube.position.y = (0 - distancefrommid * 0.005)
      }
};
  onkeydown = (event) => {
    if (event.key == "a") {
      cube.position.x-=0.1;
    }
    if (event.key == "w") {
      cube.position.y+=0.1;
    }
    if (event.key == "s") {
      cube.position.y-=0.1;
    }
    if (event.key == "d") {
      cube.position.x+=0.1;
    }
    if (event.key == "z") {
      cube.scale.x+=0.1;
    }
    if (event.key == "x") {
      cube.scale.x-=0.1;
    }
}
    renderer.render(scene, camera);
    function render(time) {
        time *= 0.001;  // convert time to seconds
        cube.rotation.x = time; // rotate one axis normal
        cube.rotation.y = time * 0.5;  // rotate one axis slow
        
        monster.rotation.x = time * 2; // rotate both axis fast
        monster.rotation.y = time * 2; 

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    
        document.getElementById('tips').style.height = canvas.height * 0.5;
        document.getElementById('tips').style.right = canvas.width * 0.05 + "px";
        document.getElementById('tips').style.width = canvas.width * 0.25 + "px";

    }
    requestAnimationFrame(render);
}
    
main();