from monsterapi import client
              
# Initialize the client with your API key
api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjE4ZGQ5MjE3MDNkNzA3MjgxOWU5M2ZiN2RkMGM5YjBmIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMTVUMTc6MTM6MDMuNTE1NDEwIn0._s7PzLZn4-S2Zw4BEGK2uoZxvh7kOTIXbhuXaK4G7jM'  # Replace 'your-api-key' with your actual Monster API key
monster_client = client(api_key)

model = 'llama2-7b-chat';
input_data = {
  'prompt': 'Whats the meaning of life?',
  'top_k': 10,
  'top_p': 0.9,
  'temp': 0.7,
  'max_length': 150,
  'beam_size': 1,
  'system_prompt': 'You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe...',
  'repetition_penalty': 1.2,
};


result = monster_client.generate(model, input_data)

print(result['text'])