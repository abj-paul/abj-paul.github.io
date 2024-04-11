function parse_default_md() {
    var markdownContent = '# Hello, Markdown!\n\nThis is a paragraph of text.\n\n## Subheading\n\n- [x] Task 1\n- [ ] Task 2\n- [ ] Task 3';

    var converter = new showdown.Converter({ 
        simplifiedAutoLink: true,
        tables: true,
        tasklists: true,
        simpleLineBreaks: true,
        openLinksInNewWindow: true,
    });

    var htmlContent = converter.makeHtml(markdownContent);

    document.getElementById('markdown-content').innerHTML = htmlContent;
}

parse_default_md(); // Call the function immediately after defining it
