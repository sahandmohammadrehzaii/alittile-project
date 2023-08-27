const videoElement = document.getElementById("videoElement");
let firstInteractionDone = false;

//Handle the zoom effect on the video.
function handleZoom(event) {
	const zoomLevel = parseFloat(event.target.getAttribute("data-zoom"));
	document.querySelector(
		".imageContainer video"
	).style.transform = `scale(${zoomLevel})`;
	document
		.querySelectorAll(".controls button")
		.forEach((btn) => btn.classList.remove("active"));
	event.target.classList.add("active");
}

// Attach the handleZoom function to all buttons that have the data-zoom attribute
document.querySelectorAll("button[data-zoom]").forEach((button) => {
	button.addEventListener("click", handleZoom);
});

//Attach an event listener to the switch camera button
document.querySelector(".switchCamera").addEventListener("click", function () {
	if (!firstInteractionDone) {
        videoElement.play();
        firstInteractionDone = true;
   }

	var isWebcam = videoElement.getAttribute("data-iswebcam") === "true";
	videoElement.classList.add("flipping-out");
	videoElement.onanimationend = () => {
		if (isWebcam) {
			if (videoElement.srcObject) {
				const tracks = videoElement.srcObject.getTracks();
				tracks.forEach((track) => track.stop());
			}
			videoElement.srcObject = null;
			videoElement.setAttribute("crossorigin", "anonymous");
			videoElement.src = "https://ismailvtl.github.io/images/video-codepen-dance.mp4";
			videoElement.setAttribute("data-iswebcam", "false");
			videoElement.classList.remove("flipping-out");
			videoElement.classList.add("flipping-in");

			videoElement.play();
		} else {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices
					.getUserMedia({ video: true })
					.then(function (stream) {
					 videoElement.setAttribute("crossorigin", "anonymous");
						videoElement.srcObject = stream;
						videoElement.setAttribute("data-iswebcam", "true");
						videoElement.classList.remove("flipping-out");
						videoElement.classList.add("flipping-in");
						videoElement.play();
					})
					.catch(function (err) {
						console.error("Error accessing the camera", err);
					});
			} else {
				console.error("Your browser does not support getUserMedia API");
			}
		}
		// On animation end, remove the flipping-in class
		videoElement.onanimationend = () => {
			videoElement.classList.remove("flipping-in");
		};
	};
});

// Attach an event listener to the camera button for capturing a snapshot from the video
document.querySelector(".camerabutton").addEventListener("click", function () {
	var flashElement = document.querySelector(".flash");
	flashElement.classList.add("shutterClick");
	flashElement.addEventListener("animationend", function () {
		flashElement.classList.remove("shutterClick");
	});
	let canvas = document.createElement("canvas");
	canvas.width = videoElement.videoWidth;
	canvas.height = videoElement.videoHeight;

	let ctx = canvas.getContext("2d");
	ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

	let thumbnailDataURL = canvas.toDataURL("image/jpeg");

	let thumbnailImage = document.querySelector(".thumbnail img");
	thumbnailImage.src = thumbnailDataURL;
});

let thumbnailButton = document.querySelector(".thumbnail");
thumbnailButton.addEventListener("click", function () {
	let heart = document.createElement("span");
	heart.classList.add("heart");
	heart.textContent = "😉";
	thumbnailButton.appendChild(heart);
	setTimeout(() => {
		heart.style.bottom = "100%";
		heart.style.opacity = "1";
		heart.style.fontSize = "30px";
	}, 10);

	setTimeout(() => {
		thumbnailButton.removeChild(heart);
	}, 2000);
});
