# Doom 64 Compendium
![Doom 64 Compendium Graphic](d64c.png)
Doom 64 Compendium is a project to document the Doom 64 engine, its forks, and how to modify it. This focuses on the engines based on Doom 64 code and support the Doom 64 mapping format. Adaptations to other engines are not the focus, although they can be referenced to with external links. The Doom 64 Compendium currently resides on https://www.doom64.com/

## Contribution Guide
This resource is hosted on github to make it easier for others to contribute, duplicate, and download this resource. Contributions can be made by editing the web page source and submitting a "Pull Request" or creating an issue in the "Issues" tab. Contributions can also be submitted on the compendium channel on the Doom 64 Discord (https://discord.gg/Ktxz8nz). When adding a pull request, you may add your name to the "Contributors" page, where the names of contributors are listed in alphabetical order.

## Structure Guide
The website itself should be based on HTML, CSS, and JavaScript without any server-side scripting so it can be rehosted on other servers easily and remain readable when downloaded on computers without servers. With the exception for graphics, CSS styling should be reserved for the external CSS style sheet (style.css) so that the HTML formatting can be cleaner and easier to modify.

Every HTML page should be linked to in the directory of the main page. This allows each page to be quickly accessible.

## Graphics Guide
The Doom 64 Compendium should be lightweight in terms of memory so it can be rapidly accessible. It is recommended that, when effective, graphics are made in the SVG vector format. This format has low memory impact and scalability. For raster graphics, the paletted PNG format is recommended. To achieve this, pngquant (https://pngquant.org/) is the optimal program for paletting and file size reduction. Formats that are lossy in the spatial dimension, such as JPGs, are not recommended as they reduce clarity. Naturally graphics from games in the 90's are low resolution when shown on modern screens, thus when resizing raster graphics using HTML it is recommended to use the "image-rendering: pixelated" CSS property. Exceptions can be made for displaying images which look better when smooth, such as clouds and water, where the "image-rendering: smooth" CSS property can be used.
