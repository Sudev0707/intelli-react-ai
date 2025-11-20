
### 🚀Intelli React AI

**An AI-powered conversational assistant** built with React and integrated with the  **Google Gemini API**. Designed to be fast, clean, and modern — similar to **Google Gemini** or **ChatGPT** — this application delivers powerful real-time responses with smooth rendering and automatic chat persistence using localStorage.

### 🔗View   [![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://intelli-react-ai.vercel.app/)


### 🛠️Tech Stack

- **React.js** – Frontend framework  
- **Google Gemini API** – AI model integration  
- **JavaScript (ES6+)** – Core logic  
- **localStorage** – Chat history persistence  

### 🏗️ Core Features

- **Google Gemini Integration** – Fast and accurate AI responses  
- **Persistent Chat History** – Automatically saved in localStorage  
- **Auto Scroll** – Always stays on the latest message  
- **Message Formatting** – Smooth rendering with structured messages  


### 📸 Screenshots

| Home Screen | Chat Interface |
|-------------|----------------|
| ![Home](https://github.com/user-attachments/assets/7be2c0c9-984a-48ad-a031-e1e8d098413f) | ![Chat](https://github.com/user-attachments/assets/416f1a66-7783-47e5-a7ba-85d80ff41ad2) |


### 📚 Learning Outcomes

Understand how to integrate the Google Gemini API in a React app.
Learn to handle AI responses using async/await.
Implement chat persistence using localStorage.

> 🚧 **Status: In Development** — More features and refinements coming soon.

### 📡 Gemini API Request Example (Used in This Project)

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H "Content-Type: application/json" \
  -H "X-goog-api-key: YOUR_API_KEY_HERE" \
  -X POST \
  -d '{
        "contents": [
          {
            "parts": [
              {
                "text": "Explain how AI works in a few words"
              }
            ]
          }
        ]
      }'
