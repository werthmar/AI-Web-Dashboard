import requests

# Herdendistanzen für Herdeninformaiton page
url = 'http://localhost:4000/websocket/event'

# Send a coordinates event
distance_event = {
                        'type': 'distance',
                        'data': [
                            { 'day': '1.7', 'maxDistance': 15, 'avgDistance': 7 },
                            { 'day': '2.7', 'maxDistance': 5, 'avgDistance': 20 },
                            { 'day': '3.7', 'maxDistance': 8, 'avgDistance': 12 },
                            { 'day': '4.7', 'maxDistance': 10, 'avgDistance': 5 },
                        ]
                        
                    }

response = requests.post(url, json=distance_event)
print(f"Server response (distanace): {response.json()}")