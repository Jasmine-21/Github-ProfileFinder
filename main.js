let msg;

window.onload = () => {
    document.querySelector(".search").addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(".profile").style.display = "none";
        msg = document.querySelector("#msg");
        msg.innerText = "Loading your profile...";
        msg.style.display = "block";

        const userId = document.querySelector(".userId").value.replace(/\s/g, '').toLowerCase();

        const url = `https://api.github.com/users/${userId}`;
        fetch(url).then(data => {
            if(data.status == 200)
                return data.json();
            else
                throw new Error(`${data.status} - ${data.statusText}`);
        }).then(user => makeUI(user))
        .catch(err => {
            msg.innerText = Error(err.message);
            msg.style.display = "block";
        });
    });
};

function makeUI(user) {
    msg.style.display = "none";

    document.querySelector("#avatar").src = user.avatar_url;
    document.querySelector("#name").innerText = user.name;
    document.querySelector("#network").innerHTML = `<b>Followers:</b> ${user.followers} <b>| Following:</b> ${user.following}`;

    let details = document.querySelectorAll(".detail");
    // username
    details[0].innerHTML = `<i class="far fa-user"></i> <b>Username:</b> <i>${user.login}</i>`;
    // location
    details[1].innerHTML = `<i class="fas fa-map-marker-alt"></i> <b>Location:</b> <i>${user.location || "N/A"}</i>`;
    // bio
    details[2].innerHTML = `<i class="fas fa-info-circle"></i> <b>Bio:</b> <i>${user.bio || "N/A"}</i>`;

    // changing href of link to the github profile of the user
    document.querySelector(".linkToProfile").href = user.html_url;

    document.querySelector(".profile").style.display = "block";
}