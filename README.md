# NarrativeCare AI

NarrativeCare AI is a multi-agent generative AI system that transforms personal stress into structured, metaphor-driven storytelling and short cinematic outputs. Instead of giving direct advice, the system embeds insight within narrative, allowing users to interpret meaning through experience.

---

## Overview

A user provides a description of a stressful situation. The system produces:

- A 120-word fable narration  
- Five short video scene prompts  
- A consistent visual direction for film generation  
- Optional voice narration synchronized with the story  

The goal is to communicate insight indirectly through narrative structure rather than explicit explanation.

---

## System Architecture

NarrativeCare AI is built around three specialized AI agents:

### Director Agent
- Analyzes user input  
- Identifies contradictions in language  
- Maps the situation into a metaphorical structure  
- Outputs a structured JSON “brief”  

### Writer Agent
- Converts the brief into a 120-word fable  
- Uses narrative pacing and recurring imagery  
- Does not access the original user input  

### Cinematographer Agent
- Converts scene descriptions into video prompts  
- Maintains consistent visual style  
- Ensures prompts are filmable and structured  

Writer and Cinematographer run in parallel after the Director completes.

---

## Data Flow

User Input  
→ Director Agent (Structured Brief)  
→ Writer + Cinematographer (parallel)  
→ Fable + Scene Prompts  
→ Media Generation (video + audio)  
→ Final Output  

---

## Media Generation

- Kling AI generates five video clips in parallel  
- ElevenLabs generates narration audio  
- The frontend combines clips into a single sequence with synchronized narration  

---

## Project Structure

GenAI/
│── pipeline.py        # FastAPI server and agent pipeline  
│── media.py           # Video and audio generation  
│── test.py            # Testing and quality checks  
│── .env               # API keys (not committed)  
│── README.md  

---

## API Endpoints

### POST /generate-story
Runs only the AI agents (no media generation)

Returns:
- fable  
- scene prompts  
- visual direction  
- voice tone  
- insight tag  

### POST /generate
Runs the full pipeline

Returns:
- video URLs (five clips)  
- narration audio (base64)  
- full story output  

### Utility Endpoints
- GET /health  
- GET /test-story  
- GET /test-all  

---

## Installation

git clone https://github.com/Rakin123/GenAI-.git  
cd GenAI-  

python -m venv venv  
source venv/bin/activate   (Mac/Linux)  
venv\Scripts\activate      (Windows)  

pip install -r requirements.txt  

---

## Environment Variables

Create a `.env` file with the following:

ANTHROPIC_API_KEY=your_key  
KLING_API_KEY=your_key  
KLING_API_SECRET=your_secret  
ELEVENLABS_API_KEY=your_key  

Optional:

IBM_API_KEY=your_key  
IBM_PROJECT_ID=your_project  
IBM_DB2_DSN=your_dsn  

---

## Running the Application

uvicorn pipeline:app --reload  

---

## Testing

python test.py  
python test.py --all  
python test.py "custom input"  

---

## Safety Considerations

The system includes basic safety handling:

- Detects crisis-level language  
- Returns appropriate support resources  
- Not intended as a replacement for professional care  

---

## Design Principles

- Insight is conveyed indirectly through narrative  
- Agents are isolated to prevent overfitting to input  
- Structure is prioritized over surface-level emotion  
- Parallel execution improves performance  
- Outputs must be concrete and filmable  

---

## Future Work

- Retrieval-Augmented Generation (RAG)  
- Improved multi-agent coordination  
- Frontend integration enhancements  
- Cloud deployment  
- Data storage and analytics integration  

---