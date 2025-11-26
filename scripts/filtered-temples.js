// FOOTER INFO
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
});

// TEMPLE DATA
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Abidjan Ivory coast",
    location: "Abidjan Ivory Coast",
    dedicated: "8 November 2018",
    area: 17362,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/abidjan-ivory-coast-temple/abidjan-ivory-coast-temple-58993-main.jpg"
    },
  {
    templeName: "Benin city Nigeria",
    location: "Benin city Nigeria",
    dedicated: "24 May 2025",
    area: 30700,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/benin-city-nigeria-temple/benin-city-nigeria-temple-58575-main.jpg"    
  },
  
];

// RENDER FUNCTION
function displayTemples(list) {
  const container = document.getElementById("templeContainer");
  container.innerHTML = "";

  list.forEach(t => {
    const card = document.createElement("figure");

    card.innerHTML = `
      <img src="${t.imageUrl}" loading="lazy" alt="${t.templeName}">
      <figcaption>
        <strong>${t.templeName}</strong><br>
        Location: ${t.location}<br>
        Dedicated: ${t.dedicated}<br>
        Area: ${t.area.toLocaleString()} sq ft
      </figcaption>
    `;

    container.appendChild(card);
  });
}

// INITIAL DISPLAY
displayTemples(temples);

// FILTERING
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const filter = link.dataset.filter;
    const title = document.getElementById("pageTitle");

    if (filter === "home") {
      displayTemples(temples);
      title.textContent = "Home";
    }
    if (filter === "old") {
      displayTemples(
        temples.filter(t => parseInt(t.dedicated) < 1900)
      );
      title.textContent = "Old Temples";
    }
    if (filter === "new") {
      displayTemples(
        temples.filter(t => parseInt(t.dedicated) > 2000)
      );
      title.textContent = "New Temples";
    }
    if (filter === "large") {
      displayTemples(
        temples.filter(t => t.area > 90000)
      );
      title.textContent = "Large Temples";
    }
    if (filter === "small") {
      displayTemples(
        temples.filter(t => t.area < 10000)
      );
      title.textContent = "Small Temples";
    }
  });
});
