#!/bin/bash

# Iterate over all .org files in the current directory
for org_file in *.org; do
  # Get the base filename without the extension
  base_filename=$(basename "$org_file" .org)
  
  # Convert the .org file to .html using pandoc
  pandoc -s "$org_file" -o "$base_filename.html"
  
  # Add the required <link> tags at the beginning of the <head> section
  sed -i '/<head>/a <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">\n<link rel="stylesheet" href="blogs.css">' "$base_filename.html"
  
  # Replace <body> with <body class="markdown-container">
  sed -i 's|<body>|<body class="markdown-container">|' "$base_filename.html"
  
  # Replace instances of ~/abj-paul.github.io with ..
  sed -i 's|~/abj-paul.github.io|..|g' "$base_filename.html"
done

echo "Conversion complete!"

