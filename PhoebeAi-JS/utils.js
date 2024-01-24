
// This sets the laguage when the dropdown option is selected
function updateSelectedLanguage() {
  var selectElement = document.getElementById("language-select");
  translation_language = selectElement.value;
  console.log("Selected language: " + selected_language);
  // You can perform additional actions or trigger functions based on the selected language here
}



function extractJsonString(inputString) {
  const regex = /{[\s\S]*?}/gm; // match curly braces and everything in between
  const match = inputString.match(regex);
  if (match !== null && match.length > 0) {
    return match[0];
  }
  return '';
}



// Remove HTML tags
function removeHtmlTags(input) {
  return input.replace(/<[^>]*>/g, '');
}




function isValidJSONObject(obj) {
  if (typeof obj !== 'string') {
    return false; // Input is not a string
  }

  try {
    const parsedObject = JSON.parse(obj);
    return parsedObject !== null && typeof parsedObject === 'object' && !Array.isArray(parsedObject);
  } catch (error) {
    return false;
  }
}




// Check if an object is a json string i.e. '{}'
function isValidJSONString(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}



// This functions takes a list of text (paragraphs).
// If the paragraph does not have p tags then it adds them.
function wrapInPTags(paragraphs) {
  let result = '';

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];

    if (paragraph.includes('<p>')) {
      result += paragraph;
    } else {
      result += '<p>' + paragraph + '</p>';
    }
  }

  return result;
}



// This function formats the text into paragraphs.
function formatResponse(response) {
	
    // Split the response into lines
    const lines = response.split("\n");

    // Combine the lines into paragraphs
    const paragraphs = [];
    let currentParagraph = "";

    for (const line of lines) {
        if (line.trim()) {  // Check if the line is non-empty
            currentParagraph += line.trim() + " ";
        } else if (currentParagraph) {  // Check if the current paragraph is non-empty
            paragraphs.push(currentParagraph.trim());
            currentParagraph = "";
        }
    }

    // Append the last paragraph
    if (currentParagraph) {
        paragraphs.push(currentParagraph.trim());
    }

	// Some text thats returned has \n character but no <p> tags.
	// Other text has <p> tags that we can use when displaying the text on the page.
	// Here we check each list item (paragraph). If it doesn't have <p> tags then add them.
	// This is also important when we save and then reload the chat history.
	//	If you change this make sure that the saving and reloading also works well.
	formattedResponse = wrapInPTags(paragraphs);
	
	
    // Add HTML tags to separate paragraphs
    //const formattedResponse = paragraphs.map(p => `<p>${p}</p>`).join("");
	
	return formattedResponse;
	
	
}



// Function to create a new message container
function createMessageContainer(message) {
	
  var messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  
  messageContainer.classList.add("w3-animate-opacity");
  

  var messageText = document.createElement("span"); //p
  
  
  // This if statement sets the coour of the name that gets displayed
  if (message.sender == bot_name) {
  
	  messageText.innerHTML = "<span class='set-color1'><b>&#x2022 " + message.sender + "</b></span>" + message.text;
  } else {
  	messageText.innerHTML = "<span class='set-color2'><b>&#x2022 " + message.sender + "</b></span>" + message.text;
	}

 
  messageContainer.appendChild(messageText);
  

  return messageContainer;
}


// Function to add a new message to the chat
function addMessageToChat(message) {
	
  var chat = document.getElementById("chat");
  var messageContainer = createMessageContainer(message);
  
  chat.appendChild(messageContainer);
  
}





  