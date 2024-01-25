

// When the form is submitted this function removes
// the 'selected' attribute. This ensures we don't end
// up with two dropdown options that have an attribute called 'selected'.
// The 'selected' attribute gets added later when the ajax response
// displays the output on the page. This ensures that the language
// the user has selected stays selected.
function clearSelectedOptions() {
	
	var selectElement = document.getElementById('language-select');
    var options = selectElement.getElementsByTagName('option');
    
    for (var i = 0; i < options.length; i++) {
        if (options[i].hasAttribute('selected')) {
            options[i].removeAttribute('selected');
        }
    }
}






// This sets the language when the dropdown option is selected.
// This gets called after the ajax response is received when the page gets updated.
function updateSelectedLanguage(user_language) {
  var selectElement = document.getElementById("language-select");
  //translation_language = selectElement.value;
  //console.log("Selected language: " + translation_language);


  // Get the <option> element you want to add the 'selected' attribute to by its value
  var optionToSelect = selectElement.querySelector('option[value="' + user_language + '"]'); 
  

  // Add the 'selected' attribute to the option
  optionToSelect.setAttribute("selected", "selected");
}



// This function creates the three dot spinner.
// Calling this function starts the spinner.
function spinner() {
	
	// Select the element where the spinner will be displayed
	const spinnerElement = document.getElementById("spinner");
	
	// Define an array of dots
	const dots = ["", ".", "..", "..."];
	
	// Initialize the dot counter
	let dotIndex = 0;
	
	// Start the spinner animation
	setInterval(() => {
	  // Update the text content of the spinner element with the current dot
	  spinnerElement.textContent = `>${dots[dotIndex]}`;
	
	  // Increment the dot counter
	  dotIndex = (dotIndex + 1) % dots.length;
	}, 500);

}



// We create the div containing the spinner.
// We append the div to the chat.
// This displays the spinner.
function create_spinner_div() {
	
	// Create a new div element
	const spinnerElement = document.createElement("div");
	
	// Set the id attribute of the div element to "spinner"
	spinnerElement.setAttribute("id", "spinner");
	
	var chat = document.getElementById("chat");
  
	// Append the div to the chat
  	chat.appendChild(spinnerElement);
	
	// Start the spinner
	spinner();
}



// This function deletes the div containing the spinner.
// This causes the spinner to disappear.
function delete_spinner_div() {
	
	// Get the div element you want to delete
	const elementToDelete = document.getElementById("spinner");
	
	// Get the parent node of the div element
	const parentElement = elementToDelete.parentNode;
	
	// Remove the div element from its parent node
	parentElement.removeChild(elementToDelete);

}



// This function deletes the div containing the spinner.
// This causes the spinner to disappear.
function delete_temp_p() {
	
	// Get the div element you want to delete
	const elementToDelete = document.getElementById("temp_p");
	
	// Get the parent node of the div element
	const parentElement = elementToDelete.parentNode;
	
	// Remove the div element from its parent node
	parentElement.removeChild(elementToDelete);

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
  
  // Add an id attribute. This will help to scroll to
  // the bot message. This gets detelted after the page
  // is scrolled to the bot message.
  messageContainer.setAttribute("id", "chatgpt1");
  

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
  
  // Scroll the page up by cicking on a div at the bottom of the page.
  simulateClick('scroll-page-up');
  
}



  

// Function to remove html tags from a string
function removeHtmlTags(str) {
	
  return str.replace(/(<([^>]+)>)/gi, "");
  
}
  
  