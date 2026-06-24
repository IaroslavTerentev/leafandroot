document.addEventListener("DOMContentLoaded", function () {
    loadTestimonialsFromDatabase();
    loadCommentsFromDatabase();
    setupCommentForm();
    setupEmojiSelection();
});

function setupCommentForm() {
    const commentForm = document.getElementById("comment-form");
    const message = document.getElementById("comment-message");

    if (!commentForm) {
        return;
    }

    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const submitButton = commentForm.querySelector(".btn-submit");

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        const customerName = document.getElementById("comment-name").value;
        const customerQuery = document.getElementById("comment-query").value;
        const customerExperience = document.getElementById("comment-experience").value;

        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customer_name: customerName,
                customer_query: customerQuery,
                message: customerExperience
            })
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not save comment to database");
            }

            return response.json();
        })
        .then(function () {
            message.textContent = "Your comment was submitted successfully.";
            message.style.color = "green";

            commentForm.reset();

            loadCommentsFromDatabase();
        })
        .catch(function (err) {
            console.log(err);

            message.textContent = "Error submitting comment. Make sure Node server and MySQL are running.";
            message.style.color = "darkred";
        })
        .finally(function () {
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
        });
    });
}

function setupEmojiSelection() {
    const emojiButtons = document.querySelectorAll(".emoji-btn");

    emojiButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            emojiButtons.forEach(function (btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");
        });
    });
}

function getAvatarForTestimonial(index) {
    const images = [
        "Images/2.png",
        "Images/3.png",
        "Images/4.png"
    ];

    return images[index % images.length];
}

function createTestimonialRow(testimonial, index) {
    const row = document.createElement("div");
    row.className = "testimonial-row";

    const ratingText = testimonial.rating !== null && testimonial.rating !== undefined
        ? `Rating: ${testimonial.rating}/5`
        : "";

    row.innerHTML = `
        <div class="client-name">
            ${testimonial.customer_name}
        </div>

        <div class="client-quote">
            “${testimonial.testimonial}”
            <br>
            <small>${ratingText}</small>
        </div>

        <img src="${getAvatarForTestimonial(index)}" alt="${testimonial.customer_name}" class="client-avatar">
    `;

    return row;
}

function loadTestimonialsFromDatabase() {
    const loading = document.getElementById("testimonials-loading");
    const error = document.getElementById("testimonials-error");
    const container = document.getElementById("testimonials-container");

    fetch("/testimonials")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load testimonials from database");
            }

            return response.json();
        })
        .then(function (testimonials) {
            loading.style.display = "none";
            container.innerHTML = "";

            if (testimonials.length === 0) {
                error.style.display = "block";
                error.textContent = "No testimonials found in the database.";
                return;
            }

            testimonials.forEach(function (testimonial, index) {
                const row = createTestimonialRow(testimonial, index);
                container.appendChild(row);
            });
        })
        .catch(function (err) {
            console.log(err);

            loading.style.display = "none";
            error.style.display = "block";
            error.textContent = "Error loading testimonials. Make sure Node server and MySQL are running.";
        });
}

function createCommentRow(comment) {
    const row = document.createElement("div");
    row.className = "comment-row";

    row.innerHTML = `
        <div class="client-name">
            ${comment.customer_name}
        </div>

        <div class="client-quote">
            “${comment.message}”
            <p class="comment-query">
                Query: ${comment.customer_query}
            </p>
        </div>
    `;

    return row;
}

function loadCommentsFromDatabase() {
    const loading = document.getElementById("comments-loading");
    const error = document.getElementById("comments-error");
    const container = document.getElementById("comments-container");

    fetch("/comments")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load comments from database");
            }

            return response.json();
        })
        .then(function (comments) {
            loading.style.display = "none";
            container.innerHTML = "";

            if (comments.length === 0) {
                error.style.display = "block";
                error.textContent = "No comments yet.";
                return;
            }

            error.style.display = "none";

            comments.forEach(function (comment) {
                const row = createCommentRow(comment);
                container.appendChild(row);
            });
        })
        .catch(function (err) {
            console.log(err);

            loading.style.display = "none";
            error.style.display = "block";
            error.textContent = "Error loading comments. Make sure Node server and MySQL are running.";
        });
}