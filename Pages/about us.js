
 
(async function () {
    const MOCK_TEAM = [
        {
            id: 1,
            name: "Alice Morgan",
            role: "Head Horticulturist",
            bio: "Leads all planting and pruning programmes. Trained in sustainable garden design and passionate about native species.",
            expertise: "Plant Health & Design",
            photoUrl: "Images/alice.jpg",
            _color: "#2c6027"
        },
        {
            id: 2,
            name: "James Osei",
            role: "Site Safety Officer",
            bio: "Ensures every visit meets our strict safety standards. Certified in manual handling and green waste compliance.",
            expertise: "Safety & Compliance",
            photoUrl: "Images/james.jpg",
            _color: "#152d1e"
        },
        {
            id: 3,
            name: "Sofia Reyes",
            role: "Client Relations",
            bio: "Your first point of contact. Manages schedules, consultations, and personalised support for all plant care enquiries.",
            expertise: "Communication & Care",
            photoUrl: "Images/sofia.jpg",
            _color: "#3b5e2f"
        },
        {
            id: 4,
            name: "Tom Whitfield",
            role: "Green Waste Specialist",
            bio: "Expert in responsible disposal and recycling of all garden waste. Committed to zero-landfill outcomes.",
            expertise: "Sustainability",
            photoUrl: "Images/tom.jpg",
            _color: "#4a7c3f"
        },
        {
            id: 5,
            name: "Priya Nair",
            role: "Landscape Designer",
            bio: "Transforms outdoor spaces with a focus on year-round beauty and low maintenance for the homeowner.",
            expertise: "Landscape & Aesthetics",
            photoUrl: "Images/priya.jpg",
            _color: "#264d1e"
        },
        {
            id: 6,
            name: "Leo Harmon",
            role: "Volunteer Coordinator",
            bio: "Recruits and trains our dedicated volunteer team. Passionate about community gardening and mentorship.",
            expertise: "Team & Training",
            photoUrl: "Images/leo.jpeg",
            _color: "#1a3d15"
        }
    ];

 
    let team = [];
    try {
        team = MOCK_TEAM; 
    } catch (err) {
        console.error('Team fetch failed:', err);
        document.getElementById('team-loading').style.display = 'none';
        document.getElementById('team-error').style.display = 'block';
        return;
    }
 
    
    const loadingEl = document.getElementById('team-loading');
    const carouselEl = document.getElementById('team-carousel');
    const trackEl    = document.getElementById('team-track');
    const dotsEl     = document.getElementById('team-dots');
    const prevBtn    = document.getElementById('team-prev');
    const nextBtn    = document.getElementById('team-next');
 
    
    let currentIndex = 0;
    const total = team.length;
 
   
    function mod(n, m) { return ((n % m) + m) % m; }
 
    function initials(name) {
        return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    }
 
  
    function buildCard(member, position) {
        const slot = document.createElement('div');
        slot.className = 'team-slot' + (position === 'center' ? ' center' : '');
 
        
        const fc = document.createElement('div');
        fc.className = 'flip-container';
        fc.setAttribute('tabindex', '0');
        fc.setAttribute('role', 'button');
        fc.setAttribute('aria-label', `${member.name}, ${member.role} — hover to learn more`);
 
        const flipper = document.createElement('div');
        flipper.className = 'flipper';
 
        
        const front = document.createElement('div');
        front.className = 'card-face card-front';
 
        if (member.photoUrl) {
            const img = document.createElement('img');
            img.src  = member.photoUrl;
            img.alt  = member.name;
            front.appendChild(img);
        } else {
            const ph = document.createElement('div');
            ph.className = 'card-front-placeholder';
            const av = document.createElement('div');
            av.className = 'card-initials';
            av.style.background = member._color || '#152d1e';
            av.textContent = initials(member.name);
            ph.appendChild(av);
            front.appendChild(ph);
        }
 
        const back = document.createElement('div');
        back.className = 'card-face card-back';
        back.innerHTML = `
            <p class="card-back-name">${member.name}</p>
            <p class="card-back-role">${member.role}</p>
            <p class="card-back-bio">${member.bio}</p>
            <p class="card-back-expertise">${member.expertise}</p>
        `;
 
        flipper.appendChild(front);
        flipper.appendChild(back);
        fc.appendChild(flipper);
 
        /* Name label */
        const label = document.createElement('p');
        label.className = 'team-member-name';
        label.textContent = member.name;
 
        slot.appendChild(fc);
        slot.appendChild(label);
        return slot;
    }
 
    function render() {
        trackEl.innerHTML = '';
 
        const prevIdx   = mod(currentIndex - 1, total);
        const centerIdx = currentIndex;
        const nextIdx   = mod(currentIndex + 1, total);
 
        trackEl.appendChild(buildCard(team[prevIdx],   'side'));
        trackEl.appendChild(buildCard(team[centerIdx], 'center'));
        trackEl.appendChild(buildCard(team[nextIdx],   'side'));
 
        
        dotsEl.innerHTML = '';
        team.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', `Go to ${team[i].name}`);
            dot.addEventListener('click', () => { currentIndex = i; render(); });
            dotsEl.appendChild(dot);
        });
    }
 
    
    prevBtn.addEventListener('click', () => {
        currentIndex = mod(currentIndex - 1, total);
        render();
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = mod(currentIndex + 1, total);
        render();
    });
 
    loadingEl.style.display  = 'none';
    carouselEl.style.display = 'block';
    render();
 
})(); 

document.addEventListener("DOMContentLoaded", function () {
            loadStaffFromDatabase();
        });

        let staffMembers = [];
        let currentIndex = 0;

        function getStaffImage(staff, index) {
    const imagesByName = {
        "Dr. Lily Green": "Images/alice.jpg",
        "Oliver Root": "Images/james.jpg",
        "Tom Bloom": "Images/tom.jpg",
        "Noah Fern": "Images/priya.jpg",
        "Sophia Moss": "Images/sofia.jpg"
    };

    if (imagesByName[staff.full_name]) {
        return imagesByName[staff.full_name];
    }

    const fallbackImages = [
        "Images/alice.jpg",
        "Images/james.jpg",
        "Images/leo.jpg",
        "Images/priya.jpg",
        "Images/sofia.jpg",
        "Images/tom.jpg"
    ];

    return fallbackImages[index % fallbackImages.length];
}

 
        function getInitials(fullName) {
            return fullName
                .split(" ")
                .map(function (word) {
                    return word.charAt(0);
                })
                .join("")
                .toUpperCase();
        }

        function createStaffSlot(staff, index, position) {
            const slot = document.createElement("div");
            slot.className = "team-slot";

            if (position === 1) {
                slot.classList.add("center");
            }

            slot.innerHTML = `
                <div class="flip-container" tabindex="0">
                    <div class="flipper">

                        <div class="card-face card-front">
                            <img src="${getStaffImage(staff, index)}" alt="${staff.full_name}">
                        </div>

                        <div class="card-face card-back">
                            <p class="card-back-name">${staff.full_name}</p>
                            <p class="card-back-role">${staff.specialization}</p>
                            <p class="card-back-bio">Age: ${staff.age}</p>
                            <p class="card-back-expertise">Leaf & Root Team</p>
                        </div>

                    </div>
                </div>

                <p class="team-member-name">${staff.full_name}</p>
            `;

            return slot;
        }

        function showStaffCarousel() {
            const track = document.getElementById("team-track");
            const dots = document.getElementById("team-dots");

            track.innerHTML = "";
            dots.innerHTML = "";

            if (staffMembers.length === 0) {
                return;
            }

            let visibleCount = 3;

            if (staffMembers.length < 3) {
                visibleCount = staffMembers.length;
            }

            for (let i = 0; i < visibleCount; i++) {
                const staffIndex = (currentIndex + i) % staffMembers.length;
                const slot = createStaffSlot(staffMembers[staffIndex], staffIndex, i);
                track.appendChild(slot);
            }

            staffMembers.forEach(function (_, index) {
                const dot = document.createElement("button");
                dot.className = "carousel-dot";

                if (index === currentIndex) {
                    dot.classList.add("active");
                }

                dot.addEventListener("click", function () {
                    currentIndex = index;
                    showStaffCarousel();
                });

                dots.appendChild(dot);
            });
        }

        function loadStaffFromDatabase() {
            const loading = document.getElementById("team-loading");
            const error = document.getElementById("team-error");
            const carousel = document.getElementById("team-carousel");

            fetch("/staff")
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Could not load staff from database");
                    }

                    return response.json();
                })
                .then(function (staffFromDatabase) {
                    loading.style.display = "none";

                    if (staffFromDatabase.length === 0) {
                        error.textContent = "No staff members found in the database.";
                        return;
                    }

                    staffMembers = staffFromDatabase;

                    carousel.style.display = "block";

                    showStaffCarousel();
                })
                .catch(function (err) {
                    loading.style.display = "none";
                    error.textContent = "Error loading staff. Make sure Node server and MySQL are running.";
                    console.log(err);
                });
        }

        document.getElementById("team-prev").addEventListener("click", function () {
            if (staffMembers.length === 0) {
                return;
            }

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = staffMembers.length - 1;
            }

            showStaffCarousel();
        });

        document.getElementById("team-next").addEventListener("click", function () {
            if (staffMembers.length === 0) {
                return;
            }

            currentIndex++;

            if (currentIndex >= staffMembers.length) {
                currentIndex = 0;
            }

            showStaffCarousel();
        });