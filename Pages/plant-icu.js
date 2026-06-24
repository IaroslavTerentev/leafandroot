document.addEventListener("DOMContentLoaded", function () {
    loadServicesFromDatabase();
});

function makeTitleWithBreaks(title) {
    return title.replaceAll(" ", "<br>");
}

function getImageForService(index) {
    const images = [
        "Images/lawn-mower.png",
        "Images/lawn.png",
        "Images/tending.png",
        "Images/flower pot.png"
    ];

    return images[index % images.length];
}

function createLargeServiceCard(service, index) {
    const card = document.createElement("div");
    card.className = "service-card-large";

    const priceText = service.price !== null && service.price !== undefined
        ? `AED ${service.price}`
        : "Price available on request";

    card.innerHTML = `
        <div class="large-card-title">
            ${makeTitleWithBreaks(service.service_name)}
        </div>

        <img src="${getImageForService(index)}" alt="${service.service_name}">

        <div class="large-card-content">
            <p>${service.s_description}</p>
            <p class="service-price">${priceText}</p>

            <button class="get-now-button" onclick="window.location.href='index.html#slidetoform'">
                Get now
                <img src="Images/Black arrow.png" class="arrow" alt="Arrow">
            </button>
        </div>
    `;

    return card;
}

function createSmallServiceCard(service, index) {
    const card = document.createElement("div");
    card.className = "service-card-small";

    const priceText = service.price !== null && service.price !== undefined
        ? `AED ${service.price}`
        : "Price on request";

    card.innerHTML = `
        <div class="small-card-title">
            ${makeTitleWithBreaks(service.service_name)}
        </div>

        <img src="${getImageForService(index)}" alt="${service.service_name}">

        <p>${service.s_description}</p>
        <div class="small-price">${priceText}</div>

        <button class="small-get-now-button" onclick="window.location.href='index.html#slidetoform'">
            Get now
            <img src="Images/Black arrow.png" class="arrow" alt="Arrow">
        </button>
    `;

    return card;
}

function loadServicesFromDatabase() {
    const loading = document.getElementById("services-loading");
    const error = document.getElementById("services-error");
    const basicContainer = document.getElementById("basic-services-container");
    const healthContainer = document.getElementById("health-services-grid");

    fetch("/services")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load services from database");
            }
            return response.json();
        })
        .then(function (services) {
            loading.style.display = "none";

            basicContainer.innerHTML = "";
            healthContainer.innerHTML = "";

            if (services.length === 0) {
                error.style.display = "block";
                error.textContent = "No services found in the database.";
                return;
            }

            const basicServices = services.slice(0, 2);
            const healthServices = services.slice(2);

            basicServices.forEach(function (service, index) {
                basicContainer.appendChild(createLargeServiceCard(service, index));
            });

            const sideText = document.createElement("div");
            sideText.className = "services-text";
            sideText.innerHTML = `
                <p>
                    <strong>Basic services</strong> will help you get familiar
                    with your new green family member
                </p>

                <br><br>

                <p>
                    <strong>Plant health services</strong> are for cases when your green friend
                    does not feel well
                </p>
            `;
            basicContainer.appendChild(sideText);

            healthServices.forEach(function (service, index) {
                healthContainer.appendChild(createSmallServiceCard(service, index + 2));
            });
        })
        .catch(function (err) {
            loading.style.display = "none";
            error.style.display = "block";
            error.textContent = "Error loading services. Make sure Node server and MySQL are running.";
            console.log(err);
        });
}