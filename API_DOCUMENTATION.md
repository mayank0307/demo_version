# Notes API - Postman Collection / Curl Commands

## Base URL
```
http://localhost:3099/api/notes
```

## 1. GET All Notes
**Description:** Retrieve all notes from the API

### Curl Command:
```bash
curl -X GET http://localhost:3099/api/notes \
  -H "Content-Type: application/json"
```

### Expected Response:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "1759749703940fsvrpujtp",
      "title": "Welcome Note",
      "content": "This is your first note in the Notes API!",
      "createdAt": "2025-10-06T11:21:43.940Z",
      "updatedAt": "2025-10-06T11:21:43.940Z"
    },
    {
      "id": "1759749703940dinan4kip",
      "title": "API Guide",
      "content": "Use POST /api/notes to create, GET /api/notes to list all notes",
      "createdAt": "2025-10-06T11:21:43.940Z",
      "updatedAt": "2025-10-06T11:21:43.940Z"
    },
    {
      "id": "1759749703940jsxuuinmf",
      "title": "Development Tips",
      "content": "Remember to test each endpoint as you build the application",
      "createdAt": "2025-10-06T11:21:43.940Z",
      "updatedAt": "2025-10-06T11:21:43.940Z"
    }
  ]
}
```

---

## 2. GET Single Note by ID
**Description:** Retrieve a specific note using its ID

### Curl Command:
```bash
curl -X GET http://localhost:3099/api/notes/1759749703940fsvrpujtp \
  -H "Content-Type: application/json"
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "id": "1759749703940fsvrpujtp",
    "title": "Welcome Note",
    "content": "This is your first note in the Notes API!",
    "createdAt": "2025-10-06T11:21:43.940Z",
    "updatedAt": "2025-10-06T11:21:43.940Z"
  }
}
```

### Error Response (Note Not Found):
```bash
curl -X GET http://localhost:3099/api/notes/invalid-id \
  -H "Content-Type: application/json"
```
```json
{
  "success": false,
  "message": "Note not found"
}
```

---

## 3. POST - Create New Note
**Description:** Create a new note with title and content

### Curl Command:
```bash
curl -X POST http://localhost:3099/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Note",
    "content": "This is the content of my new note. It can be as long as needed and supports multiple lines."
  }'
```

### Alternative Example:
```bash
curl -X POST http://localhost:3099/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meeting Notes",
    "content": "Discussion points:\n1. Project timeline\n2. Budget allocation\n3. Team assignments\n\nNext steps: Follow up on action items by Friday."
  }'
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "id": "1759751234567abcdef123",
    "title": "My New Note",
    "content": "This is the content of my new note. It can be as long as needed and supports multiple lines.",
    "createdAt": "2025-10-06T11:40:15.234Z",
    "updatedAt": "2025-10-06T11:40:15.234Z"
  }
}
```

### Validation Error Response:
```bash
curl -X POST http://localhost:3099/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Note without content"
  }'
```
```json
{
  "success": false,
  "message": "Please provide both title and content"
}
```

---

## 4. PUT - Update Existing Note
**Description:** Update an existing note's title and/or content

### Curl Command (Update Both Title and Content):
```bash
curl -X PUT http://localhost:3099/api/notes/1759751234567abcdef123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Note Title",
    "content": "This is the updated content of the note. The updatedAt timestamp will reflect this change."
  }'
```

### Curl Command (Update Only Title):
```bash
curl -X PUT http://localhost:3099/api/notes/1759751234567abcdef123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Title Only"
  }'
```

### Curl Command (Update Only Content):
```bash
curl -X PUT http://localhost:3099/api/notes/1759751234567abcdef123 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Only the content is being updated here."
  }'
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "id": "1759751234567abcdef123",
    "title": "Updated Note Title",
    "content": "This is the updated content of the note. The updatedAt timestamp will reflect this change.",
    "createdAt": "2025-10-06T11:40:15.234Z",
    "updatedAt": "2025-10-06T11:45:22.567Z"
  }
}
```

### Error Response (Note Not Found):
```json
{
  "success": false,
  "message": "Note not found"
}
```

---

## 5. DELETE - Delete Note
**Description:** Delete a specific note using its ID

### Curl Command:
```bash
curl -X DELETE http://localhost:3099/api/notes/1759751234567abcdef123 \
  -H "Content-Type: application/json"
```

### Expected Response:
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {
    "id": "1759751234567abcdef123",
    "title": "Updated Note Title",
    "content": "This is the updated content of the note. The updatedAt timestamp will reflect this change.",
    "createdAt": "2025-10-06T11:40:15.234Z",
    "updatedAt": "2025-10-06T11:45:22.567Z"
  }
}
```

### Error Response (Note Not Found):
```json
{
  "success": false,
  "message": "Note not found"
}
```

---

## 6. Complete Demo Flow
**Description:** A complete sequence to demonstrate all CRUD operations

### Step 1: Get all notes (should show 3 initial notes)
```bash
curl -X GET http://localhost:3099/api/notes
```

### Step 2: Create a new note
```bash
curl -X POST http://localhost:3099/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Demo Note",
    "content": "This note demonstrates the complete CRUD functionality of our Notes API."
  }'
```

### Step 3: Get the new note by ID (use ID from step 2 response)
```bash
curl -X GET http://localhost:3099/api/notes/[NOTE_ID_FROM_STEP_2]
```

### Step 4: Update the note
```bash
curl -X PUT http://localhost:3099/api/notes/[NOTE_ID_FROM_STEP_2] \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Demo Note",
    "content": "This note has been successfully updated via the PUT endpoint."
  }'
```

### Step 5: Verify the update
```bash
curl -X GET http://localhost:3099/api/notes/[NOTE_ID_FROM_STEP_2]
```

### Step 6: Get all notes (should now show 4 notes)
```bash
curl -X GET http://localhost:3099/api/notes
```

### Step 7: Delete the demo note
```bash
curl -X DELETE http://localhost:3099/api/notes/[NOTE_ID_FROM_STEP_2]
```

### Step 8: Verify deletion (should show 3 notes again)
```bash
curl -X GET http://localhost:3099/api/notes
```

---

## Postman Collection Import

You can create a Postman collection with these requests:

1. **Collection Name:** Notes API Demo
2. **Base URL Variable:** `{{baseUrl}}` = `http://localhost:3099/api/notes`

### Environment Variables for Postman:
- `baseUrl`: `http://localhost:3099/api/notes`
- `noteId`: `1759749703940fsvrpujtp` (use any valid note ID)

### Postman Request Examples:

1. **GET All Notes**
   - Method: GET
   - URL: `{{baseUrl}}`

2. **GET Single Note**
   - Method: GET  
   - URL: `{{baseUrl}}/{{noteId}}`

3. **POST Create Note**
   - Method: POST
   - URL: `{{baseUrl}}`
   - Body (JSON):
   ```json
   {
     "title": "Postman Test Note",
     "content": "This note was created using Postman."
   }
   ```

4. **PUT Update Note**
   - Method: PUT
   - URL: `{{baseUrl}}/{{noteId}}`
   - Body (JSON):
   ```json
   {
     "title": "Updated via Postman",
     "content": "This note was updated using Postman."
   }
   ```

5. **DELETE Note**
   - Method: DELETE
   - URL: `{{baseUrl}}/{{noteId}}`

---

## Server Console Logs
When you run these commands, you'll see helpful logs in the server console:

- `📖 Retrieved X notes` - when fetching all notes
- `📝 Retrieved note: [title]` - when fetching single note
- `✅ Created new note: [title] (ID: [id])` - when creating
- `🔄 Updated note: [title] (ID: [id])` - when updating
- `🗑️ Deleted note: [title] (ID: [id])` - when deleting
- `❌ Note not found with id: [id]` - when note doesn't exist

---

## Frontend Integration
The React frontend is available at: `http://localhost:4000/notes`

This provides a complete UI to interact with all these API endpoints without needing curl commands.