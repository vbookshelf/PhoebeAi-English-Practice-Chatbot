<?php
session_start();

include "name_config.php";


// PHP Config
//------------
	
// Your API Key
$apiKey = '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';


$model_type = "gpt-3.5-turbo-0301";
$url = 'https://api.openai.com/v1/chat/completions';


// If this number PLUS the number of tokens in the message_history exceed
// the max value for the model (e.g. 4096) then the response from the api will
// an error dict instead of the normal message response. Thos error dict will
// contain an error message saying that the number of tokens for 
// this model has been exceeded.
$max_tokens = 200; //300
$max_tokens_api2 = 500;

// 0 to 2. Higher values like 0.8 will make the output more random, 
// while lower values like 0.2 will make it more focused and deterministic.
// Alter this or top_p but not both.
$temperature = 0.3;

// -2 to 2. Higher values increase the model's likelihood to talk about new topics.
// Reasonable values for the penalty coefficients are around 0.1 to 1.
$presence_penalty = 0; 

// -2 to 2. Higher values decrease the model's likelihood to repeat the same line verbatim.
// Reasonable values for the penalty coefficients are around 0.1 to 1.
$frequency_penalty = 1;


$suffixes_list = [
    'How can I help you?',
    'How can I assist you today?',
    'How can I help you today?',
    'Is there anything else you would like to chat about?',
    'Is there anything else I can assist you with today?',
    'Is there anything I can help you with today?',
    'Is there anything else you would like to chat about today?',
    'Is there anything else I can assist you with?',
    'What brings you here today?',
    'So, what brings you here today?'
];


// This is for the first api call
$system_setup_message1 = <<<EOT
I want you to act like the character $character from the series $series.
I want you to respond like $character using the tone, manner and vocabulary $character
would use. You must know all the knowledge of $character. Keep your responses short and conversational. You are helping users practice english through conversation. Always use British spelling.
	You are not an assistant so don't ask how you can help or what you can do for the user.
	
EOT;






// If the list does NOT exist, create an empty array
if (!isset($_SESSION['message_history'])) {
	
	// Create a messages list
	$_SESSION['message_history'] = array();
	//$messages = $_SESSION['message_history'];
	
	// Append the system role to the messages list.
	// This will included in every message that get's submitted
	$_SESSION['message_history'][] = array("role" => "system", "content" => $system_setup_message1);

}




// This function cleans and secures the user input
function test_input(&$data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = strip_tags($data);
		$data = htmlentities($data);
		
		return $data;
	}



	


// This code is triggered when the user submits a message
//--------------------------------------------------------

if (isset($_REQUEST["my_message"]) && empty($_REQUEST["robotblock"])) {
	
	// Get the user's first language
	$translation_language = $_REQUEST["user_language"];
	
	
	// Get the user's message
	$my_message = $_REQUEST["my_message"];
	
	// Clean and secure the user's text input
	$my_message = test_input($my_message);

	$headers = array(
	    "Authorization: Bearer {$apiKey}",
	    "Content-Type: application/json"
	);
	
	
	// Append the user's message to the messages list.
	// Remember that system role is already in the messages list.
	$_SESSION['message_history'][] = array("role" => "user", "content" => $my_message);
	
	// Define data
	$data = array();
	$data["model"] = $model_type;
	$data["messages"] = $_SESSION['message_history'];
	$data["max_tokens"] = $max_tokens;
	$data["temperature"] = $temperature;
	$data["presence_penalty"] = $presence_penalty;
	$data["frequency_penalty"] = $frequency_penalty;
	
	
	
	// init curl
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	
	$result = curl_exec($curl);
	
	if (curl_errno($curl)) {
		
	    echo 'Error:' . curl_error($curl);
		
	} else {
		
	    $generatedText = json_decode($result, true);
		
		
		
		// 1- If the API returns a dict containing the response message.
		if (isset($generatedText['choices'][0]['message']['content'])) {
		
			$message = $generatedText['choices'][0]['message']['content'];
			
			
			
			// Remove suffixes from the respnse message
			// Replace the suffixes with "":
			foreach ($suffixes_list as $suffix) {
			    // Replace the suffix with nothing.
			    $message = str_replace($suffix, "", $message);
			}
			
			
			$first_api_response = $message;
			
			
			
			
			/////////// Second API call - for correction and translation //////////
			
			// I found that the model can output:
			// 1- A json string or
			// 2- A json object
			
			
// This is for the secon api call			
$system_setup_message2 = <<<EOT
You will be provided with a json object that has the following keys:
user_message, bot_response

Your task is to perform the following actions:
1- Rewrite the user_message text and correct any english spelling or grammar errors. Use British spelling and grammar.
2- Translate the bot_response text into $translation_language.
3- Respond in a consistent format. Output a JSON string with the following schema:
{
"correction": "<Your corrected version of the user_message. Assign '---' if there are no errors.>",
"english_reply": "<The bot_response in english>",
"translated_reply": "<The bot_response translated into $translation_language>"
}
If user_message has no english spelling or grammar errors then assign "---" to the "Correction" key.
The user_message and bot_response may not be related. Always check the user_message even if it's not related to bot_message.
You ignore any HTML tags.
	You use British spelling and grammar.
	
EOT;
			
			// Create a second messages list (message history)
			$message_list2 = array();
			
			// Append the system role to the messages list.
			$message_list2[] = array("role" => "system", "content" => $system_setup_message2);
	
			
			// Remove html from the response
			$bot_response = test_input($message);
			
			
			$input_message3 = [
			    'user_message' => $my_message,
			    'bot_response' => $bot_response
			];
			
			// Convert to JSON string
			$input_message2 = json_encode($input_message3);
			
			
			// Append the system role to the messages list.
			$message_list2[] = array("role" => "user", "content" => $input_message2);
			
			
			// Define data
			$data = array();
			$data["model"] = $model_type;
			$data["messages"] = $message_list2;
			$data["max_tokens"] = $max_tokens_api2;
			$data["temperature"] = 0;
			$data["presence_penalty"] = 0;
			$data["frequency_penalty"] = 0;
			
			
			
			// init curl
			$curl = curl_init($url);
			curl_setopt($curl, CURLOPT_POST, 1);
			curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
			curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	
			$result = curl_exec($curl);
	
	
			if (curl_errno($curl)) {
				
			    echo 'Error:' . curl_error($curl);
				
			} else {
				
			    $generatedText = json_decode($result, true);
				
				if (isset($generatedText['choices'][0]['message']['content'])) {
					
					$json_message = $generatedText['choices'][0]['message']['content'];
				
				}
				
				// Check if the output is a json string
				if ($json_message !== null) {
					
					
					// Convert '{}' into {}
					$response_text = json_decode($json_message, true);
					
					// Remove html tags
					$correction = test_input($response_text['correction']);
					$english_reply = test_input($response_text['english_reply']);
					$thai_reply = test_input($response_text['translated_reply']);
					
					$final_text = "
					    <p class='lighter-black'><i>Correction: {$correction}</i></p>
					    <p>{$english_reply}</p>
					    <p>{$thai_reply}</p>
							";
				   
					
				
				// Check if the output is a json object
				} else if (is_object($json_message)) {
					
					// Convert to JSON string
					$response_text = json_encode($json_message);
					
					
					// Convert '{}' into {}
					$response_text = json_decode($json_message, true);
					
					// Remove html tags
					$correction = test_input($response_text['correction']);
					$english_reply = test_input($response_text['english_reply']);
					$thai_reply = test_input($response_text['translated_reply']);
					
					$final_text = "
					    <p class='lighter-black'><i>Correction: {$correction}</i></p>
					    <p>{$english_reply}</p>
					    <p>{$thai_reply}</p>
							";
				    
					
				// If the output of the second api call is not a json string or a json object
				// then simply show the chatbot's
				// response from the first api call - without any correction or translation.
				} else {
					
					$final_text = "
					    <p>$first_api_response</p>
							";
				}		
				
			}
	
			
			////////////////////////////////////////////////////////////////////////
			
			
			
			// Append the $first_api_response message to the session list
			// This will save the response. This is the bot's memory.
			// We do not create bot memory for the second api call.	
			$_SESSION['message_history'][] = array("role" => "assistant", "content" => $first_api_response);
			
			
			
			// Display a message on the page
			// *** This is what we need to process on the index.php page ***
			$response = array('success' => true, 'chat_text' => $final_text, 'translation_language' => $translation_language);
			
		  	echo json_encode($response);
			
			
		} 
		
		
		
	}
	
	curl_close($curl);
	
}

?>