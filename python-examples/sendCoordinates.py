import requests

# Send a message event
url = 'http://localhost:4000/websocket/event'

# Send a coordinates event
coordinates_event = {
                        'type': 'coordinates',
                        'data': [
                            {
                                'x': 1000,
                                'y': 1500,
                                'label': 'Kuh 1'
                            },
                            {
                                'x': 1400,
                                'y': 700,
                                'label': 'Kuh 2'
                            }
                        ]
                    }

response = requests.post(url, json=coordinates_event)
print(f"Server response (coordinates): {response.json()}")