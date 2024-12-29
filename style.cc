/* General Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    background-color: #f4f4f4;
    color: #333;
}

header {
    background: #333;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin: 0 10px;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
}

/* Section Styles */
section {
    padding: 20px;
    margin: 20px auto;
    max-width: 800px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

section#home {
    text-align: center;
    background: #0078d7;
    color: #fff;
    padding: 50px 20px;
}

section#home h1 {
    margin: 0;
    font-size: 2.5em;
}

section#home p {
    font-size: 1.2em;
}

/* Projects */
section#projects ul {
    list-style: none;
    padding: 0;
}

section#projects ul li {
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f9f9f9;
}

section#projects ul li h3 {
    margin: 0 0 10px;
}

section#projects ul li a {
    color: #0078d7;
    text-decoration: none;
}

/* Contact Form */
form {
    display: flex;
    flex-direction: column;
}

form label {
    margin: 10px 0 5px;
}

form input, form textarea, form button {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
}

form button {
    background: #0078d7;
    color: #fff;
    border: none;
    cursor: pointer;
}

form button:hover {
    background: #005bb5;
}

/* Footer */
footer {
    text-align: center;
    padding: 10px 0;
    background: #333;
    color: #fff;
    margin-top: 20px;
}
