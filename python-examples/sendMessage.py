import requests

# Send a message event
url = 'http://localhost:4000/websocket/event'
message_event = {'type': 'message', 'data': 'Hello from Python'}

response = requests.post(url, json=message_event)
print(f"Server response (message): {response.json()}")