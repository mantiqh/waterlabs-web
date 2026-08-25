import os
import requests
import urllib.request
import time

FIGMA_TOKEN = os.environ.get('FIGMA_TOKEN')
FILE_KEY = 'px0hFw6hpaYiu1qRX9lE61'

# Nodes to export
nodes = {
    '3238:12798': ('eligibility-card.png', 'png'),
    '3238:12804': ('denial-card.png', 'png'),
    '3883:8922': ('healthcare-grade-bg.png', 'png'),
    '3238:12813': ('healthcare-grade-overlay.svg', 'svg'),
    '3238:13960': ('stat-bg-1.png', 'png'),
    '3238:12826': ('stat-bg-2.png', 'png'),
    '3238:12831': ('stat-bg-3.png', 'png')
}

out_dir = 'public/images/home/features-images'
os.makedirs(out_dir, exist_ok=True)

headers = {'X-Figma-Token': FIGMA_TOKEN}

for node_id, (filename, fmt) in nodes.items():
    print(f"Requesting {node_id} as {fmt}...")
    url = f"https://api.figma.com/v1/images/{FILE_KEY}?ids={node_id}&format={fmt}"
    if fmt == 'png':
        url += "&scale=2" # Get 2x resolution for retina displays
        
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            image_url = data.get('images', {}).get(node_id)
            if image_url:
                print(f"Downloading {image_url} to {filename}...")
                urllib.request.urlretrieve(image_url, os.path.join(out_dir, filename))
                print(f"Successfully saved {filename}")
            else:
                print(f"Error: No image URL returned for {node_id}")
        elif response.status_code == 429:
            print("Rate limited! Retrying in 5 seconds...")
            time.sleep(5)
            # Simple retry once
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                data = response.json()
                image_url = data.get('images', {}).get(node_id)
                if image_url:
                    urllib.request.urlretrieve(image_url, os.path.join(out_dir, filename))
                    print(f"Successfully saved {filename} after retry")
        else:
            print(f"Failed to fetch {node_id}: {response.status_code} {response.text}")
    except Exception as e:
        print(f"Exception for {node_id}: {e}")
        
    time.sleep(1) # Prevent aggressive rate limiting

