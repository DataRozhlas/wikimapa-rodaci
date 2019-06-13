#%%
import json

#%%
with open('./data/obce.geojson', 'r', encoding='utf-8') as f:
    obce = json.loads(f.read())

with open('./data/final_data.json', 'r', encoding='utf-8') as f:
    data = json.loads(f.read())

#%%
d = {}
for rod in data:
    d[rod['id']] = {
        'rod': rod['rodak'],
        'pv': rod['pv'],
    }

#%%
ftrs = []
for o in obce['features']:
    if o['properties']['Kod'] in d:
        o['properties'].update(d[o['properties']['Kod']])
        ftrs.append(o)
obce['features'] = ftrs

print(len(ftrs))

#%%
with open('./data/data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(obce, ensure_ascii=False))