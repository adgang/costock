gb = GearsBuilder()
gb.filter(lambda x: x['key'].startswith('audited-'))
gb.foreach(lambda x: execute('xadd', 'audit-logs', '*', 'key', x['key']))
gb.register()
