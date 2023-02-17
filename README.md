# 0.4: New note diagram
Here is what happens when a user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes 
```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note over browser: The form triggers The browser to send the input note to the server

    activate server
    server-->>browser: HTTP status code 302
    Note over server: The server extracts the note and saves it,<br/> then responds with 302 status code and<br/>"location: /exampleapp/notes" as a header
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Note over browser: The browser requests the value of the location header

    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css

    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that<br/>fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "a note contents", "date": "2023-2-17" }, ... ]
    deactivate server
```

# 0.5: Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "This is easy", "date": "2023-2-17" }, ... ]
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes 

```
# 0.6: New note in Single page app diagram
```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note over browser: with the help of Javascript,<br/>The browser sends an HTTP POST request<br/>it contains the new note in form of {content, date} object

    activate server
    server-->>browser: HTTP status code 201
    Note over server: The server extracts the note and saves it,<br/> then responds with 201 status code
    deactivate server
    
    Note over browser: the browser redraws the notes<br/>using a JS function that was registered to observe<br/>the http request state
```