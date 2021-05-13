require 'json'


curr_time = Time.now.to_i * 1000
oxy_value = Rational(rand(7000..10000), 100).to_f.to_s
new_obj = {value: oxy_value, device_id: "123", time: curr_time}

str = JSON.generate(new_obj)

cmd = %Q[curl --location --request POST 'localhost:8088/telegraf' \
--header 'Content-Type: application/json' \
--data-raw '#{str}']
puts cmd
system(cmd)