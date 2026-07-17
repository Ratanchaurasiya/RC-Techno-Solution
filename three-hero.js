import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const container = document.getElementById('three-hero-container');
if (container) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.035);
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 18);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Post-Processing
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.15;
    bloomPass.strength = 1.8;
    bloomPass.radius = 0.8;
    
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    
    let useComposer = window.innerWidth >= 768;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.0);
    scene.add(ambientLight);
    
    const blueLight = new THREE.PointLight(0x38bdf8, 300, 50);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);
    
    const purpleLight = new THREE.PointLight(0xa855f7, 300, 50);
    purpleLight.position.set(-5, -5, 5);
    scene.add(purpleLight);

    const mainGroup = new THREE.Group();
    // Center the globe to act as a background for all content
    mainGroup.position.set(0, 0, -5); 
    scene.add(mainGroup);
    
    if (window.innerWidth < 992) {
        mainGroup.position.set(0, 4, -10); // Center on mobile
    }
    
    // Holographic Globe
    const globeGroup = new THREE.Group();
    mainGroup.add(globeGroup);
    
    // Inner Sphere (solid, dark, reflective)
    const innerSphereGeo = new THREE.IcosahedronGeometry(4, 3);
    const innerSphereMat = new THREE.MeshStandardMaterial({
        color: 0x020617,
        roughness: 0.2,
        metalness: 0.8,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    globeGroup.add(innerSphere);
    
    // Outer Wireframe (holographic)
    const outerWireframeGeo = new THREE.IcosahedronGeometry(4.2, 3);
    const outerWireframeMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const outerWireframe = new THREE.Mesh(outerWireframeGeo, outerWireframeMat);
    globeGroup.add(outerWireframe);

    // Glowing network nodes on the globe
    const nodeMaterial = new THREE.PointsMaterial({
        color: 0xa855f7,
        size: 0.15,
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    const globeNodes = new THREE.Points(outerWireframeGeo, nodeMaterial);
    globeGroup.add(globeNodes);
    
    // Orbiting Glass Panels
    const panelsGroup = new THREE.Group();
    globeGroup.add(panelsGroup);
    
    const services = [
        "Web Development", "Mobile Apps", "AI Solutions", 
        "Cloud Computing", "Cybersecurity", "APIs", "Database"
    ];
    
    const createTextCanvas = (text) => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
        ctx.fillRect(4, 4, canvas.width - 8, canvas.height - 8);
        
        ctx.font = 'bold 40px "Poppins", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return texture;
    };
    
    const panelGeo = new THREE.PlaneGeometry(3.5, 0.875); // aspect ratio 4:1
    const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.1,
        envMapIntensity: 1.0,
        clearcoat: 1.0,
        side: THREE.DoubleSide,
        transparent: true
    });
    
    const panels = [];
    const radius = 7.5;
    
    services.forEach((service, index) => {
        const tex = createTextCanvas(service);
        const mat = glassMat.clone();
        mat.map = tex;
        mat.emissive = new THREE.Color(0x38bdf8);
        mat.emissiveMap = tex;
        mat.emissiveIntensity = 0.5;
        
        const mesh = new THREE.Mesh(panelGeo, mat);
        
        // Distribute in orbit
        const angle = (index / services.length) * Math.PI * 2;
        
        const wrapper = new THREE.Group();
        wrapper.rotation.y = angle;
        
        mesh.position.z = radius;
        mesh.position.y = (Math.random() - 0.5) * 6; // vary heights
        mesh.lookAt(0, mesh.position.y, 0); // look at center
        mesh.rotation.y += Math.PI; // flip to face out
        
        wrapper.add(mesh);
        panelsGroup.add(wrapper);
        panels.push({ wrapper, mesh, speed: (Math.random() * 0.005 + 0.002) });
    });
    
    // Cyber Grid Floor
    const gridHelper = new THREE.GridHelper(100, 50, 0xa855f7, 0x1e1b4b);
    gridHelper.position.y = -8;
    scene.add(gridHelper);
    
    // Data Streams (Vertical moving particles)
    const streamGeo = new THREE.BufferGeometry();
    const streamCount = window.innerWidth < 768 ? 200 : 600;
    const streamPositions = new Float32Array(streamCount * 3);
    const streamSpeeds = new Float32Array(streamCount);
    
    for(let i=0; i < streamCount; i++) {
        streamPositions[i*3] = (Math.random() - 0.5) * 40; // x
        streamPositions[i*3+1] = (Math.random() - 0.5) * 40; // y
        streamPositions[i*3+2] = (Math.random() - 0.5) * 40 - 10; // z
        streamSpeeds[i] = Math.random() * 0.2 + 0.05;
    }
    
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    streamGeo.setAttribute('speed', new THREE.BufferAttribute(streamSpeeds, 1));
    
    const streamMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.15,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const streamParticles = new THREE.Points(streamGeo, streamMat);
    scene.add(streamParticles);
    
    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });
    
    // Animation Loop
    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        // Rotate Globe
        globeGroup.rotation.y = elapsedTime * 0.1;
        globeGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.1;
        outerWireframe.rotation.x = elapsedTime * 0.05;
        
        // Orbit Panels
        panelsGroup.rotation.y = -elapsedTime * 0.05;
        
        // Animate Grid
        gridHelper.position.z = (elapsedTime * 2) % 2; // move forward and loop
        
        // Animate Data Streams
        const positions = streamParticles.geometry.attributes.position.array;
        const speeds = streamParticles.geometry.attributes.speed.array;
        for(let i=0; i < streamCount; i++) {
            positions[i*3+1] += speeds[i]; // move up
            if (positions[i*3+1] > 20) {
                positions[i*3+1] = -20; // reset to bottom
            }
        }
        streamParticles.geometry.attributes.position.needsUpdate = true;
        
        // Move Lights
        blueLight.position.x = Math.sin(elapsedTime * 0.5) * 12;
        blueLight.position.z = Math.cos(elapsedTime * 0.5) * 12;
        blueLight.position.y = Math.sin(elapsedTime * 0.8) * 5;
        
        purpleLight.position.x = Math.cos(elapsedTime * 0.3) * 12;
        purpleLight.position.z = Math.sin(elapsedTime * 0.3) * 12;
        
        // Parallax Camera
        targetX = mouseX * 0.003;
        targetY = mouseY * 0.003;
        
        if (window.innerWidth >= 768) {
            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (-targetY + 2 - camera.position.y) * 0.05;
            camera.lookAt(mainGroup.position.x * 0.5, 0, 0); // look slightly towards globe
        } else {
            camera.lookAt(mainGroup.position);
        }
        
        if (useComposer) {
            composer.render();
        } else {
            renderer.render(scene, camera);
        }
    }
    
    animate();
    
    // Resize Handler
    window.addEventListener('resize', () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        useComposer = window.innerWidth >= 768;
        
        if (window.innerWidth < 992) {
            mainGroup.position.set(0, 4, -10);
        } else {
            mainGroup.position.set(0, 0, -5);
        }
    });
}
