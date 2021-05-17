gb = GearsBuilder()
gb.foreach(lambda x: print(x))
# gb.map(lambda x: x['value'])     # map records to "sentence" values
# gb.flatmap(lambda x: x.split())  # split sentences to words
# gb.countby()                     # count each word's occurances
gb.run('*')