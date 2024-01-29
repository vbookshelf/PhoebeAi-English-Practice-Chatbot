# PhoebeAi English Practice Chatbot
Learn English by chatting with Phoebe. Improve your conversation skills.<br>
You can talk to Phoebe as if she was a real person. If you don't understand something she says, tell her and she will explain further.<br>


Live Web App:
https://phoebeai.woza.work/

PhoebeAi is a non-profit social impact project. I've assigned a monthly OpenAi API budget to the live web app. Please note that the app will stop working when this budget is used up. Therefore, it may be better to download the code from this repo and use your own OpenAi API Key. The Javascript version of this web app can be run from the desktop.

<br>
<img src="https://github.com/vbookshelf/PhoebeAi-English-Practice-Chatbot/blob/main/PhoebeAi-Php/assets/phoebe12.png" width="250"></img>
<i>Phoebe Ai</i><br>

<br>
<img src="https://github.com/vbookshelf/PhoebeAi-English-Practice-Chatbot/blob/main/images/example-chat.png" width="500"></img>
<i>Example chat with a Thai user</i><br>

<br>

## Features

- The chatbot has a quirky and fun personality that's based on Phoebe from Friends.
- The user's grammar and spelling are continuously checked and corrected.
- Phoebe's responses are translated into the user's first language.
- The chatbot is a customized version of ChatGPT.
- Simple, mobile optimized chat interface.

## What problem does this solve?

English is the language of international business, science and technology. Many people across the world want to learn english.

One of the best ways to learn a new language is to use it. The challenge many face is that they don't have english speaking friends to practice with or they are too shy to start an english conversation.

PhoebeAi is a patient english speaking friend who's available to text chat 24/7. The chatbot is a customized version of ChatGPT. Therefore, it has the ability to emulate a pre defined personality. It can also simulate a real conversation. 

## How to run this app

This repo contains two versions of the web app - a Php version and a Javascript version. The JS version works slightly differently from the Php version because the system messages are different. The system messages control the chatbot's personality and behaviour. Also, the temperature in the JS version is set higher than the temperature in the Php version (temperature = 0.5).

The Php version must be uploaded to a web server. The Javascript version can be run from your desktop. In the Php version the user will not be able to see your API key because Php code runs on the server, therefore it's more secure. It's also possible to run the JS version on a web server, but it's not secure. Your API key will be visible to the user. It's not possible to secure an API key in Javascript.

### 1. PHP Version
- Download the PhoebeAi-Php folder.
- Add your OpenAi API Key in the following file: chatgpt-api-code.php
- Upload all the files to your web server as you would when hosting a website.

### 2. Javascript Version
- Download the PhoebeAi-JS folder and place it on your desktop.
- Add your OpenAi API Key in the following file: chatgpt-api-code.php
- Double click the index.html file. The app will open in your web browser.

## How to add a translation language

I've only included ten languages in the dropdown menu. If your first language is not included then simply modify the index.html (or index.php file) and add your first language to the dropdown menu. That's all that's needed. When you select your language from the dropdown menu, the web app will automatically translate into that language. This is because ChatGPT is trained to speak many languages. But the quality of it's tranlations may vary depending on the language. The translations may be very poor for low resource languages i.e. languages that don't have a lot of text content available on the internet.

## Known Issues

- The spelling and grammar corrections are not always done correctly.
- The translations are not always perfect. The translation may not correctly capture the meaning of some informal and quirky things the bot says. Also, translations for low resource languages are not very good.

## Random thoughts

In the movie "The Matrix," Agent Smith explains, during a conversation with Morpheus, why the Matrix is not created as a perfect world. The line goes like this:

"Did you know that the first Matrix was designed to be a perfect human world, where none suffered, where everyone would be happy? It was a disaster. No one would accept the program, entire crops were lost. Some believed we lacked the programming language to describe your perfect world. But I believe that, as a species, human beings define their reality through suffering and misery."

This dialogue highlights the idea that humans rejected a utopian Matrix because it didn't align with their nature, and they needed the element of suffering to accept the simulated reality.

I took inspiration from this quote when designing this simulated reality. What makes Phoebe more engaging is that that she has a past that could be inspiring or disturbing, depending on how you see it.
