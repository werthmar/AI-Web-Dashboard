import requests

# Send a message event
url = 'http://localhost:4000/websocket/event'

# Send a coordinates event
coordinates_event = {
                        'type': 'coordinates',
                        'data': [
                            {
                                'x': 1000,
                                'y': 1300,
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
                                'x': 500,
                                'y': 300,
                                'label': 'Kuh 3',
                                'status': 1
                            },
                            {
                                'x': 1500,
                                'y': 800,
                                'label': 'Kuh 4',
                                'status': 2
                            },
                            {
                                'x': 700,
                                'y': 1200,
                                'label': 'Kuh 5',
                                'status': 2
                            }
                        ]
                    }

response = requests.post(url, json=coordinates_event)
print(f"Server response (coordinates): {response.json()}")