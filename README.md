> This project is made as a final project for the online course "CS50 Web Programming with Python and JS"

# Table-of-contents
- [How to run](#how-to-run)
- [Distinctiveness and Complexity](#distinctiveness-and-complexity)
- [Whats there in each file](#whats-there-in-each-file)
- [Extra notes](#extra-notes)

# Civil_Click <img height="30" src="./civil_web/static/civil/images/icon.svg">

---

## How to run
Please run the following commands to run the project:
- Please make sure you have Python 3.8 or higher installed in your system.
- Also ensure you are running whithin a virtual environment (`venv` etc.).
- `pip install -r requirements.txt` to install the required packages
- `python manage.py collectstatic` to collect static files
- `python manage.py makemigrations` to create migrations for the models
- `python manage.py migrate` to apply the migrations
- Finally `python manage.py runserver` to start the server

Now you can access the project at the url: http://127.0.0.1:8000/ or http://localhost:8000/

Once you open the url, you can see the project's home page. Here you can click on register to register a new user, login to login to your account, or click on the Play button to start playing the game.

#### How to play:

The game is played by clicking on the basic activity buttons to obtain resources.

And once you collect enough meat and berries (10 meat and 10 berries for one nitwit) it will enable the `+1` button for the nitwit.

Nitwits eat food (intake is shown beside the rates for production) so you must quickly turn it into either a hunter or a forager (hunters and foragers do not consume food) they will also start automatically producing food for you (which can then be automatically consumed by other types of workers and nitwits).

You can also convert nitwits to lumberjacks and miners to get stone and wood.

All actions also produce some rare resources (hide, comphrey, ore, etc).

You can then click on manage factories to setup factories with workers in them to convert the basic resources into more advanced resources.

Once you have maximum resources you can click on the ascend button to increase your level but this comes at the cost of losing all your resources and workers.

## Distinctiveness and Complexity

#### Project Distinctiveness
This project distinguishes itself from traditional social networks and e-commerce sites by focusing on a unique gaming experience. It contains a unique style of passive gaming. Unlike other projects in this course, this game incorporates various interactive features such as levels, and resource management.

#### Project Complexity
The project is moderately complex. It has a simple user interface, but the game logic is complex. It is also sufficiently complex as it contains other parts of the project such as those for user registration and login and also the the backend logic to dynamically save the game state. It also contains a unique concept of factories and ascention levels making it distinctively complex.

#### Justification of its acceptance
- This project is not similar to any other projects done in this course and neither is it an e-commerce project.
- It also contains 2 django models for users and game states and it also contains various views apart from the login and registration pages.
- It is also actively mobile responsive with the login and other pages accessable in both potrait and landscape mode, while the game page does require landscape mode for playing but this is due to the nature of the game.
- I have used seperate css files over 60 lines for the mobile and desktop page diffrences while a central css file for the game page over 240 lines along with numerous other css files for stuff like animations, tooltips, fonts, etc.

## Whats there in each file
Whithin the `civil_web` application, there are the following main files and directories:
- `urls.py` (This is where the url route for the game are defined.)
- `models.py` (This is where the models for the game are defined.)
- `views.py` (This is where the logic for authentication and api's for the game are implemented.)
- `templates/civil/` (Django templates use for the ui.)
- `static/civil/css/` (Stylesheets and fonts that I use in this project.)
- `static/civil/js/` (JavaScript files that I use to make the game interactive.)
- `static/civil/images/` (Images used in the game and the icons of the project.)

The files `settings.py` and `urls.py` whithin the `civil_click` directory are also edited to reflect the urls and settings for the game.
- The `settings.py` file contains the settings to activate the `civil_web` application and set the directory for serving static files.
- While the `urls.py` file contains the urls for the favicon and forwards other urls from the `civil_web` application.

## A more detailed explanation of each file:
#### `urls.py`
In this file I define the urls for the game. The urls are defined as follows:
- `index` (This is the homepage for the project.)
- `login` (This is the url for the login page.)
- `register` (This is the url for the register page.)
- `logout` (This is the url for the logout page.)
- `game` (This is the url for the game page.)
- `save-api` (This is used for saving the game state using xhr requests.)
- `get-api` (This is used for loading the game state when the user opens the game page.)
- `del-api` (This is used to delete/reset the game for the player.)

#### `models.py`
In this file I define the models for the game. The models are defined as follows:
- `User` (This is the model for the users.)
    - It is inherited from `AbstractUser` and contains the same default fields.
- `Game` (This is the model for the game.)
    - It has a foreign key to the user model named `player`.
    - It has a field named `factories` which is a JSON field that stores the factories of the player and its default value is created using a function defined in the same file named `def_factories`.
    - It has a field named `jobs` which is also a JSON field that stores the information about workers created in the game by the user and its default value is created using a function named `def_jobs`.
    - It has a field named `resource` which is a JSON field that stores the information about the resources harvested by the user and its default value is created using a function named `def_resource`.
    - It has a field named `ascention` which is the number of times the player has ascended (gained stars). (Integer value)
    - It has a field named `food_intake` which is the amount of food the player consumes each second in the game (Floating point value).
    - It also contains a custom funtion for the `delete` method as instead of just deleting it will create a new game and assigns it to the player (Used for resetting the game state)

#### `views.py`
This file contains most of the backend logic:
These are the defined views in it:
- `index` (This is the view for the index page.)
- `login` (This is the view for the login page.)
- `register` (This is the view for the register page.)
- `logout` (This is the view used to logout the user.)
- `game` (This is the view for the game page.)
- `save_api` (This is the view for the save api.)
- `get_api` (This is the view for the get api.)
- `del_api` (This is the view for the delete api.)

It also contains forms for the login and register pages (inherited from `forms.FORM`), namely:
- `LoginForm` (This is the form for the login page.)
- `RegisterForm` (This is the form for the register page.)

### `templates/civil/`
This is where the templates for the game are stored. The templates are defined as follows:
- `logout.html` (This is the template for the logout page used to define the headers etc.)
- `index.html` (This is the template for the index page.)
- `game.html` (This is the template for the game page.)
- `form_snippet.html` (This is a snippet of the template used to display the forms for the login and register pages.)
- `login.html` (This is the template for the login page.)
- `register.html` (This is the template for the register page.)

#### `static/civil/css/`
This folder contains the stylesheets and fonts used in the project.

The stylesheets are defined as folows:
- `master.css` (This file is used to import all the other css files for ease of use.)
- `main.css` (This is the main stylesheet for the project.)
- `/custom/game.css` (This is the primary stylesheet for the game page.)
- `font.css` (This is the stylesheet for defining fonts used in the project.)
- `root.css` (It is used to define basic color themes in the project.)
- `desktop.css` (This is the stylesheet for the desktop specific tweaks for the game page.)
- `mobile.css` (This is the stylesheet for the mobile specific tweaks for the game page.)
- `animations.css` (This is the stylesheet for defining animations used in the project.)
- `tooltip.css` (It contains the code for showing the helpful tooltips in the dektop version of the game.)

It also contains the `/fonts/` folder which contains the fonts used in the project. (`Hermut Nerd` and `Ubuntu`)

#### `static/civil/images/`
This folder contains the images used in the project.
These are as follows:
- `icon.svg` (This is the logo of the game in vector format.)
- `favicon.ico` (This is the logo of the game to be used by browser tabs.)
- `arrow.png` (This is the arrow used to show the factory flow.)
- `delete.png` (This is the icon used for deleting factories in the game.)
- `meat.svg` (This is the meat icon used in the game.)
- `hide.png` (This is the icon used for hide in the game.)
- `iron.png` (This is the icon used for iron in the game.)
- `gold.svg` (This is the icon used for gold in the game.)
- `leather.svg` (This is the icon used for leather in the game.)
- `ore.svg` (This is the icon used for ore in the game.)
- `piety.png` (This is the icon used for piety in the game.)
- `stone.svg` (This is the icon used for stone in the game.)

#### `static/civil/js/`
This folder contains `game.js` file which is the main JavaScript file for the game. It contains about a 1000 lines of code.
The key points from from this file (`game.js`) are:
- The first few lines defines some functions used throughout the file to make it more concise.
- The next 230 lines are used to define the game's initial state and some universal variables.
- The lines approximately between 240 and 525 are used to define the functions for maintaining the workers and different professions within the game and it contains funtions for killing workers and creating new ones.
- The lines about 520 and 700 are used to define the functions for registering a new factory in the game.
- The lines in the range of about 700 and 825 are used to setup `onclick` functions on the various buttons to make the game interactive.
- The lines about 820 and 970 are used to define the function `render` for rendering the game state to the webpage.
- The lines approximately between 960 and 1000 are used to define the function `refresh` for refreshing the game state after pulling it from the server. It takes the server response as an argument and updates the game state accordingly.
- The next 16 lines are used to define the `get_data` function which is used to get the game state from the server.
- The next 14 lines are used to define the `save_data` function which is used to send the game state to the server.
- These function are then invoked or set up to be invoked at regular intervals to keep the game state up to date.
- Then the 10 lined function `del_data` is defined which is used to delete and reset the game state.
- Finally an interval is setup to run the `render` function every second to keep the game state rendered up to date.

## Extra notes
This project is responsive on mobile phones with atleast 600 pixel width in landscape mode and will alert the user if they use it in portait mode or on a smaller screen.

