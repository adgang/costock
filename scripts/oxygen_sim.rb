require 'json'


time = curr_time = Time.now.to_i * 1000
str = []
(1..20000).each do |x| 
  time = time + 20000
  str << {value: "92.1", device_id: "123", time: time}
end

File.write('/tmp/blah', JSON.pretty_generate(str))