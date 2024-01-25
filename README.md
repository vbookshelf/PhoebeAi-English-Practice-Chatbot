# PhoebeAi English Practice Chatbot
Learn English by chatting with Phoebe. Improve your conversation skills.<br>
You can talk to Phoebe as if she was a real person. If you don't understand something she says, tell her and she will explain further.<br>


Live Web App:
https://phoebeai.woza.work/

This is a non-profit social impact project. I've assigned a monthly budget to this live web app. Please note that it will not work when this budget is used up. Therefore, it will be better for you to download the code from this repo and use your own OpenAi API Key.

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
- A simple, mobile optimized chat interface.

## What problem does this solve?

English is the language of international business, science and technology. Many people across the world want to learn english.

One of the best ways to learn a new language is to actually use it. The challenge many face is that they don't have english speaking friends to practice with or they are too shy to start an english conversation.

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

## Translation languages

I've only included seven languages in the dropdown menu. If your first language is not included then simply modify the index.html (or index.php file) and add your first language to the dropdown menu. That's all that's needed. When you select your language from the dropdown menu, the web app will automatically translate into that language. This is because ChatGPT is trained to speak many languages. But the quality of it's tranlations may vary depending on the language. The translations may be very poor for low resource languages i.e. languages that don't have a lot of text content available on the internet.

## Known Issues

- The spelling and grammar corrections are not always done correctly.
- The translations are not always perfect. The translation may not correctly capture the meaning of some informal and quirky things the bot says. Also, translations for low resource languages are not very good.
