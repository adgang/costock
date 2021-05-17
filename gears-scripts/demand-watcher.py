def GearsBuilder():
  return 0
def execute():
  return 0

def log():
  return 0

import json

def find_available_device_by_location(order):
    log(json.dumps(order))
    log(order['location.long'])
    log(order['location.lat'])
    redres = execute('georadius', 'devices_by_location', order['location.long'], order['location.lat'], '150', 'km')
    log(json.dumps(redres))
    devices = map(lambda id: execute('hgetall', 'device:' + id), redres)
    for d in list(devices):
        log(json.dumps(d))

gb = GearsBuilder()
gb.filter(lambda x: x['key'].startswith('order:'))


gb.foreach(lambda x: find_available_device_by_location(x['value']))
gb.run()