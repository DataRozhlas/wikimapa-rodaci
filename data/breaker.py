#%%
import json

#%%
with open('./data/data.json', 'r', encoding='utf-8') as f:
    d = json.loads(f.read())

#%%
vls = []
for orp in d['features']:
    vls.append(orp['properties']['pv'])

#%%
min(vls)

#%%
