# Text to Icon Converter

This project is a simple web application that converts text input into corresponding emoji icons. It allows users to encode text into emoji icons and decode emoji icons back into text. Additionally, it provides a history feature to keep track of recent conversions.

## Author
This project is developed by [MinhNhatPhan](minhnhatphan2815@gmail.com).

## Features

- **Encode Text to Icons**: Users can input text, and the application will convert each character into a corresponding emoji icon.
- **Decode Icons to Text**: Users can input emoji icons, and the application will convert them back into text.
- **User Authentication**: Allows users to sign up, sign in, sign out, and reset their passwords using Firebase Authentication.
- **History**: The application keeps track of recent conversions, allowing users to easily access and reuse previous inputs and outputs.
- **Dark Mode Toggle**: Users can switch between light and dark themes for better readability.
- **Responsive Design**: Ensures the application is usable on various devices and screen sizes.

## Technologies Used

- **HTML/CSS/JavaScript**: The frontend of the application is built using HTML for structure, CSS for styling, and JavaScript for functionality.
- **Firebase Authentication**: User authentication is implemented using Firebase Authentication, providing secure sign-up, sign-in, sign-out, and password reset functionalities.
- **Firebase Realtime Database**: Firebase Realtime Database is utilized to store conversion history data, enabling seamless synchronization across devices in real-time.

### Customize Icon Mapping
The application utilizes an icon map that associates each character with a corresponding emoji icon. This mapping allows for seamless encoding of text inputs into emoji icons and vice versa. Below is an example snippet of the icon map used in the application

```javascript
const iconMap = {
  'a': '🐽',
  'b': '👀',
  'c': '🐭',
  // Add more mappings as needed...
};
```
You can customize the icon mappings according to your preferences or add additional characters and corresponding icons to extend the functionality of the application.

## Usage

1. Input Text: Enter the text you want to encode or the emoji icons you want to decode into the input field.
2. Encode/Decode: Click the corresponding button to encode or decode the input text.
3. Copy Output: Click the "Copy" button to copy the output text.
4. View History: Click the "History" button to view recent conversion history.
5. Dark Mode Toggle: Click the moon icon to switch between light and dark themes.

## How to Run

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser.
3. Start converting text to emoji icons and vice versa!

## License

This project is provided as-is without any specific license. You are free to use and modify the code for personal or educational purposes. However, please note that the author holds no liability for any consequences arising from the use of this software.

## Call for Stars
If you find this project useful and interesting, please consider giving it a star on GitHub. This will help increase visibility and encourage the author to further develop the project with more features and improvements.

Thank you for your support! 🌟