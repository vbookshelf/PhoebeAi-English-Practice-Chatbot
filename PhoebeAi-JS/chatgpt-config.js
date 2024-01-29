

// Your API Key
const apiKey = 'Your-API-Key'; 



const bot_name = 'Phoebe';  // Give the bot a name
const user_name = 'Guest';	// Set your chat name 

const character = 'Phoebe';
const series = 'Friends';

// Default selected language
var translation_language = "thai";
console.log("Translation language: " + translation_language);




const model_type = "gpt-3.5-turbo-0301"; // 4096 tokens, gpt-3.5-turbo-0301
const openai_url = 'https://api.openai.com/v1/chat/completions';

// If this number plus the number of tokens in the message_history exceed
// the max value for the model (e.g. 4096) then the response from the api will
// an error dict instead of the normal message response. Thos error dict will
// contain an error message saying that the number of tokens for 
// this model has been exceeded.
const max_tokens_api1 = 200; //300
const max_tokens_api2 = 500;

// 0 to 2. Higher values like 0.8 will make the output more random, 
// while lower values like 0.2 will make it more focused and deterministic.
// Alter this or top_p but not both.
const temperature = 0.5;

// -2 to 2. Higher values increase the model's likelihood to talk about new topics.
// Reasonable values for the penalty coefficients are around 0.1 to 1.
const presence_penalty = 0; 

// -2 to 2. Higher values decrease the model's likelihood to repeat the same line verbatim.
// Reasonable values for the penalty coefficients are around 0.1 to 1.
const frequency_penalty = 1;




// Remove these suffixes. I think removing them makes the chat sound more natural.
// They will sliced off the bot's responses.
// This is done below in the 'Remove suffixes' part of the code.
var suffixes_list = ['How can I help you?', 'How can I assist you today?', 'How can I help you today?', 'Is there anything else you would like to chat about?', 'Is there anything else I can assist you with today?', 'Is there anything I can help you with today?', 'Is there anything else you would like to chat about today?', 'Is there anything else I can assist you with?', 'What brings you here today?', 'So, what brings you here today?'];






// The message history is stored in this variable.
// Storing the message history allows the bot to have context memory.

var message_list;


// This is only for the first API call
var system_setup_message = `
I want you to act like the character ${character} from the series ${series}.
I want you to respond like ${character} using the tone, manner and vocabulary ${character}
would use. You must know all the knowledge of ${character}. Keep your responses short and conversational. You are catching up with a new friend after a long time.
You are not an assistant so don't ask how you can help or what you can do for the user.
`;



// Append to message_list. This is the history of chat messages.
//message_list.push({"role": "system", "content": system_setup_message});
message_list = [{"role": "system", "content": system_setup_message}];			




async function makeApiRequest(my_message) {
	
		// This scrolls the page up by cicking on a div at the bottom of the page.
		// This shows the user's message.
		// Note that if the click is simlated "on page load" then the cursor 
		// will not autofocus in the form input.
		simulateClick('scroll-page-up');

	  try {
		  
		// Add the square brackets
		var prompt = `###${my_message}###`;
		//var prompt = my_message;
			
		  
		// Append to message_list. This is the history of chat messages.
		message_list.push({"role": "user", "content": prompt});
		
	    const response = await fetch(openai_url, {
			
	      method: 'POST',
	      headers: {
			Authorization: `Bearer ${apiKey}`,
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
			 model: model_type,
	        messages: message_list,
	        max_tokens: max_tokens_api1,
			temperature: temperature,
			presence_penalty: presence_penalty,
			frequency_penalty: frequency_penalty
	      })
	    })
		
	    const data = await response.json();
		
		
			
			// Get the response text
			var response_text = data['choices'][0]['message']['content'];
			
			
			// Replace the suffixes with "":
			// This removes sentences like: How can I help you today?
			// For each suffix in the list...
			 suffixes_list.forEach(suffix => {
				// Replace the suffix with nothing.
		        response_text = response_text.replace(suffix, "");
		  	});
			
			
			// First response from the api
			var first_api_response = response_text;
			
			
			
			console.log(typeof response_text)
			console.log(response_text)
			
			
			
			///// Second API call - for correction and translation //////
			
				// This is for the second API call
				system_setup_message2 = `
				
				You will be provided with a json object that has the following keys:
				user_message, bot_response

				Your task is to perform the following actions:
				1- Rewrite the user_message text and correct any english spelling or grammar errors.
				2- Translate the bot_response text into ${translation_language}.
				3- Respond in a consistent format. Output a JSON string with the following schema:
				{
				"correction": "<Your corrected version of the user_message>",
				"english_reply": "<The bot_response in english>",
				"translated_reply": "<The bot_response translated into ${translation_language}>"
				}
				If user_message has no english spelling or grammar errors then assign "---" to the "Correction" key.
				The user_message and bot_response may not be related. Always check the user_message even if it's not related to bot_message.
				You ignore any HTML tags.
				You use British spelling and grammar.
				
				`;
				
				
				
				// Append to message_list. This is the history of chat messages.
				message_list2 = [{"role": "system", "content": system_setup_message2}];	
			
			
			
				// Make a second API request
				try {
					
				  	
					var bot_response = response_text;
					
					
					// Remove html tags from the user's message
					my_message = removeHtmlTags(my_message);
					
					console.log('test')
					console.log(my_message)
					
					
					var input_message3 = {
				  	user_message: my_message,
			  		bot_response: bot_response
					};
					
					
					// Convert to json string
					const input_message2 = JSON.stringify(input_message3);
					  
					// Append to message_list. This is the history of chat messages.
					message_list2.push({"role": "user", "content": input_message2});
					
				    const response = await fetch(openai_url, {
						
				      method: 'POST',
				      headers: {
						Authorization: `Bearer ${apiKey}`,
				        'Content-Type': 'application/json'
				      },
				      body: JSON.stringify({
						 model: model_type,
				        messages: message_list2,
				        max_tokens: max_tokens_api2,
						temperature: temperature,
						presence_penalty: presence_penalty,
						frequency_penalty: frequency_penalty
				      })
				    })
					
					
					// The API can return:
					// 1- A dict containing the reponse message or
					// 2- A different dict containing the error message.
				    const data = await response.json();
					
					
					// Get the response text
					var response_text2 = data['choices'][0]['message']['content'];
					
					// Get the finish_reason
					// "tool_calls"
					var finish_reason = data['choices'][0]['finish_reason'];
					
					console.log(response_text2)
					
					
				} catch (error) {
				  
			    console.log(error);
				
			}
				
				
			
			response_text = response_text2;
			
			// If the model correctly outputs a json string
			if (isValidJSONString(response_text)) {
				
				console.log('model output is json string')
			
				// --- 
				// Extract the json values
				// *** The model must output json for this to work.
				// However, the model does not always ouput json as instructed.
				
				// Convert '{}' into {}
				response_text = JSON.parse(response_text);
				
				var correction = removeHtmlTags(response_text['correction']);
				var english_reply = removeHtmlTags(response_text['english_reply']);
				var thai_reply = removeHtmlTags(response_text['translated_reply']);
				
				
				// Sometimes the bot just echoes the user's message in the correction.
				// This code tries to prevent that from happening.
				// checkVariable gets written to the browser console in the index.php file.
				if (my_message === correction) {
				    correction = "---";
				    var checkVariable = "The strings are identical.";
				} else {
				    var checkVariable = "The strings are different.";
				}
				
				
				
				var final_text = `
				<p class='lighter-black'><i>Correction: ${correction}</i></p><p>${english_reply}</p><p>${thai_reply}</p>
				`;
				
				//console.log(response_text)
				
				//---
			
			// If the model outputs a json object instead of a json string
			} else if (isValidJSONObject(response_text)) {
				
				console.log('model output is json object')
				
				// Convert to json string
				const response_text = JSON.stringify(response_text);
				
				
				// Convert '{}' into {}
				response_text = JSON.parse(response_text);
				
				var correction = removeHtmlTags(response_text['correction']);
				var english_reply = removeHtmlTags(response_text['english_reply']);
				var thai_reply = removeHtmlTags(response_text['translated_reply']);
				
				
				// Sometimes the bot just echoes the user's message in the correction.
				// This code tries to prevent that from happening.
				// checkVariable gets written to the browser console in the index.php file.
				if (my_message === correction) {
				    correction = "---";
				    var checkVariable = "The strings are identical.";
				} else {
				    var checkVariable = "The strings are different.";
				}
				
				
				var final_text = `
				<p class='lighter-black'><i>Correction: ${correction}</i></p><p>${english_reply}</p><p>${thai_reply}</p>
				`;
				
				
			} else {
				
				// If there's been an error in the second api response 
				// then simply show the chatbot's
				// response from the first api call - without and correction or translation.
				var final_text = `
				<p>${first_api_response}<p>
				`;
				
			}
			
			
		
		///////// *** Extract the json values here and add paragraph tags ***
		// Format the response so it can be displayed on the web page.
		// This adds paragraph tags: <p>response_text</p>
		var paragraph_response = formatResponse(final_text);
			
		
		//console.log(paragraph_response)
		
		
		// If the API returned an error message beacuse the token count was exceeded.
		// If the "error" key is in the dict that the api returned.
		if ('error' in data) {
			 // Do nothing, i.e. don't append the error message to 
			 // the message_list (chat history).
		
		} else {
			
			// Append to message_list. This is the history of chat messages.
			//message_list.push({"role": "assistant", "content": paragraph_response});
			
			// If we don't append the json response then the model will
			// not consistently output json.
			message_list.push({"role": "assistant", "content": first_api_response});
			
			
		}
		
		
			
		
		var input_message = {
		  sender: bot_name,
	  		text: paragraph_response
		};
		
		
		// Add the message to the chat
		addMessageToChat(input_message);
		
		
		// Scroll the page up by cicking on a div at the bottom of the page.
		simulateClick('scroll-page-up');
		
		// Put the cursor in the form input field
		const inputField = document.getElementById("user-input");
		inputField.focus();
		
		
	  } catch (error) {
		  
	    console.log(error);
		
		// When this happens print an error message on the screen.
		// The user needs to send the same message again
		if (error.message == 'Failed to fetch') {
			
			var input_message = {
				  	sender: bot_name,
			  		text: 'Failed to fetch. Please send the message again.'
					};
	
		
			// Add the message from Maiya to the chat
			addMessageToChat(input_message);	
		}
		
	  }
	  
  		
  
  }