# Sales Dashboard API

A FastAPI-based backend service for the Sales Dashboard application, featuring AI-powered analytics using LangChain and Meta's Llama model.

## Features

- RESTful API endpoints for sales data
- AI-powered analytics using LangChain and Llama
- CORS support for frontend integration
- Environment-based configuration
- Comprehensive error handling

## Prerequisites

- Python 3.11+
- pip (Python package manager)
- Meta Llama model file (llama-2-7b-chat.Q4_K_M.gguf)

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

3. Download the Llama model:
   - Download the llama-2-7b-chat.Q4_K_M.gguf model file
   - Place it in the `models` directory
   - Ensure the path matches the one in `.env` file

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables as needed:
     ```
     LLAMA_MODEL_PATH=models/llama-2-7b-chat.Q4_K_M.gguf
     API_HOST=0.0.0.0
     API_PORT=8000
     ```

## API Endpoints

### Sales Representatives

- `GET /api/sales-reps`
  - Returns all sales representatives data

- `GET /api/sales-reps/{rep_id}`
  - Returns data for a specific sales representative

### Deals

- `GET /api/deals`
  - Returns all deals across all sales representatives

### AI Assistant

- `POST /api/ai`
  - Accepts questions about sales data
  - Returns AI-generated responses
  - Request body: `{"question": "your question here"}`

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
├── models/             # Llama model directory
└── dummyData.json      # Sample sales data
```

### Adding New Features

1. Create new endpoints in `main.py`
2. Update the requirements.txt if new dependencies are needed
3. Test the endpoints using the Swagger UI

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Missing resources
- AI model initialization failures
- JSON parsing errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 