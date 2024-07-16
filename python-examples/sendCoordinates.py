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
                                'label': 'Kuh 1',
                                'status': 0
                            },
                            {
                                'x': 1400,
                                'y': 700,
                                'label': 'Kuh 2',
                                'status': 0
                            },
                            {
                                'x': 400,
                                'y': 300,
                                'label': 'Kuh 3',
                                'status': 1
                            },
                            {
                                'x': 2500,
                                'y': 700,
                                'label': 'Kuh 4',
                                'status': 2
                            }
                        ]
                    }

response = requests.post(url, json=coordinates_event)
print(f"Server response (coordinates): {response.json()}")