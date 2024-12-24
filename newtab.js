const repoUrl = "https://api.github.com/repos/zayn0001/christmas-gift/contents/";
const baseGitHubPagesUrl = "https://zayn0001.github.io/christmas-gift/media";

async function fetchMedia() {
    try {
        const response = await fetch(repoUrl);
        const data = await response.json();

        // Filter only image and video files (JPEG, PNG, MP4, etc.)
        const mediaFiles = data.filter(file => /\.(jpg|jpeg|png|gif|mp4)$/i.test(file.name));

        // Generate full URLs for the media files
        const mediaUrls = mediaFiles.map(file => `${baseGitHubPagesUrl}${file.name}`);
        return mediaUrls;
    } catch (error) {
        console.error("Error fetching media:", error);
        return [];
    }
}

async function initializeGallery() {
    const assets = await fetchMedia();

    // Pick a random index from the assets array
    const randomIndex = Math.floor(Math.random() * assets.length);

    const fileUrl = assets[randomIndex];

    // Create the frame for displaying content
    const container = document.body;
    container.innerHTML = ""; // Clear previous content

    const frame = document.createElement("div");
    frame.classList.add("frame");

    let mediaElement;

    // Check if it's an image or video and create the corresponding element
    if (fileUrl.endsWith(".mp4")) {
        mediaElement = document.createElement("video");
        mediaElement.src = fileUrl;
        mediaElement.controls = true;
        mediaElement.autoplay = true; // Automatically start the video
        mediaElement.muted = true;    // Mute the video for autoplay to work in most browsers
        mediaElement.style.width = "100%";  // Ensures responsiveness
    } else {
        mediaElement = document.createElement("img");
        mediaElement.src = fileUrl;
        mediaElement.style.width = "100%";  // Ensures responsiveness
    }

    mediaElement.style.height = "auto";  // Maintain aspect ratio

    frame.appendChild(mediaElement);
    container.appendChild(frame);
}

// Start the gallery
initializeGallery();