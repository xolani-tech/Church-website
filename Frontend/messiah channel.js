document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const liveStatus = document.getElementById('liveStatus');
    const liveDot = document.querySelector('.live-dot');
    const streamPlaceholder = document.getElementById('streamPlaceholder');
    const vmixPlayer = document.getElementById('vmixPlayer');
    const chatBtn = document.getElementById('chatBtn');
    const chatContainer = document.getElementById('chatContainer');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const shareBtn = document.getElementById('shareBtn');
    const modalShareBtn = document.getElementById('modalShareBtn');
    const shareModal = document.getElementById('shareModal');
    const closeShareBtn = document.getElementById('closeShareBtn');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const shareLink = document.getElementById('shareLink');
    const videoModal = document.getElementById('videoModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalVideoContainer = document.getElementById('modalVideoContainer');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoDate = document.getElementById('modalVideoDate');
    const modalVideoDescription = document.getElementById('modalVideoDescription');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const videosGrid = document.getElementById('videosGrid');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const reminderBtn = document.getElementById('reminderBtn');

    // Sample videos data (in a real application, this would come from a database)
    const videosData = [
        {
            id: 1,
            title: 'The Power of Faith',
            date: 'May 15, 2023',
            description: 'Pastor John teaches about the power of faith in our daily lives.',
            duration: '45:12',
            thumbnail: '/Images/sermon-thumbnail-1.jpg',
            category: 'sunday',
            videoUrl: 'https://example.com/videos/sermon1.mp4'
        },
        {
            id: 2,
            title: 'Understanding the Holy Spirit',
            date: 'May 8, 2023',
            description: 'Learn about the role of the Holy Spirit in the life of a believer.',
            duration: '38:45',
            thumbnail: '/Images/sermon-thumbnail-2.jpg',
            category: 'bible',
            videoUrl: 'https://example.com/videos/sermon2.mp4'
        },
        {
            id: 3,
            title: 'Healing and Deliverance Service',
            date: 'April 30, 2023',
            description: 'Special service focused on healing and deliverance.',
            duration: '1:12:33',
            thumbnail: '/Images/sermon-thumbnail-3.jpg',
            category: 'special',
            videoUrl: 'https://example.com/videos/sermon3.mp4'
        },
        {
            id: 4,
            title: 'My Testimony - Sarah Johnson',
            date: 'April 23, 2023',
            description: 'Sarah shares her powerful testimony of how God changed her life.',
            duration: '15:20',
            thumbnail: '/Images/testimony-thumbnail-1.jpg',
            category: 'testimonies',
            videoUrl: 'https://example.com/videos/testimony1.mp4'
        },
        // Add more videos as needed
    ];

    // Variables
    let isLive = false; // Set to true when livestreaming is active
    let currentPage = 1;
    const videosPerPage = 8;
    let filteredVideos = [...videosData];

    // Functions

    // Check if stream is live (in a real app, this would check with your streaming server)
    function checkLiveStatus() {
        // This is a placeholder. In a real application, you would:
        // 1. Make an API call to your streaming server or vMix API
        // 2. Check if the stream is currently active

        // For demo purposes, we'll simulate a live stream
        // In a real app, replace this with actual API calls to vMix or your streaming provider
        fetch('/api/check-live-status')
            .then(response => response.json())
            .then(data => {
                updateLiveStatus(data.isLive);
            })
            .catch(error => {
                console.error('Error checking live status:', error);
                // For demo, randomly toggle live status
                if (Math.random() > 0.5) {
                    updateLiveStatus(true);
                } else {
                    updateLiveStatus(false);
                }
            });
    }

    // Update the UI based on live status
    function updateLiveStatus(status) {
        isLive = status;

        if (isLive) {
            liveStatus.textContent = 'LIVE';
            liveStatus.classList.add('active');
            liveDot.classList.add('active');
            streamPlaceholder.style.display = 'none';

            // Create and embed vMix player
            // In a real application, you would use the vMix API or embed code
            const iframe = document.createElement('iframe');
            iframe.src = 'https://your-vmix-stream-url.com/embed'; // Replace with your actual vMix stream URL
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('frameborder', '0');
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';

            // Clear previous content and add the iframe
            while (vmixPlayer.firstChild) {
                vmixPlayer.removeChild(vmixPlayer.firstChild);
            }
            vmixPlayer.appendChild(iframe);
        } else {
            liveStatus.textContent = 'OFFLINE';
            liveStatus.classList.remove('active');
            liveDot.classList.remove('active');
            streamPlaceholder.style.display = 'flex';

            // Remove any existing player
            while (vmixPlayer.firstChild && vmixPlayer.firstChild !== streamPlaceholder) {
                vmixPlayer.removeChild(vmixPlayer.firstChild);
            }
        }
    }

    // Load videos to the grid
    function loadVideos() {
        // Clear current videos
        videosGrid.innerHTML = '';

        // Calculate pagination
        const startIndex = (currentPage - 1) * videosPerPage;
        const endIndex = startIndex + videosPerPage;
        const currentVideos = filteredVideos.slice(startIndex, endIndex);

        // Create video cards
        currentVideos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.dataset.id = video.id;

            videoCard.innerHTML = `
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <span class="video-duration">${video.duration}</span>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p class="video-date">${video.date}</p>
                    <p class="video-description">${video.description}</p>
                </div>
            `;

            // Add click event to open video
            videoCard.addEventListener('click', () => openVideoModal(video));

            videosGrid.appendChild(videoCard);
        });

        // Update pagination
        updatePagination();
    }

    // Update pagination controls
    function updatePagination() {
        const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

        // Clear current page numbers
        pageNumbers.innerHTML = '';

        // Add page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.className = 'page-number';
            if (i === currentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.textContent = i;

            pageNumber.addEventListener('click', () => {
                currentPage = i;
                loadVideos();
            });

            pageNumbers.appendChild(pageNumber);
        }

        // Update prev/next buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    // Filter videos by category and search term
    function filterVideos() {
        const category = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        filteredVideos = videosData.filter(video => {
            // Filter by category
            const categoryMatch = category === 'all' || video.category === category;

            // Filter by search term
            const searchMatch = video.title.toLowerCase().includes(searchTerm) ||
                video.description.toLowerCase().includes(searchTerm);

            return categoryMatch && searchMatch;
        });

        // Reset to first page and load videos
        currentPage = 1;
        loadVideos();
    }

    // Open video modal
    function openVideoModal(video) {
        modalVideoTitle.textContent = video.title;
        modalVideoDate.textContent = video.date;
        modalVideoDescription.textContent = video.description;

        // Create video player
        modalVideoContainer.innerHTML = `
            <video controls>
                <source src="${video.videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;

        // Show modal
        videoModal.classList.add('active');

        // Set share link
        shareLink.value = `${window.location.origin}/watch?id=${video.id}`;
    }

    // Close video modal
    function closeVideoModal() {
        videoModal.classList.remove('active');

        // Pause video when closing modal
        const videoElement = modalVideoContainer.querySelector('video');
        if (videoElement) {
            videoElement.pause();
        }
    }

    // Toggle chat
    function toggleChat() {
        chatContainer.classList.toggle('active');
    }

    // Open share modal
    function openShareModal() {
        shareModal.classList.add('active');
    }

    // Close share modal
    function closeShareModal() {
        shareModal.classList.remove('active');
    }

    // Copy share link
    function copyLink() {
        shareLink.select();
        document.execCommand('copy');

        // Show copied notification
        copyLinkBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyLinkBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    }

    // Set reminder for next service
    function setReminder() {
        // In a real app, this would integrate with calendar APIs or notification systems
        alert('Reminder set for the next service on Sunday at 10:00 CAT');

        // Change button state
        reminderBtn.innerHTML = '<i class="fas fa-check"></i> Reminder Set';
        reminderBtn.disabled = true;
    }

    // Event Listeners
    chatBtn.addEventListener('click', toggleChat);
    closeChatBtn.addEventListener('click', toggleChat);

    shareBtn.addEventListener('click', openShareModal);
    modalShareBtn.addEventListener('click', openShareModal);
    closeShareBtn.addEventListener('click', closeShareModal);
    copyLinkBtn.addEventListener('click', copyLink);

    closeModalBtn.addEventListener('click', closeVideoModal);

    categoryFilter.addEventListener('change', filterVideos);
    searchBtn.addEventListener('click', filterVideos);
    searchInput.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            filterVideos();
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadVideos();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            loadVideos();
        }
    });

    reminderBtn.addEventListener('click', setReminder);

    // Share options
    document.querySelectorAll('.share-option').forEach(option => {
        option.addEventListener('click', event => {
            event.preventDefault();
            const platform = option.dataset.platform;
            const url = encodeURIComponent(shareLink.value);
            const title = encodeURIComponent('Watch this sermon from New Jerusalem Church');

            let shareUrl;

            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title}%20${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=Check%20out%20this%20sermon:%20${url}`;
                    break;
            }

            window.open(shareUrl, '_blank');
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', event => {
        if (event.target === videoModal) {
            closeVideoModal();
        }
        if (event.target === shareModal) {
            closeShareModal();
        }
    });

    // Initialize
    checkLiveStatus();
    loadVideos();

    // Periodically check if stream is live (every 30 seconds)
    setInterval(checkLiveStatus, 30000);
});
