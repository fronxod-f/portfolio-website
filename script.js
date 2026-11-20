// Calculate scrollbar width once
document.documentElement.style.setProperty(
    "--scrollbar-width",
    window.innerWidth - document.documentElement.clientWidth + "px"
);


const navItems = document.querySelectorAll('.nav-links li');
const sections = Array.from(document.querySelectorAll('section[id]'));

function updateActiveSection() {
    const checkpoint = window.pageYOffset + window.innerHeight / 2;
    let activeId = sections[0]?.id;

    sections.forEach(section => {
        if (section.offsetTop <= checkpoint) {
            activeId = section.id;
        }
    });

    navItems.forEach(item => {
        const name = item.dataset.name;
        const isActive = name === activeId;

        item.classList.toggle('active', isActive);

        const spike = isActive
            ? `url('SVG/${capitalize(name)}Spike.svg')`
            : `url('SVG/${capitalize(name)}.svg')`;

        item.style.setProperty("--spike-url", spike);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('resize', updateActiveSection);

updateActiveSection();

const navLinks = document.querySelectorAll('.nav-links a');

/** Per-section scroll offset (px from viewport top). Tune in styles.css :root or data-scroll-offset on <section>. */
function getScrollOffset(sectionId) {
    const section = document.getElementById(sectionId);
    if (section?.dataset.scrollOffset !== undefined) {
        return parseInt(section.dataset.scrollOffset, 10) || 0;
    }

    const value = getComputedStyle(document.documentElement)
        .getPropertyValue(`--scroll-offset-${sectionId}`)
        .trim();
    if (value) return parseInt(value, 10) || 0;

    return document.querySelector('.navbar')?.offsetHeight ?? 100;
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const offset = getScrollOffset(sectionId);
    const y = section.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
        top: Math.max(0, y),
        behavior: 'smooth'
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        scrollToSection(targetId);
    });
});

document.querySelectorAll('.skill-glass').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const tile = document.getElementById(targetId);

        if (!tile) return;

        // Smooth scroll
        tile.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Remove previous highlights
        document.querySelectorAll('.project-tile').forEach(t => {
            t.classList.remove('highlight');
        });

        // Add highlight
        tile.classList.add('highlight');

        // Remove highlight after animation
        setTimeout(() => {
            tile.classList.add('highlight-remove');
            tile.classList.remove('highlight');
        }, 1500);

        setTimeout(() => {
            tile.classList.remove('highlight-remove');
        }, 2000);
    });
});

// Example project data (replace with real images later)
const projectData = {
    "3D designs": [
        { 
            title: "3D Isometric Room",
            media: [
                { type: "image", src: "Images/ModelRoom3.png" },
                { type: "image", src: "Images/ModelRoom4.png" },
                { type: "image", src: "Images/ModelRoom5.png" },
                { type: "image", src: "Images/ModelRoom6.png" },
                { type: "image", src: "Images/ModelRoom1.png" },
                { type: "image", src: "Images/ModelRoom2.png" }
            ],

            about: [
                "A stylized isometric room created in Blender, focused on composition, lighting, and color balance. The goal of this project was to explore a clean, readable environment using simple forms and controlled lighting to create a cozy atmosphere."
            ],
            designApproach: "The room was designed in soft pastel tones to create a feeling of comfort and warmth. Small, warm light sources, such as string lights and a table lamp, were used to make the space feel more intimate and cozy. Rounded edges were applied throughout the design to create a softer, calmer visual atmosphere.",
            
            technologies: ["Blender"],

            links: [
                {
                    label: "3D Isometric Room — Behance",
                    url: "https://www.behance.net/gallery/247880295/3D-Isometric-Room-Blender"
                }
            ]
        },
        {   
            title: "Clown model & animation", 
            media: [
                { type: "image", src: "Images/Title.png" },
                { type: "gif", src: "Videos/ClownRotation.gif" },
                { type: "image", src: "Images/Baloons1.png" },
                { type: "image", src: "Images/Circus.png" },
                { type: "image", src: "Images/Details2.png" },
                { type: "image", src: "Images/Details1.png" },
                { type: "image", src: "Images/Details3.png" },
                { type: "image", src: "Images/Details5.png" },
                { type: "video", src: "Videos/Clown_Render.mp4"} 
            ], 
            about: [
                "A stylised 3D clown and circus scene created in Blender, focusing on character design, rigging, and animation. The project explored the process of creating a unique stylised character, preparing it for movement through rigging, and bringing the character and circus environment to life with animation."
            ],
            designApproach: "The design approach focused on creating a contrast between the playful and joyful image of a clown and a darker, unsettling circus atmosphere. I wanted the character to appear bright and friendly at first, while the surrounding environment suggested that something was not quite right. To achieve this, I combined a colourful, always-smiling clown with a dark and mysterious circus setting, creating an atmosphere that feels playful but slightly creepy.",
            
            technologies: ["Blender", "Procreate"],

            links: [
                {
                    label: "Clown 3D Animation — Behance",
                    url: "https://www.behance.net/gallery/249579249/Clown-3D-Animation"
                }
            ]
        },
        { 
            title: "Game assets", 
            media: [
                { type: "image", src: "Images/Garbage bin side.png" },
                { type: "image", src: "Images/Garbage bin front.png" },
                { type: "image", src: "Images/Barrels.png" },
                { type: "image", src: "Images/Gate.png" },
                { type: "image", src: "Images/Handwheels.png" },
                { type: "image", src: "Images/Ladder.png" },
                { type: "image", src: "Images/Pipes.png" }
            ], 
            about: [
                "A set of stylised game props created in Blender with hand-drawn textures. The project focused on designing rusty, worn-out assets to add character and atmosphere to a game environment while maintaining a cohesive visual style."
            ],
            designApproach: "As the game was set in a cyberpunk environment, I used glowing accents to fit the futuristic atmosphere. Since these assets were mainly used as background and environmental elements, I kept their designs relatively subtle. Their textures include rust, scratches, and signs of wear to reinforce the feeling of abandonment and age.",
            
            technologies: ["Blender", "Procreate"],
            universityTeamProject: true,
            myRole: "I was responsible for creating the 3D asset set for the game, including modeling, UV unwrapping, and texturing. I created the UV layouts and hand-painted the textures in Procreate based on the UV maps. I also developed the materials and surface details to match the overall visual style of the game."
        },
    ],
    "2D art": [
        { title: "Character design sheets",  media: [
                { type: "image", src: "Images/clown color.jpg" },
                { type: "image", src: "Images/clown line.jpg" },
                { type: "image", src: "Images/clown blue.jpg" },
                { type: "image", src: "Images/strongman color.jpg" },
                { type: "image", src: "Images/strongman line.jpg" },
                { type: "image", src: "Images/strongman blue.jpg" }
            ], 
            about: [
                "A circus character design project featuring original characters. Each character is presented through three views (front, side, and back), a characteristic pose, and two facial expressions."
            ],
            designApproach: "The goal was to create distinctive circus characters whose personalities could be immediately recognized through their shapes, silhouettes, accessories, and colour palettes. Each design was developed to communicate the character's individual personality, mood, and identity through visual elements alone.",
            technologies: ["Procreate"],
        },
        { title: "2D game design", 
            media: [
                { type: "image", src: "Images/redleaf l1.png" },
                { type: "image", src: "Images/redleaf l2.png" },
                { type: "image", src: "Images/redleaf l4.png" },
                { type: "image", src: "Images/Blocks.png" },
                { type: "image", src: "Images/Characters.png" },
                { type: "image", src: "Images/Animation.png" },
                { type: "image", src: "Images/Backgrounds.png" },
                { type: "image", src: "Images/redleaf load.png" },
                { type: "image", src: "Images/redleaf sound.png" },
                { type: "image", src: "Images/redleaf main.png" },
                { type: "image", src: "Images/redleaf story.png" },
            ], 
            about: [
                "A team project focused on creating a 2D platformer game in Unity. We developed a five-level game with progressively increasing difficulty, introducing more complex mechanics and logic with each level. The game was presented at GameOn 2026 in Vilnius as part of a university exhibition showcasing student projects."
            ],
            designApproach: "A red-and-black palette was chosen for main theme to convey the mystery of the forest and the protagonist as a mysterious rescuer. Each of the five levels uses a distinct colour palette to differentiate the environments and reflect a change in mood. The levels are inspired by different forest phenomena.",
            
            technologies: ["Procreate", "Unity", "Adobe Illustrator"],
            universityTeamProject: true,
            myRole: "I was responsible for developing the main game concept, character design, and level design. I created the 2D artwork, illustrations, and animations used throughout the game, as well as designing the UX/UI to create a clear and engaging player experience."
        },
        { title: "Digital illustrations", 
            media: [
                { type: "image", src: "Images/art4.jpg" },
                { type: "image", src: "Images/art1.jpg" },
                { type: "image", src: "Images/art2.jpg" },
                { type: "image", src: "Images/art3.jpg" },
            ], 
            about: [
                "A collection of personal digital illustrations created in Procreate. Each artwork combines characters, backgrounds, and visual elements to create complete scenes and standalone compositions."
            ],
            designApproach: "These illustrations explore different styles, characters, moods, and visual ideas. I focus on creating expressive characters and detailed environments, using colour, composition, and visual storytelling to bring each artwork to life.",
            
            technologies: ["Procreate"],
        },
    ],  
    "Motion": [
        { title: "Animation for 4 screens", 
            media: [
                { type: "image", src: "Images/4 screens.png" },
                { type: "image", src: "Images/redgirls.png" },
                { type: "image", src: "Images/blackgirls.png" },
                { type: "video", src: "Videos/4screens.mp4"},
                { type: "video", src: "Videos/4screens_initial.mp4" }
            ], 
            about: [
                "A university team project focused on creating an animation designed to be displayed simultaneously across four screens. Our concept was a hand-drawn circus animation, combining playful visuals and movement to create a cohesive experience across multiple displays."
            ],
            designApproach: "I adapted the colours of my character to complement the other illustrations. A limited number of frames with subtle pose changes was used to give the animation a slightly unnatural, doll-like movement. The cartoon-inspired style was maintained throughout, with each character positioned centrally on its respective screen.",
            
            technologies: ["After Effects", "Procreate"],
            universityTeamProject: true,
            myRole: "Worked collaboratively across the project, contributing to the hand-drawn visuals and animation. I created a part of the drawings, helped finalize and refine the animation in After Effects, and worked with the team to set up and display the final animation across four screens."
        },
    ],
    "Visual design": [
        { title: "Festival branding", 
            media: [
                { type: "image", src: "Images/posters1.png" },
                { type: "image", src: "Images/Logo.png" },
                { type: "gif", src: "Videos/Logo animation.gif" },
                { type: "image", src: "Images/posters2.png" },
                { type: "image", src: "Images/bracelets1.png" },
                { type: "image", src: "Images/bracelets2.png" },
                { type: "image", src: "Images/Tickets.png" },
                { type: "gif", src: "Videos/Tickets animation.gif" },
                { type: "image", src: "Images/flags.png" },
                { type: "image", src: "Images/scene.png" }
            ], 
            about: [
                "Horizon Festival is a branding project for a fictional music festival in Berlin, set at the iconic Tempelhof Airport. The project involved developing a complete visual identity, including the logo, posters, tickets, wristbands, badges, and stage design."
            ],
            designApproach: "I used bright, bold colours and eye-catching visuals to communicate the energy, fun, and social atmosphere of a music festival. Wristbands and badges were colour-coded for easy identification. Across all assets, I maintained a consistent visual style and colour palette to create a cohesive and recognizable identity.",
            
            technologies: ["Adobe Illustrator", "Adobe Photoshop", "Blender", "After Effects"],

            links: [
                {
                    label: "Horizon Festival — Behance",
                    url: "https://www.behance.net/gallery/253898905/Horizon-festival-Branding"
                }
            ]
        },
        { title: "Poster design", 
            media: [
                { type: "image", src: "Images/3posters1.png" },
                { type: "image", src: "Images/Poster 1.png" },
                { type: "image", src: "Images/Poster 2.png" },
                { type: "image", src: "Images/Poster 3.png" },
                { type: "image", src: "Images/Moodboard.png" },
                { type: "image", src: "Images/Fonts.png" },
                { type: "image", src: "Images/Mockups.png" },
                { type: "image", src: "Images/Mockup1.png" },
                { type: "image", src: "Images/Mockup2.png" },
                { type: "image", src: "Images/Mockup3.png" }
            ], 
            about: [
                "A series of three posters exploring Chinese typography and visual style. The project focused on creating a cohesive visual identity across all three compositions while exploring different typographic and graphic elements."
            ],
            designApproach: "I chose earthy colours inspired by soil, leaves, and nature to create a sense of connection with the natural world. Thin, semi-transparent elements were added to convey lightness, elegance, and calmness, while the consistent visual language ties the three posters together as a unified series.",
            
            technologies: ["Adobe Illustrator", "Adobe Photoshop"],

            links: [
                {
                    label: "Poster series design — Behance",
                    url: "https://www.behance.net/gallery/253586305/Poster-series-design"
                }
            ]
        },
    ],  
    "Frontend": [
        {   title: "CityGo app",
            media: [
                { type: "image", src: "Images/CityGo Banner.png" },
                { type: "image", src: "Images/CityGo Logo.png" },
                { type: "image", src: "Images/CityGo (1).png" },
                { type: "image", src: "Images/CityGo (2).png" },
                { type: "image", src: "Images/CityGo (3).png" },
                { type: "image", src: "Images/CityGo (4).png" },
                { type: "image", src: "Images/CityGo (5).png" },
                { type: "image", src: "Images/CityGo (6).png" },
                { type: "image", src: "Images/CityGo (7).png" },
                { type: "image", src: "Images/CityGo (8).png" },
            ], 
            about: [
                "CityGo is a social discovery app that helps people connect through local events and activities. Users can create events, discover nearby activities, and join others through an intuitive swipe-based system. The app features English and Ukrainian localization, adaptive layouts for smartphones and tablets, and Firebase database integration. It was also prepared for Google Play closed testing."
            ],
            designApproach: "I created a modern, user-friendly interface with a blue-purple color palette and intuitive navigation. Inspired by swipe-based interactions, the design makes discovering events and connecting with people simple and engaging.",
            
            technologies: ["Figma", "Android Studio", "Kotlin", "Jetpack Compose", "Android SDK", "Firebase", "Google Play Console"],
        },
        {   title: "TunedUp website",
            media: [
                { type: "image", src: "Images/Tunedup new 1.png" },
                { type: "image", src: "Images/Tunedup new 2.png" },
                { type: "image", src: "Images/Tunedup new 3.png" },
                { type: "image", src: "Images/Tunedup new 4.png" },
                { type: "image", src: "Images/Tunedup new 5.png" },
                { type: "image", src: "Images/Tunedup new 6.png" },
                { type: "image", src: "Images/Tunedup new 7.png" },
                { type: "image", src: "Images/Tunedup new 8.png" },
                { type: "image", src: "Images/Tunedup new 9.png" },
                { type: "image", src: "Images/Tunedup new 10.png" },
                { type: "image", src: "Images/Tunedup new 11.png" }
            ], 
            about: [
                "TunedUp is an interactive car customization website where users can personalize their vehicles by changing colors, adding lighting, stickers, and purchasing car accessories."
            ],
            designApproach: "I aimed to create a modern, blue-themed interface with a clean visual style and intuitive navigation, making the customization process simple and engaging.",
            
            technologies: ["Figma", "HTML", "CSS", "JavaScript", "PHP", "MariaDB", "XAMPP"],
            universityTeamProject: true,
            myRole: "I was primarily responsible for the website's design and CSS implementation. I developed the initial prototype and translated the design into the final interface, making most of the visual design decisions.",

            links: [
                {
                    label: "TunedUp website — Live demo",
                    url: "http://tunedup.eigiva.lt/main.php"
                }
            ]
        },
    ],
};

// Apply per-tile cover images from HTML data-image attributes
document.querySelectorAll(".project-image").forEach(el => {
    const src = el.dataset.image;
    if (src) {
        el.style.backgroundImage = `url('${src}')`;
    }
});

// OPEN MODAL (CLICK ANYWHERE ON PROJECT TILE OR BUTTON)
document.addEventListener("click", (e) => {
    const tile = e.target.closest(".project-tile");
    if (!tile) return;

    const titleEl = tile.querySelector(".project-title");
    if (titleEl) {
        openProjectModal(titleEl.textContent.trim());
    }
});

function openProjectModal(title) {
    const modal = document.getElementById("project-modal");
    const modalTitle = modal.querySelector(".modal-title");
    const modalGrid = modal.querySelector(".modal-grid");

    modalTitle.textContent = title;
    modalGrid.innerHTML = "";

    const works = projectData[title] || [];
    works.forEach(item => {
        modalGrid.innerHTML += `
            <div class="modal-work-tile">
                <div class="modal-work-image" 
     style="background-image:url('${item.media?.[0]?.src || ""}'); background-size:cover;">
</div>

                <div class="modal-work-title">${item.title}</div>
                <button class="modal-work-button">Details</button>
            </div>
        `;
    });

    document.body.classList.add("modal-open");   // lock page scroll
    modal.style.display = "flex";
    modal.classList.remove("animate__fadeOut");
    modal.classList.add("animate__fadeIn");
}

// CLOSE MODAL
document.querySelector(".modal-close").addEventListener("click", () => {
    const modal = document.getElementById("project-modal");
    modal.classList.remove("animate__fadeIn");
modal.classList.add("animate__fadeOut");

setTimeout(() => {
    modal.style.display = "none";
    syncModalLock();
}, 300); // matches animation duration
});

// CLOSE MODAL WHEN CLICKING OUTSIDE CONTENT
document.getElementById("project-modal").addEventListener("click", (e) => {
    const modalContent = document.querySelector(".project-modal-content");

    // If click is OUTSIDE the modal content â†’ close
    if (!modalContent.contains(e.target)) {
        document.getElementById("project-modal").style.display = "none";
        syncModalLock();
    }
});

let currentMedia = [];
let currentIndex = 0;

function syncModalLock() {
    const projectModal = document.getElementById("project-modal");
    const workModal = document.getElementById("work-modal");
    const imageModal = document.getElementById("image-modal");
    const hasOpenModal = [projectModal, workModal, imageModal].some(modal =>
        modal && getComputedStyle(modal).display !== "none"
    );

    document.body.classList.toggle("modal-open", hasOpenModal);
}

/* -------------------------------------------
   OPEN WORK DETAILS MODAL (SECOND MODAL)
------------------------------------------- */

document.addEventListener("click", (e) => {
    const tile = e.target.closest(".modal-work-tile");
    if (!tile) return;

    const title = tile.querySelector(".modal-work-title")?.textContent;
    const category = document.querySelector(".modal-title")?.textContent;
    const work = projectData[category]?.find(w => w.title === title);

    if (work) openWorkModal(work);
});

function openWorkModal(work) {
    const modal = document.getElementById("work-modal");

    currentMedia = work.media || [];
    currentIndex = 0;

    preloadWorkMedia(currentMedia);
    if (currentMedia.length > 0) {
        renderMedia(currentMedia[currentIndex]);
    }

    modal.querySelector(".work-modal-title").textContent = work.title || "";
    modal.querySelector(".work-modal-project-badge")
        .classList.toggle("is-visible", Boolean(work.universityTeamProject));

    const roleSection = modal.querySelector(".work-modal-role");
    if (work.myRole) {
        roleSection.querySelector("p").textContent = work.myRole;
        roleSection.style.display = "flex";
    } else {
        roleSection.style.display = "none";
    }

    const description = modal.querySelector(".work-modal-description");
    description.replaceChildren();
    description.classList.toggle("has-sections", Boolean(work.about || work.designApproach));

    if (work.about || work.designApproach) {
        [
            { heading: "About", content: work.about },
            { heading: "Design Approach", content: work.designApproach }
        ].forEach(({ heading, content }) => {
            if (!content) return;

            const section = document.createElement("section");
            section.className = "work-modal-description-section";

            const title = document.createElement("h3");
            title.textContent = heading;
            section.appendChild(title);

            const paragraphs = Array.isArray(content) ? content : [content];
            paragraphs.forEach((text) => {
                const paragraph = document.createElement("p");
                paragraph.textContent = text;
                section.appendChild(paragraph);
            });

            description.appendChild(section);
        });
    } else {
        description.textContent = work.description || "";
    }

    /* TECHNOLOGIES */
    const techList = modal.querySelector(".tech-list");
    const techSection = modal.querySelector(".work-modal-tech");

    if (work.technologies?.length) {
        techList.innerHTML = work.technologies
            .map(t => `<span class="tech-tag">${t}</span>`)
            .join("");
        techSection.style.display = "block";
    } else {
        techSection.style.display = "none";
    }

    /* LINKS */
    const linksList = modal.querySelector(".links-list");
    const linksSection = modal.querySelector(".work-modal-links");

    if (work.links?.length) {
        linksList.innerHTML = work.links
            .map(link => `
                <a href="${link.url}" target="_blank" rel="noopener">
                    ${link.label}
                    <div class="link-action">
                        <img src="SVG/ArrowFollow.svg" alt="Open">
                        <span>Open</span>
                    </div>
                </a>
            `)
            .join("");
        linksSection.style.display = "block";
    } else {
        linksSection.style.display = "none";
    }

    document.body.classList.add("modal-open");
    modal.style.display = "flex";
    modal.classList.remove("animate__fadeOut");
    modal.classList.add("animate__animated", "animate__fadeIn");
}

/* -------------------------------------------
   RENDER MEDIA (IMAGE / GIF / VIDEO)
------------------------------------------- */

function renderMedia(item) {
    const container = document.querySelector(".work-modal-gallery");
    const rightArrow = container.querySelector(".right-arrow");
    const isVideo = item.type === "video";

    let media = container.querySelector(".work-modal-image");
    const tagMatches =
        media &&
        ((isVideo && media.tagName === "VIDEO") || (!isVideo && media.tagName === "IMG"));

    if (!tagMatches) {
        if (media) media.remove();
        media = document.createElement(isVideo ? "video" : "img");
        media.classList.add("work-modal-image");
        if (isVideo) {
            media.controls = true;
            media.autoplay = false;
        }
        container.insertBefore(media, rightArrow);
    }

    if (media.getAttribute("src") !== item.src) {
        media.src = item.src;
        if (isVideo) media.load();
    }
}

function preloadWorkMedia(mediaList) {
    mediaList.forEach((item) => {
        if (item.type === "video") return;
        const img = new Image();
        img.src = item.src;
    });
}

// CLOSE SECOND MODAL (CROSS)
document.querySelector(".work-modal-close").addEventListener("click", () => {
    const modal = document.getElementById("work-modal");
    modal.style.display = "none";
    syncModalLock();
});

// CLOSE SECOND MODAL WHEN CLICKING OUTSIDE CONTENT
document.getElementById("work-modal").addEventListener("click", (e) => {
    const box = document.querySelector(".work-modal-content");
    if (!box.contains(e.target)) {
        document.getElementById("work-modal").style.display = "none";
        syncModalLock();
    }
});



/* -------------------------------------------
   SECOND MODAL CAROUSEL
------------------------------------------- */

document.querySelector(".left-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
    renderMedia(currentMedia[currentIndex]);
});

document.querySelector(".right-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentMedia.length;
    renderMedia(currentMedia[currentIndex]);
});

/* -------------------------------------------
   OPEN FULLSCREEN MODAL (THIRD MODAL)
------------------------------------------- */

document.addEventListener("click", (e) => {
    if (!e.target.closest(".work-modal-image, .gallery-fullscreen-badge")) return;
    if (e.target.closest(".carousel-arrow")) return;

    const fullModal = document.getElementById("image-modal");
    if (!currentMedia || !currentMedia[currentIndex]) return;

    renderFullscreenMedia(currentMedia[currentIndex]);

    document.body.classList.add("modal-open");
    fullModal.style.display = "flex";
});

/* -------------------------------------------
   RENDER FULLSCREEN MEDIA
------------------------------------------- */

function renderFullscreenMedia(item) {
    const container = document.querySelector(".image-modal-content");
    const oldMedia = container.querySelector(".image-modal-img, video");

    if (oldMedia) oldMedia.remove();

    let element;

    if (item.type === "video") {
        element = document.createElement("video");
        element.src = item.src;
        element.controls = true;
        element.autoplay = true;
        element.classList.add("image-modal-img");
    } else {
        element = document.createElement("img");
        element.src = item.src;
        element.classList.add("image-modal-img");
    }

    container.insertBefore(element, container.querySelector(".right-image-arrow"));
}

/* -------------------------------------------
   FULLSCREEN CAROUSEL
------------------------------------------- */

document.querySelector(".left-image-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
    renderFullscreenMedia(currentMedia[currentIndex]);
});

document.querySelector(".right-image-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentMedia.length;
    renderFullscreenMedia(currentMedia[currentIndex]);
});

/* -------------------------------------------
   CLOSE FULLSCREEN MODAL
------------------------------------------- */

document.querySelector(".image-modal-close").addEventListener("click", () => {
    document.getElementById("image-modal").style.display = "none";
    syncModalLock();
});

document.getElementById("image-modal").addEventListener("click", (e) => {
    // If clicking the carousel navigation arrows, do not close
    if (e.target.closest(".image-arrow")) return;

    // If clicking anywhere outside the actual displayed image/video OR clicking the close button -> close
    if (!e.target.closest(".image-modal-img, video") || e.target.closest(".image-modal-close")) {
        document.getElementById("image-modal").style.display = "none";
        syncModalLock();
    }
});

// Escape key to dismiss modals
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const imageModal = document.getElementById("image-modal");
        if (imageModal && imageModal.style.display === "flex") {
            imageModal.style.display = "none";
            syncModalLock();
            return;
        }

        const workModal = document.getElementById("work-modal");
        if (workModal && workModal.style.display === "flex") {
            workModal.style.display = "none";
            syncModalLock();
            return;
        }

        const projectModal = document.getElementById("project-modal");
        if (projectModal && projectModal.style.display === "flex") {
            projectModal.style.display = "none";
            syncModalLock();
        }
    }
});



/* -------------------------------------------
   CONTACT ROW ACTIONS (COPY / OPEN)
------------------------------------------- */
document.querySelectorAll(".contact-row").forEach((row) => {
    row.addEventListener("click", async () => {
        const type = row.dataset.type;
        const value = row.dataset.value;
        if (!type || !value) return;

        if (type === "copy") {
            try {
                await navigator.clipboard.writeText(value);
                row.classList.add("copied");
                setTimeout(() => row.classList.remove("copied"), 1100);
            } catch (_err) {
                // Fallback for environments where clipboard API is blocked.
                const temp = document.createElement("textarea");
                temp.value = value;
                document.body.appendChild(temp);
                temp.select();
                document.execCommand("copy");
                document.body.removeChild(temp);

                row.classList.add("copied");
                setTimeout(() => row.classList.remove("copied"), 1100);
            }
            return;
        }

        if (type === "open") {
            window.open(value, "_blank", "noopener,noreferrer");
        }
    });
});