import requests

# Send a message event
url = 'http://localhost:4000/websocket/event'
message_event = {'type': 'message', 'data': 'Hello from Python'}

response = requests.post(url, json=message_event)
print(f"Server response (message): {response.json()}")

# Send a coordinates event
#coordinates_event = {'type': 'coordinates', 'data': {'lat': 51.509865, 'lon': -0.118092}}

#response = requests.post(url, json=coordinates_event)
#print(f"Server response (coordinates): {response.json()}")