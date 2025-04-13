# Sales Dashboard API

A FastAPI-based backend service for the Sales Dashboard application, featuring AI-powered analytics using Groq API.

## Features

- RESTful API endpoints for sales data
- AI-powered analytics using Groq API
- Async HTTP requests with aiohttp
- CORS support for frontend integration
- Environment-based configuration
- Comprehensive error handling
- Type-safe API responses

## Prerequisites

- Python 3.8+
- pip (Python package manager)
- Groq API key

## Installation

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables as needed:
     ```
     # API Configuration
     API_HOST=0.0.0.0
     API_PORT=8000

     # Environment
     ENVIRONMENT=development

     # Groq API Configuration
     GROQ_API_KEY=your_groq_api_key
     GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
     GROQ_MODEL_NAME=meta-llama/llama-4-scout-17b-16e-instruct
     ```

## API Endpoints

### Sales Representatives

- `GET /api/sales-reps`
  - Returns all sales representatives data
  - Response: `{"salesReps": [...]}`

- `GET /api/sales-reps/{rep_id}`
  - Returns data for a specific sales representative
  - Response: `{"id": 1, "name": "...", ...}`

### Deals

- `GET /api/deals`
  - Returns all deals across all sales representatives
  - Response: `{"deals": [...]}`

### AI Assistant

- `POST /api/ai`
  - Accepts questions about sales data
  - Returns AI-generated responses using Groq API
  - Request body: `{"question": "your question here"}`
  - Response: `{"answer": "AI response here"}`

## Running the Application

1. Start the development server:
   ```bash
   python main.py
   ```

2. The API will be available at `http://localhost:8000`

3. Access the API documentation at:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## Development

### Project Structure

```
backend/
├── main.py              # Main application file
├── requirements.txt     # Python dependencies
├── .env                # Environment variables
├── .env.example        # Example environment variables
└── dummyData.json      # Sample sales data
```

### Adding New Features

1. Create new endpoints in `main.py`
2. Update the requirements.txt if new dependencies are needed
3. Test the endpoints using the Swagger UI

### Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Missing resources
- API configuration errors
- Groq API errors
- JSON parsing errors

## API Response Format

All API responses follow a consistent format:
```json
{
  "data": {...},  // Response data
  "error": null,  // Error message if any
  "status": 200   // HTTP status code
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 