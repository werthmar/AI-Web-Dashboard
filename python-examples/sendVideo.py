import requests

# @Max
# Damit du die videos im webserver abspielen kannst müssen die über einen http server gehostet werden
# du kannst das mit Python ganz einfach machen, indem du die Videos in einen Ordner packst und in dem Ordner im Terminal
# folgenden Befehl ausführst: python3 -m http.server
# unter localhost:8000/ kannst du dann auf die videos zugreifen
# diesen Befehl kannst du ja auch an dein script mit allen anderen Befehlen anhängen.

url = 'http://localhost:4000/websocket/event'

video_event = {
                        'type': 'video',
                        'data': 
                            [
                                    
                                {
                                    'source': 'http://localhost:8000/testVid.mp4',    
                                    'title': 'Test Video 1',
                                    'startAt': 40, #start time in seconds
                                    'speed': 0.5,
                                },
                                {
                                    'source': 'http://localhost:8000/testvideo2.mp4',    
                                    'title': 'Test Video 2',
                                    'startAt': 4,
                                    'speed': 0.5,
                                },
                            ]
                    }

response = requests.post(url, json=video_event)
print(f"Server response (video): {response.json()}")