import json
with open("complete_data.json") as file:
  data = json.loads(file.read())

print(sorted(data["Kategorie:Narození v Libereckém kraji"]["Kategorie:Narození ve Vratislavicích nad Nisou"].items(),key=lambda x:x[1]))
