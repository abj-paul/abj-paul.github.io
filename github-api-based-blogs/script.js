document.addEventListener("DOMContentLoaded", function() {
    // GitHub repository information
    var owner = 'abj-paul';
    var repo = 'abj-paul.github.io';

    // Fetch and display articles for each folder
    var folders = ['Computer-Vision', 'Formal-Method', 'Machine-Learning', 'Web3'];
    folders.forEach(folder => {
        fetchArticles(owner, repo, folder);
    });
});

function fetchArticles(owner, repo, folder) {
    fetch('https://api.github.com/repos/' + owner + '/' + repo + '/contents/projects/' + folder)
        .then(response => response.json())
        .then(data => {
	    console.log(data)
            var tab = document.createElement('button');
            tab.textContent = folder;
            tab.addEventListener('click', function() {
                showArticles(data, owner, repo, folder);
            });
            document.getElementById('tabs').appendChild(tab);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showArticles(articles, owner, repo, folder) {
    var contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    articles.forEach(article => {
        if (article.type === 'file' && article.name.endsWith('.md')) {
            var postTitle = document.createElement('h3');
            postTitle.textContent = article.name.replace('.md', '');
            postTitle.classList.add('post-title');
            postTitle.addEventListener('click', function() {
                fetchArticleContent(article.download_url);
            });
            contentDiv.appendChild(postTitle);
        }
    });
}

function fetchArticleContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(markdown => {
            var converter = new showdown.Converter({ 
                simplifiedAutoLink: true,
                tables: true,
                tasklists: true,
                simpleLineBreaks: true,
                openLinksInNewWindow: true,
                flavor: 'github' // Set the flavor to GitHub-flavored Markdown
            });
            var htmlContent = converter.makeHtml(markdown);
            
            var articleDiv = document.createElement('div');
            articleDiv.innerHTML = htmlContent;

            // Clear contentDiv and append the article content
            var contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '';
            contentDiv.appendChild(articleDiv);
        });
}
