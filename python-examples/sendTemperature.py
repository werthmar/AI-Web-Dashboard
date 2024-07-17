import requests

# Send a message event
url = 'http://localhost:4000/websocket/event'

# Send a coordinates event
coordinates_event = {
                        'type': 'temperature',
                        'data': {
                            'currentTemperature': 19.3,
                            'averageTemperatures': [
                                { 'day': '1.7', 'dayTemp': 25, 'nightTemp': 18 },
                                { 'day': '2.7', 'dayTemp': 27, 'nightTemp': 19 },
                                { 'day': '3.7', 'dayTemp': 24, 'nightTemp': 17 },
                                { 'day': '4.7', 'dayTemp': 26, 'nightTemp': 18 },
                                { 'day': '5.7', 'dayTemp': 28, 'nightTemp': 20 },
                                { 'day': '6.7', 'dayTemp': 29, 'nightTemp': 21 },
                                { 'day': '8.7', 'dayTemp': 30, 'nightTemp': 22 },
                            ]
                        }
                    }

response = requests.post(url, json=coordinates_event)
print(f"Server response (coordinates): {response.json()}")