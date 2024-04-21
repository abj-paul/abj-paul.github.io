#!/bin/bash

# List of directories
directories=("Computer-Vision" "Formal-Method" "Machine-Learning" "Web3")

# Content for each Markdown file
content="---
title: Introduction to $dir
date: $(date +%Y-%m-%d)
author: Your Name
tags: [tutorial, $dir]
---

# Introduction

This is a brief introduction to $dir.

## Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere pharetra semper. 

## Section 2

Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.

## Conclusion

In conclusion, $dir is a fascinating topic with many applications.
"

# Iterate over each directory
for dir in "${directories[@]}"; do
    # Create directory if it doesn't exist
    if [ ! -d "$dir" ]; then
        mkdir "$dir"
    fi
    
    # Create Markdown file with real content
    echo -e "$content" > "$dir"/example.md

    echo "Created example.md in $dir"
done

echo "Script execution completed."
