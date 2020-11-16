$(document).ready(function () {
    $('#getbtn').on('click', function () {
        let username = $('#searchUser').val();

        // Make request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'a9f91e0232f2da786334',
                client_secret: 'cde522888b07055b93c15a635df297d5fcddc84b'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'a9f91e0232f2da786334',
                    client_secret: 'cde522888b07055b93c15a635df297d5fcddc84b',
                    sort: 'created: desc',
                    per_page: 6
                }
            }).done(function(repos) {
                $.each(repos, function(index, repo) {
                    $('#repos').append(`
                        <div class="card card-body bg-light">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <h5 class="badges"><span class="badge badge-info">Forks: ${repo.forks_count}</span></h5>
                                    <h5 class="badges"><span class="badge badge-success">Stars: ${repo.stargazers_count}</span></h5>
                                    <h5 class="badges"><span class="badge badge-dark">${repo.language}</span></h5>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-warning">Open Repo</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            $('#profile').html(`
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">${user.name}</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="thumbnail avatar" src="${user.avatar_url}">
                                <a target="_blank" class="btn btn-primary btn-block viewbtn" href="${user.html_url}">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <h3 class="badges"><span class="badge badge-primary">Public Repos: ${user.public_repos}</span></h3>
                                <h3 class="badges"><span class="badge badge-dark">Public Gists: ${user.public_gists}</span></h3>
                                <h3 class="badges"><span class="badge badge-success">Followers: ${user.followers}</span></h3>
                                <h3 class="badges"><span class="badge badge-info">Following: ${user.following}</span></h3>
                                <br><br>
                                <ul class="list-group">
                                    <li class="list-group-item">Bio: ${user.bio}</li>
                                    <li class="list-group-item">Company: ${user.company}</li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Member Since: ${user.created_at.split('T')[0]}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <br><br>
                <h3 class="page-header">Latest Repos</h3>
                <br>
                <div id="repos"></div>
                <br>
            `);
        });
    });
});