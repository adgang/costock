import json
import time

def convert_lst_todict(lst):
#   log(json.dumps(lst))
  res_dct = {lst[i]: lst[i + 1] for i in range(0, len(lst), 2)}
  log(json.dumps({'asd':123}))
  log(json.dumps(res_dct))
  return res_dct

def get_device(id):
  redres = execute('hgetall', 'device:' + id)
  return convert_lst_todict(redres)


def find_available_device_by_location(order):
  log(json.dumps(order))
  log(order['location.long'])
  log(order['location.lat'])
  redres = execute('georadius', 'devices_by_location', order['location.long'], order['location.lat'], '1500', 'km')
  log(json.dumps(redres))
  for id in redres:
    device = get_device(id)
    log(json.dumps(device))
    log('dev')
    if device['status'] == 'available':
      log(json.dumps(device))
      log('found de')
      return [id, device]


gb = GearsBuilder()
gb.filter(lambda x: x['key'].startswith('order:'))

def assign_available_device(order_key, order):
  log("bll")
  log(order['status'])
  log(order_key)
  if order['status'] == 'waitlisted':
    device_with_id = find_available_device_by_location(order)
    log(str(device_with_id))
    log(str('blll'))
    device_id = device_with_id[0]
    device = device_with_id[1]
    execute('hset', order_key, 'status', 'assigned', 'assigned_at', int(time.time() * 1000), 
      'device_id', device_id, 'device_model_id', device['model_id'], 'device_model_name', device['model_name'])
    execute('hset', 'device:' + device_id, 'status', 'in_service')



gb.foreach(lambda x: assign_available_device(x['key'], x['value']))
gb.run()