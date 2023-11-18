import "../public/style.css";

const form = document.getElementById("form") as HTMLFormElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const avatarContainer = document.getElementById("avatar-container") as HTMLDivElement;
const avatarImg = document.getElementById("avatar") as HTMLImageElement;
const followersDiv = document.getElementById("followers") as HTMLDivElement;
const reposDiv = document.getElementById("repos") as HTMLDivElement;
const reposList = document.getElementById("repos-list") as HTMLUListElement;
const followingDiv = document.getElementById("following") as HTMLDivElement;
const ff = document.querySelector(".ff") as HTMLDivElement;
const nameDiv = document.getElementById("name") as HTMLDivElement;

function getUser(username: string) {
	fetch(`https://api.github.com/users/${username}`)
		.then((res) => res.json())
		.then((user) => {
			const avatarUrl: string = user.avatar_url;
			const followers: number = user.followers;
			const following: number = user.following;
			const name: string = user.name;

			avatarImg.src = avatarUrl;

			nameDiv.textContent = `Name: ${name}`;
			followersDiv.textContent = `Followers: ${followers}`;
			followingDiv.textContent = `Following: ${following}`;
		})
		.catch((error) => {
			console.log("An error occurred while fetching user data:", error);
		});
}

function getRepos(username: string) {
	fetch(`https://api.github.com/users/${username}/repos`)
		.then((res) => res.json())
		.then((repos) => {
			const reposCount: number = repos.length;
			// reposDiv.textContent = `Repositories: ${reposCount}`;
			console.log(reposCount);
			reposList.innerHTML = "";

			repos.forEach((repo: any) => {
				const repoName: string = repo.name;
				const repoUrl: string = repo.html_url;

				const li = document.createElement("li");
				const a = document.createElement("a");
				a.href = repoUrl;
				a.textContent = repoName;
				li.appendChild(a);
				reposList.appendChild(li);
			});
		});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const username: string = searchInput.value;
	getUser(username);
	getRepos(username);
});
