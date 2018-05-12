var renderer;
var camera;
var cube;
var scene;
var hFOV = 90;
var tanFOV;
var windowHeight;

// everything works, now just need a good way to convert from positions to pixels...

window.onload = function() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight /* + 96 */ ), 0.1, 1000 );

	tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
	windowHeight = window.innerHeight;

	renderer = new THREE.WebGLRenderer( { alpha: true; } );
	renderer.setSize( window.innerWidth, window.innerHeight /* + 96 */ );
	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var material = new THREE.MeshLambertMaterial( { color:0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	// add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x0000ff);
    scene.add(ambientLight);

    // directional lighting
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

		//needed for transparency
		scene.background = new THREE.Color( 0xff0000 );

	//renderer.setClearColor( 0x00ccff, 1);
	renderer.setClearColor( 0x000000, 0);
	camera.position.z = 5;

	renderer.render(scene, camera);

/*
	var render = function () {
		requestAnimationFrame( render );

		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;

		renderer.render(scene, camera);
	};

	render();
*/

}

window.onresize = function() {
	renderer.setSize( window.innerWidth, window.innerHeight /* + 96 */ );
	camera.aspect = window.innerWidth / (window.innerHeight /* + 96 */ );

	camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / (windowHeight /* + 96 */ )) );

	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
}

document.onscroll = function(e) {
	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
	renderer.render(scene, camera);
}
