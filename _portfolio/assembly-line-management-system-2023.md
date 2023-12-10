---
title: "Assembly Line Management System"
excerpt: "LIVE congestion detection and layout balancing along with complex user interaction in a real world garments industry - Versatile Garments Ltd. <br/><img src='/images/rmg.jpg'>"
collection: projects
---

## About
In this project, we did requirements collection from the Versatile Garments Ltd. We also collected real world garments data from there for our experimentations. We tried sevaral NMF approaches and finally used our hand-crafted NMF model to achieve better accuracy. Additionally, due to the sheer size of the project, we identified a lot of bad architectural decisions later on which helped us understand how to take better architectural decisions when developing.

A core challenge of the system was Live congestion detection. As we know, any live system has harsh performance requirements. So architectural decisions and model complexity became very crucial factors for us to make the system "more LIVE".

## Features
The Assembly Line Management System has the following core features.
- Automatic Congestion Detection
- Automated Assembly Line Layout Generation from product design
- Automated Line Balancing
- Automated Report Generation
- Complex User Interaction in Organizational Hierarchy

## Metrics
- Lines of Code : 8920 (3507+5413)
- Number of API Requests : 61
- Angular Components : 43
- Backend Components : 41

## Techstacks
- NodeJS + MySQL for backend
- NMF + FastAPI for Machine Learning Model
- Angular for Frontend


[Github Link](https://github.com/abj-paul/Assembly-Line-Management-System)
[Experimentations on Congestion Recognition](https://github.com/abj-paul/Nonnegative-Matrix-Factorization-Experimentation)

